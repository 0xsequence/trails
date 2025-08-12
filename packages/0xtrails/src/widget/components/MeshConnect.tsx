import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { ArrowLeft } from "lucide-react"
import * as meshSDK from "@meshconnect/web-link-sdk"
import {
  createNewLinkToken,
  getMeshConnectClientId,
  getMeshConnectEnvironment,
  getMeshNetworkIdFromChainId,
} from "../../meshconnect.js"

export interface MeshConnectProps {
  onBack: () => void
  toTokenSymbol?: string
  onComplete?: (transferData: any) => void
  toTokenAmount?: string
  toChainId?: number
  toRecipientAddress?: string
}

export const MeshConnect: React.FC<MeshConnectProps> = ({
  onBack,
  toTokenSymbol,
  toTokenAmount,
  toChainId,
  toRecipientAddress,
  onComplete,
}) => {
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [payload, setPayload] = useState<any>(null)
  const [transferFinishedData, setTransferFinishedData] = useState<any>(null)
  const [meshLink, setMeshLink] = useState<any>(null)
  const [iframeContainer, setIframeContainer] = useState<HTMLDivElement | null>(
    null,
  )
  const [showIframe, setShowIframe] = useState(false)
  const [iframePlaceholder, setIframePlaceholder] =
    useState<HTMLDivElement | null>(null)

  // Create iframe container outside shadow DOM on mount
  useEffect(() => {
    // Create container div in document body
    const container = document.createElement("div")
    container.id = "mesh-iframe-portal"
    // Position will be set dynamically based on widget position
    container.style.position = "absolute"
    container.style.zIndex = "10000"
    container.style.display = "none" // Initially hidden

    document.body.appendChild(container)
    setIframeContainer(container)

    // Cleanup on unmount
    return () => {
      if (document.body.contains(container)) {
        document.body.removeChild(container)
      }
    }
  }, [])

  // Generate link token on component mount
  useEffect(() => {
    const generateLinkToken = async () => {
      try {
        setLoading(true)
        setError(null)

        if (
          !toRecipientAddress ||
          !toTokenSymbol ||
          !toChainId ||
          !toTokenAmount
        ) {
          console.error("[trails-sdk] Missing required parameters", {
            toRecipientAddress,
            toTokenSymbol,
            toChainId,
            toTokenAmount,
          })
          throw new Error("Missing required parameters")
        }

        const networkId = (await getMeshNetworkIdFromChainId(
          toChainId,
        )) as string

        // Generate a new link token for receiving tokens
        const response = await createNewLinkToken(
          undefined, // Use default API key
          undefined, // Use default client ID
          {
            environment: getMeshConnectEnvironment(),
            address: toRecipientAddress,
            symbol: toTokenSymbol,
            networkId: networkId,
            amount: toTokenAmount.toString(),
            transactionId: `txid_${Date.now()}`,
          },
        )

        console.log(
          "[trails-sdk] Generated Mesh Connect link token response:",
          response,
        )
        console.log("[trails-sdk] Link token:", response.content.linkToken)

        // Validate link token format
        if (
          !response.content.linkToken ||
          typeof response.content.linkToken !== "string"
        ) {
          throw new Error("Invalid link token received")
        }

        setLinkToken(response.content.linkToken)
      } catch (err) {
        console.error(
          "[trails-sdk] Failed to generate Mesh Connect link token:",
          err,
        )
        setError(
          err instanceof Error ? err.message : "Failed to generate link token",
        )
      } finally {
        setLoading(false)
      }
    }

    generateLinkToken()
  }, [toRecipientAddress, toTokenSymbol, toChainId, toTokenAmount])

  const handleIntegrationConnected = useCallback((authData: any) => {
    console.log("[trails-sdk] MESH CONNECTED:", authData)
    setPayload(authData)

    // Once connected, we can initiate a transfer
    if (authData.accessToken) {
      console.log("[trails-sdk] Ready to transfer - access token available")
    }
  }, [])

  const handleTransferFinished = useCallback((transferData: any) => {
    console.log("[trails-sdk] MESH TRANSFER FINISHED:", transferData)
    setTransferFinishedData(transferData)
  }, [])

  const handleExit = useCallback(
    (error?: string) => {
      console.log("[trails-sdk] MESH EXIT:", error)

      // Hide the iframe when user exits
      setShowIframe(false)
      if (iframeContainer) {
        iframeContainer.style.display = "none"
      }

      if (error) {
        console.error("[trails-sdk] MESH ERROR:", error)
        setError(error)
      }
    },
    [iframeContainer],
  )

  // Create Mesh Connect link instance when component mounts
  useEffect(() => {
    const createMeshLink = async () => {
      try {
        console.log("[trails-sdk] Creating Mesh Connect link...")
        const link = meshSDK.createLink({
          clientId: getMeshConnectClientId(),
          language: "en",
          onIntegrationConnected: handleIntegrationConnected,
          onExit: handleExit,
          onTransferFinished: handleTransferFinished,
          onEvent: (ev: any) => {
            console.log("[trails-sdk] MESH Event:", ev)
            if (ev.type === "transferExecuted" && ev.payload) {
              setTransferFinishedData(ev.payload)
            }
          },
        })

        console.log("[trails-sdk] Mesh Connect link created successfully")
        setMeshLink(link)
      } catch (err) {
        console.error("[trails-sdk] Failed to create Mesh Connect link:", err)
        setError(
          `Failed to load Mesh Connect SDK: ${err instanceof Error ? err.message : String(err)}`,
        )
      }
    }

    createMeshLink()
  }, [handleIntegrationConnected, handleTransferFinished, handleExit])

  // Position the iframe container based on placeholder position
  useEffect(() => {
    if (!iframeContainer || !iframePlaceholder || !showIframe) {
      console.log("[trails-sdk] Positioning check failed:", {
        iframeContainer: !!iframeContainer,
        iframePlaceholder: !!iframePlaceholder,
        showIframe,
      })
      return
    }

    const positionIframe = () => {
      const rect = iframePlaceholder.getBoundingClientRect()
      console.log("[trails-sdk] Positioning iframe at:", rect)

      iframeContainer.style.position = "fixed"
      iframeContainer.style.left = `${rect.left}px`
      iframeContainer.style.top = `${rect.top}px`
      iframeContainer.style.width = `${rect.width}px`
      iframeContainer.style.height = `${rect.height}px`
      iframeContainer.style.display = "block"
      iframeContainer.style.backgroundColor = "white"
      iframeContainer.style.border = "1px solid #ccc"
      iframeContainer.style.zIndex = "10000"

      console.log("[trails-sdk] Applied styles:", iframeContainer.style.cssText)
    }

    // Use setTimeout to ensure DOM is ready
    setTimeout(positionIframe, 100)

    // Update position on scroll/resize
    const handleUpdate = () => positionIframe()
    window.addEventListener("scroll", handleUpdate)
    window.addEventListener("resize", handleUpdate)

    return () => {
      window.removeEventListener("scroll", handleUpdate)
      window.removeEventListener("resize", handleUpdate)
    }
  }, [iframeContainer, iframePlaceholder, showIframe])

  // Open Mesh Connect iframe
  const openMeshConnect = useCallback(() => {
    console.log("[trails-sdk] openMeshConnect called:", {
      meshLink: !!meshLink,
      linkToken: !!linkToken,
      iframeContainer: !!iframeContainer,
    })

    if (!meshLink || !linkToken || !iframeContainer) {
      console.log("[trails-sdk] Missing requirements for opening")
      return
    }

    console.log("[trails-sdk] Setting showIframe to true")
    setShowIframe(true)

    // Wait for iframe to be positioned before opening
    setTimeout(() => {
      console.log("[trails-sdk] Opening Mesh Connect with token:", linkToken)
      try {
        // Try opening in iframe first
        meshLink.openLink(linkToken, "mesh-iframe")
        console.log("[trails-sdk] Opened in iframe successfully")

        ;(window as any).meshLink = meshLink
      } catch (iframeError) {
        console.warn(
          "[trails-sdk] Failed to open in iframe, trying popup:",
          iframeError,
        )
        try {
          // Fallback to popup
          meshLink.openLink(linkToken)
          console.log("[trails-sdk] Opened in popup successfully")
        } catch (popupError) {
          console.error("[trails-sdk] Failed to open link:", popupError)
          setError("Failed to open Mesh Connect link")
        }
      }
    }, 200)
  }, [meshLink, linkToken, iframeContainer])

  // Handle closing the iframe
  const handleCloseMeshConnect = useCallback(() => {
    setShowIframe(false)
    if (iframeContainer) {
      iframeContainer.style.display = "none"
    }
  }, [iframeContainer])

  // Console log payload changes
  useEffect(() => {
    if (payload) {
      console.log("[trails-sdk] Payload updated:", payload)
    }
  }, [payload])

  // Navigate to pending screen when transfer is finished
  useEffect(() => {
    if (transferFinishedData) {
      console.log(
        "[trails-sdk] Transfer finished data updated:",
        transferFinishedData,
      )
      // Navigate to pending screen
      if (onComplete) {
        onComplete(transferFinishedData)
      }
    }
  }, [transferFinishedData, onComplete])

  // Auto-click the openMeshConnect button when ready
  useEffect(() => {
    if (meshLink && linkToken && !showIframe && !payload) {
      console.log("[trails-sdk] Auto-clicking openMeshConnect button")
      openMeshConnect()
    }
  }, [meshLink, linkToken, showIframe, payload, openMeshConnect])

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={onBack}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold">Mesh Connect</h2>
          <div className="w-9" />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Generating secure connection...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
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
          <h2 className="text-lg font-semibold">Mesh Connect</h2>
          <div className="w-9" />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
            <p className="text-red-600 dark:text-red-200 mb-4">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
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
        <h2 className="text-lg font-semibold">Fund with Mesh Connect</h2>
        <div className="w-9" />
      </div>

      {transferFinishedData && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-200">
            ✓ Transfer completed: {transferFinishedData.amount}{" "}
            {transferFinishedData.symbol}
          </p>
          <p className="text-xs text-blue-500 dark:text-blue-300 mt-1">
            Redirecting to pending screen...
          </p>
        </div>
      )}

      {/* Mesh Connect iframe area */}
      <div className="flex-1">
        {!showIframe && !payload ? (
          <div className="flex items-center justify-center h-full min-h-[500px]">
            <div className="text-center p-8 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                Fund your account with Mesh Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Connect to bank account or exchange to fund your wallet
                securely.
              </p>
              <button
                onClick={openMeshConnect}
                disabled={!meshLink || !linkToken}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!meshLink || !linkToken ? "Preparing..." : "Continue"}
              </button>
            </div>
          </div>
        ) : showIframe ? (
          <div className="relative">
            <button
              onClick={handleCloseMeshConnect}
              className="absolute top-2 right-2 z-10 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700"
            >
              ×
            </button>
            <div
              ref={setIframePlaceholder}
              className="w-full h-[500px] border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
            />
          </div>
        ) : null}
      </div>

      {/* Sandbox Environment Banner */}
      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
        <div className="text-center">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            Sandbox environment
          </p>
          <p className="text-xs text-yellow-600 dark:text-yellow-300">
            No real funds are used
          </p>
        </div>
      </div>

      {/* Portal for iframe outside shadow DOM */}
      {iframeContainer &&
        showIframe &&
        createPortal(
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <iframe
              id="mesh-iframe"
              title="Mesh Connect"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "white",
              }}
            />
          </div>,
          iframeContainer,
        )}
    </div>
  )
}

export default MeshConnect
