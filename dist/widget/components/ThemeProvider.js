import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as DesignSystemThemeProvider } from "@0xsequence/design-system";
const ThemeContext = createContext(undefined);
// Helper function to determine if theme should be dark
const getIsDark = (theme) => {
    if (theme === "dark")
        return true;
    if (theme === "light")
        return false;
    if (theme === "auto") {
        // Check system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
};
export const ThemeProvider = ({ children, initialTheme = "auto", }) => {
    const [theme, setTheme] = useState(initialTheme);
    const [isDark, setIsDark] = useState(getIsDark(initialTheme));
    // Update theme when initialTheme prop changes
    useEffect(() => {
        setTheme(initialTheme);
        setIsDark(getIsDark(initialTheme));
    }, [initialTheme]);
    // Listen for system theme changes when in auto mode
    useEffect(() => {
        if (theme !== "auto") {
            setIsDark(getIsDark(theme));
            return;
        }
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            setIsDark(e.matches);
        };
        // Set initial state for auto mode
        setIsDark(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);
    const getActiveTheme = () => {
        return isDark ? "dark" : "light";
    };
    return (_jsx(DesignSystemThemeProvider, { theme: theme === "dark" ? "dark" : "light", children: _jsx(ThemeContext.Provider, { value: { theme, setTheme, isDark, getActiveTheme }, children: _jsx("div", { className: isDark ? "dark" : "", "data-theme": isDark ? "dark" : "light", children: children }) }) }));
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
