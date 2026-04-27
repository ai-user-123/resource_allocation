export type PolicyType = "round_robin" | "sjf" | "priority";

export type ProcessStatus = "queued" | "running" | "completed" | "waiting";

export type AlertSeverity = "ok" | "warning" | "critical";

export interface Process {
  pid: number;
  name: string;
  priority: number;
  burst_time: number;
  arrival_time: number;
  remaining_time: number;
  status: ProcessStatus;
  start_time?: number;
  completion_time?: number;
}

export interface ResourceLog {
  log_id: number;
  timestamp: number;
  cpu_usage: number;
  memory_usage: number;
  active_processes: number;
  selected_policy: PolicyType;
  io_bandwidth?: number;
}

export interface SchedulingDecision {
  policy: PolicyType;
  confidence: number;
  reasoning: string;
  features_used: string[];
  timestamp: number;
  is_override: boolean;
}

export interface SchedulingResult {
  result_id: number;
  pid: number;
  waiting_time: number;
  turnaround_time: number;
  completion_time: number;
}

export interface AggregatedStats {
  cpu_utilization: number;
  avg_waiting_time: number;
  throughput: number;
  memory_efficiency: number;
  decision_latency: number;
  total_processes: number;
  completed_processes: number;
}

export interface MetricsSnapshot {
  cpu_usage: number;
  memory_usage: number;
  active_processes: number;
  io_bandwidth: number;
  timestamp: number;
  selected_policy: PolicyType;
  stats: AggregatedStats;
}

export interface PaginatedLogs {
  logs: ResourceLog[];
  total: number;
  page: number;
  page_size: number;
}

export interface SimulationConfig {
  process_count: number;
  lambda: number;
  mu_burst: number;
  sigma_burst: number;
  duration_ms: number;
}

export interface AlertBadge {
  metric: string;
  value: number;
  threshold: number;
  severity: AlertSeverity;
  message: string;
}

export interface MLFeatures {
  cpu_avg: number;
  mem_avg: number;
  arrival_rate: number;
  arrival_rate_derivative: number;
  tod_sin: number;
  tod_cos: number;
  cpu_burst_ratio: number;
}

export interface GanttEntry {
  pid: number;
  name: string;
  start_time: number;
  end_time: number;
  policy: PolicyType;
}

export interface PerformanceTarget {
  metric: string;
  label: string;
  target: number;
  unit: string;
  comparison: "gte" | "lte";
}

export const PERFORMANCE_TARGETS: PerformanceTarget[] = [
  {
    metric: "cpu_utilization",
    label: "CPU Utilization",
    target: 89,
    unit: "%",
    comparison: "gte",
  },
  {
    metric: "avg_waiting_time",
    label: "Avg Waiting Time",
    target: 21,
    unit: "ms",
    comparison: "lte",
  },
  {
    metric: "throughput",
    label: "Throughput",
    target: 198,
    unit: "tasks/s",
    comparison: "gte",
  },
  {
    metric: "memory_efficiency",
    label: "Memory Efficiency",
    target: 88,
    unit: "%",
    comparison: "gte",
  },
  {
    metric: "decision_latency",
    label: "Decision Latency",
    target: 3,
    unit: "ms",
    comparison: "lte",
  },
];
