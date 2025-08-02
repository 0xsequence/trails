import { TrailsWidget } from "0xtrails/widget"
import type { Mode } from "0xtrails"
import { forwardRef, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { GIT_COMMIT_SHA } from "@/config"
import { CodeSnippet } from "../CodeSnippet"
import { WidgetTabs } from "./WidgetTabs"
import { ConnectButton } from "../ConnectButton"

// Define the interface for the exposed methods
export interface OutputScreenRef {
  openModal: () => void
  closeModal: () => void
  isModalOpen: boolean
}

// Define the TrailsWidgetRef interface locally
interface TrailsWidgetRef {
  openModal: () => void
  closeModal: () => void
  isModalOpen: boolean
}

// Extend the global Window interface
declare global {
  interface Window {
    openModal?: () => void
    closeModal?: () => void
    isModalOpen?: () => boolean
  }
}

interface OutputScreenProps {
  mode: Mode | null
  appId: string
  toAddress: string
  toAmount: string
  toChainId: number | undefined
  toToken: string | undefined
  toCalldata: string
  useCustomButton: boolean | null
  renderInline: boolean | null
  theme: string | null
  walletOptions: string[] | null
  paymasterUrls: Array<{ chainId: number; url: string }>
  gasless: boolean | null
  buttonText: string
  customCss: string
  children: React.ReactNode
  apiUrl: string
  indexerUrl: string
  env: string
  privyAppId: string
  privyClientId: string
  defaultSequenceProjectAccessKey: string
}

export const OutputScreen = forwardRef<OutputScreenRef, OutputScreenProps>(
  ({
    mode,
    appId,
    toAddress,
    toAmount,
    toChainId,
    toToken,
    toCalldata,
    useCustomButton,
    renderInline,
    theme,
    walletOptions,
    paymasterUrls,
    gasless,
    buttonText,
    customCss,
    apiUrl,
    indexerUrl,
    env,
    privyAppId,
    privyClientId,
    defaultSequenceProjectAccessKey,
  }) => {
    const [activeTab, setActiveTab] = useState<"modal" | "button" | "code">(
      "modal",
    )
    const location = useLocation()
    const navigate = useNavigate()

    // Ref to the TrailsWidget component (button mode only)
    const buttonWidgetRef = useRef<TrailsWidgetRef>(null)

    // Expose global window functions for console access
    useEffect(() => {
      // Expose openModal globally
      window.openModal = () => {
        buttonWidgetRef?.current?.openModal()
      }

      // Expose closeModal globally
      window.closeModal = () => {
        buttonWidgetRef?.current?.closeModal()
      }

      // Expose isModalOpen globally
      window.isModalOpen = () => {
        return buttonWidgetRef?.current?.isModalOpen ?? false
      }

      // Cleanup function to remove global functions when component unmounts
      return () => {
        delete window.openModal
        delete window.closeModal
        delete window.isModalOpen
      }
    }, [])

    const handleQueryParamClick = (paramName: string) => {
      const searchParams = new URLSearchParams(location.search)
      searchParams.set(
        paramName,
        searchParams.get(paramName) === "true" ? "false" : "true",
      )
      navigate({ pathname: location.pathname, search: searchParams.toString() })
    }

    const tabs = [
      { id: "modal", label: "Component" },
      { id: "button", label: "Button" },
      { id: "code", label: "Code" },
    ]

    const handleTabChange = (tabId: string) => {
      setActiveTab(tabId as "modal" | "button" | "code")
    }

    const onOriginConfirmation = (txHash: string, chainId: number) => {
      console.log("onOriginConfirmation:", { txHash, chainId })
    }

    const onDestinationConfirmation = (txHash: string, chainId: number) => {
      console.log("onDestinationConfirmation:", { txHash, chainId })
    }

    return (
      <div
        className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl p-3 sm:p-6 relative h-full"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(107, 114, 128, 0.15) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      >
        <div className="sm:absolute sm:top-0 sm:right-4 z-10 flex flex-col sm:flex-row sm:items-center gap-8 mb-4 sm:mb-0 justify-center sm:justify-start w-full sm:w-auto">
          <ConnectButton />
          <div className="w-full sm:w-fit">
            <WidgetTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col sm:pt-16 w-full h-full">
          {activeTab === "modal" && (
            <div className="flex-1 flex items-center justify-center h-full">
              <div className="w-full max-w-md h-full flex items-center">
                <TrailsWidget
                  mode={mode}
                  appId={appId || defaultSequenceProjectAccessKey}
                  sequenceApiUrl={apiUrl}
                  sequenceIndexerUrl={indexerUrl}
                  sequenceEnv={env}
                  toAddress={toAddress}
                  toAmount={toAmount}
                  toChainId={toChainId}
                  toToken={toToken}
                  toCalldata={toCalldata}
                  renderInline={true}
                  theme={theme}
                  walletOptions={walletOptions}
                  privyAppId={privyAppId}
                  privyClientId={privyClientId}
                  paymasterUrls={paymasterUrls}
                  gasless={gasless}
                  onOriginConfirmation={onOriginConfirmation}
                  onDestinationConfirmation={onDestinationConfirmation}
                  buttonText={buttonText}
                  customCss={customCss}
                />
              </div>
            </div>
          )}

          {activeTab === "button" && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-16 h-full">
              <TrailsWidget
                ref={buttonWidgetRef}
                mode={mode}
                appId={appId || defaultSequenceProjectAccessKey}
                sequenceApiUrl={apiUrl}
                sequenceIndexerUrl={indexerUrl}
                sequenceEnv={env}
                toAddress={toAddress}
                toAmount={toAmount}
                toChainId={toChainId}
                toToken={toToken}
                toCalldata={toCalldata}
                renderInline={false}
                theme={theme}
                walletOptions={walletOptions}
                privyAppId={privyAppId}
                privyClientId={privyClientId}
                paymasterUrls={paymasterUrls}
                gasless={gasless}
                onOriginConfirmation={onOriginConfirmation}
                onDestinationConfirmation={onDestinationConfirmation}
                buttonText={buttonText}
                customCss={customCss}
              >
                {useCustomButton ? (
                  <button
                    type="button"
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg cursor-pointer transition-colors"
                  >
                    💸 Pay with Trails
                  </button>
                ) : null}
              </TrailsWidget>
            </div>
          )}

          {activeTab === "code" && (
            <div className="flex-1 overflow-y-auto h-full">
              <CodeSnippet
                mode={mode}
                appId={appId}
                toAddress={toAddress}
                toAmount={toAmount}
                toChainId={toChainId}
                toToken={toToken}
                toCalldata={toCalldata}
                useCustomButton={useCustomButton}
                renderInline={renderInline}
                theme={theme}
                walletOptions={walletOptions}
                paymasterUrls={paymasterUrls}
                gasless={gasless}
                buttonText={buttonText}
                customCss={customCss}
                onOriginConfirmation={onOriginConfirmation?.toString()}
                onDestinationConfirmation={onDestinationConfirmation?.toString()}
              />
            </div>
          )}
        </div>
        <button
          onClick={() => handleQueryParamClick("debug")}
          className="absolute bottom-3 right-4 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer z-10 opacity-50 hover:opacity-75 transition-opacity"
          type="button"
        >
          Debug
        </button>
        <button
          onClick={() => handleQueryParamClick("testnet")}
          className="absolute bottom-3 right-16 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer z-10 opacity-50 hover:opacity-75 transition-opacity"
          type="button"
        >
          Testnet
        </button>
        <button
          onClick={() => handleQueryParamClick("cctp")}
          className="absolute bottom-3 right-28 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer z-10 opacity-50 hover:opacity-75 transition-opacity"
          type="button"
        >
          CCTP
        </button>

        {/* Git Commit Hash */}
        {GIT_COMMIT_SHA && (
          <div
            className="absolute bottom-3 left-4 text-xs text-gray-400 dark:text-gray-500 opacity-50 cursor-help"
            title="Git commit hash"
          >
            {GIT_COMMIT_SHA.slice(0, 8)}
          </div>
        )}
      </div>
    )
  },
)
