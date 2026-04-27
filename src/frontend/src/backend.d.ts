import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ProcessId = string;
export interface PaginatedLogs {
    page_size: bigint;
    total: bigint;
    logs: Array<ResourceLog>;
    page: bigint;
}
export type Timestamp = bigint;
export interface MetricsSnapshot {
    active_processes: bigint;
    cpu_usage: number;
    io_bandwidth: number;
    timestamp: Timestamp;
    memory_usage: number;
}
export interface ResourceLog {
    selected_policy: string;
    active_processes: bigint;
    cpu_usage: number;
    io_bandwidth: number;
    log_id: bigint;
    decision_confidence: number;
    timestamp: Timestamp;
    memory_usage: number;
}
export interface AggregatedStats {
    total_completed: bigint;
    throughput_tasks_per_sec: number;
    avg_turnaround_time: number;
    avg_waiting_time: number;
}
export interface SubmitProcessReceipt {
    message: string;
    success: boolean;
    process_id: ProcessId;
}
export interface Process {
    pid: ProcessId;
    status: string;
    name: string;
    burst_time: number;
    priority: bigint;
    arrival_time: Timestamp;
}
export interface SchedulingDecision {
    reasoning: string;
    confidence: number;
    override_active: boolean;
    features_used: Array<string>;
    policy: string;
}
export interface backendInterface {
    clearData(): Promise<void>;
    getLogs(page: bigint, page_size: bigint): Promise<PaginatedLogs>;
    getMetrics(): Promise<MetricsSnapshot>;
    getProcesses(): Promise<Array<Process>>;
    getResults(): Promise<AggregatedStats>;
    getSchedulingDecision(): Promise<SchedulingDecision>;
    overridePolicy(policy: string): Promise<void>;
    startSimulation(processCount: bigint): Promise<void>;
    submitMetrics(cpu: number, memory: number, active_processes: bigint, io_bandwidth: number): Promise<void>;
    submitProcess(pid: ProcessId, name: string, priority: bigint, burst_time: number, arrival_time: Timestamp): Promise<SubmitProcessReceipt>;
    submitSchedulingResult(pid: ProcessId, waiting_time: number, turnaround_time: number, completion_time: Timestamp, policy_applied: string): Promise<void>;
}
