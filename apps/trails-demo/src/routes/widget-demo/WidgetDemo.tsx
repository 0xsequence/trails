import { useEffect, useState, useRef, useCallback } from "react"
import type { Mode } from "0xtrails"
import { CustomizationForm, STORAGE_KEYS } from "./components/CustomizationForm"
import { OutputScreen } from "./components/OutputScreen"

export const WidgetDemo = () => {
  const defaultSequenceProjectAccessKey = import.meta.env
    .VITE_PROJECT_ACCESS_KEY
  const apiUrl = import.meta.env.VITE_API_URL
  const indexerUrl = import.meta.env.VITE_INDEXER_URL
  const env = import.meta.env.VITE_ENV
  const privyAppId = import.meta.env.VITE_PRIVY_APP_ID
  const privyClientId = import.meta.env.VITE_PRIVY_CLIENT_ID

  const [sequenceProjectAccessKey, setSequenceProjectAccessKey] = useState("")
  const [toAddress, setToAddress] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [toChainId, setToChainId] = useState<number | undefined>()
  const [toToken, setToToken] = useState<string | undefined>()
  const [toCalldata, setToCalldata] = useState("")
  const [renderInline, setRenderInline] = useState<boolean | null>(null)
  const [useCustomButton, setUseCustomButton] = useState<boolean | null>(null)
  const [theme, setTheme] = useState<string | null>(null)
  const [walletOptions, setWalletOptions] = useState<string[] | null>(null)
  const [paymasterUrls, setPaymasterUrls] = useState<
    Array<{ chainId: number; url: string }>
  >([])
  const [gasless, setGasless] = useState<boolean | null>(null)
  const [customTokenAddress, setCustomTokenAddress] = useState("")
  const [buttonText, setButtonText] = useState("")
  const [customCss, setCustomCss] = useState("")
  const [mode, setMode] = useState<Mode | null>(null)

  // Resizable sidebar state
  const [sidebarWidth, setSidebarWidth] = useState(480) // Default width in pixels
  const [isResizing, setIsResizing] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const resizeRef = useRef<HTMLButtonElement>(null)

  // Minimum and maximum sidebar widths
  const MIN_SIDEBAR_WIDTH = 280
  const MAX_SIDEBAR_WIDTH = 800

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Handle mouse down on resize handle
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  // Handle mouse move for resizing
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return

      const newWidth = e.clientX
      if (newWidth >= MIN_SIDEBAR_WIDTH && newWidth <= MAX_SIDEBAR_WIDTH) {
        setSidebarWidth(newWidth)
      }
    },
    [isResizing],
  )

  // Handle mouse up to stop resizing
  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  // Add/remove event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEYS.MODE)) {
      setMode("pay")
    }
    if (!localStorage.getItem(STORAGE_KEYS.RENDER_INLINE)) {
      setRenderInline(true)
    }
    if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
      setTheme("auto")
    }
    if (!localStorage.getItem(STORAGE_KEYS.WALLET_OPTIONS)) {
      setWalletOptions([])
    }
    if (!localStorage.getItem(STORAGE_KEYS.CUSTOM_CSS)) {
      // Set default CSS values
      const defaultCss = `/* Primary Colors - These apply to both themes */
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

/* Dark Mode Theme Variables */
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

--trails-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3);`
      setCustomCss(defaultCss)
    }
  }, [])

  return (
    <div
      className={`bg-white dark:bg-gray-950 flex flex-col ${isLargeScreen ? "h-full" : "min-h-screen"}`}
    >
      {/* Main Content */}
      <div
        className={`flex flex-col lg:flex-row ${isLargeScreen ? "flex-1 overflow-hidden" : ""}`}
      >
        {/* Left Sidebar - Configuration Form (Resizable) */}
        <div
          className={`bg-gray-100 dark:bg-gray-900 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 custom-scrollbar w-full lg:w-auto ${isLargeScreen ? "overflow-y-auto flex-shrink-0" : ""}`}
          style={{ width: isLargeScreen ? `${sidebarWidth}px` : "100%" }}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Configuration
            </h2>
            <CustomizationForm
              mode={mode}
              setMode={setMode}
              appId={sequenceProjectAccessKey}
              setAppId={setSequenceProjectAccessKey}
              toAddress={toAddress}
              setToAddress={setToAddress}
              toAmount={toAmount}
              setToAmount={setToAmount}
              toChainId={toChainId}
              setToChainId={setToChainId}
              toToken={toToken}
              setToToken={setToToken}
              toCalldata={toCalldata}
              setToCalldata={setToCalldata}
              useCustomButton={useCustomButton}
              setUseCustomButton={setUseCustomButton}
              setRenderInline={setRenderInline}
              renderInline={renderInline}
              theme={theme}
              setTheme={setTheme}
              walletOptions={walletOptions}
              setWalletOptions={setWalletOptions}
              paymasterUrls={paymasterUrls}
              setPaymasterUrls={setPaymasterUrls}
              gasless={gasless}
              setGasless={setGasless}
              customTokenAddress={customTokenAddress}
              setCustomTokenAddress={setCustomTokenAddress}
              buttonText={buttonText}
              setButtonText={setButtonText}
              customCss={customCss}
              setCustomCss={setCustomCss}
            />
          </div>
        </div>

        {/* Resize Handle - Hidden on mobile */}
        <button
          ref={resizeRef}
          className="hidden lg:block w-2 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 cursor-col-resize transition-all duration-200 relative group border-0 p-0 flex-shrink-0"
          onMouseDown={handleMouseDown}
          aria-label="Resize sidebar width"
          type="button"
        >
          {/* Visual indicator for resize handle */}
          <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors duration-200" />
          {/* Hover indicator dots */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex flex-col space-y-1">
              <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 rounded-full transition-colors duration-200"></div>
              <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 rounded-full transition-colors duration-200"></div>
              <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 rounded-full transition-colors duration-200"></div>
            </div>
          </div>
        </button>

        {/* Right Main Content Area */}
        <div
          className={`bg-gray-50 dark:bg-gray-800 custom-scrollbar ${isLargeScreen ? "flex-1 overflow-y-auto min-h-0" : ""} h-full`}
        >
          <div className="p-3 sm:p-6 h-full">
            <div className="w-full h-full">
              <OutputScreen
                mode={mode}
                appId={sequenceProjectAccessKey}
                toAddress={toAddress}
                toAmount={toAmount}
                toChainId={toChainId}
                toToken={customTokenAddress || toToken}
                toCalldata={toCalldata}
                useCustomButton={useCustomButton}
                renderInline={renderInline}
                theme={theme}
                walletOptions={walletOptions}
                paymasterUrls={paymasterUrls}
                gasless={gasless}
                buttonText={buttonText}
                customCss={customCss}
                apiUrl={apiUrl}
                indexerUrl={indexerUrl}
                env={env}
                privyAppId={privyAppId}
                privyClientId={privyClientId}
                defaultSequenceProjectAccessKey={
                  defaultSequenceProjectAccessKey
                }
              >
                <div className="mt-6 w-full max-w-md mx-auto px-4"></div>
              </OutputScreen>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
