import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "../services/api";
import type { MetricsSnapshot } from "../types";

export function useMetrics() {
  return useQuery<MetricsSnapshot>({
    queryKey: ["metrics"],
    queryFn: getMetrics,
    refetchInterval: 1000,
    staleTime: 500,
  });
}
