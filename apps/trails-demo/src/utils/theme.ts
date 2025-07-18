export type Theme = "light" | "dark" | "auto"
export type ActiveTheme = "light" | "dark"

// Function to get system theme preference
export const getSystemTheme = (): ActiveTheme => {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

// Function to get initial theme based on mode
export const getInitialTheme = (mode: Theme): ActiveTheme => {
  if (mode === "auto") {
    return getSystemTheme()
  }
  return mode as ActiveTheme
}

// Function to apply theme to document
export const applyTheme = (theme: ActiveTheme) => {
  if (typeof document === "undefined") return

  const root = document.documentElement
  const body = document.body

  if (theme === "dark") {
    root?.classList.add("dark")
    body?.classList.add("dark")
    root?.setAttribute("data-theme", "dark")
    body?.setAttribute("data-theme", "dark")
  } else {
    root?.classList.remove("dark")
    body?.classList.remove("dark")
    root?.setAttribute("data-theme", "light")
    body?.setAttribute("data-theme", "light")
  }
}
