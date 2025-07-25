import { ConnectProvider } from "@/routes/widget-demo/ConnectKitProvider"
import { SdkSandbox as _SdkSandbox } from "./SdkSandbox"

export function SdkSandbox() {
  return (
    <ConnectProvider>
      <_SdkSandbox />
    </ConnectProvider>
  )
}
