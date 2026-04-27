import { c as createLucideIcon, r as reactExports, u as useQueryClient, j as jsxRuntimeExports, b as ScrollText, S as Skeleton, d as ChevronRight } from "./index-B6KDdV9-.js";
import { f as getLogs, B as Badge, d as Button } from "./api-DS5_eO34.js";
import { A as AlertBadge } from "./AlertBadge-c2EvalJ8.js";
import { u as useQuery, R as RefreshCw } from "./refresh-cw-BWO3MCwL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
function useLogs(initialPage = 1, pageSize = 20) {
  const [page, setPage] = reactExports.useState(initialPage);
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["logs", page, pageSize],
    queryFn: () => getLogs(page, pageSize),
    refetchInterval: 3e3,
    staleTime: 1500
  });
  const nextPage = () => {
    if (query.data && page * pageSize < query.data.total) {
      setPage((p) => p + 1);
    }
  };
  const prevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };
  const goToPage = (p) => setPage(p);
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
    totalPages: query.data ? Math.ceil(query.data.total / pageSize) : 0
  };
}
const POLICY_COLORS = {
  round_robin: "bg-cyan-950/60 text-cyan-300 border-cyan-900/60",
  sjf: "bg-amber-950/60 text-amber-300 border-amber-900/60",
  priority: "bg-purple-950/60 text-purple-300 border-purple-900/60"
};
const POLICY_LABELS = {
  round_robin: "Round Robin",
  sjf: "SJF",
  priority: "Priority"
};
const TIME_RANGE_LABELS = {
  last_hour: "Last Hour",
  last_6h: "Last 6 Hours",
  all: "All Time"
};
const TIME_RANGE_MS = {
  last_hour: 60 * 60 * 1e3,
  last_6h: 6 * 60 * 60 * 1e3,
  all: Number.MAX_SAFE_INTEGER
};
function formatBytes(mb) {
  if (mb >= 1e3) return `${(mb / 1e3).toFixed(1)} GB/s`;
  return `${mb.toFixed(0)} MB/s`;
}
function cpuColor(v) {
  if (v >= 89) return "text-green-400";
  if (v >= 70) return "text-amber-400";
  return "text-red-400";
}
function memColor(v) {
  if (v >= 88) return "text-green-400";
  if (v >= 65) return "text-amber-400";
  return "text-red-400";
}
function mockConfidence(logId) {
  return 62 + (logId * 7 + 13) % 37;
}
function exportLogsJson(logs) {
  const blob = new Blob([JSON.stringify(logs, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `resource-logs-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/:/g, "-")}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
const POLICY_FILTERS = [
  "all",
  "round_robin",
  "sjf",
  "priority"
];
const POLICY_FILTER_LABELS = {
  all: "All Policies",
  round_robin: "Round Robin",
  sjf: "SJF",
  priority: "Priority"
};
function LogsPage() {
  const { data, isLoading, page, totalPages, nextPage, prevPage, invalidate } = useLogs(1, 20);
  const [policyFilter, setPolicyFilter] = reactExports.useState("all");
  const [timeRange, setTimeRange] = reactExports.useState("all");
  const filteredLogs = reactExports.useMemo(() => {
    if (!(data == null ? void 0 : data.logs)) return [];
    const cutoff = Date.now() - TIME_RANGE_MS[timeRange];
    return data.logs.filter((log) => {
      const policyMatch = policyFilter === "all" || log.selected_policy === policyFilter;
      const timeMatch = log.timestamp >= cutoff;
      return policyMatch && timeMatch;
    });
  }, [data, policyFilter, timeRange]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", "data-ocid": "logs.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "w-4 h-4 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold font-display", children: "Resource Log History" }),
        data && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "font-mono text-[11px]", children: [
          data.total,
          " records"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => data && exportLogsJson(filteredLogs),
            disabled: !data || filteredLogs.length === 0,
            "data-ocid": "logs.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Export JSON"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: invalidate,
            "data-ocid": "logs.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded p-3 flex flex-wrap items-center gap-4",
        "data-ocid": "logs.filters_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground uppercase tracking-wider", children: "Filters" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground", children: "Policy:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", "data-ocid": "logs.policy_filter_group", children: POLICY_FILTERS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setPolicyFilter(p),
                className: `px-2 py-0.5 rounded text-[11px] font-mono border transition-smooth ${policyFilter === p ? "bg-accent/20 text-accent border-accent/40" : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"}`,
                "data-ocid": `logs.policy_filter.${p}`,
                children: POLICY_FILTER_LABELS[p]
              },
              p
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground", children: "Time:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", "data-ocid": "logs.time_filter_group", children: ["last_hour", "last_6h", "all"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setTimeRange(t),
                className: `px-2 py-0.5 rounded text-[11px] font-mono border transition-smooth ${timeRange === t ? "bg-accent/20 text-accent border-accent/40" : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"}`,
                "data-ocid": `logs.time_filter.${t}`,
                children: TIME_RANGE_LABELS[t]
              },
              t
            )) })
          ] }),
          (policyFilter !== "all" || timeRange !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[11px] font-mono text-accent", children: [
            filteredLogs.length,
            " matching"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded overflow-hidden",
        "data-ocid": "logs.table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-[160px_90px_90px_90px_110px_110px_90px] px-4 py-2.5 border-b border-border bg-muted/30", children: [
            "Timestamp",
            "CPU %",
            "Memory %",
            "Processes",
            "I/O",
            "Policy",
            "Confidence"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider",
              children: h
            },
            h
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/40 max-h-[520px] overflow-y-auto", children: isLoading ? Array.from({ length: 10 }, (_, i) => `log-row-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, k)) : filteredLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-4 py-12 text-center text-sm text-muted-foreground",
              "data-ocid": "logs.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "w-8 h-8 mx-auto mb-3 opacity-20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No logs match the current filters." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1 text-muted-foreground/60", children: "Try expanding the time range or changing the policy filter." })
              ]
            }
          ) : filteredLogs.map((log, idx) => {
            const confidence = mockConfidence(log.log_id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-[160px_90px_90px_90px_110px_110px_90px] px-4 py-2.5 hover:bg-muted/10 transition-smooth",
                "data-ocid": `logs.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: new Date(log.timestamp).toLocaleString("en", {
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `font-mono text-sm font-semibold ${cpuColor(log.cpu_usage)}`,
                      children: [
                        log.cpu_usage.toFixed(1),
                        "%"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `font-mono text-sm font-semibold ${memColor(log.memory_usage)}`,
                      children: [
                        log.memory_usage.toFixed(1),
                        "%"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-foreground/80", children: log.active_processes }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-foreground/60", children: log.io_bandwidth !== void 0 ? formatBytes(log.io_bandwidth) : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: `text-[10px] font-mono ${POLICY_COLORS[log.selected_policy]}`,
                      children: POLICY_LABELS[log.selected_policy]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: confidence >= 80 ? "text-green-400" : confidence >= 65 ? "text-amber-400" : "text-red-400",
                      children: [
                        confidence,
                        "%"
                      ]
                    }
                  ) })
                ]
              },
              log.log_id
            );
          }) }),
          data && data.total > 20 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 border-t border-border bg-muted/20 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono text-muted-foreground", children: [
              "Page ",
              page,
              " of ",
              totalPages,
              " · ",
              data.total,
              " records total"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  className: "h-7 px-2",
                  onClick: prevPage,
                  disabled: page === 1,
                  "data-ocid": "logs.pagination_prev",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono text-muted-foreground px-1", children: [
                page,
                " / ",
                totalPages
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  className: "h-7 px-2",
                  onClick: nextPage,
                  disabled: page >= totalPages,
                  "data-ocid": "logs.pagination_next",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-[11px] font-mono text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60 uppercase tracking-wider text-[10px]", children: "Thresholds:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertBadge, { severity: "ok", label: "≥ Target" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertBadge, { severity: "warning", label: "Near threshold" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertBadge, { severity: "critical", label: "Below threshold" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CPU target ≥ 89%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Memory target ≥ 88%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Confidence: green ≥ 80%" })
      ] })
    ] })
  ] });
}
export {
  LogsPage as default
};
