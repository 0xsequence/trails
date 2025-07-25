import { ConnectProvider } from "./ConnectKitProvider"
import { WidgetDemo as _WidgetDemo } from "./WidgetDemo"

export function WidgetDemo() {
  return (
    <ConnectProvider>
      <_WidgetDemo />
    </ConnectProvider>
  )
}
