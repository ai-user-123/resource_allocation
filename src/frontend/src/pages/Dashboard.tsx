import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  Cpu,
  MemoryStick,
  Network,
  Play,
  RefreshCw,
  Square,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { AlertBadge } from "../components/AlertBadge";
import { MetricCard } from "../components/MetricCard";
import { useMetrics } from "../hooks/useMetrics";
import { useResults } from "../hooks/useResults";
import { useSchedulingDecision } from "../hooks/useSchedulingDecision";
import { AdaptiveOverrideMonitor } from "../services/adaptiveOverride";
import { clearData, overridePolicy } from "../services/api";
import { SimulationEngine } from "../services/simulation";
import type { GanttEntry, PolicyType } from "../types";
import { PERFORMANCE_TARGETS } from "../types";

const POLICY_COLORS: Record<PolicyType, string> = {
  round_robin: "#06b6d4",
  sjf: "#22c55e",
  priority: "#f97316",
};

const POLICY_LABELS: Record<PolicyType, string> = {
  round_robin: "Round Robin",
  sjf: "SJF",
  priority: "Priority",
};

const POLICY_BADGE_CLASS: Record<PolicyType, string> = {
  round_robin: "border-cyan-500/50 text-cyan-400 bg-cyan-950/40",
  sjf: "border-green-500/50 text-green-400 bg-green-950/40",
  priority: "border-orange-500/50 text-orange-400 bg-orange-950/40",
};

interface ChartPoint {
  time: string;
  cpu: number;
  memory: number;
  io: number;
  processes: number;
}

interface DecisionLogEntry {
  ts: number;
  policy: PolicyType;
  confidence: number;
  cpu_avg: number;
  mem_avg: number;
  reason: string;
}

type GanttBar = GanttEntry & { left: number; width: number };

// ─── Gantt Component ─────────────────────────────────────────────────────────
function GanttChart({ entries }: { entries: GanttEntry[] }) {
  if (entries.length === 0) {
    return (
      <div
        className="flex items-center justify-center h-48 text-muted-foreground text-sm"
        data-ocid="gantt.empty_state"
      >
        No process data yet — start simulation to populate.
      </div>
    );
  }

  const byPid: Record<number, GanttEntry[]> = {};
  for (const e of entries) {
    if (!byPid[e.pid]) byPid[e.pid] = [];
    byPid[e.pid].push(e);
  }

  const pidList = Object.keys(byPid).slice(0, 10).map(Number);
  const allTimes = entries.flatMap((e) => [e.start_time, e.end_time]);
  const minT = Math.min(...allTimes);
  const maxT = Math.max(...allTimes);
  const range = maxT - minT || 1;

  return (
    <div className="space-y-1.5 overflow-hidden" data-ocid="gantt.chart">
      {pidList.map((pid, idx) => {
        const bars: GanttBar[] = (byPid[pid] ?? []).map((e) => ({
          ...e,
          left: ((e.start_time - minT) / range) * 100,
          width: Math.max(1.5, ((e.end_time - e.start_time) / range) * 100),
        }));
        return (
          <div
            key={pid}
            className="flex items-center gap-2"
            data-ocid={`gantt.item.${idx + 1}`}
          >
            <span className="w-24 text-[11px] font-mono text-muted-foreground truncate shrink-0">
              {byPid[pid]?.[0]?.name ?? `P-${pid}`}
            </span>
            <div className="flex-1 h-5 bg-muted/20 rounded relative overflow-hidden">
              {bars.map((bar, bi) => (
                <div
                  key={`${bar.pid}-${bi}`}
                  className="absolute top-0.5 h-4 rounded-sm opacity-85 transition-all duration-200"
                  style={{
                    left: `${bar.left}%`,
                    width: `${bar.width}%`,
                    backgroundColor: POLICY_COLORS[bar.policy],
                  }}
                  title={`${bar.name} | ${POLICY_LABELS[bar.policy]}`}
                />
              ))}
            </div>
          </div>
        );
      })}
      {/* Time ruler */}
      <div className="flex items-center gap-2 pt-1">
        <span className="w-24 shrink-0" />
        <div className="flex-1 flex justify-between text-[10px] font-mono text-muted-foreground">
          <span>0ms</span>
          <span>{Math.round(range / 2)}ms</span>
          <span>{Math.round(range)}ms</span>
        </div>
      </div>
    </div>
  );
}

// ─── Chart tooltip style ──────────────────────────────────────────────────────
const TOOLTIP_STYLE = {
  background: "oklch(0.15 0 0)",
  border: "1px solid oklch(0.25 0 0)",
  borderRadius: "4px",
  fontSize: "11px",
  fontFamily: "var(--font-mono)",
  color: "oklch(0.85 0 0)",
};
const AXIS_TICK = {
  fontSize: 10,
  fill: "oklch(0.5 0 0)",
  fontFamily: "var(--font-mono)",
};
const GRID_STYLE = { stroke: "oklch(0.25 0 0)", strokeOpacity: 0.5 };

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const queryClient = useQueryClient();
  const { data: metrics, isLoading: metricsLoading } = useMetrics();
  const { data: decision } = useSchedulingDecision();
  const { data: results } = useResults();

  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [ganttEntries, setGanttEntries] = useState<GanttEntry[]>([]);
  const [simRunning, setSimRunning] = useState(false);
  const [policyOverride, setPolicyOverride] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [decisionLog, setDecisionLog] = useState<DecisionLogEntry[]>([]);

  const simRef = useRef<SimulationEngine | null>(null);
  const monitorRef = useRef<AdaptiveOverrideMonitor | null>(null);
  const currentThroughputRef = useRef(0);
  const recentMetricsRef = useRef<{ cpu: number; memory: number }[]>([]);

  // Build chart history from metrics
  useEffect(() => {
    if (!metrics) return;
    setLastUpdated(new Date());
    const cpu = Math.round(metrics.cpu_usage * 10) / 10;
    const memory = Math.round(metrics.memory_usage * 10) / 10;
    recentMetricsRef.current = [
      ...recentMetricsRef.current.slice(-4),
      { cpu, memory },
    ];
    const point: ChartPoint = {
      time: new Date(metrics.timestamp).toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      cpu,
      memory,
      io: Math.round(metrics.io_bandwidth),
      processes: metrics.active_processes,
    };
    setChartData((prev) => [...prev.slice(-29), point]);
  }, [metrics]);

  // Log scheduling decisions
  useEffect(() => {
    if (!decision) return;
    const recent = recentMetricsRef.current;
    const cpuAvg =
      recent.length > 0
        ? recent.reduce((s, r) => s + r.cpu, 0) / recent.length
        : 0;
    const memAvg =
      recent.length > 0
        ? recent.reduce((s, r) => s + r.memory, 0) / recent.length
        : 0;
    setDecisionLog((prev) => [
      {
        ts: decision.timestamp,
        policy: decision.policy,
        confidence: decision.confidence,
        cpu_avg: Math.round(cpuAvg * 10) / 10,
        mem_avg: Math.round(memAvg * 10) / 10,
        reason: decision.reasoning,
      },
      ...prev.slice(0, 19),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decision]);

  // Adaptive override monitor
  useEffect(() => {
    monitorRef.current = new AdaptiveOverrideMonitor(
      () => currentThroughputRef.current,
      (active) => {
        setPolicyOverride(active);
        void overridePolicy(active);
        if (active) {
          toast.warning("Adaptive Override Triggered", {
            description: "Throughput < 70% target — forcing Round Robin",
          });
        }
        queryClient.invalidateQueries({ queryKey: ["scheduling-decision"] });
      },
    );
    monitorRef.current.start();
    return () => monitorRef.current?.stop();
  }, [queryClient]);

  const handleStartSim = useCallback(
    (count: number) => {
      simRef.current = new SimulationEngine((tick) => {
        setGanttEntries([...tick.ganttEntries]);
        currentThroughputRef.current = tick.throughput;
        queryClient.invalidateQueries({ queryKey: ["metrics"] });
        queryClient.invalidateQueries({ queryKey: ["results"] });
      });
      simRef.current.start(count);
      setSimRunning(true);
      toast.success(`Simulation started with ${count} processes`);
    },
    [queryClient],
  );

  const handleStopSim = useCallback(() => {
    simRef.current?.stop();
    setSimRunning(false);
    toast.info("Simulation stopped");
  }, []);

  const handleClearData = useCallback(async () => {
    simRef.current?.clear();
    setSimRunning(false);
    setGanttEntries([]);
    setChartData([]);
    setDecisionLog([]);
    recentMetricsRef.current = [];
    await clearData();
    queryClient.invalidateQueries();
    toast.success("Data cleared");
  }, [queryClient]);

  const handlePolicyOverride = useCallback(async () => {
    const next = !policyOverride;
    setPolicyOverride(next);
    await overridePolicy(next);
    queryClient.invalidateQueries({ queryKey: ["scheduling-decision"] });
    toast(next ? "Override active: Round Robin forced" : "Override released", {
      description: next ? undefined : "ML inference resumed",
    });
  }, [policyOverride, queryClient]);

  const currentMetrics = metrics;
  const stats = results;

  // Alert conditions
  const cpuCritical = (currentMetrics?.cpu_usage ?? 0) > 90;
  const memWarning = (currentMetrics?.memory_usage ?? 0) > 85;
  const throughputLow = (stats?.throughput ?? 0) < 198 && !!stats;

  return (
    <div className="p-5 space-y-5" data-ocid="dashboard.page">
      {/* ── Header Row ──────────────────────────────────────────────────── */}
      <div
        className="flex flex-wrap items-center justify-between gap-3"
        data-ocid="dashboard.header"
      >
        <div className="flex items-center gap-3 min-w-0">
          <h2 className="text-lg font-bold font-display text-foreground tracking-tight">
            ResourceFlow
          </h2>
          {decision && (
            <Badge
              variant="outline"
              className={`font-mono text-[11px] ${POLICY_BADGE_CLASS[decision.policy]}`}
              data-ocid="dashboard.policy_badge"
            >
              {POLICY_LABELS[decision.policy]}
            </Badge>
          )}
          {decision && (
            <span
              className="text-[11px] font-mono text-muted-foreground hidden sm:inline"
              data-ocid="dashboard.confidence"
            >
              {decision.confidence.toFixed(1)}% conf
            </span>
          )}
          {policyOverride && (
            <AlertBadge severity="warning" label="Override Active" />
          )}
        </div>

        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-[11px] font-mono text-muted-foreground hidden md:inline">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePolicyOverride}
            data-ocid="dashboard.policy_override_button"
            className={
              policyOverride
                ? "border-amber-500/60 text-amber-400 bg-amber-950/20 hover:bg-amber-950/30"
                : "border-border hover:border-cyan-500/40 hover:text-accent"
            }
          >
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            {policyOverride ? "Release Override" : "Force Round Robin"}
          </Button>
          {simRunning ? (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleStopSim}
              data-ocid="dashboard.stop_sim_button"
            >
              <Square className="w-3.5 h-3.5 mr-1.5" />
              Stop Sim
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleStartSim(100)}
                data-ocid="dashboard.start_sim_button"
              >
                <Play className="w-3.5 h-3.5 mr-1.5" />
                Sim 100
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => handleStartSim(500)}
                data-ocid="dashboard.start_sim_large_button"
              >
                <Play className="w-3.5 h-3.5 mr-1.5" />
                Sim 500
              </Button>
            </>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearData}
            data-ocid="dashboard.clear_button"
            aria-label="Clear data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* ── Alert Badges Row ─────────────────────────────────────────────── */}
      {(cpuCritical || memWarning || throughputLow || policyOverride) && (
        <div className="flex flex-wrap gap-2" data-ocid="dashboard.alerts_row">
          {cpuCritical && (
            <AlertBadge
              severity="critical"
              label={`CPU ${currentMetrics?.cpu_usage.toFixed(1)}% > 90%`}
            />
          )}
          {memWarning && (
            <AlertBadge
              severity="warning"
              label={`Memory ${currentMetrics?.memory_usage.toFixed(1)}% > 85%`}
            />
          )}
          {throughputLow && (
            <AlertBadge
              severity="warning"
              label={`Throughput ${stats?.throughput.toFixed(0)} < 198/s`}
            />
          )}
          {policyOverride && (
            <AlertBadge severity="warning" label="Policy Override Active" />
          )}
        </div>
      )}

      {/* ── KPI Tiles ────────────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3"
        data-ocid="dashboard.kpi_section"
      >
        {metricsLoading && !stats ? (
          Array.from({ length: 5 }, (_, i) => `kpi-${i}`).map((k) => (
            <Skeleton
              key={k}
              className="h-24"
              data-ocid="dashboard.kpi_loading_state"
            />
          ))
        ) : (
          <>
            <MetricCard
              label="CPU Utilization"
              value={stats?.cpu_utilization ?? currentMetrics?.cpu_usage ?? 0}
              unit="%"
              target={89}
              comparison="gte"
              icon={<Cpu className="w-3.5 h-3.5" />}
              data-ocid="dashboard.cpu_card"
            />
            <MetricCard
              label="Avg Waiting Time"
              value={stats?.avg_waiting_time ?? 0}
              unit="ms"
              target={21}
              comparison="lte"
              icon={<Activity className="w-3.5 h-3.5" />}
              data-ocid="dashboard.waiting_card"
            />
            <MetricCard
              label="Throughput"
              value={stats?.throughput ?? 0}
              unit="/s"
              target={198}
              comparison="gte"
              icon={<Zap className="w-3.5 h-3.5" />}
              data-ocid="dashboard.throughput_card"
            />
            <MetricCard
              label="Memory Efficiency"
              value={
                stats?.memory_efficiency ?? currentMetrics?.memory_usage ?? 0
              }
              unit="%"
              target={88}
              comparison="gte"
              icon={<MemoryStick className="w-3.5 h-3.5" />}
              data-ocid="dashboard.memory_card"
            />
            <MetricCard
              label="Decision Latency"
              value={stats?.decision_latency ?? 0}
              unit="ms"
              target={3}
              comparison="lte"
              icon={<Network className="w-3.5 h-3.5" />}
              data-ocid="dashboard.latency_card"
            />
          </>
        )}
      </div>

      {/* ── Charts Row ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Dual-axis CPU & Memory line chart */}
        <div
          className="bg-card border border-border rounded p-4"
          data-ocid="dashboard.cpu_chart"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold font-display">
              CPU &amp; Memory Usage
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              last 30s
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={chartData}
              margin={{ top: 4, right: 32, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={GRID_STYLE.stroke}
                strokeOpacity={GRID_STYLE.strokeOpacity}
              />
              <XAxis dataKey="time" tick={AXIS_TICK} tickLine={false} />
              <YAxis
                yAxisId="left"
                domain={[0, 100]}
                tick={AXIS_TICK}
                tickLine={false}
                label={{
                  value: "%",
                  angle: -90,
                  position: "insideLeft",
                  style: { ...AXIS_TICK, fontSize: 9 },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                tick={AXIS_TICK}
                tickLine={false}
                label={{
                  value: "%",
                  angle: 90,
                  position: "insideRight",
                  style: { ...AXIS_TICK, fontSize: 9 },
                }}
              />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                labelStyle={{ color: "oklch(0.7 0 0)" }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="cpu"
                stroke="#06b6d4"
                strokeWidth={1.5}
                dot={false}
                name="CPU %"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="memory"
                stroke="#f59e0b"
                strokeWidth={1.5}
                dot={false}
                name="Memory %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Active Processes bars + I/O line (ComposedChart) */}
        <div
          className="bg-card border border-border rounded p-4"
          data-ocid="dashboard.io_chart"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold font-display">
              Active Processes &amp; I/O Bandwidth
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              last 30s
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart
              data={chartData}
              margin={{ top: 4, right: 32, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={GRID_STYLE.stroke}
                strokeOpacity={GRID_STYLE.strokeOpacity}
              />
              <XAxis dataKey="time" tick={AXIS_TICK} tickLine={false} />
              <YAxis
                yAxisId="left"
                tick={AXIS_TICK}
                tickLine={false}
                label={{
                  value: "procs",
                  angle: -90,
                  position: "insideLeft",
                  style: { ...AXIS_TICK, fontSize: 9 },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={AXIS_TICK}
                tickLine={false}
                label={{
                  value: "MB/s",
                  angle: 90,
                  position: "insideRight",
                  style: { ...AXIS_TICK, fontSize: 9 },
                }}
              />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                labelStyle={{ color: "oklch(0.7 0 0)" }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                }}
              />
              <Bar
                yAxisId="left"
                dataKey="processes"
                name="Active Processes"
                radius={[2, 2, 0, 0]}
                maxBarSize={18}
              >
                {chartData.map((point) => (
                  <Cell
                    key={`cell-${point.time}`}
                    fill="#3b82f6"
                    fillOpacity={0.75}
                  />
                ))}
              </Bar>
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="io"
                stroke="#22c55e"
                strokeWidth={1.5}
                dot={false}
                name="I/O MB/s"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Gantt + Decision Log ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gantt Chart */}
        <div
          className="bg-card border border-border rounded p-4"
          data-ocid="dashboard.gantt_section"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold font-display">
              Process Execution Timeline
            </span>
            <div className="flex items-center gap-3">
              {(Object.entries(POLICY_LABELS) as [PolicyType, string][]).map(
                ([key, label]) => (
                  <div key={key} className="flex items-center gap-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: POLICY_COLORS[key] }}
                    />
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
          <GanttChart entries={ganttEntries.slice(-10 * 8)} />
        </div>

        {/* Decision Log Table */}
        <div
          className="bg-card border border-border rounded p-4 flex flex-col"
          data-ocid="dashboard.decision_log"
        >
          <div className="flex items-center justify-between mb-3 shrink-0">
            <span className="text-sm font-semibold font-display">
              Scheduling Decision Log
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handlePolicyOverride}
              data-ocid="dashboard.accept_override_button"
              className={`text-[11px] h-7 px-2.5 ${policyOverride ? "border-amber-500/50 text-amber-400" : ""}`}
            >
              {policyOverride ? "Release Override" : "Accept Override"}
            </Button>
          </div>

          {/* Table with sticky header */}
          <div className="overflow-auto flex-1 max-h-64 rounded border border-border/50">
            <table className="w-full text-[11px] font-mono border-collapse min-w-[480px]">
              <thead className="sticky top-0 z-10 bg-muted/80 backdrop-blur-sm">
                <tr>
                  <th className="text-left py-2 px-2 text-muted-foreground font-medium border-b border-border/60">
                    Time
                  </th>
                  <th className="text-left py-2 px-2 text-muted-foreground font-medium border-b border-border/60">
                    Policy
                  </th>
                  <th className="text-right py-2 px-2 text-muted-foreground font-medium border-b border-border/60">
                    Conf %
                  </th>
                  <th className="text-right py-2 px-2 text-muted-foreground font-medium border-b border-border/60">
                    CPU avg
                  </th>
                  <th className="text-right py-2 px-2 text-muted-foreground font-medium border-b border-border/60">
                    Mem avg
                  </th>
                  <th className="text-left py-2 px-2 text-muted-foreground font-medium border-b border-border/60 hidden md:table-cell">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {decisionLog.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                      data-ocid="dashboard.log_empty_state"
                    >
                      No decisions logged yet.
                    </td>
                  </tr>
                ) : (
                  decisionLog.map((entry, idx) => (
                    <tr
                      key={entry.ts}
                      className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                      data-ocid={`dashboard.log_item.${idx + 1}`}
                    >
                      <td className="py-1.5 px-2 text-muted-foreground whitespace-nowrap">
                        {new Date(entry.ts).toLocaleTimeString()}
                      </td>
                      <td className="py-1.5 px-2">
                        <span
                          className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-semibold"
                          style={{
                            color: POLICY_COLORS[entry.policy],
                            background: `${POLICY_COLORS[entry.policy]}1a`,
                            border: `1px solid ${POLICY_COLORS[entry.policy]}44`,
                          }}
                        >
                          {POLICY_LABELS[entry.policy]}
                        </span>
                      </td>
                      <td
                        className={`py-1.5 px-2 text-right tabular-nums ${
                          entry.confidence >= 75
                            ? "text-green-400"
                            : entry.confidence >= 65
                              ? "text-amber-400"
                              : "text-red-400"
                        }`}
                      >
                        {entry.confidence.toFixed(1)}%
                      </td>
                      <td className="py-1.5 px-2 text-right text-foreground/70 tabular-nums">
                        {entry.cpu_avg.toFixed(1)}%
                      </td>
                      <td className="py-1.5 px-2 text-right text-foreground/70 tabular-nums">
                        {entry.mem_avg.toFixed(1)}%
                      </td>
                      <td className="py-1.5 px-2 text-muted-foreground truncate max-w-[180px] hidden md:table-cell">
                        {entry.reason.length > 60
                          ? `${entry.reason.slice(0, 57)}…`
                          : entry.reason}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
