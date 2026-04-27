import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/resources";

module {
  let MAX_LOG_ENTRIES : Nat = 500;

  // Add a resource log entry; rolls off oldest if over 500.
  // Returns the new nextId (caller must store it).
  public func addLog(
    logs : List.List<Types.ResourceLog>,
    nextId : Nat,
    cpu_usage : Float,
    memory_usage : Float,
    active_processes : Nat,
    io_bandwidth : Float,
    selected_policy : Text,
    decision_confidence : Float,
  ) : Nat {
    // Enforce rolling window
    if (logs.size() >= MAX_LOG_ENTRIES) {
      let arr = logs.toArray();
      logs.clear();
      var i = 1;
      while (i < arr.size()) {
        logs.add(arr[i]);
        i += 1;
      };
    };
    let entry : Types.ResourceLog = {
      log_id = nextId;
      timestamp = Time.now();
      cpu_usage;
      memory_usage;
      active_processes;
      io_bandwidth;
      selected_policy;
      decision_confidence;
    };
    logs.add(entry);
    nextId + 1;
  };

  // Return the latest log entry
  public func getLatest(logs : List.List<Types.ResourceLog>) : ?Types.ResourceLog {
    logs.last();
  };

  // Return latest metrics snapshot or zeros
  public func getMetricsSnapshot(logs : List.List<Types.ResourceLog>) : Types.MetricsSnapshot {
    switch (logs.last()) {
      case (?log) {
        {
          cpu_usage = log.cpu_usage;
          memory_usage = log.memory_usage;
          active_processes = log.active_processes;
          io_bandwidth = log.io_bandwidth;
          timestamp = log.timestamp;
        };
      };
      case null {
        { cpu_usage = 0.0; memory_usage = 0.0; active_processes = 0; io_bandwidth = 0.0; timestamp = 0 };
      };
    };
  };

  // Return paginated logs (page is 0-indexed)
  public func getPaginated(
    logs : List.List<Types.ResourceLog>,
    page : Nat,
    page_size : Nat,
  ) : Types.PaginatedLogs {
    let total = logs.size();
    let ps = if (page_size == 0) { 20 } else { page_size };
    let start : Int = page * ps;
    let end : Int = start + ps;
    let arr = logs.sliceToArray(start, end);
    { logs = arr; total; page; page_size = ps };
  };

  // Clear all log entries
  public func clearAll(logs : List.List<Types.ResourceLog>) {
    logs.clear();
  };
};
