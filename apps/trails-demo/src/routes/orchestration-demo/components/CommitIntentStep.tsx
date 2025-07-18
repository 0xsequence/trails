import { Button, NetworkImage, Text } from "@0xsequence/design-system"
import type {
  GetIntentConfigReturn,
  IntentCallsPayload,
  IntentPrecondition,
} from "@0xsequence/trails-api"
import type { QuoteProvider, TrailsFee } from "0xtrails"
import { AlertCircle, Loader2, Zap } from "lucide-react"
import type React from "react"
import { SectionHeader } from "@/routes/orchestration-demo/components/SectionHeader"
import { getChainInfo, getExplorerUrl } from "@/utils/formatting"

interface CommitIntentStepProps {
  intentCallsPayloads: IntentCallsPayload[] | null
  intentPreconditions: IntentPrecondition[] | null
  trailsFee: TrailsFee | null
  verificationStatus: {
    success: boolean
    calculatedOriginAddress?: string
    calculatedDestinationAddress?: string
    receivedOriginAddress?: string
    receivedDestinationAddress?: string
  } | null
  commitIntentConfigError: Error | null
  commitIntentConfigSuccess: boolean
  committedOriginIntentAddress: string | null
  committedDestinationIntentAddress: string | null
  isLoadingCommittedConfig: boolean
  committedConfigError: Error | null
  committedIntentConfigData: GetIntentConfigReturn | undefined
  commitIntentConfig: (args: {
    mainSignerAddress: string
    calls: IntentCallsPayload[]
    preconditions: IntentPrecondition[]
    quoteProvider: QuoteProvider
  }) => void
  isCommitButtonDisabled: boolean
  commitButtonText: React.ReactNode
  accountAddress: string | undefined
}

const renderAddressParts = (addressString: string, success: boolean) => {
  if (!addressString) {
    return <div className="font-mono text-xs break-all text-gray-400">N/A</div>
  }

  const isKeyValueFormat = addressString.includes(":")

  if (!isKeyValueFormat) {
    return (
      <div
        className={`font-mono text-xs break-all ${
          success ? "text-yellow-300" : "text-red-400"
        }`}
      >
        {addressString}
      </div>
    )
  }

  return addressString.split(",").map((part, index) => {
    const [key, ...valueParts] = part.split(":")
    const value = valueParts.join(":").trim()
    return (
      <div key={index} className="flex items-start">
        <span className="font-semibold text-blue-300 w-[100px] flex-shrink-0">
          {key?.trim()}:
        </span>
        <span className={`font-mono text-xs break-all ${"text-yellow-300"}`}>
          {value}
        </span>
      </div>
    )
  })
}

const renderExplorerLink = (address: string, chainId: number) => {
  if (!address || address === "N/A") return null

  const explorerUrl = getExplorerUrl(chainId, address)
  const chainInfo = getChainInfo(chainId)
  if (!explorerUrl) return null

  return (
    <div className="mt-1">
      <a
        href={explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={`View ${address} on ${chainInfo?.name || "explorer"}`}
        className="flex items-center space-x-2 hover:underline text-xs break-all text-blue-400"
      >
        <NetworkImage chainId={chainId} size="xs" className="w-4 h-4" />
        <span>{explorerUrl}</span>
      </a>
    </div>
  )
}

const AddressDisplay: React.FC<{
  label: string
  address?: string
  chainId?: number
  success: boolean
}> = ({ label, address, chainId, success }) => {
  if (!address) return null

  return (
    <div>
      <div className="text-blue-300 text-sm">{label}:</div>
      <div className="font-mono text-sm break-all text-yellow-300 mt-1">
        {address}
      </div>
      {success && chainId && renderExplorerLink(address, chainId)}
    </div>
  )
}

export const CommitIntentStep: React.FC<CommitIntentStepProps> = ({
  intentCallsPayloads,
  intentPreconditions,
  trailsFee,
  verificationStatus,
  commitIntentConfigError,
  commitIntentConfigSuccess,
  committedOriginIntentAddress,
  committedDestinationIntentAddress,
  isLoadingCommittedConfig,
  committedConfigError,
  committedIntentConfigData,
  commitIntentConfig,
  isCommitButtonDisabled,
  commitButtonText,
  accountAddress,
}) => {
  if (!intentCallsPayloads || !intentPreconditions) {
    return null
  }

  return (
    <>
      <SectionHeader
        noFrame={true}
        titleContainerClassName="px-6 pt-4 pb-4 flex items-center justify-between w-full hover:bg-gray-700/60 rounded-md"
        contentContainerClassName="px-6 pb-4 border-t border-gray-700/30"
        isCollapsible={true}
        defaultOpen={false} // Default to closed as it's a detailed step
        title={
          <div className="flex items-center">
            <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-2 shadow-lg">
              <span>5</span>
            </div>
            <h3 className="text-xl font-semibold text-white">Commit Intent</h3>
          </div>
        }
      >
        <div className="text-xs text-gray-300 bg-gray-900/90 p-4 mt-2 rounded-lg border-t border-gray-700/70 overflow-x-auto space-y-2 shadow-inner animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {verificationStatus && (
              <div
                className={`bg-gray-900/50 p-3 rounded-lg border ${verificationStatus.success ? "border-green-700/30" : "border-red-700/30"}`}
              >
                <div className="flex items-center">
                  <div className="flex flex-col w-full">
                    <Text
                      variant="small"
                      color={verificationStatus.success ? "info" : "negative"}
                      className="font-semibold"
                    >
                      {verificationStatus.success
                        ? "Address Verification Successful"
                        : "Address Verification Failed"}
                    </Text>
                    <div className="mt-2 text-xs text-gray-400 flex flex-col space-y-2 w-full">
                      <div className="bg-gray-800/70 p-2 rounded-md space-y-2">
                        <div>
                          <strong className="text-blue-300">
                            Calculated Origin Intent Address:
                          </strong>
                          <div className="pl-2 space-y-1">
                            {renderAddressParts(
                              verificationStatus.calculatedOriginAddress ||
                                "N/A",
                              verificationStatus.success,
                            )}
                          </div>
                        </div>
                        <div>
                          <strong className="text-blue-300">
                            Calculated Destination Intent Address:
                          </strong>
                          <div className="pl-2 space-y-1">
                            {renderAddressParts(
                              verificationStatus.calculatedDestinationAddress ||
                                "N/A",
                              verificationStatus.success,
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800/70 p-2 rounded-md space-y-2">
                        <div>
                          <strong className="text-blue-300">
                            Expected Origin Intent Address (from preconditions):
                          </strong>
                          <div className="pl-2 space-y-1">
                            {renderAddressParts(
                              verificationStatus.receivedOriginAddress || "N/A",
                              verificationStatus.success,
                            )}
                          </div>
                        </div>
                        <div>
                          <strong className="text-blue-300">
                            Expected Destination Intent Address (from
                            preconditions):
                          </strong>
                          <div className="pl-2 space-y-1">
                            {renderAddressParts(
                              verificationStatus.receivedDestinationAddress ||
                                "N/A",
                              verificationStatus.success,
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {commitIntentConfigError && (
              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 mt-2">
                <Text variant="small" color="negative">
                  Commit Error: {commitIntentConfigError.message}
                </Text>
              </div>
            )}
            {commitIntentConfigSuccess && (
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3 mt-2">
                <Text variant="small" color="white">
                  Intent configuration committed successfully!
                </Text>
                <div className="mt-2 text-xs text-gray-400 flex flex-col space-y-2 w-full">
                  {committedOriginIntentAddress && (
                    <div className="bg-gray-800/70 p-3 rounded-md">
                      <AddressDisplay
                        label="Committed Origin Intent Address"
                        address={committedOriginIntentAddress}
                        chainId={
                          intentCallsPayloads?.[0]?.chainId
                            ? Number(intentCallsPayloads[0].chainId)
                            : undefined
                        }
                        success={true}
                      />
                    </div>
                  )}
                  {committedDestinationIntentAddress && (
                    <div className="bg-gray-800/70 p-3 rounded-md">
                      <AddressDisplay
                        label="Committed Destination Intent Address"
                        address={committedDestinationIntentAddress}
                        chainId={
                          intentCallsPayloads?.[1]?.chainId
                            ? Number(intentCallsPayloads[1].chainId)
                            : undefined
                        }
                        success={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {committedOriginIntentAddress && commitIntentConfigSuccess && (
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <Text
                    variant="medium"
                    color="primary"
                    className="border-b border-gray-700/50 text-gray-300"
                  >
                    Committed Configuration Details on Database
                  </Text>
                </div>
                {isLoadingCommittedConfig && (
                  <div className="flex items-center text-center">
                    <Loader2 className="animate-spin h-4 w-4 mr-2 text-yellow-500" />
                    <Text variant="small" color="secondary">
                      Loading committed config...
                    </Text>
                  </div>
                )}
                {committedConfigError && (
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
                    <Text
                      variant="small"
                      color="negative"
                      className="break-words flex items-center text-center"
                    >
                      <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>
                        Error fetching config: {committedConfigError.message}
                      </span>
                    </Text>
                  </div>
                )}
                {committedIntentConfigData &&
                  !isLoadingCommittedConfig &&
                  !committedConfigError && (
                    <pre className="font-mono text-xs overflow-x-auto whitespace-pre-wrap bg-gray-800/70 p-3 text-gray-300 rounded-md max-h-60 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                      {JSON.stringify(
                        committedIntentConfigData,
                        (_, v) => (typeof v === "bigint" ? v.toString() : v),
                        2,
                      )}
                    </pre>
                  )}
              </div>
            )}
          </div>
        </div>
      </SectionHeader>
      <div className="px-6 pt-4">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/30">
          <div className="flex items-center justify-between">
            <Text
              variant="medium"
              color="primary"
              className="mb-2 pb-1 border-b border-gray-700/50 flex items-center text-gray-300"
            >
              <Zap className="h-4 w-4 mr-1" />
              Commit Intent Action
              <Text
                variant="small"
                color="secondary"
                className="ml-1 text-gray-300"
              >
                (Verify and Send Transaction)
              </Text>
            </Text>
            <Button
              variant="primary"
              onClick={() => {
                console.log(
                  "Commit Intent button clicked. Checking conditions...",
                )
                if (
                  !accountAddress ||
                  !intentCallsPayloads ||
                  !intentPreconditions ||
                  !trailsFee
                ) {
                  console.error(
                    "One or more conditions for committing intent are false.",
                    {
                      accountAddress: !!accountAddress,
                      intentCallsPayloads: !!intentCallsPayloads,
                      intentPreconditions: !!intentPreconditions,
                      trailsFee: !!trailsFee,
                    },
                  )
                  return
                }
                console.log(
                  "All conditions met. Calling commitIntentConfig with args:",
                  {
                    mainSignerAddress: accountAddress,
                    calls: intentCallsPayloads,
                    preconditions: intentPreconditions,
                    quoteProvider: trailsFee.quoteProvider as QuoteProvider,
                  },
                )
                commitIntentConfig({
                  mainSignerAddress: accountAddress,
                  calls: intentCallsPayloads,
                  preconditions: intentPreconditions,
                  quoteProvider: trailsFee.quoteProvider as QuoteProvider,
                })
              }}
              disabled={isCommitButtonDisabled}
              className="px-2.5 py-1 shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {commitButtonText}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
