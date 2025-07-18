import { useState, useEffect } from "react"
import { Outlet } from "react-router"
import { AuthPage } from "./auth"

export const AuthWrapper: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if auth is required (VITE_AUTH_PASSWORD exists)
    const authPassword = import.meta.env.VITE_AUTH_PASSWORD

    if (!authPassword) {
      // No auth required, skip authentication
      setIsAuthenticated(true)
      setIsLoading(false)
      return
    }

    // Auth is required, check if user is authenticated
    const authStatus = localStorage.getItem("trails_demo_auth")
    setIsAuthenticated(authStatus === "true")
    setIsLoading(false)
  }, [])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />
  }

  return <Outlet />
}

export default AuthWrapper
