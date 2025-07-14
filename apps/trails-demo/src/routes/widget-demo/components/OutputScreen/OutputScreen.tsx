import { TrailsWidget } from "@0xsequence/trails-sdk/widget"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { GIT_COMMIT_SHA } from "@/config"
import { CodeSnippet } from "../CodeSnippet"
import { WidgetTabs } from "./WidgetTabs"

interface OutputScreenProps {
  sequenceProjectAccessKey: string
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
  children: React.ReactNode
  apiUrl: string
  indexerUrl: string
  env: string
  privyAppId: string
  privyClientId: string
  defaultSequenceProjectAccessKey: string
}

export const OutputScreen = ({
  sequenceProjectAccessKey,
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
  apiUrl,
  indexerUrl,
  env,
  privyAppId,
  privyClientId,
  defaultSequenceProjectAccessKey,
}: OutputScreenProps) => {
  const [activeTab, setActiveTab] = useState<"modal" | "button" | "code">(
    "modal",
  )
  const location = useLocation()
  const navigate = useNavigate()

  const handleDebugClick = () => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set(
      "debug",
      searchParams.get("debug") === "true" ? "false" : "true",
    )
    navigate({ pathname: location.pathname, search: searchParams.toString() })
  }

  const handleTestnetClick = () => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set(
      "testnet",
      searchParams.get("testnet") === "true" ? "false" : "true",
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

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 relative min-h-[775px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="w-fit">
          <WidgetTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
        <Link
          to="/sdk-sandbox"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 w-fit flex items-center"
        >
          SDK Sandbox →
        </Link>
      </div>

      <div className="mt-4 py-4">
        {activeTab === "modal" && (
          <div className="w-full">
            <TrailsWidget
              sequenceProjectAccessKey={
                sequenceProjectAccessKey || defaultSequenceProjectAccessKey
              }
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
              useSourceTokenForButtonText={true}
              privyAppId={privyAppId}
              privyClientId={privyClientId}
              paymasterUrls={paymasterUrls}
              gasless={gasless}
            />
          </div>
        )}

        {activeTab === "button" && (
          <div className="flex justify-center">
            <TrailsWidget
              sequenceProjectAccessKey={
                sequenceProjectAccessKey || defaultSequenceProjectAccessKey
              }
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
              useSourceTokenForButtonText={true}
              privyAppId={privyAppId}
              privyClientId={privyClientId}
              paymasterUrls={paymasterUrls}
              gasless={gasless}
            >
              {useCustomButton ? (
                <button
                  type="button"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-600 cursor-pointer transition duration-300"
                >
                  Pay with Trails
                </button>
              ) : null}
            </TrailsWidget>
          </div>
        )}

        {activeTab === "code" && (
          <CodeSnippet
            sequenceProjectAccessKey={sequenceProjectAccessKey}
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
          />
        )}
      </div>
      <button
        onClick={handleDebugClick}
        className="absolute bottom-3 right-4 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer z-10 opacity-50 hover:opacity-75 transition-opacity"
        type="button"
      >
        Debug
      </button>
      <button
        onClick={handleTestnetClick}
        className="absolute bottom-3 right-16 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer z-10 opacity-50 hover:opacity-75 transition-opacity"
        type="button"
      >
        Testnet
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
}
