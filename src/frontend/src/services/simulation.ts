import type { GanttEntry, PolicyType, Process, ResourceLog } from "../types";
import {
  addProcessesToStore,
  getProcessStore,
  updateProcessStore,
} from "./api";
import { createScheduler } from "./scheduler";

function poissonRandom(lambda: number): number {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

function logNormalRandom(mu: number, sigma: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return Math.exp(mu + sigma * z);
}

export function generatePoissonProcess(
  lambda: number,
  currentTime: number,
): Process {
  const arrivalOffset = poissonRandom(lambda) * 100;
  const burstTime = Math.max(1, Math.round(logNormalRandom(2.5, 0.8)));
  const priority = Math.floor(1 + Math.random() * 10);

  return {
    pid: Date.now() + Math.floor(Math.random() * 10000),
    name: `P-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    priority,
    burst_time: burstTime,
    arrival_time: currentTime + arrivalOffset,
    remaining_time: burstTime,
    status: "queued",
  };
}

export function generateLogNormalBurstTime(mu = 2.5, sigma = 0.8): number {
  return Math.max(1, Math.round(logNormalRandom(mu, sigma)));
}

export interface SimulationTick {
  processes: Process[];
  ganttEntries: GanttEntry[];
  logs: ResourceLog[];
  policy: PolicyType;
  throughput: number;
}

export type SimulationStatus = "idle" | "running" | "stopped";

type TickCallback = (tick: SimulationTick) => void;

export class SimulationEngine {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private tickCount = 0;
  private ganttEntries: GanttEntry[] = [];
  private recentLogs: ResourceLog[] = [];
  private targetCount = 100;
  private onTick: TickCallback | null = null;
  status: SimulationStatus = "idle";

  constructor(onTick?: TickCallback) {
    this.onTick = onTick || null;
  }

  start(count: number): void {
    if (this.intervalId) this.stop();
    this.targetCount = count;
    this.tickCount = 0;
    this.ganttEntries = [];
    this.recentLogs = [];
    this.status = "running";

    // Seed initial processes
    const initialProcesses = Array.from({ length: Math.min(20, count) }, () =>
      generatePoissonProcess(5, Date.now()),
    );
    addProcessesToStore(initialProcesses);

    this.intervalId = setInterval(() => this.tick(), 500);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.status = "stopped";
  }

  clear(): void {
    this.stop();
    this.ganttEntries = [];
    this.recentLogs = [];
    this.tickCount = 0;
    this.status = "idle";
  }

  tick(): void {
    this.tickCount++;
    const now = Date.now();

    // Add new processes via Poisson arrival
    const newArrivalCount = poissonRandom(3);
    const currentCount = getProcessStore().length;

    if (currentCount < this.targetCount) {
      const newProcesses = Array.from(
        { length: Math.min(newArrivalCount, 5) },
        () => generatePoissonProcess(5, now),
      );
      if (newProcesses.length > 0) addProcessesToStore(newProcesses);
    }

    // Determine policy and run scheduler
    const policy: PolicyType =
      this.tickCount % 6 < 2
        ? "priority"
        : this.tickCount % 6 < 4
          ? "sjf"
          : "round_robin";

    const scheduler = createScheduler(policy);
    const currentQueue = getProcessStore();
    if (currentQueue.length > 0) {
      const updated = scheduler.schedule(currentQueue);
      updateProcessStore(updated);

      // Build Gantt entries from running processes
      const running = updated.filter((p) => p.status === "running");
      for (const p of running) {
        this.ganttEntries.push({
          pid: p.pid,
          name: p.name,
          start_time: now - 500,
          end_time: now,
          policy,
        });
      }
    }

    // Limit gantt history
    if (this.ganttEntries.length > 50) {
      this.ganttEntries = this.ganttEntries.slice(-50);
    }

    // Generate resource log
    const cpu = 40 + Math.random() * 50;
    const mem = 35 + Math.random() * 45;
    const logEntry: ResourceLog = {
      log_id: this.tickCount,
      timestamp: now,
      cpu_usage: cpu,
      memory_usage: mem,
      active_processes: getProcessStore().filter(
        (p) => p.status !== "completed",
      ).length,
      selected_policy: policy,
      io_bandwidth: 100 + Math.random() * 400,
    };
    this.recentLogs = [...this.recentLogs.slice(-29), logEntry];

    const completed = getProcessStore().filter(
      (p) => p.status === "completed",
    ).length;
    const throughput = completed / (this.tickCount * 0.5);

    if (this.onTick) {
      this.onTick({
        processes: getProcessStore(),
        ganttEntries: this.ganttEntries,
        logs: this.recentLogs,
        policy,
        throughput,
      });
    }

    // Auto-stop when target reached
    if (completed >= this.targetCount * 0.9) {
      this.stop();
    }
  }

  getGanttEntries(): GanttEntry[] {
    return this.ganttEntries;
  }

  getRecentLogs(): ResourceLog[] {
    return this.recentLogs;
  }
}
