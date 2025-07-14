import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { ActiveTheme, Theme } from "@/utils/theme"
import { applyTheme, getInitialTheme, getSystemTheme } from "@/utils/theme"

interface ThemeContextType {
  theme: ActiveTheme
  themeMode: Theme
  setThemeMode: (mode: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  initialTheme?: Theme
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = "light",
}) => {
  const [theme, setTheme] = useState<ActiveTheme>(getInitialTheme(initialTheme))
  const [themeMode, setThemeMode] = useState<Theme>(initialTheme)

  // Only listen to system theme changes if themeMode is "auto"
  useEffect(() => {
    if (themeMode !== "auto") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light")
    }

    // Set initial theme based on system preference only if mode is "auto"
    setTheme(mediaQuery.matches ? "dark" : "light")
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [themeMode])

  // Handle initialTheme changes
  useEffect(() => {
    setThemeMode(initialTheme)
    // Force the theme to match the initialTheme, regardless of system preference
    if (initialTheme === "light") {
      setTheme("light")
    } else if (initialTheme === "dark") {
      setTheme("dark")
    } else {
      // Only use system preference for "auto" mode
      setTheme(getSystemTheme())
    }
  }, [initialTheme])

  // Apply theme to document
  useEffect(() => {
    applyTheme(theme)

    // Also sync with Sequence design system theme if available
    try {
      const sequenceThemeRoot = document.querySelector("[data-theme]")
      if (
        sequenceThemeRoot &&
        (sequenceThemeRoot === document.documentElement ||
          sequenceThemeRoot === document.body)
      ) {
        sequenceThemeRoot.setAttribute("data-theme", theme)
      }
    } catch (error: unknown) {
      console.error("Error setting Sequence theme:", error)
    }
  }, [theme])

  // Force light theme on mount to prevent dark mode flash
  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    // Ensure light theme is set immediately
    root.setAttribute("data-theme", "light")
    body.setAttribute("data-theme", "light")
    root.classList.remove("dark")
    body.classList.remove("dark")

    // Watch for changes to data-theme attribute and prevent dark mode only on initial load
    let isInitialized = false
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          const target = mutation.target as Element
          const currentTheme = target.getAttribute("data-theme")

          // Only prevent dark mode if it's being set on html or body elements AND we haven't initialized yet
          if (
            currentTheme === "dark" &&
            (target === root || target === body) &&
            !isInitialized
          ) {
            target.setAttribute("data-theme", "light")
            target.classList.remove("dark")
          }
        }

        // Also watch for dark class additions and remove them (only on html/body and only before initialization)
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const target = mutation.target as Element
          if (
            target.classList.contains("dark") &&
            (target === root || target === body) &&
            !isInitialized
          ) {
            target.classList.remove("dark")
          }
        }
      })
    })

    // Observe both html and body elements for data-theme and class changes
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    })
    observer.observe(body, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    })

    // Mark as initialized after a short delay to allow theme changes
    setTimeout(() => {
      isInitialized = true
    }, 1000)

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleSetThemeMode = (mode: Theme) => {
    setThemeMode(mode)
    if (mode === "light") {
      setTheme("light")
    } else if (mode === "dark") {
      setTheme("dark")
    } else {
      // Only use system preference for "auto" mode
      setTheme(getSystemTheme())
    }
  }

  return (
    <ThemeContext.Provider
      value={{ theme, themeMode, setThemeMode: handleSetThemeMode }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
