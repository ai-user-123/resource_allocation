import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-B6KDdV9-.js";
import { T as TriangleAlert } from "./api-DS5_eO34.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function AlertBadge({
  severity,
  label,
  count,
  className = ""
}) {
  if (severity === "ok") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `badge-success ${className}`, "data-ocid": "alert.badge", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }),
      label ?? "Green",
      count !== void 0 && count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 bg-green-700 text-green-100 rounded-full px-1 text-[10px]", children: count })
    ] });
  }
  if (severity === "warning") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `badge-warning ${className}`, "data-ocid": "alert.badge", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
      label ?? "Amber",
      count !== void 0 && count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 bg-amber-700 text-amber-100 rounded-full px-1 text-[10px]", children: count })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `badge-critical ${className}`,
      "data-ocid": "alert.badge",
      "aria-label": label ?? "Critical",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
        label ?? "Critical",
        count !== void 0 && count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 bg-red-700 text-red-100 rounded-full px-1 text-[10px]", children: count })
      ]
    }
  );
}
function getAlertSeverity(value, target, comparison) {
  if (comparison === "gte") {
    if (value >= target) return "ok";
    if (value >= target * 0.85) return "warning";
    return "critical";
  }
  if (value <= target) return "ok";
  if (value <= target * 1.3) return "warning";
  return "critical";
}
export {
  AlertBadge as A,
  getAlertSeverity as g
};
