import { createBrowserRouter } from "react-router"
import { ErrorRoute } from "./routes/error"
import { HomeIndexRoute } from "./routes/home/home-index-route"
import { RootLayout } from "./routes/root-layout"
import Widget from "./routes/widget"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorRoute,
    children: [
      {
        index: true,
        Component: HomeIndexRoute,
      },
      {
        path: "widget",
        Component: Widget,
      },
    ],
  },
])

export default router
