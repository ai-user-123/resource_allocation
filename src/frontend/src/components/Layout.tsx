import { Separator } from "@/components/ui/separator";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  ChevronRight,
  Cpu,
  LayoutDashboard,
  PlayCircle,
  ScrollText,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    ocid: "nav.dashboard_link",
  },
  {
    to: "/processes",
    label: "Processes",
    icon: Cpu,
    ocid: "nav.processes_link",
  },
  { to: "/logs", label: "Logs", icon: ScrollText, ocid: "nav.logs_link" },
  {
    to: "/simulation",
    label: "Simulation",
    icon: PlayCircle,
    ocid: "nav.simulation_link",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-sidebar-border">
          <div className="w-7 h-7 rounded bg-accent/20 border border-accent/40 flex items-center justify-center">
            <Activity className="w-4 h-4 text-accent" />
          </div>
          <div>
            <div className="text-sm font-bold font-display text-sidebar-foreground tracking-wide">
              ResourceFlow
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">
              v1.0 · live
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 pb-1.5 pt-1">
            Monitoring
          </div>
          {NAV_ITEMS.map(({ to, label, icon: Icon, ocid }) => {
            const isActive =
              to === "/" ? currentPath === "/" : currentPath.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                data-ocid={ocid}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded text-sm transition-smooth group ${
                  isActive
                    ? "bg-accent/15 text-accent border border-accent/25"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${isActive ? "text-accent" : ""}`}
                />
                <span className="font-medium">{label}</span>
                {isActive && (
                  <ChevronRight className="w-3 h-3 ml-auto text-accent/70" />
                )}
              </Link>
            );
          })}
        </nav>

        <Separator className="bg-sidebar-border" />

        {/* Bottom */}
        <div className="px-2 py-3 space-y-0.5">
          <button
            type="button"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent w-full transition-smooth"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-foreground font-display">
              {NAV_ITEMS.find((n) =>
                n.to === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(n.to),
              )?.label ?? "ResourceFlow"}
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] text-muted-foreground font-mono">
                live
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono bg-muted/30 border border-border px-2.5 py-1 rounded">
              <span className="text-muted-foreground">Policy:</span>
              <span className="text-accent font-semibold uppercase">RF+ML</span>
            </div>
            <button
              type="button"
              className="relative p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-smooth"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-background">{children}</main>

        {/* Footer */}
        <footer className="bg-card border-t border-border px-6 py-2 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-muted-foreground font-mono">
            © {new Date().getFullYear()} ResourceFlow. Built with{" "}
            <span className="text-accent">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              caffeine.ai
            </a>
          </span>
          <span className="text-[11px] text-muted-foreground font-mono">
            Refresh: 1s · ML: 2s
          </span>
        </footer>
      </div>
    </div>
  );
}
