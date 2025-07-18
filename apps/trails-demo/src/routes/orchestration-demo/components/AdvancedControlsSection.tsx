import { Button, NetworkImage, Text } from "@0xsequence/design-system"
import type { IntentCallsPayload } from "@0xsequence/trails-api"
import type { MetaTxn } from "@0xsequence/trails-sdk"
import { Info, Layers, Loader2 } from "lucide-react"
import type React from "react"
import { SectionHeader } from "./SectionHeader"

interface AdvancedControlsSectionProps {
  accountAddress: string | undefined
  intentCallsPayloads: IntentCallsPayload[] | null
  metaTxns: MetaTxn[] | null
  isManualMetaTxnEnabled: boolean
  setIsManualMetaTxnEnabled: (enabled: boolean) => void
  selectedMetaTxnId: string | null
  setSelectedMetaTxnId: (id: string | null) => void
  handleSendMetaTxn: (selectedId: string | null) => void
  sendMetaTxnPending: boolean
}

export const AdvancedControlsSection: React.FC<
  AdvancedControlsSectionProps
> = ({
  accountAddress,
  intentCallsPayloads,
  metaTxns,
  isManualMetaTxnEnabled,
  setIsManualMetaTxnEnabled,
  selectedMetaTxnId,
  setSelectedMetaTxnId,
  handleSendMetaTxn,
  sendMetaTxnPending,
}) => {
  if (!accountAddress || !intentCallsPayloads) {
    return null
  }

  return (
    <div className="px-6 space-y-6 pb-6">
      <SectionHeader
        title={
          <div className="flex items-center">
            <Layers className="h-5 w-5 mr-2" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Manual Meta Transaction Controls
            </span>
          </div>
        }
        noFrame
        titleContainerClassName="w-full"
      >
        <div className="bg-gray-900/50 p-4 rounded-lg border border-purple-700/30 mt-2">
          <div className="flex items-center justify-between mb-4">
            <Text
              variant="medium"
              color="primary"
              className="flex items-center text-gray-200 dark:text-gray-200"
            >
              Enable Manual Controls
            </Text>
            <div className="flex items-center space-x-2">
              <Text
                variant="small"
                color="secondary"
                className="text-gray-400 dark:text-gray-400"
              >
                {isManualMetaTxnEnabled ? "Enabled" : "Disabled"}
              </Text>
              <div
                onClick={() =>
                  setIsManualMetaTxnEnabled(!isManualMetaTxnEnabled)
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  isManualMetaTxnEnabled ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isManualMetaTxnEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </div>
            </div>
          </div>
          {isManualMetaTxnEnabled && (
            <div className="mt-2 space-y-4">
              <div className="bg-gray-800/70 p-3 rounded-md">
                <Text
                  variant="small"
                  color="secondary"
                  className="mb-2 text-gray-300 dark:text-gray-300"
                >
                  Select Meta Transaction:
                </Text>
                <div className="space-y-2">
                  {metaTxns?.map((tx: MetaTxn, index: number) => (
                    <div
                      key={tx.id}
                      onClick={() => setSelectedMetaTxnId(tx.id)}
                      className={`p-2 rounded-md cursor-pointer transition-all duration-200 ${
                        selectedMetaTxnId === tx.id
                          ? "bg-purple-900/50 border border-purple-500"
                          : "bg-gray-700/50 border border-gray-600 hover:bg-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <NetworkImage
                            chainId={parseInt(tx.chainId.toString())}
                            size="sm"
                            className="w-4 h-4"
                          />
                          <Text
                            variant="small"
                            color="secondary"
                            className="text-gray-300 dark:text-gray-300"
                          >
                            #{index + 1} - Chain {tx.chainId.toString()}
                          </Text>
                        </div>
                        <Text
                          variant="small"
                          color="secondary"
                          className="font-mono text-xs text-gray-400 dark:text-gray-400"
                        >
                          ID: {tx.id}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="feature"
                  onClick={() => handleSendMetaTxn(selectedMetaTxnId)}
                  disabled={
                    !metaTxns ||
                    metaTxns.length === 0 ||
                    !accountAddress ||
                    sendMetaTxnPending
                  }
                  className="flex-1 px-4 py-2 shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {sendMetaTxnPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Layers className="h-4 w-4 mr-2" />
                      {selectedMetaTxnId
                        ? "Send Selected Meta Transaction"
                        : "Send All Meta Transactions"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
          <div className="mt-2 flex items-center">
            <Text
              variant="small"
              color="secondary"
              className="text-center text-gray-400 dark:text-gray-400"
            >
              <Info className="h-4 w-4 inline mr-1" />
              {selectedMetaTxnId
                ? "This will send only the selected meta transaction"
                : "This will send all meta transactions in sequence"}
            </Text>
          </div>
        </div>
      </SectionHeader>
    </div>
  )
}
