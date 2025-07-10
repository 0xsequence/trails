import { TrailsWidget } from "@0xsequence/trails-sdk/widget"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
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
  // Add missing props
  provider: any
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
  provider,
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
    searchParams.set("debug", "true")
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
    <div className="w-full bg-gray-800 rounded-2xl p-6 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="w-fit">
          <WidgetTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
        <Link
          to="/sdk-sandbox"
          className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
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
              provider={provider}
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
              provider={provider}
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
        className="absolute bottom-3 right-4 text-xs text-gray-500 hover:text-white cursor-pointer z-10"
        type="button"
      >
        Debug
      </button>
    </div>
  )
}
