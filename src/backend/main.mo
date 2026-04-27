import List "mo:core/List";
import ProcTypes "types/processes";
import ResTypes "types/resources";
import SchedTypes "types/scheduling";
import ProcessesApi "mixins/processes-api";
import ResourcesApi "mixins/resources-api";
import SchedulingApi "mixins/scheduling-api";
import SimulationApi "mixins/simulation-api";

actor {
  // Persistent mutable collections (reference types — survive upgrades via enhanced orthogonal persistence)
  let processes = List.empty<ProcTypes.Process>();
  let logs = List.empty<ResTypes.ResourceLog>();
  let results = List.empty<SchedTypes.SchedulingResult>();

  // Mutable counters wrapped in single-element Lists so mixins can mutate them by reference
  let nextLogIdHolder = List.singleton<Nat>(1);
  let nextResultIdHolder = List.singleton<Nat>(1);

  // Policy override wrapped in a List (0 or 1 elements) for mutable optional semantics
  let overrideHolder = List.empty<SchedTypes.PolicyOverride>();

  include ProcessesApi(processes);
  include ResourcesApi(logs, nextLogIdHolder, processes, overrideHolder);
  include SchedulingApi(logs, processes, results, nextResultIdHolder, overrideHolder);
  include SimulationApi(processes, logs, results, nextLogIdHolder, nextResultIdHolder, overrideHolder);
};
