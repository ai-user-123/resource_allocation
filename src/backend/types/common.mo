module {
  public type Timestamp = Int;
  public type ProcessId = Text;

  public type Policy = {
    #round_robin;
    #sjf;
    #priority;
  };

  public type ProcessStatus = {
    #waiting;
    #running;
    #completed;
  };
};
