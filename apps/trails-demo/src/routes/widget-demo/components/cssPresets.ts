// Default CSS values from index.css
export const DEFAULT_CSS_VALUES = `/* Font Family - Customizable font for the entire widget */
--trails-font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */

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

/* Token List Colors */
--trails-list-bg: rgb(255 255 255); /* white - matches dropdown */
--trails-list-border: rgb(229 231 235); /* gray-200 - matches dropdown border */
--trails-list-hover-bg: rgb(249 250 251); /* gray-50 - matches dropdown hover */

`

// Green theme preset for light mode
export const GREEN_THEME_PRESET = `/* Font Family - Playful sans-serif for mint theme */
--trails-font-family: "Comic Sans MS", "Chalkboard SE", "Comic Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(255 215 0); /* Gold widget border for green theme */

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

--trails-border-primary: rgb(255 215 0); /* gold */
--trails-border-secondary: rgb(134 239 172); /* green-400 */
--trails-border-tertiary: rgb(220 252 231); /* green-100 */

--trails-hover-bg: rgb(220 252 231); /* green-100 */
--trails-hover-text: rgb(21 128 61); /* green-800 */
--trails-focus-ring: rgb(255 215 0); /* gold */

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
--trails-input-border: rgb(255 215 0); /* gold */
--trails-input-text: rgb(21 128 61); /* green-800 */
--trails-input-placeholder: rgb(134 239 172); /* green-400 */
--trails-input-focus-border: rgb(255 215 0); /* gold */
--trails-input-focus-ring: rgb(255 215 0); /* gold */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(248 254 250); /* very light mint green background */
--trails-dropdown-border: rgb(255 215 0); /* gold */
--trails-dropdown-text: rgb(21 128 61); /* green-800 */
--trails-dropdown-hover-bg: rgb(220 252 231); /* green-100 */
--trails-dropdown-selected-bg: rgb(187 247 208); /* green-200 */
--trails-dropdown-selected-text: rgb(21 128 61); /* green-800 */
--trails-dropdown-focus-border: rgb(255 215 0); /* gold - matches input focus border */

/* Token List Colors */
--trails-list-bg: rgb(248 254 250); /* very light mint green background - matches dropdown */
--trails-list-border: rgb(255 215 0); /* gold - matches dropdown border */
--trails-list-hover-bg: rgb(220 252 231); /* green-100 - matches dropdown hover */

`

// Blue theme preset
export const BLUE_THEME_PRESET = `/* Font Family - Academic serif for pale blue theme */
--trails-font-family: "Times New Roman", "Times", serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(148 163 184); /* Slate-400 widget border for blue theme */

/* Primary Colors - Blue Theme */
--trails-primary: rgb(30 64 175); /* blue-800 - deeper academic blue */
--trails-primary-hover: rgb(30 58 138); /* blue-900 - darker academic blue */
--trails-primary-disabled: rgb(209 213 219); /* gray-300 */
--trails-primary-disabled-text: rgb(107 114 128); /* gray-500 */

/* Light Mode Theme Variables - Oceanic Academic Blue */
--trails-bg-primary: rgb(239 246 255); /* blue-50 - oceanic blue background */
--trails-bg-secondary: rgb(219 234 254); /* blue-100 - oceanic blue secondary */
--trails-bg-tertiary: rgb(191 219 254); /* blue-200 - oceanic blue tertiary */
--trails-bg-card: rgb(248 250 252); /* slate-50 for cards/token list */
--trails-bg-overlay: rgb(255 255 255); /* white */

--trails-text-primary: rgb(15 23 42); /* slate-900 - darker, more academic */
--trails-text-secondary: rgb(30 64 175); /* blue-800 - academic blue */
--trails-text-tertiary: rgb(51 65 85); /* slate-700 - more neutral */
--trails-text-muted: rgb(100 116 139); /* slate-500 - more neutral */
--trails-text-inverse: rgb(255 255 255); /* white */

--trails-border-primary: rgb(148 163 184); /* slate-400 - more neutral */
--trails-border-secondary: rgb(100 116 139); /* slate-500 - more neutral */
--trails-border-tertiary: rgb(241 245 249); /* slate-100 */

--trails-hover-bg: rgb(241 245 249); /* slate-100 - more neutral */
--trails-hover-text: rgb(15 23 42); /* slate-900 - darker, more academic */
--trails-focus-ring: rgb(30 64 175); /* blue-800 - academic blue */

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
--trails-input-bg: rgb(255 255 255); /* white background */
--trails-input-border: rgb(148 163 184); /* slate-400 - more neutral */
--trails-input-text: rgb(15 23 42); /* slate-900 - darker, more academic */
--trails-input-placeholder: rgb(100 116 139); /* slate-500 - more neutral */
--trails-input-focus-border: rgb(30 64 175); /* blue-800 - academic blue */
--trails-input-focus-ring: rgb(30 64 175); /* blue-800 - academic blue */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(255 255 255); /* white background */
--trails-dropdown-border: rgb(148 163 184); /* slate-400 - more neutral */
--trails-dropdown-text: rgb(15 23 42); /* slate-900 - darker, more academic */
--trails-dropdown-hover-bg: rgb(241 245 249); /* slate-100 - more neutral */
--trails-dropdown-selected-bg: rgb(241 245 249); /* slate-100 - more neutral */
--trails-dropdown-selected-text: rgb(15 23 42); /* slate-900 - darker, more academic */
--trails-dropdown-focus-border: rgb(30 64 175); /* blue-800 - matches input focus border */

/* Token List Colors */
--trails-list-bg: rgb(255 255 255); /* white background - matches dropdown */
--trails-list-border: rgb(148 163 184); /* slate-400 - matches dropdown border */
--trails-list-hover-bg: rgb(241 245 249); /* slate-100 - matches dropdown hover */

/* Token List Colors - Light white for better readability */
--trails-list-bg: rgb(255 255 255); /* white background for token list */
--trails-list-border: rgb(148 163 184); /* slate-400 border */
--trails-list-hover-bg: rgb(241 245 249); /* slate-100 hover */

`

// Gray theme preset
export const GRAY_THEME_PRESET = `/* Font Family - Professional sans-serif for gray theme */
--trails-font-family: "Arial", "Helvetica", sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-token-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(229 231 235); /* Gray-200 widget border for gray theme */

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
--trails-dropdown-focus-border: rgb(107 114 128); /* gray-500 - matches input focus border */

/* Token List Colors */
--trails-list-bg: rgb(249 250 251); /* gray-50 background - matches dropdown */
--trails-list-border: rgb(229 231 235); /* gray-200 - matches dropdown border */
--trails-list-hover-bg: rgb(243 244 246); /* gray-100 - matches dropdown hover */

`

// Dark theme preset (Binance Chain-inspired)
export const DARK_THEME_PRESET = `/* Font Family - Bold sans-serif for dark theme */
--trails-font-family: "Impact", "Arial Black", "Helvetica", sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-token-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(75 85 99); /* Gray-600 widget border for dark theme */

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

--trails-hover-bg: rgb(55 65 81); /* gray-700 - proper dark mode hover */
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
--trails-dropdown-focus-border: rgb(245 158 11); /* amber-500 - matches input focus border */

/* Token List Colors */
--trails-list-bg: rgb(15 15 15); /* very dark gray background - matches dropdown */
--trails-list-border: rgb(75 85 99); /* gray-600 - matches dropdown border */
--trails-list-hover-bg: rgb(25 25 25); /* dark gray hover - matches dropdown hover */
`

// Purple theme preset (Polygon-inspired)
export const PURPLE_THEME_PRESET = `/* Font Family - Modern geometric sans-serif for purple theme */
--trails-font-family: "Verdana", "Geneva", sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(147 51 234); /* Purple-600 widget border for purple theme */

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

--trails-hover-bg: rgb(75 65 95); /* purple border color for hover - more visible */
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
--trails-dropdown-focus-border: rgb(147 51 234); /* purple-600 - matches input focus border */

/* Token List Colors */
--trails-list-bg: rgb(45 35 65); /* medium dark purple background - matches dropdown */
--trails-list-border: rgb(75 65 95); /* purple border - matches dropdown border */
--trails-list-hover-bg: rgb(65 55 85); /* lighter purple hover - matches dropdown hover */

`

// Mono theme preset (default theme with monospace font)
export const MONO_THEME_PRESET = `/* Font Family - Monospace for code-like theme */
--trails-font-family: monospace;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(0 0 0); /* Black widget border for mono theme */

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
--trails-input-border: rgb(0 0 0); /* black */
--trails-input-text: rgb(17 24 39); /* gray-900 */
--trails-input-placeholder: rgb(156 163 175); /* gray-400 */
--trails-input-focus-border: rgb(0 0 0); /* black */
--trails-input-focus-ring: rgb(0 0 0); /* black */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(255 255 255); /* white */
--trails-dropdown-border: rgb(229 231 235); /* gray-200 */
--trails-dropdown-text: rgb(17 24 39); /* gray-900 */
--trails-dropdown-hover-bg: rgb(249 250 251); /* gray-50 */
--trails-dropdown-selected-bg: rgb(243 244 246); /* gray-100 */
--trails-dropdown-selected-text: rgb(17 24 39); /* gray-900 */
--trails-dropdown-focus-border: rgb(0 0 0); /* black - matches input focus border */

/* Token List Colors */
--trails-list-bg: rgb(255 255 255); /* white - matches dropdown */
--trails-list-border: rgb(229 231 235); /* gray-200 - matches dropdown border */
--trails-list-hover-bg: rgb(249 250 251); /* gray-50 - matches dropdown hover */

`

// Square theme preset (dark theme with zero border radius)
export const SQUARE_THEME_PRESET = `/* Font Family - Bold sans-serif for dark theme */
--trails-font-family: "Courier New", "Courier", monospace;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 0px; /* Square widget container */
--trails-border-radius-button: 0px; /* Square buttons */
--trails-border-radius-input: 0px; /* Square input fields */
--trails-border-radius-dropdown: 0px; /* Square dropdowns */
--trails-border-radius-container: 0px; /* Square containers */
--trails-border-radius-list: 0px; /* Square token list */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(75 85 99); /* Gray-600 widget border for square theme */

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
--trails-dropdown-focus-border: rgb(59 130 246); /* blue-500 - matches input focus border */

/* Token List Colors */
--trails-token-list-bg: rgb(31 41 55); /* gray-800 - matches dropdown */
--trails-token-list-border: rgb(75 85 99); /* gray-600 - matches dropdown border */
--trails-token-list-hover-bg: rgb(55 65 81); /* gray-700 - matches dropdown hover */

`

// Export all presets as an object for easy access
// MetaMask theme preset
export const METAMASK_THEME_PRESET = `/* Font Family - Modern sans-serif for MetaMask theme */
--trails-font-family: "Tahoma", "Arial", sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(242 101 34); /* MetaMask orange widget border */

/* Primary Colors - MetaMask Theme */
--trails-primary: rgb(242 101 34); /* MetaMask orange */
--trails-primary-hover: rgb(220 92 31); /* darker orange */
--trails-primary-disabled: rgb(209 213 219); /* gray-300 */
--trails-primary-disabled-text: rgb(107 114 128); /* gray-500 */

/* Light Mode Theme Variables - MetaMask Inspired */
--trails-bg-primary: rgb(255 255 255); /* white */
--trails-bg-secondary: rgb(255 248 240); /* warm orange-tinted background */
--trails-bg-tertiary: rgb(255 240 230); /* lighter orange-tinted background */
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
--trails-focus-ring: rgb(242 101 34); /* MetaMask orange */

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
--trails-input-focus-border: rgb(242 101 34); /* MetaMask orange */
--trails-input-focus-ring: rgb(242 101 34); /* MetaMask orange */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(255 255 255); /* white */
--trails-dropdown-border: rgb(229 231 235); /* gray-200 */
--trails-dropdown-text: rgb(17 24 39); /* gray-900 */
--trails-dropdown-hover-bg: rgb(249 250 251); /* gray-50 */
--trails-dropdown-selected-bg: rgb(243 244 246); /* gray-100 */
--trails-dropdown-selected-text: rgb(17 24 39); /* gray-900 */
--trails-dropdown-focus-border: rgb(242 101 34); /* MetaMask orange - matches input focus border */

/* Token List Colors */
--trails-list-bg: rgb(255 255 255); /* white - matches dropdown */
--trails-list-border: rgb(229 231 235); /* gray-200 - matches dropdown border */
--trails-list-hover-bg: rgb(249 250 251); /* gray-50 - matches dropdown hover */

`

// Coinbase theme preset
export const COINBASE_THEME_PRESET = `/* Font Family - Clean sans-serif for Coinbase theme */
--trails-font-family: "Trebuchet MS", "Arial", sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(0 82 204); /* Coinbase blue widget border */

/* Primary Colors - Coinbase Theme */
--trails-primary: rgb(0 82 204); /* Coinbase blue */
--trails-primary-hover: rgb(0 66 163); /* darker blue */
--trails-primary-disabled: rgb(209 213 219); /* gray-300 */
--trails-primary-disabled-text: rgb(107 114 128); /* gray-500 */

/* Light Mode Theme Variables - Coinbase Inspired */
--trails-bg-primary: rgb(255 255 255); /* white */
--trails-bg-secondary: rgb(248 250 252); /* slate-50 */
--trails-bg-tertiary: rgb(241 245 249); /* slate-100 */
--trails-bg-card: rgb(255 255 255); /* white */
--trails-bg-overlay: rgb(255 255 255); /* white */

--trails-text-primary: rgb(15 23 42); /* slate-900 */
--trails-text-secondary: rgb(51 65 85); /* slate-700 */
--trails-text-tertiary: rgb(71 85 105); /* slate-600 */
--trails-text-muted: rgb(148 163 184); /* slate-400 */
--trails-text-inverse: rgb(255 255 255); /* white */

--trails-border-primary: rgb(226 232 240); /* slate-200 */
--trails-border-secondary: rgb(203 213 225); /* slate-300 */
--trails-border-tertiary: rgb(241 245 249); /* slate-100 */

--trails-hover-bg: rgb(248 250 252); /* slate-50 */
--trails-hover-text: rgb(15 23 42); /* slate-900 */
--trails-focus-ring: rgb(0 82 204); /* Coinbase blue */

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
--trails-input-border: rgb(203 213 225); /* slate-300 */
--trails-input-text: rgb(15 23 42); /* slate-900 */
--trails-input-placeholder: rgb(148 163 184); /* slate-400 */
--trails-input-focus-border: rgb(0 82 204); /* Coinbase blue */
--trails-input-focus-ring: rgb(0 82 204); /* Coinbase blue */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(255 255 255); /* white */
--trails-dropdown-border: rgb(226 232 240); /* slate-200 */
--trails-dropdown-text: rgb(15 23 42); /* slate-900 */
--trails-dropdown-hover-bg: rgb(248 250 252); /* slate-50 */
--trails-dropdown-selected-bg: rgb(241 245 249); /* slate-100 */
--trails-dropdown-selected-text: rgb(15 23 42); /* slate-900 */
--trails-dropdown-focus-border: rgb(0 82 204); /* Coinbase blue - matches input focus border */

/* Token List Colors */
--trails-list-bg: rgb(255 255 255); /* white - matches dropdown */
--trails-list-border: rgb(226 232 240); /* slate-200 - matches dropdown border */
--trails-list-hover-bg: rgb(248 250 252); /* slate-50 - matches dropdown hover */

`

// Binance theme preset
export const BINANCE_THEME_PRESET = `/* Font Family - Bold sans-serif for Binance theme */
--trails-font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-token-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(245 158 11); /* Binance gold widget border */

/* Primary Colors - Binance Theme */
--trails-primary: rgb(245 158 11); /* Binance gold */
--trails-primary-hover: rgb(217 119 6); /* darker gold */
--trails-primary-disabled: rgb(75 85 99); /* gray-600 */
--trails-primary-disabled-text: rgb(156 163 175); /* gray-400 */

/* Dark Mode Theme Variables - Binance Inspired */
--trails-bg-primary: rgb(0 0 0); /* black */
--trails-bg-secondary: rgb(15 15 15); /* very dark gray */
--trails-bg-tertiary: rgb(25 25 25); /* dark gray */
--trails-bg-card: rgb(20 20 20); /* dark gray for cards/token list */
--trails-bg-overlay: rgb(0 0 0); /* black */

--trails-text-primary: rgb(255 255 255); /* white */
--trails-text-secondary: rgb(245 158 11); /* Binance gold */
--trails-text-tertiary: rgb(251 191 36); /* amber-400 - lighter gold */
--trails-text-muted: rgb(156 163 175); /* gray-400 */
--trails-text-inverse: rgb(0 0 0); /* black */

--trails-border-primary: rgb(55 65 81); /* gray-700 */
--trails-border-secondary: rgb(75 85 99); /* gray-600 */
--trails-border-tertiary: rgb(31 41 55); /* gray-800 */

--trails-hover-bg: rgb(55 65 81); /* gray-700 - proper dark mode hover */
--trails-hover-text: rgb(255 255 255); /* white */
--trails-focus-ring: rgb(245 158 11); /* Binance gold */

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
--trails-input-placeholder: rgb(245 158 11); /* Binance gold placeholder */
--trails-input-focus-border: rgb(245 158 11); /* Binance gold */
--trails-input-focus-ring: rgb(245 158 11); /* Binance gold */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(15 15 15); /* very dark gray background */
--trails-dropdown-border: rgb(75 85 99); /* gray-600 */
--trails-dropdown-text: rgb(255 255 255); /* white */
--trails-dropdown-hover-bg: rgb(25 25 25); /* dark gray on hover */
--trails-dropdown-selected-bg: rgb(25 25 25); /* dark gray selected background */
--trails-dropdown-selected-text: rgb(245 158 11); /* Binance gold selected text */
--trails-dropdown-focus-border: rgb(245 158 11); /* Binance gold - matches input focus border */

/* Token List Colors */
--trails-list-bg: rgb(15 15 15); /* very dark gray background - matches dropdown */
--trails-list-border: rgb(75 85 99); /* gray-600 - matches dropdown border */
--trails-list-hover-bg: rgb(25 25 25); /* dark gray hover - matches dropdown hover */

`

// Uniswap theme preset
export const UNISWAP_THEME_PRESET = `/* Font Family - Modern sans-serif for Uniswap theme */
--trails-font-family: "Century Gothic", "Arial", sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-token-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(255 0 199); /* Uniswap pink widget border */

/* Primary Colors - Uniswap Theme */
--trails-primary: rgb(255 0 199); /* Uniswap pink */
--trails-primary-hover: rgb(230 0 179); /* darker pink */
--trails-primary-disabled: rgb(209 213 219); /* gray-300 */
--trails-primary-disabled-text: rgb(107 114 128); /* gray-500 */

/* Light Mode Theme Variables - Uniswap Inspired */
--trails-bg-primary: rgb(255 255 255); /* white */
--trails-bg-secondary: rgb(250 245 255); /* purple-50 */
--trails-bg-tertiary: rgb(243 232 255); /* purple-100 */
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

--trails-hover-bg: rgb(250 245 255); /* purple-50 */
--trails-hover-text: rgb(17 24 39); /* gray-900 */
--trails-focus-ring: rgb(255 0 199); /* Uniswap pink */

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
--trails-input-focus-border: rgb(255 0 199); /* Uniswap pink */
--trails-input-focus-ring: rgb(255 0 199); /* Uniswap pink */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(255 255 255); /* white */
--trails-dropdown-border: rgb(209 213 219); /* gray-300 - matches input border */
--trails-dropdown-text: rgb(17 24 39); /* gray-900 */
--trails-dropdown-hover-bg: rgb(250 245 255); /* purple-50 */
--trails-dropdown-selected-bg: rgb(243 232 255); /* purple-100 */
--trails-dropdown-selected-text: rgb(17 24 39); /* gray-900 */
--trails-dropdown-focus-border: rgb(255 0 199); /* Uniswap pink - matches input focus border */

`

// Neon Theme preset (Cyberpunk style)
export const NEON_THEME_PRESET = `/* Font Family - Modern sans-serif for cyberpunk theme */
--trails-font-family: "Courier New", "Courier", monospace;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-token-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(0 255 255); /* Cyan widget border for neon theme */

/* Primary Colors - Neon Theme */
--trails-primary: rgb(0 255 255); /* cyan */
--trails-primary-hover: rgb(0 200 200); /* darker cyan */
--trails-primary-disabled: rgb(75 85 99); /* gray-600 */
--trails-primary-disabled-text: rgb(156 163 175); /* gray-400 */

/* Dark Mode Theme Variables - Cyberpunk Inspired */
--trails-bg-primary: rgb(0 0 0); /* black */
--trails-bg-secondary: rgb(10 10 10); /* very dark gray */
--trails-bg-tertiary: rgb(20 20 20); /* dark gray */
--trails-bg-card: rgb(15 15 15); /* dark gray for cards/token list */
--trails-bg-overlay: rgb(0 0 0); /* black */

--trails-text-primary: rgb(0 255 255); /* cyan */
--trails-text-secondary: rgb(255 0 255); /* magenta */
--trails-text-tertiary: rgb(255 255 255); /* white */
--trails-text-muted: rgb(156 163 175); /* gray-400 */
--trails-text-inverse: rgb(0 0 0); /* black */

--trails-border-primary: rgb(0 255 255); /* cyan */
--trails-border-secondary: rgb(255 0 255); /* magenta */
--trails-border-tertiary: rgb(20 20 20); /* dark gray */

--trails-hover-bg: rgb(20 20 20); /* dark gray */
--trails-hover-text: rgb(0 255 255); /* cyan */
--trails-focus-ring: rgb(255 0 255); /* magenta */

--trails-success-bg: rgb(0 255 0 / 0.2); /* green with opacity */
--trails-success-text: rgb(0 255 0); /* green */
--trails-success-border: rgb(0 255 0 / 0.3); /* green with opacity */

--trails-warning-bg: rgb(255 255 0 / 0.2); /* yellow with opacity */
--trails-warning-text: rgb(255 255 0); /* yellow */
--trails-warning-border: rgb(255 255 0 / 0.3); /* yellow with opacity */

--trails-error-bg: rgb(255 0 0 / 0.2); /* red with opacity */
--trails-error-text: rgb(255 0 0); /* red */
--trails-error-border: rgb(255 0 0 / 0.3); /* red with opacity */

--trails-shadow: 0 0 20px rgb(0 255 255 / 0.3), 0 0 40px rgb(255 0 255 / 0.2);

/* Input Field Colors */
--trails-input-bg: rgb(10 10 10); /* very dark gray background */
--trails-input-border: rgb(0 255 255); /* cyan */
--trails-input-text: rgb(255 255 255); /* white */
--trails-input-placeholder: rgb(255 0 255); /* magenta placeholder */
--trails-input-focus-border: rgb(255 0 255); /* magenta */
--trails-input-focus-ring: rgb(255 0 255); /* magenta */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(10 10 10); /* very dark gray background */
--trails-dropdown-border: rgb(0 255 255); /* cyan */
--trails-dropdown-text: rgb(255 255 255); /* white */
--trails-dropdown-hover-bg: rgb(20 20 20); /* dark gray on hover */
--trails-dropdown-selected-bg: rgb(20 20 20); /* dark gray selected background */
--trails-dropdown-selected-text: rgb(0 255 255); /* cyan selected text */
--trails-dropdown-focus-border: rgb(255 0 255); /* magenta - matches input focus border */

/* Token List Colors - Cyberpunk Neon Style */
--trails-list-bg: rgb(10 10 10); /* very dark gray background - matches dropdown */
--trails-list-border: rgb(0 255 255); /* cyan border - matches dropdown border */
--trails-list-hover-bg: rgb(20 20 20); /* dark gray hover - matches dropdown hover */

`

// Sunset Theme preset (Warm gradients)
export const SUNSET_THEME_PRESET = `/* Font Family - Warm sans-serif for sunset theme */
--trails-font-family: "Bookman Old Style", "Times New Roman", serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-token-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(255 215 0); /* Gold widget border for sunset theme */

/* Primary Colors - Sunset Theme */
--trails-primary: rgb(255 69 0); /* orange-red */
--trails-primary-hover: rgb(220 60 0); /* darker orange-red */
--trails-primary-disabled: rgb(209 213 219); /* gray-300 */
--trails-primary-disabled-text: rgb(107 114 128); /* gray-500 */

/* Light Mode Theme Variables - Sunset Inspired */
--trails-bg-primary: rgb(255 255 255); /* white */
--trails-bg-secondary: rgb(255 248 240); /* warm white */
--trails-bg-tertiary: rgb(255 240 230); /* peach */
--trails-bg-card: rgb(255 255 255); /* white */
--trails-bg-overlay: rgb(255 255 255); /* white */

--trails-text-primary: rgb(139 69 19); /* saddle brown */
--trails-text-secondary: rgb(255 69 0); /* orange-red */
--trails-text-tertiary: rgb(255 140 0); /* dark orange */
--trails-text-muted: rgb(156 163 175); /* gray-400 */
--trails-text-inverse: rgb(255 255 255); /* white */

--trails-border-primary: rgb(255 215 0); /* gold */
--trails-border-secondary: rgb(255 69 0); /* orange-red */
--trails-border-tertiary: rgb(255 240 230); /* peach */

--trails-hover-bg: rgb(255 248 240); /* warm white */
--trails-hover-text: rgb(139 69 19); /* saddle brown */
--trails-focus-ring: rgb(255 69 0); /* orange-red */

--trails-success-bg: rgb(240 253 244); /* green-50 */
--trails-success-text: rgb(22 163 74); /* green-600 */
--trails-success-border: rgb(187 247 208); /* green-200 */

--trails-warning-bg: rgb(255 251 235); /* amber-50 */
--trails-warning-text: rgb(217 119 6); /* amber-600 */
--trails-warning-border: rgb(253 230 138); /* amber-200 */

--trails-error-bg: rgb(254 242 242); /* red-50 */
--trails-error-text: rgb(220 38 38); /* red-600 */
--trails-error-border: rgb(254 202 202); /* red-200 */

--trails-shadow: 0 4px 20px rgb(255 69 0 / 0.1), 0 2px 10px rgb(255 215 0 / 0.1);

/* Input Field Colors */
--trails-input-bg: rgb(255 255 255); /* white */
--trails-input-border: rgb(255 215 0); /* gold */
--trails-input-text: rgb(139 69 19); /* saddle brown */
--trails-input-placeholder: rgb(255 140 0); /* dark orange */
--trails-input-focus-border: rgb(255 69 0); /* orange-red */
--trails-input-focus-ring: rgb(255 69 0); /* orange-red */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(255 255 255); /* white */
--trails-dropdown-border: rgb(255 215 0); /* gold */
--trails-dropdown-text: rgb(139 69 19); /* saddle brown */
--trails-dropdown-hover-bg: rgb(255 248 240); /* warm white */
--trails-dropdown-selected-bg: rgb(255 240 230); /* peach */
--trails-dropdown-selected-text: rgb(139 69 19); /* saddle brown */
--trails-dropdown-focus-border: rgb(255 69 0); /* orange-red - matches input focus border */

/* Token List Colors */
--trails-list-bg: rgb(255 255 255); /* white - matches dropdown */
--trails-list-border: rgb(255 215 0); /* gold - matches dropdown border */
--trails-list-hover-bg: rgb(255 248 240); /* warm white - matches dropdown hover */

`

// Ocean Theme preset (Deep blue gradients)
export const OCEAN_THEME_PRESET = `/* Font Family - Clean sans-serif for ocean theme */
--trails-font-family: "Gill Sans", "Gill Sans MT", sans-serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-token-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(0 255 255); /* Cyan widget border for ocean theme */

/* Primary Colors - Ocean Theme */
--trails-primary: rgb(0 119 190); /* ocean blue */
--trails-primary-hover: rgb(0 100 160); /* darker ocean blue */
--trails-primary-disabled: rgb(209 213 219); /* gray-300 */
--trails-primary-disabled-text: rgb(107 114 128); /* gray-500 */

/* Light Mode Theme Variables - Ocean Inspired */
--trails-bg-primary: rgb(255 255 255); /* white */
--trails-bg-secondary: rgb(240 248 255); /* alice blue */
--trails-bg-tertiary: rgb(230 245 255); /* light blue */
--trails-bg-card: rgb(255 255 255); /* white */
--trails-bg-overlay: rgb(255 255 255); /* white */

--trails-text-primary: rgb(0 51 102); /* dark blue */
--trails-text-secondary: rgb(0 119 190); /* ocean blue */
--trails-text-tertiary: rgb(0 153 204); /* sky blue */
--trails-text-muted: rgb(156 163 175); /* gray-400 */
--trails-text-inverse: rgb(255 255 255); /* white */

--trails-border-primary: rgb(0 255 255); /* cyan */
--trails-border-secondary: rgb(0 119 190); /* ocean blue */
--trails-border-tertiary: rgb(230 245 255); /* light blue */

--trails-hover-bg: rgb(240 248 255); /* alice blue */
--trails-hover-text: rgb(0 51 102); /* dark blue */
--trails-focus-ring: rgb(0 119 190); /* ocean blue */

--trails-success-bg: rgb(240 253 244); /* green-50 */
--trails-success-text: rgb(22 163 74); /* green-600 */
--trails-success-border: rgb(187 247 208); /* green-200 */

--trails-warning-bg: rgb(255 251 235); /* amber-50 */
--trails-warning-text: rgb(217 119 6); /* amber-600 */
--trails-warning-border: rgb(253 230 138); /* amber-200 */

--trails-error-bg: rgb(254 242 242); /* red-50 */
--trails-error-text: rgb(220 38 38); /* red-600 */
--trails-error-border: rgb(254 202 202); /* red-200 */

--trails-shadow: 0 4px 20px rgb(0 119 190 / 0.1), 0 2px 10px rgb(0 255 255 / 0.1);

/* Input Field Colors */
--trails-input-bg: rgb(255 255 255); /* white */
--trails-input-border: rgb(0 255 255); /* cyan */
--trails-input-text: rgb(0 51 102); /* dark blue */
--trails-input-placeholder: rgb(0 153 204); /* sky blue */
--trails-input-focus-border: rgb(0 119 190); /* ocean blue */
--trails-input-focus-ring: rgb(0 119 190); /* ocean blue */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(255 255 255); /* white */
--trails-dropdown-border: rgb(0 255 255); /* cyan */
--trails-dropdown-text: rgb(0 51 102); /* dark blue */
--trails-dropdown-hover-bg: rgb(240 248 255); /* alice blue */
--trails-dropdown-selected-bg: rgb(230 245 255); /* light blue */
--trails-dropdown-selected-text: rgb(0 51 102); /* dark blue */
--trails-dropdown-focus-border: rgb(0 119 190); /* ocean blue - matches input focus border */

/* Token List Colors */
--trails-list-bg: rgb(255 255 255); /* white - matches dropdown */
--trails-list-border: rgb(0 255 255); /* cyan - matches dropdown border */
--trails-list-hover-bg: rgb(240 248 255); /* alice blue - matches dropdown hover */

`

// Forest Theme preset (Nature-inspired)
export const FOREST_THEME_PRESET = `/* Font Family - Natural sans-serif for forest theme */
--trails-font-family: "Palatino", "Palatino Linotype", serif;

/* Border Radius - Customizable border radius for the widget */
--trails-border-radius-widget: 32px; /* Main widget container border radius */
--trails-border-radius-button: 24px; /* Primary buttons border radius */
--trails-border-radius-input: 24px; /* Input fields border radius */
--trails-border-radius-dropdown: 12px; /* Dropdown border radius */
--trails-border-radius-container: 8px; /* Container elements border radius (balance cards, etc.) */
--trails-border-radius-token-list: 8px; /* Token list border radius */

/* Widget Border - Customizable widget border */
--trails-widget-border: 1px solid rgb(255 215 0); /* Gold widget border for forest theme */

/* Primary Colors - Forest Theme */
--trails-primary: rgb(34 139 34); /* forest green */
--trails-primary-hover: rgb(28 115 28); /* darker forest green */
--trails-primary-disabled: rgb(209 213 219); /* gray-300 */
--trails-primary-disabled-text: rgb(107 114 128); /* gray-500 */

/* Light Mode Theme Variables - Forest Inspired */
--trails-bg-primary: rgb(255 255 255); /* white */
--trails-bg-secondary: rgb(248 252 248); /* mint cream */
--trails-bg-tertiary: rgb(240 248 240); /* honeydew */
--trails-bg-card: rgb(255 255 255); /* white */
--trails-bg-overlay: rgb(255 255 255); /* white */

--trails-text-primary: rgb(34 139 34); /* forest green */
--trails-text-secondary: rgb(85 107 47); /* dark olive green */
--trails-text-tertiary: rgb(107 142 35); /* olive drab */
--trails-text-muted: rgb(156 163 175); /* gray-400 */
--trails-text-inverse: rgb(255 255 255); /* white */

--trails-border-primary: rgb(255 215 0); /* gold */
--trails-border-secondary: rgb(34 139 34); /* forest green */
--trails-border-tertiary: rgb(240 248 240); /* honeydew */

--trails-hover-bg: rgb(248 252 248); /* mint cream */
--trails-hover-text: rgb(34 139 34); /* forest green */
--trails-focus-ring: rgb(34 139 34); /* forest green */

--trails-success-bg: rgb(240 253 244); /* green-50 */
--trails-success-text: rgb(22 163 74); /* green-600 */
--trails-success-border: rgb(187 247 208); /* green-200 */

--trails-warning-bg: rgb(255 251 235); /* amber-50 */
--trails-warning-text: rgb(217 119 6); /* amber-600 */
--trails-warning-border: rgb(253 230 138); /* amber-200 */

--trails-error-bg: rgb(254 242 242); /* red-50 */
--trails-error-text: rgb(220 38 38); /* red-600 */
--trails-error-border: rgb(254 202 202); /* red-200 */

--trails-shadow: 0 4px 20px rgb(34 139 34 / 0.1), 0 2px 10px rgb(255 215 0 / 0.1);

/* Input Field Colors */
--trails-input-bg: rgb(255 255 255); /* white */
--trails-input-border: rgb(255 215 0); /* gold */
--trails-input-text: rgb(34 139 34); /* forest green */
--trails-input-placeholder: rgb(107 142 35); /* olive drab */
--trails-input-focus-border: rgb(34 139 34); /* forest green */
--trails-input-focus-ring: rgb(34 139 34); /* forest green */

/* Dropdown Colors */
--trails-dropdown-bg: rgb(255 255 255); /* white */
--trails-dropdown-border: rgb(255 215 0); /* gold */
--trails-dropdown-text: rgb(34 139 34); /* forest green */
--trails-dropdown-hover-bg: rgb(248 252 248); /* mint cream */
--trails-dropdown-selected-bg: rgb(240 248 240); /* honeydew */
--trails-dropdown-selected-text: rgb(34 139 34); /* forest green */
--trails-dropdown-focus-border: rgb(34 139 34); /* forest green - matches input focus border */

/* Token List Colors */
--trails-list-bg: rgb(255 255 255); /* white - matches dropdown */
--trails-list-border: rgb(255 215 0); /* gold - matches dropdown border */
--trails-list-hover-bg: rgb(248 252 248); /* mint cream - matches dropdown hover */

`

// Windows 95 theme preset
export const WIN95_THEME_PRESET = `/* Font Family - System UI for Windows 95 */
--trails-font-family: "MS Sans Serif", "Tahoma", "Geneva", sans-serif;

/* Border Radius - Square for Win95 */
--trails-border-radius-widget: 0px;
--trails-border-radius-button: 0px;
--trails-border-radius-input: 0px;
--trails-border-radius-dropdown: 0px;
--trails-border-radius-container: 0px;
--trails-border-radius-list: 0px;

/* Widget Border - 2px solid gray for Win95 */
--trails-widget-border: 2px solid #b5b5b5;

/* Primary Colors - Win95 blue accent */
--trails-primary: #008080; /* teal/blue accent */
--trails-primary-hover: #005f5f;
--trails-primary-disabled: #c0c0c0;
--trails-primary-disabled-text: #7f7f7f;

/* Backgrounds - Classic Win95 beige/gray */
--trails-bg-primary: #c0c0c0;
--trails-bg-secondary: #e0dfde;
--trails-bg-tertiary: #f8f8f8;
--trails-bg-card: #dfdfdf;
--trails-bg-overlay: #f8f8f8;

--trails-text-primary: #222222;
--trails-text-secondary: #444444;
--trails-text-tertiary: #666666;
--trails-text-muted: #888888;
--trails-text-inverse: #ffffff;

--trails-border-primary: #b5b5b5;
--trails-border-secondary: #808080;
--trails-border-tertiary: #ffffff;

--trails-hover-bg: #e0dfde;
--trails-hover-text: #222222;
--trails-focus-ring: #008080;

--trails-success-bg: #e0ffe0;
--trails-success-text: #008000;
--trails-success-border: #b5b5b5;

--trails-warning-bg: #fffbe0;
--trails-warning-text: #b59f00;
--trails-warning-border: #b5b5b5;

--trails-error-bg: #ffe0e0;
--trails-error-text: #b50000;
--trails-error-border: #b5b5b5;

--trails-shadow: 2px 2px 0 #fff, 4px 4px 0 #808080;

/* Input Field Colors */
--trails-input-bg: #ffffff;
--trails-input-border: #b5b5b5;
--trails-input-text: #222222;
--trails-input-placeholder: #888888;
--trails-input-focus-border: #008080;
--trails-input-focus-ring: #008080;

/* Dropdown Colors */
--trails-dropdown-bg: #ffffff;
--trails-dropdown-border: #b5b5b5;
--trails-dropdown-text: #222222;
--trails-dropdown-hover-bg: #e0dfde;
--trails-dropdown-selected-bg: #c0c0c0;
--trails-dropdown-selected-text: #222222;
--trails-dropdown-focus-border: #008080;

/* Token List Colors */
--trails-list-bg: #dfdfdf;
--trails-list-border: #b5b5b5;
--trails-list-hover-bg: #e0dfde;
`

// Sequence theme preset
export const SEQUENCE_THEME_PRESET = `/* Font Family - Modern sans-serif for Sequence theme */
--trails-font-family: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* Border Radius - Modern rounded corners */
--trails-border-radius-widget: 32px;
--trails-border-radius-button: 24px;
--trails-border-radius-input: 24px;
--trails-border-radius-dropdown: 24px;
--trails-border-radius-container: 12px;
--trails-border-radius-list: 12px;

/* Widget Border - Purple border */
--trails-widget-border: 2px solid #7537F9;

/* Primary Colors - Sequence Purple */
--trails-primary: #7537F9;
--trails-primary-hover: #4411E1;
--trails-primary-disabled: #4a5568;
--trails-primary-disabled-text: #a0aec0;

/* Backgrounds - Dark purple theme */
--trails-bg-primary: #0f0a1a;
--trails-bg-secondary: #1a0f2e;
--trails-bg-tertiary: #2d1b4e;
--trails-bg-card: #1a0f2e;
--trails-bg-overlay: #0f0a1a;

--trails-text-primary: #ffffff;
--trails-text-secondary: #a8b2ff;
--trails-text-tertiary: #8b7bb8;
--trails-text-muted: #6b7280;
--trails-text-inverse: #0f0a1a;

--trails-border-primary: #2d1b4e;
--trails-border-secondary: #3d2b5e;
--trails-border-tertiary: #1a0f2e;

--trails-hover-bg: #2d1b4e;
--trails-hover-text: #ffffff;
--trails-focus-ring: #7537F9;

--trails-success-bg: #064e3b;
--trails-success-text: #6ee7b7;
--trails-success-border: #065f46;

--trails-warning-bg: #78350f;
--trails-warning-text: #fbbf24;
--trails-warning-border: #92400e;

--trails-error-bg: #7f1d1d;
--trails-error-text: #fca5a5;
--trails-error-border: #991b1b;

--trails-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 2px 10px rgba(0, 0, 0, 0.2);

/* Input Field Colors */
--trails-input-bg: #1a0f2e;
--trails-input-border: #2d1b4e;
--trails-input-text: #ffffff;
--trails-input-placeholder: #8b7bb8;
--trails-input-focus-border: #7537F9;
--trails-input-focus-ring: #7537F9;

/* Dropdown Colors */
--trails-dropdown-bg: #000000;
--trails-dropdown-border: #2d1b4e;
--trails-dropdown-text: #ffffff;
--trails-dropdown-hover-bg: #2d1b4e;
--trails-dropdown-selected-bg: #3d2b5e;
--trails-dropdown-selected-text: #ffffff;
--trails-dropdown-focus-border: #7537F9;

/* Token List Colors */
--trails-list-bg: #000000;
--trails-list-border: #2d1b4e;
--trails-list-hover-bg: #2d1b4e;
`

export const CSS_PRESETS = {
  default: DEFAULT_CSS_VALUES,
  green: GREEN_THEME_PRESET,
  blue: BLUE_THEME_PRESET,
  gray: GRAY_THEME_PRESET,
  dark: DARK_THEME_PRESET,
  purple: PURPLE_THEME_PRESET,
  mono: MONO_THEME_PRESET,
  square: SQUARE_THEME_PRESET,
  metamask: METAMASK_THEME_PRESET,
  coinbase: COINBASE_THEME_PRESET,
  binance: BINANCE_THEME_PRESET,
  uniswap: UNISWAP_THEME_PRESET,
  neon: NEON_THEME_PRESET,
  sunset: SUNSET_THEME_PRESET,
  ocean: OCEAN_THEME_PRESET,
  forest: FOREST_THEME_PRESET,
  win95: WIN95_THEME_PRESET,
  sequence: SEQUENCE_THEME_PRESET,
} as const

export type PresetName = keyof typeof CSS_PRESETS
