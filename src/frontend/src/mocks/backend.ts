import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  clearData: async () => undefined,
  getLogs: async (_page: bigint, _pageSize: bigint) => ({
    page_size: BigInt(10),
    total: BigInt(3),
    logs: [
      {
        log_id: BigInt(1),
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        cpu_usage: 87.4,
        memory_usage: 72.1,
        io_bandwidth: 340.5,
        active_processes: BigInt(42),
        selected_policy: "priority",
        decision_confidence: 0.91,
      },
      {
        log_id: BigInt(2),
        timestamp: BigInt(Date.now() - 30000) * BigInt(1_000_000),
        cpu_usage: 64.2,
        memory_usage: 68.3,
        io_bandwidth: 210.0,
        active_processes: BigInt(28),
        selected_policy: "sjf",
        decision_confidence: 0.76,
      },
      {
        log_id: BigInt(3),
        timestamp: BigInt(Date.now() - 60000) * BigInt(1_000_000),
        cpu_usage: 91.5,
        memory_usage: 85.7,
        io_bandwidth: 420.8,
        active_processes: BigInt(61),
        selected_policy: "round_robin",
        decision_confidence: 0.55,
      },
    ],
    page: BigInt(1),
  }),
  getMetrics: async () => ({
    active_processes: BigInt(47),
    cpu_usage: 89.3,
    io_bandwidth: 372.6,
    timestamp: BigInt(Date.now()) * BigInt(1_000_000),
    memory_usage: 78.5,
  }),
  getProcesses: async () => [
    {
      pid: "proc-001",
      status: "running",
      name: "data-ingestion",
      burst_time: 12.5,
      priority: BigInt(8),
      arrival_time: BigInt(Date.now() - 5000) * BigInt(1_000_000),
    },
    {
      pid: "proc-002",
      status: "waiting",
      name: "ml-inference",
      burst_time: 4.2,
      priority: BigInt(9),
      arrival_time: BigInt(Date.now() - 3000) * BigInt(1_000_000),
    },
    {
      pid: "proc-003",
      status: "completed",
      name: "log-aggregator",
      burst_time: 2.1,
      priority: BigInt(5),
      arrival_time: BigInt(Date.now() - 10000) * BigInt(1_000_000),
    },
    {
      pid: "proc-004",
      status: "running",
      name: "metric-reporter",
      burst_time: 7.8,
      priority: BigInt(7),
      arrival_time: BigInt(Date.now() - 1000) * BigInt(1_000_000),
    },
  ],
  getResults: async () => ({
    total_completed: BigInt(1482),
    throughput_tasks_per_sec: 201.4,
    avg_turnaround_time: 18.7,
    avg_waiting_time: 19.3,
  }),
  getSchedulingDecision: async () => ({
    reasoning:
      "High CPU utilization with mixed burst times favors priority scheduling. Process arrival rate is moderate.",
    confidence: 0.88,
    override_active: false,
    features_used: [
      "cpu_rolling_avg_5m",
      "memory_rolling_avg_5m",
      "process_arrival_rate",
      "time_of_day_encoding",
    ],
    policy: "priority",
  }),
  overridePolicy: async (_policy: string) => undefined,
  startSimulation: async (_processCount: bigint) => undefined,
  submitMetrics: async (
    _cpu: number,
    _memory: number,
    _activeProcesses: bigint,
    _ioBandwidth: number
  ) => undefined,
  submitProcess: async (
    pid: string,
    _name: string,
    _priority: bigint,
    _burstTime: number,
    _arrivalTime: bigint
  ) => ({
    message: "Process submitted successfully",
    success: true,
    process_id: pid,
  }),
  submitSchedulingResult: async (
    _pid: string,
    _waitingTime: number,
    _turnaroundTime: number,
    _completionTime: bigint,
    _policyApplied: string
  ) => undefined,
};
