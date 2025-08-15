import React from "react"
import { createRoot } from "react-dom/client"
import type { RelayerEnv } from "./relayer.js"
import type { Theme } from "./theme.js"
import { TrailsWidget } from "./widget/widget.js"

interface TrailsGlobal {
  render: (
    element: HTMLElement,
    options: {
      appId: string
      indexerUrl?: string
      apiUrl?: string
      env?: RelayerEnv
      toRecipient?: string
      toAmount?: string
      toChainId?: number | string
      toToken?: string
      toCalldata?: string
      theme?: Theme
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
  window.TrailsWidget = TrailsGlobal
}

// Add type declaration for window object
declare global {
  interface Window {
    TrailsWidget: TrailsGlobal
  }
}
