import { c as createLucideIcon, a as clsx, j as jsxRuntimeExports, H as Slot, x as cn } from "./index-B6KDdV9-.js";
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
let processStore = [];
let logStore = [];
let currentPolicy = "round_robin";
let policyOverrideActive = false;
let logIdCounter = 1;
function generateInitialLogs() {
  const now = Date.now();
  return Array.from({ length: 20 }, (_, i) => ({
    log_id: i + 1,
    timestamp: now - (19 - i) * 1e3,
    cpu_usage: 20 + Math.random() * 60,
    memory_usage: 30 + Math.random() * 50,
    active_processes: Math.floor(5 + Math.random() * 30),
    selected_policy: ["round_robin", "sjf", "priority"][Math.floor(Math.random() * 3)],
    io_bandwidth: 50 + Math.random() * 200
  }));
}
logStore = generateInitialLogs();
logIdCounter = logStore.length + 1;
async function getMetrics() {
  const cpu = 15 + Math.random() * 75;
  const mem = 25 + Math.random() * 65;
  const active = Math.floor(5 + Math.random() * 40);
  const io = 50 + Math.random() * 350;
  const log = {
    log_id: logIdCounter++,
    timestamp: Date.now(),
    cpu_usage: cpu,
    memory_usage: mem,
    active_processes: active,
    selected_policy: currentPolicy,
    io_bandwidth: io
  };
  logStore = [...logStore.slice(-99), log];
  const completed = processStore.filter((p) => p.status === "completed").length;
  const stats = {
    cpu_utilization: Math.min(99, cpu + Math.random() * 10),
    avg_waiting_time: 8 + Math.random() * 20,
    throughput: 150 + Math.random() * 100,
    memory_efficiency: Math.min(98, mem + Math.random() * 10),
    decision_latency: 0.5 + Math.random() * 2.5,
    total_processes: processStore.length,
    completed_processes: completed
  };
  return {
    cpu_usage: cpu,
    memory_usage: mem,
    active_processes: active,
    io_bandwidth: io,
    timestamp: Date.now(),
    selected_policy: currentPolicy,
    stats
  };
}
async function submitProcess(process) {
  const newProcess = {
    ...process,
    remaining_time: process.burst_time,
    status: "queued"
  };
  processStore = [...processStore, newProcess];
  return newProcess;
}
async function getSchedulingDecision() {
  const recentLogs = logStore.slice(-5);
  const cpuAvg = recentLogs.reduce((s, l) => s + l.cpu_usage, 0) / (recentLogs.length || 1);
  const memAvg = recentLogs.reduce((s, l) => s + l.memory_usage, 0) / (recentLogs.length || 1);
  let policy;
  let confidence;
  let reasoning;
  if (policyOverrideActive) {
    policy = "round_robin";
    confidence = 100;
    reasoning = "Adaptive override active — throughput below 70% target";
  } else if (cpuAvg > 80 && processStore.length > 10) {
    policy = "priority";
    confidence = 78 + Math.random() * 15;
    reasoning = `High CPU load (${cpuAvg.toFixed(1)}%) with ${processStore.length} processes → Priority scheduling`;
  } else if (cpuAvg < 40 && memAvg < 50) {
    policy = "sjf";
    confidence = 72 + Math.random() * 18;
    reasoning = `Low load (CPU ${cpuAvg.toFixed(1)}%, Mem ${memAvg.toFixed(1)}%) → SJF optimal`;
  } else {
    policy = "round_robin";
    confidence = 65 + Math.random() * 20;
    reasoning = `Moderate load (CPU ${cpuAvg.toFixed(1)}%) → Round Robin for fairness`;
  }
  currentPolicy = policy;
  return {
    policy,
    confidence: Math.min(99, confidence),
    reasoning,
    features_used: ["cpu_avg", "mem_avg", "arrival_rate", "tod_sin", "tod_cos"],
    timestamp: Date.now(),
    is_override: policyOverrideActive
  };
}
async function getResults() {
  const completed = processStore.filter((p) => p.status === "completed").length;
  return {
    cpu_utilization: 75 + Math.random() * 20,
    avg_waiting_time: 8 + Math.random() * 18,
    throughput: 160 + Math.random() * 80,
    memory_efficiency: 70 + Math.random() * 25,
    decision_latency: 0.4 + Math.random() * 2,
    total_processes: processStore.length,
    completed_processes: completed
  };
}
async function getLogs(page = 1, pageSize = 20) {
  const sorted = [...logStore].sort((a, b) => b.timestamp - a.timestamp);
  const start = (page - 1) * pageSize;
  return {
    logs: sorted.slice(start, start + pageSize),
    total: sorted.length,
    page,
    page_size: pageSize
  };
}
async function overridePolicy(force) {
  policyOverrideActive = force;
  if (force) currentPolicy = "round_robin";
}
async function clearData() {
  processStore = [];
  logStore = generateInitialLogs();
  logIdCounter = logStore.length + 1;
  policyOverrideActive = false;
  currentPolicy = "round_robin";
}
function getProcessStore() {
  return processStore;
}
function addProcessesToStore(processes) {
  processStore = [...processStore, ...processes];
}
function updateProcessStore(updated) {
  processStore = updated;
}
export {
  Badge as B,
  TriangleAlert as T,
  getResults as a,
  getSchedulingDecision as b,
  clearData as c,
  Button as d,
  getProcessStore as e,
  getLogs as f,
  getMetrics as g,
  addProcessesToStore as h,
  overridePolicy as o,
  submitProcess as s,
  updateProcessStore as u
};
