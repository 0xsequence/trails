import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Theme } from "../../theme.js"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  initialTheme?: Theme
}

// Helper function to determine if theme should be dark
const getIsDark = (theme: Theme): boolean => {
  if (theme === "dark") return true
  if (theme === "light") return false
  if (theme === "auto") {
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  }
  return false
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = "auto",
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [isDark, setIsDark] = useState(getIsDark(initialTheme))

  // Update theme when initialTheme prop changes
  useEffect(() => {
    setTheme(initialTheme)
    setIsDark(getIsDark(initialTheme))
  }, [initialTheme])

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (theme !== "auto") {
      setIsDark(getIsDark(theme))
      return
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
    }

    // Set initial state for auto mode
    setIsDark(mediaQuery.matches)

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      <div
        className={isDark ? "dark" : ""}
        data-theme={isDark ? "dark" : "light"}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
