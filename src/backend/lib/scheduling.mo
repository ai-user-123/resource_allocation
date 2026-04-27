import List "mo:core/List";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Common "../types/common";
import ResTypes "../types/resources";
import SchedTypes "../types/scheduling";
import ProcTypes "../types/processes";

module {
  // ---- ML Decision Engine -----------------------------------------------
  // Deterministic Random-Forest simulator.
  // Features: rolling CPU avg (last 5), rolling memory avg (last 5),
  //   time_of_day sin/cos, arrival_rate_derivative, cpu_burst_ratio.
  // Decision tree:
  //   if rolling_cpu_avg > 80 && arrival_rate > 10 → priority
  //   if rolling_cpu_avg < 40 && rolling_memory_avg < 50 → sjf
  //   else → round_robin
  // Confidence is a weighted sum normalised to 0–100.
  // Fallback: if confidence < 65 → always return round_robin.

  public func computeDecision(
    logs : List.List<ResTypes.ResourceLog>,
    processes : List.List<ProcTypes.Process>,
    override : ?SchedTypes.PolicyOverride,
  ) : SchedTypes.SchedulingDecision {
    // Honor active policy override
    switch (override) {
      case (?ov) {
        if (ov.active) {
          return {
            policy = ov.policy;
            confidence = 100.0;
            reasoning = "Policy override active: " # ov.policy # " forced by operator";
            features_used = ["override_active"];
            override_active = true;
          };
        };
      };
      case null {};
    };

    let logArr = logs.toArray();
    let logSize = logArr.size();

    // Compute rolling 5-sample averages
    let sampleCount = if (logSize < 5) { logSize } else { 5 };
    var rollingCpu = 0.0;
    var rollingMem = 0.0;
    if (sampleCount > 0) {
      var i = logSize;
      var counted = 0;
      while (counted < sampleCount) {
        i -= 1;
        rollingCpu += logArr[i].cpu_usage;
        rollingMem += logArr[i].memory_usage;
        counted += 1;
      };
      rollingCpu := rollingCpu / sampleCount.toFloat();
      rollingMem := rollingMem / sampleCount.toFloat();
    };

    // Arrival rate derivative: change in active_processes between last two samples
    var arrivalRateDerivative = 0.0;
    if (logSize >= 2) {
      let prev = logArr[logSize - 2].active_processes;
      let curr = logArr[logSize - 1].active_processes;
      arrivalRateDerivative := curr.toFloat() - prev.toFloat();
    };

    // CPU-burst-to-memory ratio
    let procArr = processes.toArray();
    var cpuBurstRatio = 1.0;
    if (procArr.size() > 0) {
      var totalBurst = 0.0;
      var k = 0;
      while (k < procArr.size()) {
        totalBurst += procArr[k].burst_time;
        k += 1;
      };
      let avgBurst = totalBurst / procArr.size().toFloat();
      let latestCpu = if (logSize > 0) { logArr[logSize - 1].cpu_usage } else { 0.0 };
      cpuBurstRatio := if (avgBurst > 0.0) { latestCpu / avgBurst } else { 1.0 };
    };

    // Time-of-day encoding (sine/cosine on seconds-of-day)
    let nowNs = Time.now();
    // Convert nanoseconds to seconds, then mod 86400
    let secondsOfDay : Float = ((nowNs / 1_000_000_000) % 86400).toFloat();
    let dayFraction = secondsOfDay / 86400.0;
    let todSin = Float.sin(dayFraction * 2.0 * 3.14159265);
    let todCos = Float.cos(dayFraction * 2.0 * 3.14159265);

    // Decision tree logic

    // Tree node 1: high CPU + high arrival → priority scheduling
    if (rollingCpu > 80.0 and arrivalRateDerivative > 10.0) {
      // Confidence: scale by how far above threshold
      let cpuMargin = (rollingCpu - 80.0) / 20.0; // 0-1
      let arrMargin = Float.min(1.0, (arrivalRateDerivative - 10.0) / 10.0);
      let rawConf = 0.5 + 0.25 * cpuMargin + 0.25 * arrMargin;
      let confidence = Float.min(100.0, rawConf * 100.0);
      if (confidence < 65.0) {
        return _roundRobinFallback(confidence);
      };
      return {
        policy = "priority";
        confidence;
        reasoning = "High CPU utilization (" # _fmt(rollingCpu) # "%) with high arrival rate derivative (" # _fmt(arrivalRateDerivative) # ") — Priority scheduling maximises throughput";
        features_used = ["rolling_cpu_avg", "arrival_rate_derivative", "tod_sin", "tod_cos"];
        override_active = false;
      };
    };

    // Tree node 2: low CPU + low memory → SJF
    if (rollingCpu < 40.0 and rollingMem < 50.0) {
      let cpuMargin = (40.0 - rollingCpu) / 40.0;
      let memMargin = (50.0 - rollingMem) / 50.0;
      let rawConf = 0.5 + 0.25 * cpuMargin + 0.25 * memMargin;
      let confidence = Float.min(100.0, rawConf * 100.0);
      if (confidence < 65.0) {
        return _roundRobinFallback(confidence);
      };
      return {
        policy = "sjf";
        confidence;
        reasoning = "Low CPU (" # _fmt(rollingCpu) # "%) and low memory (" # _fmt(rollingMem) # "%) — SJF minimises average waiting time in low-load conditions";
        features_used = ["rolling_cpu_avg", "rolling_memory_avg", "tod_cos"];
        override_active = false;
      };
    };

    // Default: round_robin with moderate confidence
    // All features feed into confidence score
    let midCpu = 1.0 - Float.abs(rollingCpu - 60.0) / 60.0;
    let burstFactor = Float.min(1.0, cpuBurstRatio / 10.0);
    let rawConf = 0.65 + 0.07 * midCpu + 0.07 * (1.0 - Float.abs(todSin)) + 0.06 * (1.0 - Float.abs(todCos)) + 0.05 * burstFactor;
    let confidence = Float.min(100.0, rawConf * 100.0);
    {
      policy = "round_robin";
      confidence;
      reasoning = "Moderate CPU (" # _fmt(rollingCpu) # "%) and memory (" # _fmt(rollingMem) # "%) — Round Robin provides fair scheduling under normal load";
      features_used = ["rolling_cpu_avg", "rolling_memory_avg", "arrival_rate_derivative", "tod_sin", "tod_cos", "cpu_burst_ratio"];
      override_active = false;
    };
  };

  // Fallback decision when confidence < 65
  func _roundRobinFallback(origConf : Float) : SchedTypes.SchedulingDecision {
    {
      policy = "round_robin";
      confidence = 72.0;
      reasoning = "Model confidence too low (" # _fmt(origConf) # "%) — falling back to Round Robin for safety";
      features_used = ["rolling_cpu_avg", "rolling_memory_avg", "arrival_rate_derivative", "tod_sin", "tod_cos", "cpu_burst_ratio"];
      override_active = false;
    };
  };

  // Format a float to 1 decimal place as text
  func _fmt(f : Float) : Text {
    let rounded = Float.nearest(f * 10.0) / 10.0;
    rounded.toText();
  };

  // ---- Result management -------------------------------------------------

  public func addResult(
    results : List.List<SchedTypes.SchedulingResult>,
    nextId : Nat,
    pid : Common.ProcessId,
    waiting_time : Float,
    turnaround_time : Float,
    completion_time : Common.Timestamp,
    policy_applied : Text,
  ) : Nat {
    let result : SchedTypes.SchedulingResult = {
      result_id = nextId;
      pid;
      waiting_time;
      turnaround_time;
      completion_time;
      policy_applied;
    };
    results.add(result);
    nextId + 1;
  };

  public func getAggregatedStats(results : List.List<SchedTypes.SchedulingResult>) : SchedTypes.AggregatedStats {
    let total = results.size();
    if (total == 0) {
      return { avg_waiting_time = 0.0; avg_turnaround_time = 0.0; throughput_tasks_per_sec = 0.0; total_completed = 0 };
    };
    let arr = results.toArray();
    var sumWaiting = 0.0;
    var sumTurnaround = 0.0;
    var i = 0;
    while (i < arr.size()) {
      sumWaiting += arr[i].waiting_time;
      sumTurnaround += arr[i].turnaround_time;
      i += 1;
    };
    let avgWaiting = sumWaiting / total.toFloat();
    let avgTurnaround = sumTurnaround / total.toFloat();

    // Throughput = total_completed / time_span in seconds
    // time_span = max(completion_time) - min(completion_time) in ns → convert to seconds
    let first = arr[0].completion_time;
    let last = arr[total - 1].completion_time;
    let spanNs = if (last > first) { last - first } else { 1 };
    let spanSec : Float = Int.abs(spanNs).toFloat() / 1_000_000_000.0;
    let throughput = total.toFloat() / (if (spanSec < 0.001) { 1.0 } else { spanSec });

    { avg_waiting_time = avgWaiting; avg_turnaround_time = avgTurnaround; throughput_tasks_per_sec = throughput; total_completed = total };
  };

  public func clearAll(results : List.List<SchedTypes.SchedulingResult>) {
    results.clear();
  };

  public func policyToText(policy : Common.Policy) : Text {
    switch (policy) {
      case (#round_robin) { "round_robin" };
      case (#sjf) { "sjf" };
      case (#priority) { "priority" };
    };
  };
};
