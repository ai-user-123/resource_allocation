import List "mo:core/List";
import Int "mo:core/Int";
import Common "../types/common";
import Types "../types/processes";

module {
  // Validate and add a process to the list; returns a receipt
  public func submit(
    processes : List.List<Types.Process>,
    pid : Common.ProcessId,
    name : Text,
    priority : Nat,
    burst_time : Float,
    arrival_time : Common.Timestamp,
  ) : Types.SubmitProcessReceipt {
    if (pid == "") {
      return { process_id = pid; success = false; message = "pid must not be empty" };
    };
    if (name == "") {
      return { process_id = pid; success = false; message = "name must not be empty" };
    };
    if (burst_time <= 0.0) {
      return { process_id = pid; success = false; message = "burst_time must be positive" };
    };
    // Check for duplicate pid
    switch (processes.find(func(p : Types.Process) : Bool { p.pid == pid })) {
      case (?_) {
        return { process_id = pid; success = false; message = "process with this pid already exists" };
      };
      case null {};
    };
    let proc : Types.Process = {
      pid;
      name;
      priority;
      burst_time;
      arrival_time;
      status = "waiting";
    };
    processes.add(proc);
    { process_id = pid; success = true; message = "Process submitted successfully" };
  };

  // Return all processes sorted by arrival_time ascending
  public func getAll(processes : List.List<Types.Process>) : [Types.Process] {
    let arr = processes.toArray();
    arr.sort(func(a : Types.Process, b : Types.Process) : { #less; #equal; #greater } {
      Int.compare(a.arrival_time, b.arrival_time);
    });
  };

  // Find a process by pid
  public func getByPid(processes : List.List<Types.Process>, pid : Common.ProcessId) : ?Types.Process {
    processes.find(func(p : Types.Process) : Bool { p.pid == pid });
  };

  // Update process status in-place
  public func updateStatus(processes : List.List<Types.Process>, pid : Common.ProcessId, status : Text) {
    processes.mapInPlace(func(p : Types.Process) : Types.Process {
      if (p.pid == pid) { { p with status } } else { p };
    });
  };

  // Clear all processes
  public func clearAll(processes : List.List<Types.Process>) {
    processes.clear();
  };
};
