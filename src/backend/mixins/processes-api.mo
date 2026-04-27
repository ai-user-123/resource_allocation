import List "mo:core/List";
import Common "../types/common";
import Types "../types/processes";
import ProcessLib "../lib/processes";

mixin (processes : List.List<Types.Process>) {

  public func submitProcess(
    pid : Common.ProcessId,
    name : Text,
    priority : Nat,
    burst_time : Float,
    arrival_time : Common.Timestamp,
  ) : async Types.SubmitProcessReceipt {
    ProcessLib.submit(processes, pid, name, priority, burst_time, arrival_time);
  };

  public query func getProcesses() : async [Types.Process] {
    ProcessLib.getAll(processes);
  };

};
