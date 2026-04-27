import Common "common";

module {
  public type ResourceLog = {
    log_id : Nat;
    timestamp : Common.Timestamp;
    cpu_usage : Float;
    memory_usage : Float;
    active_processes : Nat;
    selected_policy : Text;
    decision_confidence : Float;
    io_bandwidth : Float;
  };

  public type MetricsSnapshot = {
    cpu_usage : Float;
    memory_usage : Float;
    active_processes : Nat;
    io_bandwidth : Float;
    timestamp : Common.Timestamp;
  };

  public type PaginatedLogs = {
    logs : [ResourceLog];
    total : Nat;
    page : Nat;
    page_size : Nat;
  };
};
