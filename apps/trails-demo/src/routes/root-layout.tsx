import { Outlet } from "react-router"

export const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
