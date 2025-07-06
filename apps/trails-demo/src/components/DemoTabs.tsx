import type React from "react"
import { Link, useLocation } from "react-router"

export const DemoTabs: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="bg-gray-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16">
          <div className="flex items-center">
            {/* Background container with rounded corners and border */}
            <div className="bg-[#1D293D] border border-[#45556C] rounded-lg p-3">
              <div className="flex space-x-2">
                <Link
                  to="/widget"
                  className={`
                    relative px-6 py-2 text-sm font-medium transition-all duration-200 rounded-md
                    ${
                      isActive("/widget") || isActive("/")
                        ? "text-[#F4F4F5] bg-[#45556C] shadow-sm"
                        : "text-[#F4F4F5] hover:text-white hover:bg-[#2D3A4F]"
                    }
                  `}
                >
                  Widget
                </Link>
                <Link
                  to="/orchestration"
                  className={`
                    relative px-6 py-2 text-sm font-medium transition-all duration-200 rounded-md
                    ${
                      isActive("/orchestration")
                        ? "text-[#F4F4F5] bg-[#45556C] shadow-sm"
                        : "text-[#F4F4F5] hover:text-white hover:bg-[#2D3A4F]"
                    }
                  `}
                >
                  Orchestration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
