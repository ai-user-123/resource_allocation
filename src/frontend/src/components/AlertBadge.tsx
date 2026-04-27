import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import type { AlertSeverity } from "../types";

interface AlertBadgeProps {
  severity: AlertSeverity;
  label?: string;
  count?: number;
  className?: string;
}

export function AlertBadge({
  severity,
  label,
  count,
  className = "",
}: AlertBadgeProps) {
  if (severity === "ok") {
    return (
      <span className={`badge-success ${className}`} data-ocid="alert.badge">
        <CheckCircle className="w-3 h-3" />
        {label ?? "Green"}
        {count !== undefined && count > 0 && (
          <span className="ml-1 bg-green-700 text-green-100 rounded-full px-1 text-[10px]">
            {count}
          </span>
        )}
      </span>
    );
  }

  if (severity === "warning") {
    return (
      <span className={`badge-warning ${className}`} data-ocid="alert.badge">
        <AlertTriangle className="w-3 h-3" />
        {label ?? "Amber"}
        {count !== undefined && count > 0 && (
          <span className="ml-1 bg-amber-700 text-amber-100 rounded-full px-1 text-[10px]">
            {count}
          </span>
        )}
      </span>
    );
  }

  // severity === "critical"
  return (
    <span
      className={`badge-critical ${className}`}
      data-ocid="alert.badge"
      aria-label={label ?? "Critical"}
    >
      <XCircle className="w-3 h-3" />
      {label ?? "Critical"}
      {count !== undefined && count > 0 && (
        <span className="ml-1 bg-red-700 text-red-100 rounded-full px-1 text-[10px]">
          {count}
        </span>
      )}
    </span>
  );
}

export function getAlertSeverity(
  value: number,
  target: number,
  comparison: "gte" | "lte",
): AlertSeverity {
  if (comparison === "gte") {
    if (value >= target) return "ok";
    if (value >= target * 0.85) return "warning";
    return "critical";
  }
  if (value <= target) return "ok";
  if (value <= target * 1.3) return "warning";
  return "critical";
}
