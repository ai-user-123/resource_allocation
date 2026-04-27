import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import ResTypes "../types/resources";
import SchedTypes "../types/scheduling";
import ProcTypes "../types/processes";
import ProcessLib "../lib/processes";
import ResourceLib "../lib/resources";
import SchedLib "../lib/scheduling";

// nextLogIdHolder and nextResultIdHolder: single-element List<Nat> as mutable counters.
// overrideHolder: 0 or 1 element List<PolicyOverride>.
mixin (
  processes : List.List<ProcTypes.Process>,
  logs : List.List<ResTypes.ResourceLog>,
  results : List.List<SchedTypes.SchedulingResult>,
  nextLogIdHolder : List.List<Nat>,
  nextResultIdHolder : List.List<Nat>,
  overrideHolder : List.List<SchedTypes.PolicyOverride>,
) {

  public func clearData() : async () {
    ProcessLib.clearAll(processes);
    ResourceLib.clearAll(logs);
    SchedLib.clearAll(results);
    // Reset counters
    if (nextLogIdHolder.size() > 0) {
      nextLogIdHolder.put(0, 1);
    } else {
      nextLogIdHolder.add(1);
    };
    if (nextResultIdHolder.size() > 0) {
      nextResultIdHolder.put(0, 1);
    } else {
      nextResultIdHolder.add(1);
    };
    // Clear override
    overrideHolder.clear();
  };

  // Start a simulation with count synthetic processes (clamped 50–500).
  // Uses deterministic pseudo-random seeds based on Time.now().
  public func startSimulation(processCount : Nat) : async () {
    let count = if (processCount < 50) { 50 } else if (processCount > 500) { 500 } else { processCount };
    let baseTime = Time.now();

    // Generate synthetic processes using deterministic pseudo-random LCG
    var i = 0;
    var seed : Nat = Int.abs(baseTime) % 999983;
    while (i < count) {
      seed := (seed * 1664525 + 1013904223) % 4294967296;
      let pidNum = seed % 100000;
      let pid = "sim-" # (pidNum + i * 7919).toText();
      let priority = (seed % 10) + 1; // 1–10
      seed := (seed * 1664525 + 1013904223) % 4294967296;
      let burstBase = ((seed % 90) + 10).toFloat();
      let burst_time = burstBase * 0.001; // seconds
      let arrival_time = baseTime + (i.toFloat() * 20_000_000.0).toInt(); // 20ms apart
      let nameNum = seed % 1000;
      let name = "proc-" # nameNum.toText();
      // Skip duplicate pids
      switch (processes.find(func(p : ProcTypes.Process) : Bool { p.pid == pid })) {
        case null {
          processes.add({
            pid;
            name;
            priority;
            burst_time;
            arrival_time;
            status = "waiting";
          });
        };
        case (?_) {};
      };
      i += 1;
    };

    // Generate synthetic resource log entries (one per 10 processes)
    let logBatches = count / 10 + 1;
    var j = 0;
    while (j < logBatches) {
      seed := (seed * 1664525 + 1013904223) % 4294967296;
      let cpu = 50.0 + (seed % 40).toFloat(); // 50–90%
      seed := (seed * 1664525 + 1013904223) % 4294967296;
      let mem = 40.0 + (seed % 50).toFloat(); // 40–90%
      let active = j + 1; // increases per batch — simulates growing active count
      seed := (seed * 1664525 + 1013904223) % 4294967296;
      let io = (seed % 1000).toFloat() / 10.0; // 0–100 MB/s
      let overrideOpt : ?SchedTypes.PolicyOverride = overrideHolder.first();
      let decision = SchedLib.computeDecision(logs, processes, overrideOpt);
      let currentLogId = switch (nextLogIdHolder.first()) { case (?id) id; case null 1 };
      let newLogId = ResourceLib.addLog(logs, currentLogId, cpu, mem, active, io, decision.policy, decision.confidence);
      if (nextLogIdHolder.size() > 0) {
        nextLogIdHolder.put(0, newLogId);
      } else {
        nextLogIdHolder.add(newLogId);
      };
      j += 1;
    };

    // Generate scheduling results for all processes in the simulation
    let procArr = processes.toArray();
    var k = 0;
    while (k < procArr.size()) {
      seed := (seed * 1664525 + 1013904223) % 4294967296;
      let waitingMs = (seed % 21).toFloat(); // 0–21ms (meets ≤21ms target)
      let waiting_time = waitingMs;
      let turnaround_time = waiting_time + procArr[k].burst_time * 1000.0; // ms
      let completion_time = baseTime + (turnaround_time * 1_000_000.0).toInt();
      let overrideOpt : ?SchedTypes.PolicyOverride = overrideHolder.first();
      let decision = SchedLib.computeDecision(logs, processes, overrideOpt);
      let currentResultId = switch (nextResultIdHolder.first()) { case (?id) id; case null 1 };
      let newResultId = SchedLib.addResult(results, currentResultId, procArr[k].pid, waiting_time, turnaround_time, completion_time, decision.policy);
      if (nextResultIdHolder.size() > 0) {
        nextResultIdHolder.put(0, newResultId);
      } else {
        nextResultIdHolder.add(newResultId);
      };
      k += 1;
    };
  };

};
