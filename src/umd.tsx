import React from "react"
import { createRoot } from "react-dom/client"
import { TrailsWidget } from "./widget/widget.js"

interface TrailsGlobal {
  render: (
    element: HTMLElement,
    options: {
      sequenceProjectAccessKey: string
      indexerUrl?: string
      apiUrl?: string
      env?: "local" | "cors-anywhere" | "dev" | "prod"
      toRecipient?: string
      toAmount?: string
      toChainId?: number | string
      toToken?: "USDC" | "ETH"
      toCalldata?: string
      theme?: "light" | "dark" | "auto"
    },
  ) => void
}

const TrailsGlobal: TrailsGlobal = {
  render: (element, options) => {
    const root = createRoot(element)
    root.render(
      <React.StrictMode>
        <TrailsWidget {...options} />
      </React.StrictMode>,
    )
  },
}

// Export for both UMD and ESM/CJS
export default TrailsGlobal

// Explicitly set the global for UMD
if (typeof window !== "undefined") {
  ;(window as any).TrailsWidget = TrailsGlobal
}

// Add type declaration for window object
declare global {
  interface Window {
    TrailsWidget: TrailsGlobal
  }
}
