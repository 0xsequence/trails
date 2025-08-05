import {
  injected,
  safe,
  walletConnect,
  coinbaseWallet,
} from "@wagmi/connectors"
import type { CreateConnectorFn } from "wagmi"
import { reownProjectId } from "../../config"

// Create metadata object
const metadata = {
  name: "Trails Demo",
  description: "Trails Widget Demo",
  url:
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:5173",
  icons: ["https://sequence.xyz/favicon.ico"],
}

const shouldUseSafeConnector =
  !(typeof window === "undefined") && window?.parent !== window

const connectors: CreateConnectorFn[] = []

// If we're in an iframe, include the SafeConnector
if (shouldUseSafeConnector) {
  connectors.push(
    safe({
      allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
    }),
  )
}

// Add the rest of the connectors
connectors.push(
  injected({ target: "metaMask" }),
  coinbaseWallet({
    appName: metadata.name,
    appLogoUrl: metadata.icons[0],
    overrideIsMetaMask: false,
    preference: {
      telemetry: false,
    } as any,
  }),
)

if (reownProjectId) {
  connectors.push(
    walletConnect({
      showQrModal: false,
      projectId: reownProjectId,
      metadata,
    }),
  )
}

export { connectors }
