import type React from "react"
import { Link, useLocation } from "react-router"

export const DemoTabs: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16">
          <div className="flex items-center">
            {/* Background container with rounded corners and border */}
            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3">
              <div className="flex space-x-2">
                <Link
                  to="/widget"
                  className={`
                    relative px-6 py-2 text-sm font-medium transition-all duration-200 rounded-md
                    ${
                      isActive("/widget") || isActive("/")
                        ? "text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
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
                        ? "text-gray-900 dark:text-white bg-white dark:bg-gray-700 shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
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
