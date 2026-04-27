import type { PolicyType, Process } from "../types";

export interface BaseScheduler {
  policy: PolicyType;
  schedule(queue: Process[]): Process[];
}

export function greedyScore(process: Process): number {
  const remaining = Math.max(process.remaining_time, 0.001);
  return 0.6 * process.priority + 0.4 * (1 / remaining);
}

export function greedySort(queue: Process[]): Process[] {
  return [...queue].sort((a, b) => {
    const scoreDiff = greedyScore(b) - greedyScore(a);
    if (Math.abs(scoreDiff) < 0.0001) return a.arrival_time - b.arrival_time;
    return scoreDiff;
  });
}

export function resolvedPriority(
  greedyScoreVal: number,
  mlImpactScore: number,
): number {
  return 0.7 * greedyScoreVal + 0.3 * mlImpactScore;
}

export class RoundRobinScheduler implements BaseScheduler {
  policy: PolicyType = "round_robin";
  private quantum: number;

  constructor(quantum = 10) {
    this.quantum = quantum;
  }

  schedule(queue: Process[]): Process[] {
    const active = queue.filter((p) => p.status !== "completed");
    const completed = queue.filter((p) => p.status === "completed");

    const processed = active.map((p) => ({
      ...p,
      remaining_time: Math.max(0, p.remaining_time - this.quantum),
      status:
        p.remaining_time <= this.quantum
          ? ("completed" as const)
          : ("running" as const),
    }));

    return [...processed, ...completed];
  }
}

export class SJFScheduler implements BaseScheduler {
  policy: PolicyType = "sjf";

  schedule(queue: Process[]): Process[] {
    const active = queue
      .filter((p) => p.status !== "completed")
      .sort((a, b) => a.burst_time - b.burst_time);
    const completed = queue.filter((p) => p.status === "completed");

    const processed = active.map((p, idx) => ({
      ...p,
      status: idx === 0 ? ("running" as const) : ("waiting" as const),
      remaining_time:
        idx === 0
          ? Math.max(0, p.remaining_time - p.burst_time)
          : p.remaining_time,
    }));

    return [
      ...processed.map((p) => ({
        ...p,
        status: p.remaining_time <= 0 ? ("completed" as const) : p.status,
      })),
      ...completed,
    ];
  }
}

export class PriorityScheduler implements BaseScheduler {
  policy: PolicyType = "priority";

  schedule(queue: Process[]): Process[] {
    const active = greedySort(queue.filter((p) => p.status !== "completed"));
    const completed = queue.filter((p) => p.status === "completed");
    const quantum = 15;

    const processed = active.map((p, idx) => {
      if (idx === 0) {
        const remaining = Math.max(0, p.remaining_time - quantum);
        return {
          ...p,
          remaining_time: remaining,
          status:
            remaining <= 0 ? ("completed" as const) : ("running" as const),
        };
      }
      return { ...p, status: "waiting" as const };
    });

    return [...processed, ...completed];
  }
}

export function createScheduler(policy: PolicyType): BaseScheduler {
  switch (policy) {
    case "round_robin":
      return new RoundRobinScheduler();
    case "sjf":
      return new SJFScheduler();
    case "priority":
      return new PriorityScheduler();
  }
}
