import { useQuery } from "@tanstack/react-query";
import { getSchedulingDecision } from "../services/api";
import type { SchedulingDecision } from "../types";

export function useSchedulingDecision() {
  return useQuery<SchedulingDecision>({
    queryKey: ["scheduling-decision"],
    queryFn: getSchedulingDecision,
    refetchInterval: 2000,
    staleTime: 1000,
  });
}
