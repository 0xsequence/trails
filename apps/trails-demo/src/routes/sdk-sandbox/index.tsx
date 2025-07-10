import { Providers } from "@/routes/widget-demo/Providers"
import { SdkSandbox as _SdkSandbox } from "./SdkSandbox"

export function SdkSandbox() {
  return (
    <Providers>
      <_SdkSandbox />
    </Providers>
  )
}
