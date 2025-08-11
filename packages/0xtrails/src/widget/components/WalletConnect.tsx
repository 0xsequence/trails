import React, { useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { useAccount, useConnect } from "wagmi"
import { walletConnect } from "wagmi/connectors"
import { QrCode } from "./QrCode.js"

export interface WalletConnectProps {
  onBack: () => void
  projectId?: string
}

const DEFAULT_WC_PROJECT_ID = "3fcc6bba6f1de962d911bb5b5c3dba68"

// Local singleton to avoid multiple Core initializations from this screen
let wcConnectorSingleton: ReturnType<typeof walletConnect> | null = null
function getWalletConnectConnector(projectId?: string) {
  if (!wcConnectorSingleton) {
    wcConnectorSingleton = walletConnect({
      projectId: projectId || DEFAULT_WC_PROJECT_ID,
      showQrModal: false,
    })
  }
  return wcConnectorSingleton
}

export const WalletConnectScreen: React.FC<WalletConnectProps> = ({
  onBack,
  projectId,
}) => {
  const { connect, connectors, status, error } = useConnect() as any
  const { isConnected } = useAccount()
  const [wcUri, setWcUri] = React.useState<string | null>(null)
  const providerRef = React.useRef<any>(null)
  const listenerRef = React.useRef<((uri: string) => void) | null>(null)

  useEffect(() => {
    if (isConnected) {
      onBack()
    }
  }, [isConnected, onBack])

  useEffect(() => {
    return () => {
      try {
        providerRef.current?.off?.("display_uri", listenerRef.current)
      } catch {}
    }
  }, [])

  const wcConnectorFromConfig = connectors.find((c: any) =>
    (c.id || "").toLowerCase().includes("walletconnect"),
  )

  const handleConnect = async () => {
    if (status === "pending" || status === "success") return

    const makeConnector = () => getWalletConnectConnector(projectId)
    const connector = wcConnectorFromConfig || makeConnector()

    try {
      const provider: any = await (connector as any).getProvider?.()
      providerRef.current = provider

      // Subscribe to display_uri like ConnectKit does
      const onDisplayUri = (uri: string) => {
        if (uri) setWcUri(uri)
      }
      listenerRef.current = onDisplayUri
      provider?.on?.("display_uri", onDisplayUri)

      // Some providers already have the uri populated
      const maybeUri = provider?.connector?.uri || provider?.uri
      if (maybeUri && !wcUri) setWcUri(maybeUri as string)

      await connect({ connector })

      // Cleanup the listener once connect resolves
      provider?.off?.("display_uri", onDisplayUri)
    } catch (err) {
      console.error("[WalletConnect] connect error", err)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">Connect with WalletConnect</h2>
        <div className="w-9" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-6 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-full max-w-sm">
          <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
            Scan the QR code with your mobile wallet or click continue to open
            your WalletConnect-compatible wallet.
          </p>

          {wcUri ? (
            <div className="flex flex-col items-center">
              <QrCode url={wcUri} size={220} />
              <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 break-all">
                {wcUri}
              </p>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continue with WalletConnect
            </button>
          )}

          <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
            {status === "pending" && <span>Waiting for confirmation…</span>}
            {error && <span className="text-red-500">{error.message}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletConnectScreen
