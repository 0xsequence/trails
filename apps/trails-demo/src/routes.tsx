import { createBrowserRouter } from "react-router"
import { ErrorRoute } from "./routes/error"
import { Home } from "./routes/home"
import { NotFound } from "./routes/not-found"
import { RootLayout } from "./routes/root-layout"
import { Widget } from "./routes/widget"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorRoute,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "widget",
        Component: Widget,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
])

export default router
