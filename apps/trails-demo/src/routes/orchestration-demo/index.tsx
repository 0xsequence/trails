import { WagmiProvider } from "wagmi"
import { config } from "@/wagmi.config"
import { OrchestrationDemo as _OrchestrationDemo } from "./OrchestrationDemo"

// The widget demo uses a different wagmi config, so we need to use a different provider here
export function OrchestrationDemo() {
  return (
    <WagmiProvider config={config}>
      <_OrchestrationDemo />
    </WagmiProvider>
  )
}
