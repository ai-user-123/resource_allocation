import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Loader2,
  RotateCcw,
  Square,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AdaptiveOverrideMonitor } from "../services/adaptiveOverride";
import { clearData } from "../services/api";
import {
  computeFeatures,
  getPolicyLabel,
  predictPolicy,
} from "../services/mlEngine";
import { greedyScore, resolvedPriority } from "../services/scheduler";
import { SimulationEngine, type SimulationTick } from "../services/simulation";
import type { GanttEntry, PolicyType, Process } from "../types";

type SimStatus = "idle" | "running" | "complete";

interface SimStats {
  processesCreated: number;
  processesCompleted: number;
  throughput: number;
  currentPolicy: PolicyType;
  mlConfidence: number;
  elapsedMs: number;
}

interface LogEntry {
  id: number;
  time: string;
  message: string;
  level: "info" | "warn" | "success" | "error";
}

interface SummaryStats {
  totalProcesses: number;
  avgWaiting: number;
  avgTurnaround: number;
  throughput: number;
  policyDist: Record<PolicyType, number>;
}

const POLICY_COLORS: Record<PolicyType, string> = {
  round_robin: "#06b6d4",
  sjf: "#a78bfa",
  priority: "#fb923c",
};

const POLICY_LABELS: Record<PolicyType, string> = {
  round_robin: "Round Robin",
  sjf: "SJF",
  priority: "Priority",
};

let logCounter = 0;

function nowStr(): string {
  return new Date().toTimeString().slice(0, 8);
}

function makeLog(message: string, level: LogEntry["level"] = "info"): LogEntry {
  return { id: ++logCounter, time: nowStr(), message, level };
}

export default function Simulation() {
  const [status, setStatus] = useState<SimStatus>("idle");
  const [processCount, setProcessCount] = useState(100);
  const [quantum, setQuantum] = useState(10);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [stats, setStats] = useState<SimStats>({
    processesCreated: 0,
    processesCompleted: 0,
    throughput: 0,
    currentPolicy: "round_robin",
    mlConfidence: 0,
    elapsedMs: 0,
  });
  const [ganttData, setGanttData] = useState<GanttEntry[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [overrideActive, setOverrideActive] = useState(false);
  const [overrideReason, setOverrideReason] = useState("");
  const [topProcesses, setTopProcesses] = useState<
    Array<{
      name: string;
      greedy: number;
      resolved: number;
      policy: PolicyType;
    }>
  >([]);
  const [summary, setSummary] = useState<SummaryStats | null>(null);

  const engineRef = useRef<SimulationEngine | null>(null);
  const overrideRef = useRef<AdaptiveOverrideMonitor | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const logsEndRef = useRef<HTMLDivElement>(null);
  const throughputRef = useRef(0);
  const policyDistRef = useRef<Record<PolicyType, number>>({
    round_robin: 0,
    sjf: 0,
    priority: 0,
  });
  const waitTimesRef = useRef<number[]>([]);
  const turnaroundTimesRef = useRef<number[]>([]);

  const appendLog = useCallback((entry: LogEntry) => {
    setLogs((prev) => [...prev.slice(-199), entry]);
  }, []);

  const handleTick = useCallback(
    (tick: SimulationTick) => {
      const completed = tick.processes.filter(
        (p) => p.status === "completed",
      ).length;
      const created = tick.processes.length;
      throughputRef.current = tick.throughput;

      // ML inference on recent logs
      const features = computeFeatures(tick.logs);
      const prediction = predictPolicy(features);
      const mlPolicy = overrideActive ? "round_robin" : prediction.policy;
      const mlConf = prediction.confidence;

      // Track policy distribution
      policyDistRef.current[mlPolicy] =
        (policyDistRef.current[mlPolicy] || 0) + 1;

      // Collect wait / turnaround from completed procs
      const justCompleted = tick.processes.filter(
        (p) => p.status === "completed" && p.completion_time,
      );
      for (const p of justCompleted) {
        const wt = (p.start_time ?? p.arrival_time) - p.arrival_time;
        const tat = (p.completion_time ?? 0) - p.arrival_time;
        if (wt >= 0) waitTimesRef.current.push(wt);
        if (tat > 0) turnaroundTimesRef.current.push(tat);
      }

      // Top 5 processes by resolved priority
      const active = tick.processes
        .filter((p) => p.status !== "completed")
        .slice(0, 20);
      const scored = active
        .map((p) => {
          const gs = greedyScore(p);
          const mlImpact = mlConf / 100;
          const rp = resolvedPriority(gs, mlImpact);
          return { name: p.name, greedy: gs, resolved: rp, policy: mlPolicy };
        })
        .sort((a, b) => b.resolved - a.resolved)
        .slice(0, 5);
      setTopProcesses(scored);

      // Update gantt (keep last 20)
      setGanttData(tick.ganttEntries.slice(-20));

      setStats({
        processesCreated: created,
        processesCompleted: completed,
        throughput: tick.throughput,
        currentPolicy: mlPolicy,
        mlConfidence: mlConf,
        elapsedMs: Date.now() - startTimeRef.current,
      });

      appendLog(
        makeLog(
          `ML decision: ${POLICY_LABELS[mlPolicy]} (${mlConf.toFixed(0)}% confidence)`,
          mlConf >= 75 ? "success" : "info",
        ),
      );

      if (engineRef.current?.status === "stopped") {
        finishSimulation(created, completed, tick.throughput);
      }
    },
    [overrideActive, appendLog],
  );

  function finishSimulation(created: number, _completed: number, tp: number) {
    if (elapsedIntervalRef.current) {
      clearInterval(elapsedIntervalRef.current);
      elapsedIntervalRef.current = null;
    }
    overrideRef.current?.stop();

    const wts = waitTimesRef.current;
    const tats = turnaroundTimesRef.current;
    const avgWaiting = wts.length
      ? wts.reduce((a, b) => a + b, 0) / wts.length
      : 0;
    const avgTurnaround = tats.length
      ? tats.reduce((a, b) => a + b, 0) / tats.length
      : 0;

    setSummary({
      totalProcesses: created,
      avgWaiting,
      avgTurnaround,
      throughput: tp,
      policyDist: { ...policyDistRef.current },
    });
    setStatus("complete");
    appendLog(makeLog("Simulation complete!", "success"));
  }

  function handleStart() {
    // Reset
    clearData();
    policyDistRef.current = { round_robin: 0, sjf: 0, priority: 0 };
    waitTimesRef.current = [];
    turnaroundTimesRef.current = [];
    throughputRef.current = 0;
    setLogs([
      makeLog("Simulation started — generating synthetic processes", "info"),
    ]);
    setSummary(null);
    setOverrideActive(false);
    setGanttData([]);
    setTopProcesses([]);
    setElapsedSec(0);
    startTimeRef.current = Date.now();

    engineRef.current = new SimulationEngine(handleTick);
    engineRef.current.start(processCount);

    overrideRef.current = new AdaptiveOverrideMonitor(
      () => throughputRef.current,
      (active) => {
        setOverrideActive(active);
        if (active) {
          const reason = `Throughput below ${(198 * 0.7).toFixed(0)} tasks/sec for 2 consecutive intervals`;
          setOverrideReason(reason);
          appendLog(makeLog(`Policy override triggered: ${reason}`, "warn"));
        } else {
          appendLog(
            makeLog(
              "Policy override cleared — throughput recovered",
              "success",
            ),
          );
        }
      },
    );
    overrideRef.current.start();

    elapsedIntervalRef.current = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    setStatus("running");
    appendLog(
      makeLog(
        `Spawning up to ${processCount} processes (Poisson λ=5/s, log-normal burst)`,
        "info",
      ),
    );
  }

  function handleStop() {
    engineRef.current?.stop();
    overrideRef.current?.stop();
    if (elapsedIntervalRef.current) {
      clearInterval(elapsedIntervalRef.current);
      elapsedIntervalRef.current = null;
    }
    setStatus("complete");
    appendLog(makeLog("Simulation stopped by user", "warn"));
  }

  function handleReset() {
    engineRef.current?.clear();
    overrideRef.current?.stop();
    if (elapsedIntervalRef.current) {
      clearInterval(elapsedIntervalRef.current);
      elapsedIntervalRef.current = null;
    }
    clearData();
    setStatus("idle");
    setLogs([]);
    setSummary(null);
    setGanttData([]);
    setTopProcesses([]);
    setOverrideActive(false);
    setElapsedSec(0);
    setStats({
      processesCreated: 0,
      processesCompleted: 0,
      throughput: 0,
      currentPolicy: "round_robin",
      mlConfidence: 0,
      elapsedMs: 0,
    });
  }

  const lastLogId = logs[logs.length - 1]?.id;
  // Auto-scroll logs
  // biome-ignore lint/correctness/useExhaustiveDependencies: only fire on new log
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lastLogId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      engineRef.current?.stop();
      overrideRef.current?.stop();
      if (elapsedIntervalRef.current) clearInterval(elapsedIntervalRef.current);
    };
  }, []);

  const statusBadge =
    status === "idle" ? (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider">
        Idle
      </span>
    ) : status === "running" ? (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-cyan-950 text-cyan-300 text-xs font-semibold uppercase tracking-wider animate-pulse">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
        Running
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-green-950 text-green-300 text-xs font-semibold uppercase tracking-wider">
        <CheckCircle2 className="w-3 h-3" />
        Complete
      </span>
    );

  // Build gantt chart data: group by process name, last position
  const ganttChartData = (() => {
    const grouped: Record<
      string,
      { start: number; end: number; policy: PolicyType }
    > = {};
    for (const entry of ganttData) {
      grouped[entry.name] = {
        start: entry.start_time,
        end: entry.end_time,
        policy: entry.policy,
      };
    }
    const base =
      ganttData.length > 0
        ? Math.min(...ganttData.map((g) => g.start_time))
        : 0;
    return Object.entries(grouped)
      .slice(0, 12)
      .map(([name, { start, end, policy }]) => ({
        name,
        start: start - base,
        duration: end - start,
        policy,
      }));
  })();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cpu className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-xl font-display font-semibold text-foreground">
              Simulation Mode
            </h1>
            <p className="text-xs text-muted-foreground">
              Synthetic process workload with ML-driven scheduling
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {status === "running" && (
            <span className="font-mono text-xs text-muted-foreground">
              Elapsed:{" "}
              <span className="text-primary font-semibold">{elapsedSec}s</span>
            </span>
          )}
          {statusBadge}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Control Panel */}
        <Card className="col-span-12 lg:col-span-3 bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">
              Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Process Count */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">
                  Process Count
                </Label>
                <span className="font-mono text-xs font-semibold text-primary">
                  {processCount}
                </span>
              </div>
              <Slider
                data-ocid="sim.process_count.slider"
                min={50}
                max={500}
                step={10}
                value={[processCount]}
                onValueChange={([v]) => setProcessCount(v)}
                disabled={status === "running"}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>50</span>
                <span>500</span>
              </div>
            </div>

            {/* Time Quantum */}
            <div className="space-y-2">
              <Label
                htmlFor="quantum-input"
                className="text-xs text-muted-foreground"
              >
                Time Quantum (Round Robin)
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="quantum-input"
                  data-ocid="sim.quantum.input"
                  type="number"
                  min={1}
                  max={100}
                  value={quantum}
                  onChange={(e) =>
                    setQuantum(Math.max(1, Number(e.target.value)))
                  }
                  disabled={status === "running"}
                  className="h-8 font-mono text-sm bg-muted border-input"
                />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  ms
                </span>
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                data-ocid="sim.start_button"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                disabled={status === "running"}
                onClick={handleStart}
              >
                {status === "running" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Running…
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Start Simulation
                  </>
                )}
              </Button>
              <Button
                data-ocid="sim.stop_button"
                variant="destructive"
                className="w-full"
                disabled={status !== "running"}
                onClick={handleStop}
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
              <Button
                data-ocid="sim.reset_button"
                variant="outline"
                className="w-full border-border text-muted-foreground hover:text-foreground"
                onClick={handleReset}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear / Reset
              </Button>
            </div>

            {/* Adaptive Override Indicator */}
            {overrideActive && (
              <div
                data-ocid="sim.override_indicator"
                className="rounded-sm border border-amber-700/50 bg-amber-950/40 p-3 space-y-1"
              >
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Override Active
                </div>
                <p className="text-xs text-amber-200/70 leading-relaxed">
                  {overrideReason}
                </p>
                <p className="text-xs text-muted-foreground">
                  Forced: Round Robin
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right column: stats + charts */}
        <div className="col-span-12 lg:col-span-9 space-y-4">
          {/* Live Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
            {[
              {
                label: "Created",
                value: stats.processesCreated,
                unit: "",
                ocid: "sim.stat.created",
              },
              {
                label: "Completed",
                value: stats.processesCompleted,
                unit: "",
                ocid: "sim.stat.completed",
              },
              {
                label: "Throughput",
                value: stats.throughput.toFixed(1),
                unit: "/s",
                ocid: "sim.stat.throughput",
              },
              {
                label: "Policy",
                value: POLICY_LABELS[stats.currentPolicy],
                unit: "",
                ocid: "sim.stat.policy",
                mono: false,
              },
              {
                label: "ML Conf.",
                value: `${stats.mlConfidence.toFixed(0)}%`,
                unit: "",
                ocid: "sim.stat.ml_confidence",
              },
              {
                label: "Override",
                value: overrideActive ? "ON" : "OFF",
                unit: "",
                ocid: "sim.stat.override",
                warn: overrideActive,
              },
            ].map((s) => (
              <Card
                key={s.label}
                data-ocid={s.ocid}
                className="bg-card border-border"
              >
                <CardContent className="p-3">
                  <p className="text-xs text-muted-foreground mb-1">
                    {s.label}
                  </p>
                  <p
                    className={`font-mono font-semibold text-sm truncate ${
                      s.warn ? "text-amber-400" : "text-primary"
                    }`}
                  >
                    {s.value}
                    {s.unit && (
                      <span className="text-xs text-muted-foreground ml-0.5">
                        {s.unit}
                      </span>
                    )}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gantt Chart */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Gantt — Process Execution Timeline
                </CardTitle>
                <div className="flex gap-3">
                  {(
                    Object.entries(POLICY_COLORS) as [PolicyType, string][]
                  ).map(([policy, color]) => (
                    <span
                      key={policy}
                      className="flex items-center gap-1 text-xs text-muted-foreground"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-sm inline-block"
                        style={{ backgroundColor: color }}
                      />
                      {POLICY_LABELS[policy]}
                    </span>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {ganttChartData.length === 0 ? (
                <div
                  data-ocid="sim.gantt.empty_state"
                  className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-2"
                >
                  {status === "running" ? (
                    <Skeleton className="h-32 w-full" />
                  ) : (
                    <>
                      <TrendingUp className="w-8 h-8 opacity-30" />
                      <span className="text-xs">
                        Gantt chart will appear once simulation starts
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={ganttChartData}
                    layout="vertical"
                    margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.06)"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: "#6b7280" }}
                      tickFormatter={(v) => `${v}ms`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={64}
                      tick={{ fontSize: 10, fill: "#9ca3af" }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: 4,
                        fontSize: 11,
                      }}
                      formatter={(value: number) => [`${value}ms`, "Duration"]}
                    />
                    <Bar dataKey="duration" radius={2} maxBarSize={18}>
                      {ganttChartData.map((entry, index) => (
                        <Cell
                          // biome-ignore lint/suspicious/noArrayIndexKey: recharts requires index key for Cell
                          key={`gantt-cell-${index}`}
                          fill={POLICY_COLORS[entry.policy]}
                          fillOpacity={0.85}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Greedy Score + Log */}
          <div className="grid grid-cols-12 gap-4">
            {/* Greedy Score Panel */}
            <Card className="col-span-12 md:col-span-5 bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Top 5 — Resolved Priority Score
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Score = (0.7 × greedy) + (0.3 × ML impact)
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                {topProcesses.length === 0 ? (
                  <div
                    data-ocid="sim.greedy.empty_state"
                    className="text-xs text-muted-foreground text-center py-8 opacity-60"
                  >
                    Awaiting process queue…
                  </div>
                ) : (
                  <div className="space-y-2">
                    {topProcesses.map((p, i) => (
                      <div
                        key={p.name}
                        data-ocid={`sim.greedy.item.${i + 1}`}
                        className="flex items-center gap-2 py-1.5 px-2 rounded-sm bg-muted/40 hover:bg-muted/70 transition-colors"
                      >
                        <span className="text-xs font-mono text-muted-foreground w-4">
                          {i + 1}
                        </span>
                        <span className="text-xs font-mono text-foreground flex-1 truncate">
                          {p.name}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-xs border-border text-muted-foreground px-1.5 py-0"
                          style={{
                            borderColor: `${POLICY_COLORS[p.policy]}60`,
                          }}
                        >
                          {POLICY_LABELS[p.policy]}
                        </Badge>
                        <span
                          className="font-mono text-xs font-semibold"
                          style={{ color: POLICY_COLORS[p.policy] }}
                        >
                          {p.resolved.toFixed(3)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Simulation Log */}
            <Card className="col-span-12 md:col-span-7 bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Simulation Log
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ScrollArea
                  data-ocid="sim.log.scroll_area"
                  className="h-52 font-mono text-xs"
                >
                  {logs.length === 0 ? (
                    <div
                      data-ocid="sim.log.empty_state"
                      className="text-muted-foreground text-center py-8 opacity-60"
                    >
                      Log will appear here once simulation starts
                    </div>
                  ) : (
                    <div className="space-y-0.5 pr-3">
                      {logs.map((entry) => (
                        <div
                          key={entry.id}
                          data-ocid="sim.log.entry"
                          className={`flex gap-2 py-0.5 ${
                            entry.level === "warn"
                              ? "text-amber-400"
                              : entry.level === "success"
                                ? "text-green-400"
                                : entry.level === "error"
                                  ? "text-red-400"
                                  : "text-muted-foreground"
                          }`}
                        >
                          <span className="text-[10px] text-muted-foreground/50 min-w-[52px]">
                            {entry.time}
                          </span>
                          <span className="leading-relaxed">
                            {entry.message}
                          </span>
                        </div>
                      ))}
                      <div ref={logsEndRef} />
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Post-Simulation Summary */}
      {summary && (
        <Card
          data-ocid="sim.summary.card"
          className="bg-card border-border border-primary/30"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <CardTitle className="text-sm font-semibold text-foreground">
                Simulation Summary
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4">
              {[
                {
                  label: "Total Processes",
                  value: summary.totalProcesses,
                  unit: "",
                  ocid: "sim.summary.total",
                },
                {
                  label: "Avg Waiting Time",
                  value: summary.avgWaiting.toFixed(1),
                  unit: "ms",
                  ocid: "sim.summary.avg_wait",
                  target: 21,
                  lte: true,
                },
                {
                  label: "Avg Turnaround",
                  value: summary.avgTurnaround.toFixed(1),
                  unit: "ms",
                  ocid: "sim.summary.avg_turnaround",
                },
                {
                  label: "Throughput",
                  value: summary.throughput.toFixed(1),
                  unit: "/s",
                  ocid: "sim.summary.throughput",
                  target: 198,
                  lte: false,
                },
                {
                  label: "Round Robin",
                  value: summary.policyDist.round_robin,
                  unit: " ticks",
                  ocid: "sim.summary.rr",
                  color: POLICY_COLORS.round_robin,
                },
                {
                  label: "SJF",
                  value: summary.policyDist.sjf,
                  unit: " ticks",
                  ocid: "sim.summary.sjf",
                  color: POLICY_COLORS.sjf,
                },
              ].map((s) => {
                const numVal =
                  typeof s.value === "string"
                    ? Number.parseFloat(s.value)
                    : s.value;
                const metTarget =
                  s.target !== undefined
                    ? s.lte
                      ? numVal <= s.target
                      : numVal >= s.target
                    : null;
                return (
                  <div key={s.label} data-ocid={s.ocid} className="space-y-1">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p
                      className="font-mono font-semibold text-base"
                      style={s.color ? { color: s.color } : undefined}
                    >
                      <span
                        className={
                          metTarget === true
                            ? "text-green-400"
                            : metTarget === false
                              ? "text-red-400"
                              : "text-primary"
                        }
                      >
                        {s.value}
                      </span>
                      {s.unit && (
                        <span className="text-xs text-muted-foreground ml-0.5">
                          {s.unit}
                        </span>
                      )}
                    </p>
                    {s.target !== undefined && (
                      <p className="text-[10px] text-muted-foreground/60">
                        Target: {s.lte ? "≤" : "≥"} {s.target}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
