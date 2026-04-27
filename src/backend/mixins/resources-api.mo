import List "mo:core/List";
import ResTypes "../types/resources";
import ProcTypes "../types/processes";
import SchedTypes "../types/scheduling";
import ResourceLib "../lib/resources";
import SchedLib "../lib/scheduling";

// nextLogIdHolder: single-element List<Nat> as mutable counter reference.
// overrideHolder: 0 or 1 element List<PolicyOverride> as mutable optional.
mixin (
  logs : List.List<ResTypes.ResourceLog>,
  nextLogIdHolder : List.List<Nat>,
  processes : List.List<ProcTypes.Process>,
  overrideHolder : List.List<SchedTypes.PolicyOverride>,
) {

  public query func getMetrics() : async ResTypes.MetricsSnapshot {
    ResourceLib.getMetricsSnapshot(logs);
  };

  public func submitMetrics(
    cpu : Float,
    memory : Float,
    active_processes : Nat,
    io_bandwidth : Float,
  ) : async () {
    // Compute ML decision for this snapshot
    let overrideOpt : ?SchedTypes.PolicyOverride = overrideHolder.first();
    let decision = SchedLib.computeDecision(logs, processes, overrideOpt);
    // Add log entry with decision info
    let currentId = switch (nextLogIdHolder.first()) { case (?id) id; case null 1 };
    let newId = ResourceLib.addLog(
      logs, currentId,
      cpu, memory, active_processes, io_bandwidth,
      decision.policy, decision.confidence,
    );
    // Update counter
    if (nextLogIdHolder.size() > 0) {
      nextLogIdHolder.put(0, newId);
    } else {
      nextLogIdHolder.add(newId);
    };
  };

  public query func getLogs(page : Nat, page_size : Nat) : async ResTypes.PaginatedLogs {
    ResourceLib.getPaginated(logs, page, page_size);
  };

};
