# Design Brief

**Purpose**: Professional system resource monitoring & ML-driven scheduling dashboard. Clinical precision, high information density, trust-driven interactions.

**Tone**: Industrial monitoring. No decoration. All visual elements serve data clarity and pattern recognition.

**Differentiation**: Layered depth via elevation system (background → cards → nested panels). Color-coded health badges (green/amber/red). Micro-contrast for readability at scale. Monospace metrics for precision.

## Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| background | 0.99 0 0 | 0.1 0 0 | Page bg, breathing room |
| foreground | 0.15 0 0 | 0.95 0 0 | Body text, labels |
| card | 1.0 0 0 | 0.15 0 0 | Metric tiles, chart containers, panels |
| primary | 0.55 0.2 240 | 0.75 0.18 200 | CTAs, interactive (cyan system health) |
| accent | 0.75 0.18 200 | 0.75 0.18 200 | Highlights, active indicators |
| chart-1 | 0.72 0.25 200 | 0.75 0.22 200 | Cyan—CPU/primary metric |
| chart-2 | 0.65 0.22 40 | 0.65 0.22 40 | Amber—warning/secondary metric |
| chart-3 | 0.68 0.28 167 | 0.72 0.25 167 | Purple—tertiary metric |
| destructive | 0.55 0.22 25 | 0.65 0.19 22 | Critical alerts, errors |
| success | custom | green-950 bg, green-300 text | Health badge (≥ threshold) |
| warning | custom | amber-950 bg, amber-300 text | Caution badge (75–99% threshold) |
| critical | custom | red-950 bg, red-300 text | Alert badge (< 70% threshold) |

## Typography

| Tier | Font | Weight | Size | Usage |
|------|------|--------|------|-------|
| Display | Space Grotesk | 700 | 32px | Page title, section headers |
| Headline | Space Grotesk | 600 | 18px | Card titles, metric labels |
| Body | Inter | 400 | 14px | Descriptions, log entries, UI labels |
| Metric | Geist Mono | 600 | 12–16px | KPI values, timestamps, code |

## Shape & Radius

- Buttons, badges: `rounded-sm` (0.25rem / 4px)
- Cards, panels: `rounded-sm` (0.25rem / 4px)
- Inputs, dropdowns: `rounded-sm` (0.25rem / 4px)
- No soft/pill shapes. Intentional minimalism.

## Elevation & Depth

| Elevation | Shadow | Context |
|-----------|--------|---------|
| L0 | none | Background, inputs |
| L1 | elevation-1 (0 2px 8px) | Metric cards, nested panels |
| L2 | elevation-2 (0 4px 12px) | Modals, popovers, menu flyouts |
| L3 | elevation-3 (0 8px 24px) | Full-page overlays, top-level modals |

Dark mode shadows tuned for `0.1` background. Light mode uses lighter opacity for subtle separation.

## Structural Zones

| Zone | Treatment |
|------|-----------|
| Header | `bg-card` (dark), `border-b border-border`, 16px v-padding, contains logo + breadcrumb + policy override |
| Main Content | `bg-background`, grid layout (KPI tiles top, charts middle, logs bottom) |
| KPI Tiles | 4-column grid (CPU, Memory, Process Count, Decision Latency), `bg-card`, `elevation-1` shadow, metric value in `font-mono`, status badge in corner |
| Charts | 2-column grid (CPU/Memory line chart, Gantt timeline), `bg-card`, `elevation-1` shadow, recharts with `chart-1`/`chart-2` colors |
| Decision Log | Scrollable table, `bg-card`, truncated rows, timestamp + policy + confidence + override flag |
| Footer / Controls | `bg-muted/20`, `border-t`, "Start Simulation" button (accent primary), Policy Override button (accent red on critical) |

## Component Patterns

**KPI Tile**: Card (`elevation-1`) → header (metric name) → large value (monospace) → status badge (success/warning/critical) → sparkline (recharts mini).

**Alert Badge**: Inline pill, color-coded by severity (success=green-950/green-300, warning=amber-950/amber-300, critical=red-950/red-300), icon + text, `rounded-sm`.

**Policy Override Button**: Always visible in header, accent cyan (primary), toggles red when threshold-breach condition detected, triggers re-inference.

**Chart**: Recharts ResponsiveContainer, dark background (`bg-card`), axis labels in `text-muted-foreground`, series in `chart-*` colors, no decorative gridlines, minimal.

## Motion

- Hover: opacity 80%, text-opacity changes only on interactive elements
- State change: `transition-smooth` (0.3s cubic-bezier) for all color/transform changes
- Chart data updates: no bounce, linear easing
- No entrance animations on page load (dashboard must load and show data quickly)

## Constraints

- Max 2 fonts (Space Grotesk + Inter + Geist Mono = 3 max acceptable for monitoring)
- No gradients (except minimal accent highlights if needed for CTAs)
- No blurs, glass-morphism, or decorative effects
- High contrast AA+ for all text on background
- Monospace for all numeric values, timestamps, confidence scores
- Consistent 4px border-radius everywhere
- No arbitrary colors; all tokens defined in OKLCH

## Signature Detail

Card borders: subtle `border border-border` (0.25 opacity) instead of box-shadow alone. Creates visual separation without depth. Borders crisp, predictable, scannable—aligns with professional monitoring tool aesthetic (Grafana, Prometheus dashboards).

