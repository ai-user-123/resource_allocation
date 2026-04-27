import { useQuery } from "@tanstack/react-query";
import { getResults } from "../services/api";
import type { AggregatedStats } from "../types";

export function useResults() {
  return useQuery<AggregatedStats>({
    queryKey: ["results"],
    queryFn: getResults,
    refetchInterval: 2000,
    staleTime: 1000,
  });
}
