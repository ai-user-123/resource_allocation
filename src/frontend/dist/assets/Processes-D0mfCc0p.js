import { c as createLucideIcon, u as useQueryClient, r as reactExports, j as jsxRuntimeExports, C as Cpu, S as Skeleton, A as Activity } from "./index-B6KDdV9-.js";
import { s as submitProcess, u as updateProcessStore, B as Badge, d as Button, T as TriangleAlert, e as getProcessStore, a as getResults } from "./api-DS5_eO34.js";
import { L as Label, I as Input } from "./label-CoZ83f5O.js";
import { R as RefreshCw, u as useQuery } from "./refresh-cw-BWO3MCwL.js";
import { u as ue } from "./index-B6VuHpqp.js";
import { T as TrendingUp, Z as Zap } from "./zap-BVqVJSOS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const STATUS_STYLES = {
  queued: {
    bg: "bg-muted/30",
    text: "text-muted-foreground",
    border: "border-muted/50",
    dot: "bg-muted-foreground"
  },
  waiting: {
    bg: "bg-amber-950/40",
    text: "text-amber-300",
    border: "border-amber-900/60",
    dot: "bg-amber-400"
  },
  running: {
    bg: "bg-cyan-950/40",
    text: "text-cyan-300",
    border: "border-cyan-800/60",
    dot: "bg-cyan-400 animate-pulse"
  },
  completed: {
    bg: "bg-green-950/40",
    text: "text-green-300",
    border: "border-green-900/60",
    dot: "bg-green-400"
  }
};
const PRIORITY_COLOR = (p) => {
  if (p >= 8) return "text-red-400";
  if (p >= 5) return "text-amber-400";
  return "text-muted-foreground";
};
function greedyScore(p) {
  const safeRemaining = p.remaining_time > 0 ? p.remaining_time : 1;
  return 0.6 * p.priority + 0.4 * (1 / safeRemaining);
}
function relativeTime(ts) {
  const diff = (Date.now() - ts) / 1e3;
  if (diff < 5) return "just now";
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}
function useProcesses() {
  return useQuery({
    queryKey: ["processes"],
    queryFn: () => getProcessStore(),
    refetchInterval: 2e3
  });
}
function useResults() {
  return useQuery({
    queryKey: ["results"],
    queryFn: () => getResults(),
    refetchInterval: 3e3
  });
}
function StatCard({
  label,
  value,
  unit,
  icon,
  target,
  good,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded p-4 space-y-2",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground uppercase tracking-wider", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: icon })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold font-mono text-foreground", children: value }),
          unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: unit })
        ] }),
        target && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] font-mono", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: good ? "text-green-400" : "text-amber-400", children: [
            "target: ",
            target
          ] })
        ] })
      ]
    }
  );
}
function ProcessesPage() {
  const queryClient = useQueryClient();
  const { data: processes, isLoading } = useProcesses();
  const { data: stats, isLoading: statsLoading } = useResults();
  const [errors, setErrors] = reactExports.useState({});
  const [form, setForm] = reactExports.useState({
    pid: String(Math.floor(1e3 + Math.random() * 9e3)),
    name: "",
    priority: 5,
    burst_time: 20
  });
  const [, setTick] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2e3);
    return () => clearInterval(id);
  }, []);
  const handleSubmit = reactExports.useCallback(
    async (e) => {
      e.preventDefault();
      const errs = {};
      if (!form.pid || Number(form.pid) < 1) errs.pid = "Valid PID required";
      if (!form.name.trim()) errs.name = "Name required";
      if (form.burst_time < 1) errs.burst_time = "Must be ≥ 1ms";
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
      await submitProcess({
        pid: Number(form.pid),
        name: form.name.trim(),
        priority: form.priority,
        burst_time: form.burst_time,
        arrival_time: Date.now()
      });
      setForm((f) => ({
        ...f,
        pid: String(Math.floor(1e3 + Math.random() * 9e3)),
        name: ""
      }));
      setErrors({});
      queryClient.invalidateQueries({ queryKey: ["processes"] });
      ue.success(`Process "${form.name}" queued`);
    },
    [form, queryClient]
  );
  const handleDelete = reactExports.useCallback(
    (pid) => {
      const current = getProcessStore();
      updateProcessStore(current.filter((p) => p.pid !== pid));
      queryClient.invalidateQueries({ queryKey: ["processes"] });
      ue.info("Process removed");
    },
    [queryClient]
  );
  const handleClearCompleted = reactExports.useCallback(() => {
    const current = getProcessStore();
    updateProcessStore(current.filter((p) => p.status !== "completed"));
    queryClient.invalidateQueries({ queryKey: ["processes"] });
    ue.success("Completed processes cleared");
  }, [queryClient]);
  const sorted = processes ? [...processes].sort((a, b) => a.arrival_time - b.arrival_time) : [];
  const waitingProcesses = sorted.filter(
    (p) => p.status === "queued" || p.status === "waiting"
  );
  const nextToExecute = waitingProcesses.length > 0 ? waitingProcesses.reduce(
    (best, p) => greedyScore(p) > greedyScore(best) ? p : best
  ) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", "data-ocid": "processes.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-4 h-4 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold font-display", children: "Process Queue" }),
        processes && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "font-mono text-[11px]", children: [
          processes.filter((p) => p.status !== "completed").length,
          " active"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: handleClearCompleted,
          "data-ocid": "processes.clear_completed_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 mr-1.5" }),
            "Clear Completed"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
        "data-ocid": "processes.stats_section",
        children: statsLoading ? Array.from({ length: 4 }, (_, i) => `stat-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24" }, k)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Avg Wait Time",
              value: stats ? stats.avg_waiting_time.toFixed(1) : "—",
              unit: "ms",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
              target: "≤ 21ms",
              good: stats ? stats.avg_waiting_time <= 21 : false,
              "data-ocid": "processes.stat_wait.card"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Avg Turnaround",
              value: stats ? (stats.avg_waiting_time * 1.5).toFixed(1) : "—",
              unit: "ms",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5" }),
              "data-ocid": "processes.stat_turnaround.card"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Throughput",
              value: stats ? stats.throughput.toFixed(0) : "—",
              unit: "tasks/s",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
              target: "≥ 198",
              good: stats ? stats.throughput >= 198 : false,
              "data-ocid": "processes.stat_throughput.card"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              label: "Total Completed",
              value: stats ? String(stats.completed_processes) : "0",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
              "data-ocid": "processes.stat_completed.card"
            }
          )
        ] })
      }
    ),
    nextToExecute && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-cyan-950/20 border border-cyan-900/40 rounded p-3 flex items-center gap-3",
        "data-ocid": "processes.greedy_preview",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-cyan-400 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-cyan-300/70 uppercase tracking-wider", children: "Next to Execute (Greedy Score)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-cyan-200 font-semibold", children: nextToExecute.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                "PID:",
                nextToExecute.pid
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-accent font-bold", children: [
                "score=",
                greedyScore(nextToExecute).toFixed(4)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                "priority=",
                nextToExecute.priority,
                " · burst=",
                nextToExecute.burst_time,
                "ms"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono text-muted-foreground", children: "waiting" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs text-foreground/80", children: [
              waitingProcesses.length,
              " proc"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded p-4",
        "data-ocid": "processes.add_form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold font-mono text-muted-foreground uppercase tracking-wider mb-3", children: "Submit New Process" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "grid grid-cols-2 sm:grid-cols-5 gap-3 items-start",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] text-muted-foreground font-mono", children: "PID" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "text",
                      value: form.pid,
                      onChange: (e) => setForm((f) => ({ ...f, pid: e.target.value })),
                      className: "h-8 text-sm font-mono bg-background",
                      "data-ocid": "processes.pid_input"
                    }
                  ),
                  errors.pid && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[10px] text-destructive font-mono",
                      "data-ocid": "processes.pid_input.field_error",
                      children: errors.pid
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 sm:col-span-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] text-muted-foreground font-mono", children: "Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "text",
                      value: form.name,
                      onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                      placeholder: "process-name",
                      className: "h-8 text-sm bg-background",
                      "data-ocid": "processes.name_input"
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[10px] text-destructive font-mono",
                      "data-ocid": "processes.name_input.field_error",
                      children: errors.name
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] text-muted-foreground font-mono", children: "Priority (1–10)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "range",
                        min: 1,
                        max: 10,
                        value: form.priority,
                        onChange: (e) => setForm((f) => ({ ...f, priority: Number(e.target.value) })),
                        className: "h-8 w-full accent-cyan-400 cursor-pointer bg-transparent border-none p-0 pt-2",
                        "data-ocid": "processes.priority_input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] font-mono text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `font-semibold ${PRIORITY_COLOR(form.priority)}`,
                          children: form.priority
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "10" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] text-muted-foreground font-mono", children: "Burst Time (ms)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: 1,
                      value: form.burst_time,
                      onChange: (e) => setForm((f) => ({ ...f, burst_time: Number(e.target.value) })),
                      className: "h-8 text-sm font-mono bg-background",
                      "data-ocid": "processes.burst_time_input"
                    }
                  ),
                  errors.burst_time && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-[10px] text-destructive font-mono",
                      "data-ocid": "processes.burst_time_input.field_error",
                      children: errors.burst_time
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 flex flex-col justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] text-muted-foreground font-mono opacity-0 select-none", children: " " }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "submit",
                      size: "sm",
                      className: "h-8",
                      "data-ocid": "processes.submit_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
                        "Queue Process"
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded overflow-hidden",
        "data-ocid": "processes.table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-[70px_1fr_70px_90px_90px_120px_110px_64px] px-4 py-2.5 border-b border-border bg-muted/30", children: [
            "PID",
            "Name",
            "Priority",
            "Burst",
            "Remaining",
            "Arrival",
            "Status",
            ""
          ].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider",
              children: h
            },
            `header-${h || i}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/50 max-h-[420px] overflow-y-auto", children: isLoading ? Array.from({ length: 5 }, (_, i) => `row-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }) }, k)) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "px-4 py-12 text-center text-sm text-muted-foreground",
              "data-ocid": "processes.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-8 h-8 mx-auto mb-3 opacity-20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No processes in queue." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1 text-muted-foreground/60", children: "Submit a process above or start a simulation from the Dashboard." })
              ]
            }
          ) : sorted.map((p, idx) => {
            const s = STATUS_STYLES[p.status];
            const isNext = (nextToExecute == null ? void 0 : nextToExecute.pid) === p.pid;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `grid grid-cols-[70px_1fr_70px_90px_90px_120px_110px_64px] px-4 py-2.5 hover:bg-muted/10 transition-smooth ${isNext ? "bg-cyan-950/10 border-l-2 border-l-cyan-500/60" : ""}`,
                "data-ocid": `processes.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground flex items-center", children: [
                    isNext && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-cyan-400 mr-1.5 animate-pulse" }),
                    p.pid
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium truncate min-w-0 pr-2 flex items-center", children: p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `font-mono text-sm font-bold flex items-center ${PRIORITY_COLOR(p.priority)}`,
                      children: p.priority
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-foreground/80 flex items-center", children: [
                    p.burst_time,
                    "ms"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `font-mono text-xs flex items-center ${p.status === "running" ? "text-cyan-300" : "text-foreground/60"}`,
                      children: [
                        p.remaining_time,
                        "ms"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground flex items-center", children: relativeTime(p.arrival_time) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: `text-[10px] font-mono px-2 py-0.5 ${s.bg} ${s.text} ${s.border} flex items-center gap-1.5`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${s.dot}` }),
                        p.status
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleDelete(p.pid),
                      className: "text-muted-foreground hover:text-destructive transition-smooth p-1",
                      "aria-label": "Remove process",
                      "data-ocid": `processes.delete_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  ) })
                ]
              },
              p.pid
            );
          }) }),
          sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2 border-t border-border bg-muted/20 flex flex-wrap items-center gap-4 text-[11px] font-mono text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Total: ",
              sorted.length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Queued: ",
              sorted.filter((p) => p.status === "queued").length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cyan-400", children: [
              "Running: ",
              sorted.filter((p) => p.status === "running").length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-amber-400", children: [
              "Waiting: ",
              sorted.filter((p) => p.status === "waiting").length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-green-400", children: [
              "Completed: ",
              sorted.filter((p) => p.status === "completed").length
            ] })
          ] })
        ]
      }
    ),
    waitingProcesses.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded overflow-hidden",
        "data-ocid": "processes.greedy_table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 border-b border-border bg-muted/20 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider", children: "Greedy Priority Preview — Waiting Queue" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-[70px_1fr_70px_90px_110px] px-4 py-2 border-b border-border/60 bg-muted/10", children: ["PID", "Name", "Priority", "Burst", "Score"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider",
              children: h
            },
            h
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/40", children: [...waitingProcesses].sort((a, b) => greedyScore(b) - greedyScore(a)).slice(0, 8).map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `grid grid-cols-[70px_1fr_70px_90px_110px] px-4 py-2 ${idx === 0 ? "bg-cyan-950/15" : ""}`,
              "data-ocid": `processes.greedy_item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: p.pid }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium truncate min-w-0 pr-2", children: p.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `font-mono text-sm font-bold ${PRIORITY_COLOR(p.priority)}`,
                    children: p.priority
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-foreground/70", children: [
                  p.burst_time,
                  "ms"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `font-mono text-xs font-bold ${idx === 0 ? "text-cyan-300" : "text-foreground/70"}`,
                    children: greedyScore(p).toFixed(4)
                  }
                )
              ]
            },
            p.pid
          )) })
        ]
      }
    )
  ] });
}
export {
  ProcessesPage as default
};
