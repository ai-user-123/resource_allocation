import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  RefreshCw,
  ScrollText,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AlertBadge } from "../components/AlertBadge";
import { useLogs } from "../hooks/useLogs";
import type { PolicyType, ResourceLog } from "../types";

const POLICY_COLORS: Record<PolicyType, string> = {
  round_robin: "bg-cyan-950/60 text-cyan-300 border-cyan-900/60",
  sjf: "bg-amber-950/60 text-amber-300 border-amber-900/60",
  priority: "bg-purple-950/60 text-purple-300 border-purple-900/60",
};

const POLICY_LABELS: Record<PolicyType, string> = {
  round_robin: "Round Robin",
  sjf: "SJF",
  priority: "Priority",
};

type TimeRange = "last_hour" | "last_6h" | "all";

const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  last_hour: "Last Hour",
  last_6h: "Last 6 Hours",
  all: "All Time",
};

const TIME_RANGE_MS: Record<TimeRange, number> = {
  last_hour: 60 * 60 * 1000,
  last_6h: 6 * 60 * 60 * 1000,
  all: Number.MAX_SAFE_INTEGER,
};

function formatBytes(mb: number): string {
  if (mb >= 1000) return `${(mb / 1000).toFixed(1)} GB/s`;
  return `${mb.toFixed(0)} MB/s`;
}

function cpuColor(v: number) {
  if (v >= 89) return "text-green-400";
  if (v >= 70) return "text-amber-400";
  return "text-red-400";
}

function memColor(v: number) {
  if (v >= 88) return "text-green-400";
  if (v >= 65) return "text-amber-400";
  return "text-red-400";
}

function mockConfidence(logId: number): number {
  // deterministic pseudo-random confidence from log id
  return 62 + ((logId * 7 + 13) % 37);
}

function exportLogsJson(logs: ResourceLog[]) {
  const blob = new Blob([JSON.stringify(logs, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `resource-logs-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

type PolicyFilterValue = PolicyType | "all";
const POLICY_FILTERS: PolicyFilterValue[] = [
  "all",
  "round_robin",
  "sjf",
  "priority",
];
const POLICY_FILTER_LABELS: Record<PolicyFilterValue, string> = {
  all: "All Policies",
  round_robin: "Round Robin",
  sjf: "SJF",
  priority: "Priority",
};

export default function LogsPage() {
  const { data, isLoading, page, totalPages, nextPage, prevPage, invalidate } =
    useLogs(1, 20);

  const [policyFilter, setPolicyFilter] = useState<PolicyFilterValue>("all");
  const [timeRange, setTimeRange] = useState<TimeRange>("all");

  const filteredLogs = useMemo(() => {
    if (!data?.logs) return [];
    const cutoff = Date.now() - TIME_RANGE_MS[timeRange];
    return data.logs.filter((log) => {
      const policyMatch =
        policyFilter === "all" || log.selected_policy === policyFilter;
      const timeMatch = log.timestamp >= cutoff;
      return policyMatch && timeMatch;
    });
  }, [data, policyFilter, timeRange]);

  return (
    <div className="p-5 space-y-5" data-ocid="logs.page">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <ScrollText className="w-4 h-4 text-accent" />
          <h2 className="text-base font-semibold font-display">
            Resource Log History
          </h2>
          {data && (
            <Badge variant="outline" className="font-mono text-[11px]">
              {data.total} records
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => data && exportLogsJson(filteredLogs)}
            disabled={!data || filteredLogs.length === 0}
            data-ocid="logs.export_button"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export JSON
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={invalidate}
            data-ocid="logs.refresh_button"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <div
        className="bg-card border border-border rounded p-3 flex flex-wrap items-center gap-4"
        data-ocid="logs.filters_panel"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
            Filters
          </span>
        </div>

        {/* Policy filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-muted-foreground">
            Policy:
          </span>
          <div className="flex gap-1" data-ocid="logs.policy_filter_group">
            {POLICY_FILTERS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPolicyFilter(p)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-smooth ${
                  policyFilter === p
                    ? "bg-accent/20 text-accent border-accent/40"
                    : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
                }`}
                data-ocid={`logs.policy_filter.${p}`}
              >
                {POLICY_FILTER_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        {/* Time range filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-muted-foreground">
            Time:
          </span>
          <div className="flex gap-1" data-ocid="logs.time_filter_group">
            {(["last_hour", "last_6h", "all"] as TimeRange[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeRange(t)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-smooth ${
                  timeRange === t
                    ? "bg-accent/20 text-accent border-accent/40"
                    : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
                }`}
                data-ocid={`logs.time_filter.${t}`}
              >
                {TIME_RANGE_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Active filter count */}
        {(policyFilter !== "all" || timeRange !== "all") && (
          <span className="ml-auto text-[11px] font-mono text-accent">
            {filteredLogs.length} matching
          </span>
        )}
      </div>

      {/* Log Table */}
      <div
        className="bg-card border border-border rounded overflow-hidden"
        data-ocid="logs.table"
      >
        {/* Header */}
        <div className="grid grid-cols-[160px_90px_90px_90px_110px_110px_90px] px-4 py-2.5 border-b border-border bg-muted/30">
          {[
            "Timestamp",
            "CPU %",
            "Memory %",
            "Processes",
            "I/O",
            "Policy",
            "Confidence",
          ].map((h) => (
            <span
              key={h}
              className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/40 max-h-[520px] overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 10 }, (_, i) => `log-row-${i}`).map((k) => (
              <div key={k} className="px-4 py-2.5">
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          ) : filteredLogs.length === 0 ? (
            <div
              className="px-4 py-12 text-center text-sm text-muted-foreground"
              data-ocid="logs.empty_state"
            >
              <ScrollText className="w-8 h-8 mx-auto mb-3 opacity-20" />
              <p>No logs match the current filters.</p>
              <p className="text-xs mt-1 text-muted-foreground/60">
                Try expanding the time range or changing the policy filter.
              </p>
            </div>
          ) : (
            filteredLogs.map((log, idx) => {
              const confidence = mockConfidence(log.log_id);
              return (
                <div
                  key={log.log_id}
                  className="grid grid-cols-[160px_90px_90px_90px_110px_110px_90px] px-4 py-2.5 hover:bg-muted/10 transition-smooth"
                  data-ocid={`logs.item.${idx + 1}`}
                >
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString("en", {
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                  <span
                    className={`font-mono text-sm font-semibold ${cpuColor(log.cpu_usage)}`}
                  >
                    {log.cpu_usage.toFixed(1)}%
                  </span>
                  <span
                    className={`font-mono text-sm font-semibold ${memColor(log.memory_usage)}`}
                  >
                    {log.memory_usage.toFixed(1)}%
                  </span>
                  <span className="font-mono text-sm text-foreground/80">
                    {log.active_processes}
                  </span>
                  <span className="font-mono text-sm text-foreground/60">
                    {log.io_bandwidth !== undefined
                      ? formatBytes(log.io_bandwidth)
                      : "—"}
                  </span>
                  <span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono ${POLICY_COLORS[log.selected_policy]}`}
                    >
                      {POLICY_LABELS[log.selected_policy]}
                    </Badge>
                  </span>
                  <span className="font-mono text-sm">
                    <span
                      className={
                        confidence >= 80
                          ? "text-green-400"
                          : confidence >= 65
                            ? "text-amber-400"
                            : "text-red-400"
                      }
                    >
                      {confidence}%
                    </span>
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {data && data.total > 20 && (
          <div className="px-4 py-2.5 border-t border-border bg-muted/20 flex items-center justify-between">
            <span className="text-[11px] font-mono text-muted-foreground">
              Page {page} of {totalPages} · {data.total} records total
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 px-2"
                onClick={prevPage}
                disabled={page === 1}
                data-ocid="logs.pagination_prev"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>
              <span className="text-[11px] font-mono text-muted-foreground px-1">
                {page} / {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 px-2"
                onClick={nextPage}
                disabled={page >= totalPages}
                data-ocid="logs.pagination_next"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-muted-foreground">
        <span className="text-muted-foreground/60 uppercase tracking-wider text-[10px]">
          Thresholds:
        </span>
        <span className="flex items-center gap-1.5">
          <AlertBadge severity="ok" label="≥ Target" />
        </span>
        <span className="flex items-center gap-1.5">
          <AlertBadge severity="warning" label="Near threshold" />
        </span>
        <span className="flex items-center gap-1.5">
          <AlertBadge severity="critical" label="Below threshold" />
        </span>
        <span className="ml-auto flex items-center gap-3">
          <span>CPU target ≥ 89%</span>
          <span>Memory target ≥ 88%</span>
          <span>Confidence: green ≥ 80%</span>
        </span>
      </div>
    </div>
  );
}
