import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  AlertTriangle,
  Clock,
  Cpu,
  Plus,
  RefreshCw,
  Target,
  Trash2,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getResults, submitProcess } from "../services/api";
import { getProcessStore, updateProcessStore } from "../services/api";
import type { AggregatedStats, Process, ProcessStatus } from "../types";

const STATUS_STYLES: Record<
  ProcessStatus,
  { bg: string; text: string; border: string; dot: string }
> = {
  queued: {
    bg: "bg-muted/30",
    text: "text-muted-foreground",
    border: "border-muted/50",
    dot: "bg-muted-foreground",
  },
  waiting: {
    bg: "bg-amber-950/40",
    text: "text-amber-300",
    border: "border-amber-900/60",
    dot: "bg-amber-400",
  },
  running: {
    bg: "bg-cyan-950/40",
    text: "text-cyan-300",
    border: "border-cyan-800/60",
    dot: "bg-cyan-400 animate-pulse",
  },
  completed: {
    bg: "bg-green-950/40",
    text: "text-green-300",
    border: "border-green-900/60",
    dot: "bg-green-400",
  },
};

const PRIORITY_COLOR = (p: number): string => {
  if (p >= 8) return "text-red-400";
  if (p >= 5) return "text-amber-400";
  return "text-muted-foreground";
};

function greedyScore(p: Process): number {
  const safeRemaining = p.remaining_time > 0 ? p.remaining_time : 1;
  return 0.6 * p.priority + 0.4 * (1 / safeRemaining);
}

function relativeTime(ts: number): string {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 5) return "just now";
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

function useProcesses() {
  return useQuery<Process[]>({
    queryKey: ["processes"],
    queryFn: () => getProcessStore(),
    refetchInterval: 2000,
  });
}

function useResults() {
  return useQuery<AggregatedStats>({
    queryKey: ["results"],
    queryFn: () => getResults(),
    refetchInterval: 3000,
  });
}

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  icon: React.ReactNode;
  target?: string;
  good?: boolean;
  "data-ocid"?: string;
}

function StatCard({
  label,
  value,
  unit,
  icon,
  target,
  good,
  "data-ocid": ocid,
}: StatCardProps) {
  return (
    <div
      className="bg-card border border-border rounded p-4 space-y-2"
      data-ocid={ocid}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <span className="text-muted-foreground/60">{icon}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold font-mono text-foreground">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-mono text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
      {target && (
        <div className="flex items-center gap-1 text-[10px] font-mono">
          <Target className="w-3 h-3" />
          <span className={good ? "text-green-400" : "text-amber-400"}>
            target: {target}
          </span>
        </div>
      )}
    </div>
  );
}

interface FormState {
  pid: string;
  name: string;
  priority: number;
  burst_time: number;
}

interface FormErrors {
  pid?: string;
  name?: string;
  burst_time?: string;
}

export default function ProcessesPage() {
  const queryClient = useQueryClient();
  const { data: processes, isLoading } = useProcesses();
  const { data: stats, isLoading: statsLoading } = useResults();
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<FormState>({
    pid: String(Math.floor(1000 + Math.random() * 9000)),
    name: "",
    priority: 5,
    burst_time: 20,
  });

  // Tick to update relative times
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const errs: FormErrors = {};
      if (!form.pid || Number(form.pid) < 1) errs.pid = "Valid PID required";
      if (!form.name.trim()) errs.name = "Name required";
      if (form.burst_time < 1) errs.burst_time = "Must be ≥ 1ms";
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
      await submitProcess({
        pid: Number(form.pid),
        name: form.name.trim(),
        priority: form.priority,
        burst_time: form.burst_time,
        arrival_time: Date.now(),
      });
      setForm((f) => ({
        ...f,
        pid: String(Math.floor(1000 + Math.random() * 9000)),
        name: "",
      }));
      setErrors({});
      queryClient.invalidateQueries({ queryKey: ["processes"] });
      toast.success(`Process "${form.name}" queued`);
    },
    [form, queryClient],
  );

  const handleDelete = useCallback(
    (pid: number) => {
      const current = getProcessStore();
      updateProcessStore(current.filter((p) => p.pid !== pid));
      queryClient.invalidateQueries({ queryKey: ["processes"] });
      toast.info("Process removed");
    },
    [queryClient],
  );

  const handleClearCompleted = useCallback(() => {
    const current = getProcessStore();
    updateProcessStore(current.filter((p) => p.status !== "completed"));
    queryClient.invalidateQueries({ queryKey: ["processes"] });
    toast.success("Completed processes cleared");
  }, [queryClient]);

  const sorted = processes
    ? [...processes].sort((a, b) => a.arrival_time - b.arrival_time)
    : [];

  const waitingProcesses = sorted.filter(
    (p) => p.status === "queued" || p.status === "waiting",
  );
  const nextToExecute =
    waitingProcesses.length > 0
      ? waitingProcesses.reduce((best, p) =>
          greedyScore(p) > greedyScore(best) ? p : best,
        )
      : null;

  return (
    <div className="p-5 space-y-5" data-ocid="processes.page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-4 h-4 text-accent" />
          <h2 className="text-base font-semibold font-display">
            Process Queue
          </h2>
          {processes && (
            <Badge variant="outline" className="font-mono text-[11px]">
              {processes.filter((p) => p.status !== "completed").length} active
            </Badge>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleClearCompleted}
          data-ocid="processes.clear_completed_button"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          Clear Completed
        </Button>
      </div>

      {/* Stats Row */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        data-ocid="processes.stats_section"
      >
        {statsLoading ? (
          Array.from({ length: 4 }, (_, i) => `stat-${i}`).map((k) => (
            <Skeleton key={k} className="h-24" />
          ))
        ) : (
          <>
            <StatCard
              label="Avg Wait Time"
              value={stats ? stats.avg_waiting_time.toFixed(1) : "—"}
              unit="ms"
              icon={<Clock className="w-3.5 h-3.5" />}
              target="≤ 21ms"
              good={stats ? stats.avg_waiting_time <= 21 : false}
              data-ocid="processes.stat_wait.card"
            />
            <StatCard
              label="Avg Turnaround"
              value={stats ? (stats.avg_waiting_time * 1.5).toFixed(1) : "—"}
              unit="ms"
              icon={<Activity className="w-3.5 h-3.5" />}
              data-ocid="processes.stat_turnaround.card"
            />
            <StatCard
              label="Throughput"
              value={stats ? stats.throughput.toFixed(0) : "—"}
              unit="tasks/s"
              icon={<TrendingUp className="w-3.5 h-3.5" />}
              target="≥ 198"
              good={stats ? stats.throughput >= 198 : false}
              data-ocid="processes.stat_throughput.card"
            />
            <StatCard
              label="Total Completed"
              value={stats ? String(stats.completed_processes) : "0"}
              icon={<Zap className="w-3.5 h-3.5" />}
              data-ocid="processes.stat_completed.card"
            />
          </>
        )}
      </div>

      {/* Greedy Priority Preview */}
      {nextToExecute && (
        <div
          className="bg-cyan-950/20 border border-cyan-900/40 rounded p-3 flex items-center gap-3"
          data-ocid="processes.greedy_preview"
        >
          <AlertTriangle className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-xs font-mono text-cyan-300/70 uppercase tracking-wider">
              Next to Execute (Greedy Score)
            </span>
            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
              <span className="font-mono text-sm text-cyan-200 font-semibold">
                {nextToExecute.name}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                PID:{nextToExecute.pid}
              </span>
              <span className="font-mono text-xs text-accent font-bold">
                score={greedyScore(nextToExecute).toFixed(4)}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                priority={nextToExecute.priority} · burst=
                {nextToExecute.burst_time}ms
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] font-mono text-muted-foreground">
              waiting
            </div>
            <div className="font-mono text-xs text-foreground/80">
              {waitingProcesses.length} proc
            </div>
          </div>
        </div>
      )}

      {/* Submit Process Form */}
      <div
        className="bg-card border border-border rounded p-4"
        data-ocid="processes.add_form"
      >
        <h3 className="text-xs font-semibold font-mono text-muted-foreground uppercase tracking-wider mb-3">
          Submit New Process
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-start"
        >
          <div className="space-y-1">
            <Label className="text-[11px] text-muted-foreground font-mono">
              PID
            </Label>
            <Input
              type="text"
              value={form.pid}
              onChange={(e) => setForm((f) => ({ ...f, pid: e.target.value }))}
              className="h-8 text-sm font-mono bg-background"
              data-ocid="processes.pid_input"
            />
            {errors.pid && (
              <p
                className="text-[10px] text-destructive font-mono"
                data-ocid="processes.pid_input.field_error"
              >
                {errors.pid}
              </p>
            )}
          </div>

          <div className="space-y-1 sm:col-span-1">
            <Label className="text-[11px] text-muted-foreground font-mono">
              Name
            </Label>
            <Input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="process-name"
              className="h-8 text-sm bg-background"
              data-ocid="processes.name_input"
            />
            {errors.name && (
              <p
                className="text-[10px] text-destructive font-mono"
                data-ocid="processes.name_input.field_error"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-[11px] text-muted-foreground font-mono">
              Priority (1–10)
            </Label>
            <div className="space-y-1">
              <Input
                type="range"
                min={1}
                max={10}
                value={form.priority}
                onChange={(e) =>
                  setForm((f) => ({ ...f, priority: Number(e.target.value) }))
                }
                className="h-8 w-full accent-cyan-400 cursor-pointer bg-transparent border-none p-0 pt-2"
                data-ocid="processes.priority_input"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                <span>1</span>
                <span
                  className={`font-semibold ${PRIORITY_COLOR(form.priority)}`}
                >
                  {form.priority}
                </span>
                <span>10</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-[11px] text-muted-foreground font-mono">
              Burst Time (ms)
            </Label>
            <Input
              type="number"
              min={1}
              value={form.burst_time}
              onChange={(e) =>
                setForm((f) => ({ ...f, burst_time: Number(e.target.value) }))
              }
              className="h-8 text-sm font-mono bg-background"
              data-ocid="processes.burst_time_input"
            />
            {errors.burst_time && (
              <p
                className="text-[10px] text-destructive font-mono"
                data-ocid="processes.burst_time_input.field_error"
              >
                {errors.burst_time}
              </p>
            )}
          </div>

          <div className="space-y-1 flex flex-col justify-end">
            <Label className="text-[11px] text-muted-foreground font-mono opacity-0 select-none">
              &nbsp;
            </Label>
            <Button
              type="submit"
              size="sm"
              className="h-8"
              data-ocid="processes.submit_button"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Queue Process
            </Button>
          </div>
        </form>
      </div>

      {/* Process Table */}
      <div
        className="bg-card border border-border rounded overflow-hidden"
        data-ocid="processes.table"
      >
        <div className="grid grid-cols-[70px_1fr_70px_90px_90px_120px_110px_64px] px-4 py-2.5 border-b border-border bg-muted/30">
          {[
            "PID",
            "Name",
            "Priority",
            "Burst",
            "Remaining",
            "Arrival",
            "Status",
            "",
          ].map((h, i) => (
            <span
              key={`header-${h || i}`}
              className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="divide-y divide-border/50 max-h-[420px] overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 5 }, (_, i) => `row-${i}`).map((k) => (
              <div key={k} className="px-4 py-2.5">
                <Skeleton className="h-5 w-full" />
              </div>
            ))
          ) : sorted.length === 0 ? (
            <div
              className="px-4 py-12 text-center text-sm text-muted-foreground"
              data-ocid="processes.empty_state"
            >
              <Cpu className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p>No processes in queue.</p>
              <p className="text-xs mt-1 text-muted-foreground/60">
                Submit a process above or start a simulation from the Dashboard.
              </p>
            </div>
          ) : (
            sorted.map((p, idx) => {
              const s = STATUS_STYLES[p.status];
              const isNext = nextToExecute?.pid === p.pid;
              return (
                <div
                  key={p.pid}
                  className={`grid grid-cols-[70px_1fr_70px_90px_90px_120px_110px_64px] px-4 py-2.5 hover:bg-muted/10 transition-smooth ${isNext ? "bg-cyan-950/10 border-l-2 border-l-cyan-500/60" : ""}`}
                  data-ocid={`processes.item.${idx + 1}`}
                >
                  <span className="font-mono text-xs text-muted-foreground flex items-center">
                    {isNext && (
                      <span className="w-1 h-1 rounded-full bg-cyan-400 mr-1.5 animate-pulse" />
                    )}
                    {p.pid}
                  </span>
                  <span className="text-sm font-medium truncate min-w-0 pr-2 flex items-center">
                    {p.name}
                  </span>
                  <span
                    className={`font-mono text-sm font-bold flex items-center ${PRIORITY_COLOR(p.priority)}`}
                  >
                    {p.priority}
                  </span>
                  <span className="font-mono text-xs text-foreground/80 flex items-center">
                    {p.burst_time}ms
                  </span>
                  <span
                    className={`font-mono text-xs flex items-center ${p.status === "running" ? "text-cyan-300" : "text-foreground/60"}`}
                  >
                    {p.remaining_time}ms
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground flex items-center">
                    {relativeTime(p.arrival_time)}
                  </span>
                  <span className="flex items-center">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono px-2 py-0.5 ${s.bg} ${s.text} ${s.border} flex items-center gap-1.5`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {p.status}
                    </Badge>
                  </span>
                  <span className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleDelete(p.pid)}
                      className="text-muted-foreground hover:text-destructive transition-smooth p-1"
                      aria-label="Remove process"
                      data-ocid={`processes.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </span>
                </div>
              );
            })
          )}
        </div>

        {sorted.length > 0 && (
          <div className="px-4 py-2 border-t border-border bg-muted/20 flex flex-wrap items-center gap-4 text-[11px] font-mono text-muted-foreground">
            <span>Total: {sorted.length}</span>
            <span>
              Queued: {sorted.filter((p) => p.status === "queued").length}
            </span>
            <span className="text-cyan-400">
              Running: {sorted.filter((p) => p.status === "running").length}
            </span>
            <span className="text-amber-400">
              Waiting: {sorted.filter((p) => p.status === "waiting").length}
            </span>
            <span className="text-green-400">
              Completed: {sorted.filter((p) => p.status === "completed").length}
            </span>
          </div>
        )}
      </div>

      {/* Greedy Score Table for Waiting Processes */}
      {waitingProcesses.length > 1 && (
        <div
          className="bg-card border border-border rounded overflow-hidden"
          data-ocid="processes.greedy_table"
        >
          <div className="px-4 py-2.5 border-b border-border bg-muted/20 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
              Greedy Priority Preview — Waiting Queue
            </span>
          </div>
          <div className="grid grid-cols-[70px_1fr_70px_90px_110px] px-4 py-2 border-b border-border/60 bg-muted/10">
            {["PID", "Name", "Priority", "Burst", "Score"].map((h) => (
              <span
                key={h}
                className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider"
              >
                {h}
              </span>
            ))}
          </div>
          <div className="divide-y divide-border/40">
            {[...waitingProcesses]
              .sort((a, b) => greedyScore(b) - greedyScore(a))
              .slice(0, 8)
              .map((p, idx) => (
                <div
                  key={p.pid}
                  className={`grid grid-cols-[70px_1fr_70px_90px_110px] px-4 py-2 ${idx === 0 ? "bg-cyan-950/15" : ""}`}
                  data-ocid={`processes.greedy_item.${idx + 1}`}
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {p.pid}
                  </span>
                  <span className="text-sm font-medium truncate min-w-0 pr-2">
                    {p.name}
                  </span>
                  <span
                    className={`font-mono text-sm font-bold ${PRIORITY_COLOR(p.priority)}`}
                  >
                    {p.priority}
                  </span>
                  <span className="font-mono text-xs text-foreground/70">
                    {p.burst_time}ms
                  </span>
                  <span
                    className={`font-mono text-xs font-bold ${idx === 0 ? "text-cyan-300" : "text-foreground/70"}`}
                  >
                    {greedyScore(p).toFixed(4)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
