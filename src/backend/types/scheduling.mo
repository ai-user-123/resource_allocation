import Common "common";

module {
  public type SchedulingResult = {
    result_id : Nat;
    pid : Common.ProcessId;
    waiting_time : Float;
    turnaround_time : Float;
    completion_time : Common.Timestamp;
    policy_applied : Text;
  };

  public type SchedulingDecision = {
    policy : Text;
    confidence : Float;
    reasoning : Text;
    features_used : [Text];
    override_active : Bool;
  };

  public type AggregatedStats = {
    avg_waiting_time : Float;
    avg_turnaround_time : Float;
    throughput_tasks_per_sec : Float;
    total_completed : Nat;
  };

  public type PolicyOverride = {
    policy : Text;
    override_time : Common.Timestamp;
    active : Bool;
  };
};
