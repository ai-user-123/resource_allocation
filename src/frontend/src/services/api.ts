import type {
  AggregatedStats,
  MetricsSnapshot,
  PaginatedLogs,
  PolicyType,
  Process,
  ResourceLog,
  SchedulingDecision,
} from "../types";

// In-memory store for the frontend-only simulation (no Motoko backend methods yet)
let processStore: Process[] = [];
let logStore: ResourceLog[] = [];
let currentPolicy: PolicyType = "round_robin";
let policyOverrideActive = false;
let logIdCounter = 1;

function generateInitialLogs(): ResourceLog[] {
  const now = Date.now();
  return Array.from({ length: 20 }, (_, i) => ({
    log_id: i + 1,
    timestamp: now - (19 - i) * 1000,
    cpu_usage: 20 + Math.random() * 60,
    memory_usage: 30 + Math.random() * 50,
    active_processes: Math.floor(5 + Math.random() * 30),
    selected_policy: (["round_robin", "sjf", "priority"] as PolicyType[])[
      Math.floor(Math.random() * 3)
    ],
    io_bandwidth: 50 + Math.random() * 200,
  }));
}

logStore = generateInitialLogs();
logIdCounter = logStore.length + 1;

export async function getMetrics(): Promise<MetricsSnapshot> {
  const cpu = 15 + Math.random() * 75;
  const mem = 25 + Math.random() * 65;
  const active = Math.floor(5 + Math.random() * 40);
  const io = 50 + Math.random() * 350;

  const log: ResourceLog = {
    log_id: logIdCounter++,
    timestamp: Date.now(),
    cpu_usage: cpu,
    memory_usage: mem,
    active_processes: active,
    selected_policy: currentPolicy,
    io_bandwidth: io,
  };
  logStore = [...logStore.slice(-99), log];

  const completed = processStore.filter((p) => p.status === "completed").length;
  const stats: AggregatedStats = {
    cpu_utilization: Math.min(99, cpu + Math.random() * 10),
    avg_waiting_time: 8 + Math.random() * 20,
    throughput: 150 + Math.random() * 100,
    memory_efficiency: Math.min(98, mem + Math.random() * 10),
    decision_latency: 0.5 + Math.random() * 2.5,
    total_processes: processStore.length,
    completed_processes: completed,
  };

  return {
    cpu_usage: cpu,
    memory_usage: mem,
    active_processes: active,
    io_bandwidth: io,
    timestamp: Date.now(),
    selected_policy: currentPolicy,
    stats,
  };
}

export async function submitProcess(
  process: Omit<Process, "remaining_time" | "status">,
): Promise<Process> {
  const newProcess: Process = {
    ...process,
    remaining_time: process.burst_time,
    status: "queued",
  };
  processStore = [...processStore, newProcess];
  return newProcess;
}

export async function getSchedulingDecision(): Promise<SchedulingDecision> {
  const recentLogs = logStore.slice(-5);
  const cpuAvg =
    recentLogs.reduce((s, l) => s + l.cpu_usage, 0) / (recentLogs.length || 1);
  const memAvg =
    recentLogs.reduce((s, l) => s + l.memory_usage, 0) /
    (recentLogs.length || 1);

  let policy: PolicyType;
  let confidence: number;
  let reasoning: string;

  if (policyOverrideActive) {
    policy = "round_robin";
    confidence = 100;
    reasoning = "Adaptive override active — throughput below 70% target";
  } else if (cpuAvg > 80 && processStore.length > 10) {
    policy = "priority";
    confidence = 78 + Math.random() * 15;
    reasoning = `High CPU load (${cpuAvg.toFixed(1)}%) with ${processStore.length} processes → Priority scheduling`;
  } else if (cpuAvg < 40 && memAvg < 50) {
    policy = "sjf";
    confidence = 72 + Math.random() * 18;
    reasoning = `Low load (CPU ${cpuAvg.toFixed(1)}%, Mem ${memAvg.toFixed(1)}%) → SJF optimal`;
  } else {
    policy = "round_robin";
    confidence = 65 + Math.random() * 20;
    reasoning = `Moderate load (CPU ${cpuAvg.toFixed(1)}%) → Round Robin for fairness`;
  }

  currentPolicy = policy;

  return {
    policy,
    confidence: Math.min(99, confidence),
    reasoning,
    features_used: ["cpu_avg", "mem_avg", "arrival_rate", "tod_sin", "tod_cos"],
    timestamp: Date.now(),
    is_override: policyOverrideActive,
  };
}

export async function getResults(): Promise<AggregatedStats> {
  const completed = processStore.filter((p) => p.status === "completed").length;
  return {
    cpu_utilization: 75 + Math.random() * 20,
    avg_waiting_time: 8 + Math.random() * 18,
    throughput: 160 + Math.random() * 80,
    memory_efficiency: 70 + Math.random() * 25,
    decision_latency: 0.4 + Math.random() * 2,
    total_processes: processStore.length,
    completed_processes: completed,
  };
}

export async function getLogs(page = 1, pageSize = 20): Promise<PaginatedLogs> {
  const sorted = [...logStore].sort((a, b) => b.timestamp - a.timestamp);
  const start = (page - 1) * pageSize;
  return {
    logs: sorted.slice(start, start + pageSize),
    total: sorted.length,
    page,
    page_size: pageSize,
  };
}

export async function overridePolicy(force: boolean): Promise<void> {
  policyOverrideActive = force;
  if (force) currentPolicy = "round_robin";
}

export async function clearData(): Promise<void> {
  processStore = [];
  logStore = generateInitialLogs();
  logIdCounter = logStore.length + 1;
  policyOverrideActive = false;
  currentPolicy = "round_robin";
}

export function getProcessStore(): Process[] {
  return processStore;
}

export function addProcessesToStore(processes: Process[]): void {
  processStore = [...processStore, ...processes];
}

export function updateProcessStore(updated: Process[]): void {
  processStore = updated;
}
