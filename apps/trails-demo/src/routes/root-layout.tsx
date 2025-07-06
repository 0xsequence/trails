import { Outlet } from "react-router"
import { SiteFooter } from "@/components/SiteFooter"

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="py-10 flex-1">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
