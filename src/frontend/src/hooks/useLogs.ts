import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getLogs } from "../services/api";
import type { PaginatedLogs } from "../types";

export function useLogs(initialPage = 1, pageSize = 20) {
  const [page, setPage] = useState(initialPage);
  const queryClient = useQueryClient();

  const query = useQuery<PaginatedLogs>({
    queryKey: ["logs", page, pageSize],
    queryFn: () => getLogs(page, pageSize),
    refetchInterval: 3000,
    staleTime: 1500,
  });

  const nextPage = () => {
    if (query.data && page * pageSize < query.data.total) {
      setPage((p) => p + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const goToPage = (p: number) => setPage(p);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["logs"] });
  };

  return {
    ...query,
    page,
    pageSize,
    nextPage,
    prevPage,
    goToPage,
    invalidate,
    totalPages: query.data ? Math.ceil(query.data.total / pageSize) : 0,
  };
}
