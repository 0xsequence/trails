import { createBrowserRouter } from "react-router"
import { ErrorRoute } from "./routes/error"
import { NotFound } from "./routes/not-found"
import { OrchestrationDemo } from "./routes/orchestration-demo"
import { ProviderProxyDemo } from "./routes/provider-proxy-demo"
import { RootLayout } from "./routes/root-layout"
import { SdkSandbox } from "./routes/sdk-sandbox"
import { WidgetDemo } from "./routes/widget-demo"
import { AuthWrapper } from "./routes/auth-wrapper"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthWrapper,
    ErrorBoundary: ErrorRoute,
    children: [
      {
        path: "",
        Component: RootLayout,
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
            path: "provider-proxy",
            Component: ProviderProxyDemo,
          },
          {
            path: "*",
            Component: NotFound,
          },
        ],
      },
    ],
  },
])

export default router
