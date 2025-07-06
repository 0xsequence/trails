import { useState } from "react"
import { CodeSnippet } from "../components/CodeSnippet"
import { Tabs } from "./Tabs"

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
  children,
}: OutputScreenProps) => {
  const [activeTab, setActiveTab] = useState<"modal" | "button" | "code">(
    "modal",
  )

  const tabs = [
    { id: "modal", label: "Modal" },
    { id: "button", label: "Button" },
    { id: "code", label: "Code" },
  ] as const

  return (
    <div className="w-full">
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-4">
        {activeTab === "modal" && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Modal Output
            </h3>
            <div className="flex justify-center">{children}</div>
          </div>
        )}

        {activeTab === "button" && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Button Output
            </h3>
            <div className="flex justify-center">{children}</div>
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
          >
            {null}
          </CodeSnippet>
        )}
      </div>
    </div>
  )
}
