import Common "common";

module {
  public type Process = {
    pid : Common.ProcessId;
    name : Text;
    priority : Nat;
    burst_time : Float;
    arrival_time : Common.Timestamp;
    status : Text;
  };

  public type SubmitProcessReceipt = {
    process_id : Common.ProcessId;
    success : Bool;
    message : Text;
  };
};
