import { Skeleton } from "@/components/ui/skeleton";
import { Outlet, RouterProvider, createRouter } from "@tanstack/react-router";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

const DashboardPage = lazy(() => import("./pages/Dashboard"));
const ProcessesPage = lazy(() => import("./pages/Processes"));
const LogsPage = lazy(() => import("./pages/Logs"));
const SimulationPage = lazy(() => import("./pages/Simulation"));

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }, (_, i) => `skel-${i}`).map((key) => (
          <Skeleton key={key} className="h-24" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <div data-ocid="app.page" className="h-full">
          <Outlet />
        </div>
      </Suspense>
    </Layout>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const processesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/processes",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProcessesPage />
    </Suspense>
  ),
});

const logsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/logs",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LogsPage />
    </Suspense>
  ),
});

const simulationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/simulation",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SimulationPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  processesRoute,
  logsRoute,
  simulationRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
