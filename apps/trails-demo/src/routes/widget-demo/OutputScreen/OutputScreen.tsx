import { TrailsWidget } from "@0xsequence/trails-sdk/widget"
import { useState } from "react"
import { CodeSnippet } from "../components/CodeSnippet"
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

  const tabs = [
    { id: "modal", label: "Component" },
    { id: "button", label: "Button" },
    { id: "code", label: "Code" },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as "modal" | "button" | "code")
  }

  return (
    <div className="w-full bg-gray-800 rounded-2xl p-6">
      <div className="w-fit mb-4">
        <WidgetTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
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
    </div>
  )
}
