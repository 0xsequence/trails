import { Outlet, useLocation } from "react-router"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

export const RootLayout = () => {
  const location = useLocation()
  const isWidgetDemo =
    location.pathname === "/widget" || location.pathname === "/"

  return (
    <div
      className={`flex flex-col bg-white dark:bg-gray-950 ${isWidgetDemo ? "lg:h-screen lg:overflow-hidden min-h-screen" : "min-h-screen"}`}
    >
      <SiteHeader />
      <main className={`flex-1 ${isWidgetDemo ? "lg:overflow-hidden" : ""}`}>
        <div className="w-full h-full">
          <Outlet />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
