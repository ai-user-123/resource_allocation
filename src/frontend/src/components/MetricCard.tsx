import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import type { AlertSeverity } from "../types";
import { AlertBadge, getAlertSeverity } from "./AlertBadge";

interface MetricCardProps {
  label: string;
  value: number | string;
  unit?: string;
  target?: number;
  comparison?: "gte" | "lte";
  prevValue?: number;
  isLoading?: boolean;
  icon?: React.ReactNode;
  "data-ocid"?: string;
}

function TrendIcon({
  value,
  prevValue,
}: { value: number; prevValue?: number }) {
  if (prevValue === undefined)
    return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
  if (value > prevValue)
    return <TrendingUp className="w-3.5 h-3.5 text-green-400" />;
  if (value < prevValue)
    return <TrendingDown className="w-3.5 h-3.5 text-red-400" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
}

export function MetricCard({
  label,
  value,
  unit,
  target,
  comparison,
  prevValue,
  isLoading,
  icon,
  "data-ocid": dataOcid,
}: MetricCardProps) {
  const numericValue =
    typeof value === "number" ? value : Number.parseFloat(String(value));
  let severity: AlertSeverity = "ok";
  if (target !== undefined && comparison && !Number.isNaN(numericValue)) {
    severity = getAlertSeverity(numericValue, target, comparison);
  }

  const accentClass =
    severity === "ok"
      ? "border-green-900/50"
      : severity === "warning"
        ? "border-amber-900/50"
        : "border-red-900/50";

  return (
    <div
      className={`bg-card border ${accentClass} rounded p-4 flex flex-col gap-2 shadow-elevation-1 relative overflow-hidden`}
      data-ocid={dataOcid}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider truncate min-w-0">
          {label}
        </span>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {target !== undefined && comparison && (
            <AlertBadge severity={severity} />
          )}
          {icon && <span className="text-muted-foreground">{icon}</span>}
        </div>
      </div>

      {/* Value */}
      {isLoading ? (
        <div className="h-8 w-24 bg-muted/50 rounded animate-pulse" />
      ) : (
        <div className="flex items-end gap-1.5">
          <span className="font-mono text-2xl font-bold text-foreground leading-none tracking-tight">
            {typeof value === "number"
              ? value.toFixed(value < 10 ? 2 : 1)
              : value}
          </span>
          {unit && (
            <span className="text-xs text-muted-foreground mb-0.5 font-mono">
              {unit}
            </span>
          )}
          {typeof prevValue === "number" && (
            <span className="mb-0.5 ml-auto">
              <TrendIcon value={numericValue} prevValue={prevValue} />
            </span>
          )}
        </div>
      )}

      {/* Target */}
      {target !== undefined && (
        <div className="text-[11px] text-muted-foreground font-mono">
          Target: {comparison === "gte" ? "≥" : "≤"} {target}
          {unit}
        </div>
      )}

      {/* Severity accent line */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 w-full ${
          severity === "ok"
            ? "bg-green-500/40"
            : severity === "warning"
              ? "bg-amber-500/40"
              : "bg-red-500/40"
        }`}
      />
    </div>
  );
}
