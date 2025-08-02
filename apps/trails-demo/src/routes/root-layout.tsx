import { Outlet, useLocation } from "react-router"
import { useState } from "react"
import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"

export const RootLayout = () => {
  const location = useLocation()
  const [showHeaderFooter, setShowHeaderFooter] = useState(true)
  const isWidgetDemo =
    location.pathname === "/widget" || location.pathname === "/"

  const toggleHeaderFooter = () => {
    setShowHeaderFooter(!showHeaderFooter)
  }

  return (
    <div
      className={`flex flex-col bg-white dark:bg-gray-950 ${isWidgetDemo ? "lg:h-screen lg:overflow-hidden min-h-screen" : "min-h-screen"}`}
    >
      {/* Toggle Tab Button */}
      <button
        type="button"
        onClick={toggleHeaderFooter}
        className="hidden lg:block lg:fixed lg:left-0 lg:bottom-20 lg:z-50 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-r-lg shadow-lg transition-all duration-200 transform"
        aria-label={
          showHeaderFooter ? "Hide Header & Footer" : "Show Header & Footer"
        }
        title={
          showHeaderFooter ? "Hide Header & Footer" : "Show Header & Footer"
        }
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {!showHeaderFooter ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          )}
        </svg>
      </button>

      {/* Header - conditionally rendered */}
      {showHeaderFooter && <SiteHeader />}

      <main className={`flex-1 ${isWidgetDemo ? "lg:overflow-hidden" : ""}`}>
        <div className="w-full h-full">
          <Outlet />
        </div>
      </main>

      {/* Footer - conditionally rendered */}
      {showHeaderFooter && <SiteFooter />}
    </div>
  )
}
