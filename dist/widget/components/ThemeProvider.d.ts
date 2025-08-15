import type React from "react";
import type { Theme } from "../../theme.js";
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    isDark: boolean;
    getActiveTheme: () => "light" | "dark";
}
interface ThemeProviderProps {
    children: React.ReactNode;
    initialTheme?: Theme;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare const useTheme: () => ThemeContextType;
export {};
//# sourceMappingURL=ThemeProvider.d.ts.map