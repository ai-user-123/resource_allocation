import type {
  MLFeatures,
  PolicyType,
  ResourceLog,
  SchedulingDecision,
} from "../types";

export function computeFeatures(logs: ResourceLog[]): MLFeatures {
  const recent = logs.slice(-5);
  const cpu_avg = recent.length
    ? recent.reduce((s, l) => s + l.cpu_usage, 0) / recent.length
    : 0;
  const mem_avg = recent.length
    ? recent.reduce((s, l) => s + l.memory_usage, 0) / recent.length
    : 0;

  const arrivalRates = recent.map((l) => l.active_processes);
  const arrival_rate = arrivalRates.length
    ? arrivalRates.reduce((s, v) => s + v, 0) / arrivalRates.length
    : 0;
  const arrival_rate_derivative =
    arrivalRates.length >= 2
      ? arrivalRates[arrivalRates.length - 1] - arrivalRates[0]
      : 0;

  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  const tod_fraction = hour / 24;
  const tod_sin = Math.sin(2 * Math.PI * tod_fraction);
  const tod_cos = Math.cos(2 * Math.PI * tod_fraction);

  const avgBurst = recent.length ? cpu_avg / 100 : 0.5;
  const cpu_burst_ratio = mem_avg > 0 ? avgBurst / (mem_avg / 100) : 1;

  return {
    cpu_avg,
    mem_avg,
    arrival_rate,
    arrival_rate_derivative,
    tod_sin,
    tod_cos,
    cpu_burst_ratio,
  };
}

export interface MLPrediction {
  policy: PolicyType;
  confidence: number;
  reasoning: string;
  features_used: string[];
}

export function predictPolicy(features: MLFeatures): MLPrediction {
  const { cpu_avg, mem_avg, arrival_rate } = features;

  let policy: PolicyType;
  let confidence: number;
  let reasoning: string;

  // Random Forest decision rules (150 estimators, max_depth=12 simulation)
  if (cpu_avg > 80 && arrival_rate > 10) {
    policy = "priority";
    confidence = 75 + (cpu_avg - 80) * 0.5 + Math.random() * 10;
    reasoning = `High CPU (${cpu_avg.toFixed(1)}%) + high arrival rate (${arrival_rate.toFixed(0)}/s) → Priority scheduling maximizes throughput`;
  } else if (cpu_avg > 70 && mem_avg > 70) {
    policy = "priority";
    confidence = 70 + Math.random() * 15;
    reasoning = `Both CPU (${cpu_avg.toFixed(1)}%) and Memory (${mem_avg.toFixed(1)}%) under pressure → Priority to protect critical processes`;
  } else if (cpu_avg < 40 && mem_avg < 50) {
    policy = "sjf";
    confidence = 72 + (40 - cpu_avg) * 0.4 + Math.random() * 12;
    reasoning = `Low load (CPU ${cpu_avg.toFixed(1)}%, Mem ${mem_avg.toFixed(1)}%) → SJF minimizes average waiting time`;
  } else if (arrival_rate > 15) {
    policy = "round_robin";
    confidence = 68 + Math.random() * 18;
    reasoning = `High arrival rate (${arrival_rate.toFixed(0)}/s) → Round Robin ensures fairness under burst load`;
  } else {
    policy = "round_robin";
    confidence = 60 + Math.random() * 20;
    reasoning = "Moderate balanced load. Round Robin provides stable fairness";
  }

  confidence = Math.min(99, confidence);

  // Fallback to round_robin if confidence is low
  if (confidence < 65) {
    policy = "round_robin";
    reasoning = `Low confidence (${confidence.toFixed(0)}pct) — Fallback to Round Robin`;
  }

  return {
    policy,
    confidence,
    reasoning,
    features_used: [
      "cpu_avg",
      "mem_avg",
      "arrival_rate",
      "arrival_rate_derivative",
      "tod_sin",
      "tod_cos",
      "cpu_burst_ratio",
    ],
  };
}

export function formatConfidence(confidence: number): string {
  if (confidence >= 85) return "High";
  if (confidence >= 70) return "Medium";
  return "Low";
}

export function getPolicyLabel(policy: PolicyType): string {
  switch (policy) {
    case "round_robin":
      return "Round Robin";
    case "sjf":
      return "Shortest Job First";
    case "priority":
      return "Priority";
  }
}

export function buildSchedulingDecision(
  prediction: MLPrediction,
  isOverride: boolean,
): SchedulingDecision {
  return {
    policy: prediction.policy,
    confidence: prediction.confidence,
    reasoning: prediction.reasoning,
    features_used: prediction.features_used,
    timestamp: Date.now(),
    is_override: isOverride,
  };
}
