import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import ResTypes "../types/resources";
import SchedTypes "../types/scheduling";
import ProcTypes "../types/processes";
import SchedLib "../lib/scheduling";

// nextResultIdHolder: single-element List<Nat> as mutable counter.
// overrideHolder: 0 or 1 element List<PolicyOverride> as mutable optional.
mixin (
  logs : List.List<ResTypes.ResourceLog>,
  processes : List.List<ProcTypes.Process>,
  results : List.List<SchedTypes.SchedulingResult>,
  nextResultIdHolder : List.List<Nat>,
  overrideHolder : List.List<SchedTypes.PolicyOverride>,
) {

  public query func getSchedulingDecision() : async SchedTypes.SchedulingDecision {
    let overrideOpt : ?SchedTypes.PolicyOverride = overrideHolder.first();
    SchedLib.computeDecision(logs, processes, overrideOpt);
  };

  public func submitSchedulingResult(
    pid : Common.ProcessId,
    waiting_time : Float,
    turnaround_time : Float,
    completion_time : Common.Timestamp,
    policy_applied : Text,
  ) : async () {
    let currentId = switch (nextResultIdHolder.first()) { case (?id) id; case null 1 };
    let newId = SchedLib.addResult(results, currentId, pid, waiting_time, turnaround_time, completion_time, policy_applied);
    if (nextResultIdHolder.size() > 0) {
      nextResultIdHolder.put(0, newId);
    } else {
      nextResultIdHolder.add(newId);
    };
  };

  public query func getResults() : async SchedTypes.AggregatedStats {
    SchedLib.getAggregatedStats(results);
  };

  public func overridePolicy(policy : Text) : async () {
    let entry : SchedTypes.PolicyOverride = {
      policy;
      override_time = Time.now();
      active = true;
    };
    if (overrideHolder.size() > 0) {
      overrideHolder.put(0, entry);
    } else {
      overrideHolder.add(entry);
    };
  };

};
