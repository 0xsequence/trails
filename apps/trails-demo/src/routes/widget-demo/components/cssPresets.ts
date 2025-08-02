// Default CSS values from index.css
export const DEFAULT_CSS_VALUES = `/* Font Family - Customizable font for the entire widget */
--trails-font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */

/* Primary Colors - These apply to both themes */
--trails-primary: rgb(59 130 246); /* blue-500 - Change this to customize */
--trails-primary-hover: rgb(37 99 235); /* blue-600 - Change this for hover state */
--trails-primary-disabled: rgb(209 213 219); /* gray-300 - Disabled state */
--trails-primary-disabled-text: rgb(107 114 128); /* gray-500 - Disabled text */

/* Light Mode Theme Variables */
--trails-bg-primary: rgb(255 255 255); /* white */
--trails-bg-secondary: rgb(249 250 251); /* gray-50 */
--trails-bg-tertiary: rgb(243 244 246); /* gray-100 */
--trails-bg-card: rgb(255 255 255); /* white */
--trails-bg-overlay: rgb(255 255 255); /* white */

--trails-text-primary: rgb(17 24 39); /* gray-900 */
--trails-text-secondary: rgb(75 85 99); /* gray-600 */
--trails-text-tertiary: rgb(107 114 128); /* gray-500 */
--trails-text-muted: rgb(156 163 175); /* gray-400 */
--trails-text-inverse: rgb(255 255 255); /* white */

--trails-border-primary: rgb(229 231 235); /* gray-200 */
--trails-border-secondary: rgb(209 213 219); /* gray-300 */
--trails-border-tertiary: rgb(243 244 246); /* gray-100 */

--trails-hover-bg: rgb(249 250 251); /* gray-50 */
--trails-hover-text: rgb(17 24 39); /* gray-900 */
--trails-focus-ring: rgb(59 130 246); /* blue-500 */

--trails-success-bg: rgb(240 253 244); /* green-50 */
--trails-success-text: rgb(22 163 74); /* green-600 */
--trails-success-border: rgb(187 247 208); /* green-200 */

--trails-warning-bg: rgb(255 251 235); /* amber-50 */
--trails-warning-text: rgb(217 119 6); /* amber-600 */
--trails-warning-border: rgb(253 230 138); /* amber-200 */

--trails-error-bg: rgb(254 242 242); /* red-50 */
--trails-error-text: rgb(220 38 38); /* red-600 */
--trails-error-border: rgb(254 202 202); /* red-200 */

--trails-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Input Field Colors */
--trails-input-bg: rgb(255 255 255); /* white */
--trails-input-border: rgb(209 213 219); /* gray-300 */
--trails-input-text: rgb(17 24 39); /* gray-900 */
--trails-input-placeholder: rgb(156 163 175); /* gray-400 */
--trails-input-focus-border: rgb(59 130 246); /* blue-500 */
--trails-input-focus-ring: rgb(59 130 246); /* blue-500 */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(255 255 255); /* white */
--trails-dropdown-border: rgb(229 231 235); /* gray-200 */
--trails-dropdown-text: rgb(17 24 39); /* gray-900 */
--trails-dropdown-hover-bg: rgb(249 250 251); /* gray-50 */
--trails-dropdown-selected-bg: rgb(243 244 246); /* gray-100 */
--trails-dropdown-selected-text: rgb(17 24 39); /* gray-900 */

`

// Green theme preset for light mode
export const GREEN_THEME_PRESET = `/* Font Family - Modern sans-serif for green theme */
--trails-font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */

/* Primary Colors - Green Theme */
--trails-primary: rgb(16 185 129); /* emerald-500 - more minty */
--trails-primary-hover: rgb(5 150 105); /* emerald-600 - darker minty */
--trails-primary-disabled: rgb(209 213 219); /* gray-300 */
--trails-primary-disabled-text: rgb(107 114 128); /* gray-500 */

/* Light Mode Theme Variables - Green Inspired */
--trails-bg-primary: rgb(240 253 244); /* green-50 - mint background */
--trails-bg-secondary: rgb(220 252 231); /* green-100 */
--trails-bg-tertiary: rgb(187 247 208); /* green-200 */
--trails-bg-card: rgb(248 254 250); /* very light mint green for cards/token list */
--trails-bg-overlay: rgb(255 255 255); /* white */

--trails-text-primary: rgb(21 128 61); /* green-800 */
--trails-text-secondary: rgb(22 163 74); /* green-600 */
--trails-text-tertiary: rgb(34 197 94); /* green-500 */
--trails-text-muted: rgb(134 239 172); /* green-400 */
--trails-text-inverse: rgb(255 255 255); /* white */

--trails-border-primary: rgb(187 247 208); /* green-200 */
--trails-border-secondary: rgb(134 239 172); /* green-400 */
--trails-border-tertiary: rgb(220 252 231); /* green-100 */

--trails-hover-bg: rgb(220 252 231); /* green-100 */
--trails-hover-text: rgb(21 128 61); /* green-800 */
--trails-focus-ring: rgb(34 197 94); /* green-500 */

--trails-success-bg: rgb(240 253 244); /* green-50 */
--trails-success-text: rgb(22 163 74); /* green-600 */
--trails-success-border: rgb(187 247 208); /* green-200 */

--trails-warning-bg: rgb(255 251 235); /* amber-50 */
--trails-warning-text: rgb(217 119 6); /* amber-600 */
--trails-warning-border: rgb(253 230 138); /* amber-200 */

--trails-error-bg: rgb(254 242 242); /* red-50 */
--trails-error-text: rgb(220 38 38); /* red-600 */
--trails-error-border: rgb(254 202 202); /* red-200 */

--trails-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Input Field Colors */
--trails-input-bg: rgb(248 254 250); /* very light mint green background */
--trails-input-border: rgb(134 239 172); /* green-400 */
--trails-input-text: rgb(21 128 61); /* green-800 */
--trails-input-placeholder: rgb(134 239 172); /* green-400 */
--trails-input-focus-border: rgb(34 197 94); /* green-500 */
--trails-input-focus-ring: rgb(34 197 94); /* green-500 */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(248 254 250); /* very light mint green background */
--trails-dropdown-border: rgb(187 247 208); /* green-200 */
--trails-dropdown-text: rgb(21 128 61); /* green-800 */
--trails-dropdown-hover-bg: rgb(220 252 231); /* green-100 */
--trails-dropdown-selected-bg: rgb(187 247 208); /* green-200 */
--trails-dropdown-selected-text: rgb(21 128 61); /* green-800 */

`

// Blue theme preset
export const BLUE_THEME_PRESET = `/* Font Family - Clean sans-serif for blue theme */
--trails-font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */

/* Primary Colors - Blue Theme */
--trails-primary: rgb(59 130 246); /* blue-500 */
--trails-primary-hover: rgb(37 99 235); /* blue-600 */
--trails-primary-disabled: rgb(209 213 219); /* gray-300 */
--trails-primary-disabled-text: rgb(107 114 128); /* gray-500 */

/* Light Mode Theme Variables - Blue Inspired */
--trails-bg-primary: rgb(239 246 255); /* blue-50 */
--trails-bg-secondary: rgb(219 234 254); /* blue-100 */
--trails-bg-tertiary: rgb(191 219 254); /* blue-200 */
--trails-bg-card: rgb(248 250 255); /* very light blue for cards/token list */
--trails-bg-overlay: rgb(255 255 255); /* white */

--trails-text-primary: rgb(30 58 138); /* blue-900 */
--trails-text-secondary: rgb(37 99 235); /* blue-600 */
--trails-text-tertiary: rgb(59 130 246); /* blue-500 */
--trails-text-muted: rgb(147 197 253); /* blue-400 */
--trails-text-inverse: rgb(255 255 255); /* white */

--trails-border-primary: rgb(191 219 254); /* blue-200 */
--trails-border-secondary: rgb(147 197 253); /* blue-400 */
--trails-border-tertiary: rgb(219 234 254); /* blue-100 */

--trails-hover-bg: rgb(219 234 254); /* blue-100 */
--trails-hover-text: rgb(30 58 138); /* blue-900 */
--trails-focus-ring: rgb(59 130 246); /* blue-500 */

--trails-success-bg: rgb(240 253 244); /* green-50 */
--trails-success-text: rgb(22 163 74); /* green-600 */
--trails-success-border: rgb(187 247 208); /* green-200 */

--trails-warning-bg: rgb(255 251 235); /* amber-50 */
--trails-warning-text: rgb(217 119 6); /* amber-600 */
--trails-warning-border: rgb(253 230 138); /* amber-200 */

--trails-error-bg: rgb(254 242 242); /* red-50 */
--trails-error-text: rgb(220 38 38); /* red-600 */
--trails-error-border: rgb(254 202 202); /* red-200 */

--trails-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Input Field Colors */
--trails-input-bg: rgb(248 250 255); /* very light blue background */
--trails-input-border: rgb(147 197 253); /* blue-400 */
--trails-input-text: rgb(30 58 138); /* blue-900 */
--trails-input-placeholder: rgb(147 197 253); /* blue-400 */
--trails-input-focus-border: rgb(59 130 246); /* blue-500 */
--trails-input-focus-ring: rgb(59 130 246); /* blue-500 */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(248 250 255); /* very light blue background */
--trails-dropdown-border: rgb(191 219 254); /* blue-200 */
--trails-dropdown-text: rgb(30 58 138); /* blue-900 */
--trails-dropdown-hover-bg: rgb(219 234 254); /* blue-100 */
--trails-dropdown-selected-bg: rgb(191 219 254); /* blue-200 */
--trails-dropdown-selected-text: rgb(30 58 138); /* blue-900 */

`

// Gray theme preset
export const GRAY_THEME_PRESET = `/* Font Family - Professional sans-serif for gray theme */
--trails-font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */

/* Primary Colors - Gray Theme */
--trails-primary: rgb(75 85 99); /* gray-600 - darker gray */
--trails-primary-hover: rgb(55 65 81); /* gray-700 - even darker gray */
--trails-primary-disabled: rgb(209 213 219); /* gray-300 */
--trails-primary-disabled-text: rgb(156 163 175); /* gray-400 */

/* Light Mode Theme Variables - Gray Inspired */
--trails-bg-primary: rgb(243 244 246); /* gray-100 - more gray */
--trails-bg-secondary: rgb(229 231 235); /* gray-200 - more gray */
--trails-bg-tertiary: rgb(209 213 219); /* gray-300 - more gray */
--trails-bg-card: rgb(249 250 251); /* gray-50 for cards/token list - more gray */
--trails-bg-overlay: rgb(255 255 255); /* white */

--trails-text-primary: rgb(17 24 39); /* gray-900 */
--trails-text-secondary: rgb(55 65 81); /* gray-700 */
--trails-text-tertiary: rgb(75 85 99); /* gray-600 */
--trails-text-muted: rgb(107 114 128); /* gray-500 */
--trails-text-inverse: rgb(255 255 255); /* white */

--trails-border-primary: rgb(229 231 235); /* gray-200 */
--trails-border-secondary: rgb(209 213 219); /* gray-300 */
--trails-border-tertiary: rgb(243 244 246); /* gray-100 */

--trails-hover-bg: rgb(243 244 246); /* gray-100 */
--trails-hover-text: rgb(17 24 39); /* gray-900 */
--trails-focus-ring: rgb(107 114 128); /* gray-500 */

--trails-success-bg: rgb(240 253 244); /* green-50 */
--trails-success-text: rgb(22 163 74); /* green-600 */
--trails-success-border: rgb(187 247 208); /* green-200 */

--trails-warning-bg: rgb(255 251 235); /* amber-50 */
--trails-warning-text: rgb(217 119 6); /* amber-600 */
--trails-warning-border: rgb(253 230 138); /* amber-200 */

--trails-error-bg: rgb(254 242 242); /* red-50 */
--trails-error-text: rgb(220 38 38); /* red-600 */
--trails-error-border: rgb(254 202 202); /* red-200 */

--trails-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Input Field Colors */
--trails-input-bg: rgb(249 250 251); /* gray-50 background */
--trails-input-border: rgb(209 213 219); /* gray-300 */
--trails-input-text: rgb(17 24 39); /* gray-900 */
--trails-input-placeholder: rgb(107 114 128); /* gray-500 */
--trails-input-focus-border: rgb(107 114 128); /* gray-500 */
--trails-input-focus-ring: rgb(107 114 128); /* gray-500 */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(249 250 251); /* gray-50 background */
--trails-dropdown-border: rgb(229 231 235); /* gray-200 */
--trails-dropdown-text: rgb(17 24 39); /* gray-900 */
--trails-dropdown-hover-bg: rgb(243 244 246); /* gray-100 */
--trails-dropdown-selected-bg: rgb(229 231 235); /* gray-200 */
--trails-dropdown-selected-text: rgb(17 24 39); /* gray-900 */

`

// Dark theme preset (Binance Chain-inspired)
export const DARK_THEME_PRESET = `/* Font Family - Bold sans-serif for dark theme */
--trails-font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */

/* Primary Colors - Dark Theme */
--trails-primary: rgb(245 158 11); /* amber-500 - Binance gold */
--trails-primary-hover: rgb(217 119 6); /* amber-600 - darker gold */
--trails-primary-disabled: rgb(75 85 99); /* gray-600 */
--trails-primary-disabled-text: rgb(156 163 175); /* gray-400 */

/* Dark Mode Theme Variables - Black and Gold (Binance-inspired) */
--trails-bg-primary: rgb(0 0 0); /* black */
--trails-bg-secondary: rgb(15 15 15); /* very dark gray */
--trails-bg-tertiary: rgb(25 25 25); /* dark gray */
--trails-bg-card: rgb(20 20 20); /* dark gray for cards/token list */
--trails-bg-overlay: rgb(0 0 0); /* black */

--trails-text-primary: rgb(255 255 255); /* white */
--trails-text-secondary: rgb(245 158 11); /* amber-500 - Binance gold */
--trails-text-tertiary: rgb(251 191 36); /* amber-400 - lighter gold */
--trails-text-muted: rgb(156 163 175); /* gray-400 */
--trails-text-inverse: rgb(0 0 0); /* black */

--trails-border-primary: rgb(55 65 81); /* gray-700 */
--trails-border-secondary: rgb(75 85 99); /* gray-600 */
--trails-border-tertiary: rgb(31 41 55); /* gray-800 */

--trails-hover-bg: rgb(25 25 25); /* dark gray on hover */
--trails-hover-text: rgb(255 255 255); /* white */
--trails-focus-ring: rgb(245 158 11); /* amber-500 - Binance gold */

--trails-success-bg: rgb(22 101 52); /* green-900 */
--trails-success-text: rgb(34 197 94); /* green-500 */
--trails-success-border: rgb(21 128 61); /* green-800 */

--trails-warning-bg: rgb(120 53 15); /* amber-900 */
--trails-warning-text: rgb(251 191 36); /* amber-400 */
--trails-warning-border: rgb(146 64 14); /* amber-800 */

--trails-error-bg: rgb(127 29 29); /* red-900 */
--trails-error-text: rgb(248 113 113); /* red-400 */
--trails-error-border: rgb(153 27 27); /* red-800 */

--trails-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5);

/* Input Field Colors */
--trails-input-bg: rgb(15 15 15); /* very dark gray background */
--trails-input-border: rgb(75 85 99); /* gray-600 */
--trails-input-text: rgb(255 255 255); /* white */
--trails-input-placeholder: rgb(245 158 11); /* amber-500 - Binance gold placeholder */
--trails-input-focus-border: rgb(245 158 11); /* amber-500 - Binance gold */
--trails-input-focus-ring: rgb(245 158 11); /* amber-500 - Binance gold */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(15 15 15); /* very dark gray background */
--trails-dropdown-border: rgb(75 85 99); /* gray-600 */
--trails-dropdown-text: rgb(255 255 255); /* white */
--trails-dropdown-hover-bg: rgb(25 25 25); /* dark gray on hover */
--trails-dropdown-selected-bg: rgb(25 25 25); /* dark gray selected background */
--trails-dropdown-selected-text: rgb(245 158 11); /* amber-500 - Binance gold selected text */
`

// Purple theme preset (Polygon-inspired)
export const PURPLE_THEME_PRESET = `/* Font Family - Modern geometric sans-serif for purple theme */
--trails-font-family: "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */

/* Primary Colors - Purple Theme */
--trails-primary: rgb(147 51 234); /* purple-600 */
--trails-primary-hover: rgb(126 34 206); /* purple-700 */
--trails-primary-disabled: rgb(75 85 99); /* gray-600 */
--trails-primary-disabled-text: rgb(156 163 175); /* gray-400 */

/* Dark Mode Theme Variables - Purple Inspired (Polygon) */
--trails-bg-primary: rgb(45 35 65); /* medium dark purple */
--trails-bg-secondary: rgb(55 45 75); /* purple-gray */
--trails-bg-tertiary: rgb(65 55 85); /* lighter purple-gray */
--trails-bg-card: rgb(70 60 90); /* lighter purple card background */
--trails-bg-overlay: rgb(40 30 60); /* dark purple overlay */

--trails-text-primary: rgb(255 255 255); /* white */
--trails-text-secondary: rgb(233 213 255); /* purple-200 */
--trails-text-tertiary: rgb(196 181 253); /* purple-400 */
--trails-text-muted: rgb(147 51 234); /* purple-600 */
--trails-text-inverse: rgb(45 35 65); /* medium dark purple */

--trails-border-primary: rgb(75 65 95); /* purple border */
--trails-border-secondary: rgb(85 75 105); /* lighter purple border */
--trails-border-tertiary: rgb(65 55 85); /* medium purple border */

--trails-hover-bg: rgb(65 55 85); /* lighter purple on hover */
--trails-hover-text: rgb(255 255 255); /* white */
--trails-focus-ring: rgb(147 51 234); /* purple-600 */

--trails-success-bg: rgb(22 101 52); /* green-900 */
--trails-success-text: rgb(34 197 94); /* green-500 */
--trails-success-border: rgb(21 128 61); /* green-800 */

--trails-warning-bg: rgb(120 53 15); /* amber-900 */
--trails-warning-text: rgb(251 191 36); /* amber-400 */
--trails-warning-border: rgb(146 64 14); /* amber-800 */

--trails-error-bg: rgb(127 29 29); /* red-900 */
--trails-error-text: rgb(248 113 113); /* red-400 */
--trails-error-border: rgb(153 27 27); /* red-800 */

--trails-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5);

/* Input Field Colors */
--trails-input-bg: rgb(45 35 65); /* medium dark purple background */
--trails-input-border: rgb(75 65 95); /* purple border */
--trails-input-text: rgb(255 255 255); /* white */
--trails-input-placeholder: rgb(147 51 234); /* purple-600 placeholder */
--trails-input-focus-border: rgb(147 51 234); /* purple-600 */
--trails-input-focus-ring: rgb(147 51 234); /* purple-600 */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(45 35 65); /* medium dark purple background */
--trails-dropdown-border: rgb(75 65 95); /* purple border */
--trails-dropdown-text: rgb(255 255 255); /* white */
--trails-dropdown-hover-bg: rgb(65 55 85); /* lighter purple on hover */
--trails-dropdown-selected-bg: rgb(75 65 95); /* purple selected background */
--trails-dropdown-selected-text: rgb(255 255 255); /* white */

`

// Mono theme preset (default theme with monospace font)
export const MONO_THEME_PRESET = `/* Font Family - Monospace for code-like theme */
--trails-font-family: monospace;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */

/* Primary Colors - These apply to both themes */
--trails-primary: rgb(0 0 0); /* black - Change this to customize */
--trails-primary-hover: rgb(55 65 81); /* gray-700 - Change this for hover state */
--trails-primary-disabled: rgb(209 213 219); /* gray-300 - Disabled state */
--trails-primary-disabled-text: rgb(107 114 128); /* gray-500 - Disabled text */

/* Light Mode Theme Variables */
--trails-bg-primary: rgb(255 255 255); /* white */
--trails-bg-secondary: rgb(249 250 251); /* gray-50 */
--trails-bg-tertiary: rgb(243 244 246); /* gray-100 */
--trails-bg-card: rgb(255 255 255); /* white */
--trails-bg-overlay: rgb(255 255 255); /* white */

--trails-text-primary: rgb(17 24 39); /* gray-900 */
--trails-text-secondary: rgb(75 85 99); /* gray-600 */
--trails-text-tertiary: rgb(107 114 128); /* gray-500 */
--trails-text-muted: rgb(156 163 175); /* gray-400 */
--trails-text-inverse: rgb(255 255 255); /* white */

--trails-border-primary: rgb(229 231 235); /* gray-200 */
--trails-border-secondary: rgb(209 213 219); /* gray-300 */
--trails-border-tertiary: rgb(243 244 246); /* gray-100 */

--trails-hover-bg: rgb(249 250 251); /* gray-50 */
--trails-hover-text: rgb(17 24 39); /* gray-900 */
--trails-focus-ring: rgb(59 130 246); /* blue-500 */

--trails-success-bg: rgb(240 253 244); /* green-50 */
--trails-success-text: rgb(22 163 74); /* green-600 */
--trails-success-border: rgb(187 247 208); /* green-200 */

--trails-warning-bg: rgb(255 251 235); /* amber-50 */
--trails-warning-text: rgb(217 119 6); /* amber-600 */
--trails-warning-border: rgb(253 230 138); /* amber-200 */

--trails-error-bg: rgb(254 242 242); /* red-50 */
--trails-error-text: rgb(220 38 38); /* red-600 */
--trails-error-border: rgb(254 202 202); /* red-200 */

--trails-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Input Field Colors */
--trails-input-bg: rgb(255 255 255); /* white */
--trails-input-border: rgb(209 213 219); /* gray-300 */
--trails-input-text: rgb(17 24 39); /* gray-900 */
--trails-input-placeholder: rgb(156 163 175); /* gray-400 */
--trails-input-focus-border: rgb(59 130 246); /* blue-500 */
--trails-input-focus-ring: rgb(59 130 246); /* blue-500 */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(255 255 255); /* white */
--trails-dropdown-border: rgb(229 231 235); /* gray-200 */
--trails-dropdown-text: rgb(17 24 39); /* gray-900 */
--trails-dropdown-hover-bg: rgb(249 250 251); /* gray-50 */
--trails-dropdown-selected-bg: rgb(243 244 246); /* gray-100 */
--trails-dropdown-selected-text: rgb(17 24 39); /* gray-900 */
`

// Square theme preset (dark theme with zero border radius)
export const SQUARE_THEME_PRESET = `/* Font Family - Bold sans-serif for dark theme */
--trails-font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 0px; /* Square widget container */
--trails-border-radius-button: 0px; /* Square buttons */
--trails-border-radius-input: 0px; /* Square input fields */
--trails-border-radius-dropdown: 0px; /* Square dropdowns */

/* Primary Colors - Dark Theme */
--trails-primary: rgb(59 130 246); /* blue-500 - standard blue */
--trails-primary-hover: rgb(37 99 235); /* blue-600 - darker blue */
--trails-primary-disabled: rgb(75 85 99); /* gray-600 */
--trails-primary-disabled-text: rgb(156 163 175); /* gray-400 */

/* Dark Mode Theme Variables - Standard Dark Theme */
--trails-bg-primary: rgb(17 24 39); /* gray-900 */
--trails-bg-secondary: rgb(31 41 55); /* gray-800 */
--trails-bg-tertiary: rgb(55 65 81); /* gray-700 */
--trails-bg-card: rgb(31 41 55); /* gray-800 */
--trails-bg-overlay: rgb(17 24 39); /* gray-900 */

--trails-text-primary: rgb(255 255 255); /* white */
--trails-text-secondary: rgb(209 213 219); /* gray-300 */
--trails-text-tertiary: rgb(156 163 175); /* gray-400 */
--trails-text-muted: rgb(107 114 128); /* gray-500 */
--trails-text-inverse: rgb(17 24 39); /* gray-900 */

--trails-border-primary: rgb(55 65 81); /* gray-700 */
--trails-border-secondary: rgb(75 85 99); /* gray-600 */
--trails-border-tertiary: rgb(31 41 55); /* gray-800 */

--trails-hover-bg: rgb(55 65 81); /* gray-700 */
--trails-hover-text: rgb(255 255 255); /* white */
--trails-focus-ring: rgb(59 130 246); /* blue-500 */

--trails-success-bg: rgb(22 163 74 / 0.2); /* green-600 with opacity */
--trails-success-text: rgb(134 239 172); /* green-400 */
--trails-success-border: rgb(22 163 74 / 0.3); /* green-600 with opacity */

--trails-warning-bg: rgb(217 119 6 / 0.2); /* amber-600 with opacity */
--trails-warning-text: rgb(251 191 36); /* amber-400 */
--trails-warning-border: rgb(217 119 6 / 0.3); /* amber-600 with opacity */

--trails-error-bg: rgb(239 68 68 / 0.2); /* red-500 with opacity */
--trails-error-text: rgb(252 165 165); /* red-400 */
--trails-error-border: rgb(239 68 68 / 0.3); /* red-500 with opacity */

--trails-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3);

/* Input Field Colors */
--trails-input-bg: rgb(31 41 55); /* gray-800 */
--trails-input-border: rgb(75 85 99); /* gray-600 */
--trails-input-text: rgb(255 255 255); /* white */
--trails-input-placeholder: rgb(107 114 128); /* gray-500 */
--trails-input-focus-border: rgb(59 130 246); /* blue-500 */
--trails-input-focus-ring: rgb(59 130 246); /* blue-500 */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(31 41 55); /* gray-800 */
--trails-dropdown-border: rgb(75 85 99); /* gray-600 */
--trails-dropdown-text: rgb(255 255 255); /* white */
--trails-dropdown-hover-bg: rgb(55 65 81); /* gray-700 */
--trails-dropdown-selected-bg: rgb(55 65 81); /* gray-700 */
--trails-dropdown-selected-text: rgb(255 255 255); /* white */
`

// Export all presets as an object for easy access
export const CSS_PRESETS = {
  default: DEFAULT_CSS_VALUES,
  green: GREEN_THEME_PRESET,
  blue: BLUE_THEME_PRESET,
  gray: GRAY_THEME_PRESET,
  dark: DARK_THEME_PRESET,
  purple: PURPLE_THEME_PRESET,
  mono: MONO_THEME_PRESET,
  square: SQUARE_THEME_PRESET,
} as const

export type PresetName = keyof typeof CSS_PRESETS
