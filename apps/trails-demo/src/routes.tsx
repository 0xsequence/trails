import { createBrowserRouter } from "react-router"
import { ErrorRoute } from "./routes/error"
import { NotFound } from "./routes/not-found"
import { OrchestrationDemo } from "./routes/orchestration-demo"
import { RootLayout } from "./routes/root-layout"
import { SdkSandbox } from "./routes/sdk-sandbox"
import { WidgetDemo } from "./routes/widget-demo"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorRoute,
    children: [
      {
        path: "",
        index: true,
        Component: WidgetDemo,
      },
      {
        path: "orchestration",
        Component: OrchestrationDemo,
      },
      {
        path: "widget",
        Component: WidgetDemo,
      },
      {
        path: "sdk-sandbox",
        Component: SdkSandbox,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
])

export default router
