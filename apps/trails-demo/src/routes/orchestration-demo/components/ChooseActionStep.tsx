import { Button, NetworkImage, Text } from "@0xsequence/design-system"
import type { QuoteProvider, TokenBalance } from "@0xsequence/trails-sdk"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { AlertTriangle, PenSquare, Waves, Zap } from "lucide-react"
import type React from "react"
import * as chains from "viem/chains"

import { PAY_CHAIN_ID, PAY_DISPLAY_TEXT } from "@/config"
import { SectionHeader } from "@/routes/orchestration-demo/components/SectionHeader"
import type { IntentAction } from "@/types"

interface ChooseActionStepProps {
  isAutoExecuteEnabled: boolean
  setIsAutoExecuteEnabled: (enabled: boolean) => void
  handleActionClick: (action: IntentAction) => void
  selectedToken: TokenBalance | null
  createIntentPending: boolean
  intentActionType: IntentAction | null
  createIntentArgs: any
  showCustomCallForm: boolean
  setShowCustomCallForm: (show: boolean) => void
  customCallData: {
    to: string
    data: string
    value: string
    chainId: string
    tokenAmount: string
    tokenAddress: string
  }
  setCustomCallData: (data: ChooseActionStepProps["customCallData"]) => void
  handleCustomCallSubmit: (e: React.FormEvent) => void
  quoteProvider: QuoteProvider
  setQuoteProvider: (provider: QuoteProvider) => void
}

export const ChooseActionStep: React.FC<ChooseActionStepProps> = ({
  isAutoExecuteEnabled,
  setIsAutoExecuteEnabled,
  handleActionClick,
  selectedToken,
  createIntentPending,
  intentActionType,
  createIntentArgs,
  showCustomCallForm,
  setShowCustomCallForm,
  customCallData,
  setCustomCallData,
  handleCustomCallSubmit,
  quoteProvider,
  setQuoteProvider,
}) => {
  const providers: {
    id: QuoteProvider
    label: string
    description: string
  }[] = [
    {
      id: "relay" as QuoteProvider,
      label: "Relay",
      description: "Use Relay.link for filling liquidity.",
    },
    {
      id: "lifi" as QuoteProvider,
      label: "Li.fi",
      description: "Use Li.fi for cross-chain swaps and bridging.",
    },
    {
      id: "cctp" as QuoteProvider,
      label: "CCTP",
      description: "Use Circle's CCTP for USDC transfers.",
    },
  ]
  return (
    <SectionHeader
      noFrame={true}
      titleContainerClassName="px-4 sm:px-6 pb-3 sm:pb-4 flex items-center justify-between w-full"
      contentContainerClassName="px-4 sm:px-6 pb-3 sm:pb-4 flex flex-col gap-3 sm:gap-4"
      isCollapsible={false}
      title={
        <div className="flex items-center">
          <div className="bg-blue-600 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center mr-2 shadow-lg text-sm sm:text-base">
            <span>3</span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            Choose Action
          </h3>
        </div>
      }
    >
      {/* Auto-Execute Toggle */}
      <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg border border-gray-700/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex flex-col space-y-1">
            <Text
              variant="medium"
              color="primary"
              className="flex items-center text-sm sm:text-base text-gray-300"
            >
              <Zap className="h-4 w-4 mr-2" />
              Auto-Execute
            </Text>
            <Text
              variant="small"
              color="secondary"
              className="text-gray-400 text-xs ml-6 sm:ml-6"
            >
              Automatically commits and executes transactions when ready
            </Text>
          </div>
          <div className="flex items-center space-x-2">
            <Text
              variant="small"
              color="secondary"
              className="text-xs sm:text-sm text-gray-300"
            >
              {isAutoExecuteEnabled ? "Enabled" : "Disabled"}
            </Text>
            <div
              onClick={() => setIsAutoExecuteEnabled(!isAutoExecuteEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                isAutoExecuteEnabled ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAutoExecuteEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Liquidity Provider Selection */}
      <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg border border-gray-700/30">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center ">
            <Waves className="h-4 w-4 mr-2 text-orange-400" />
            <Text variant="medium" color="primary" className="text-gray-300">
              Select Liquidity Provider
            </Text>
          </div>
          <RadioGroup
            value={quoteProvider}
            onValueChange={(value: string) =>
              setQuoteProvider(value as QuoteProvider)
            }
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
            disabled={createIntentPending}
          >
            {providers.map((provider) => (
              <label
                key={provider.id}
                className={`flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-all ${
                  quoteProvider === provider.id
                    ? "border-orange-500 bg-orange-900/20"
                    : "border-gray-700 hover:bg-gray-700/50"
                } ${
                  createIntentPending
                    ? "cursor-not-allowed opacity-50"
                    : "hover:scale-[1.02]"
                }`}
              >
                <RadioGroupItem
                  value={provider.id}
                  id={provider.id}
                  className="h-4 w-4 rounded-full border-2 border-gray-500 text-orange-500"
                >
                  <div className="flex items-center justify-center">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        quoteProvider === provider.id ? "bg-orange-500" : ""
                      }`}
                    />
                  </div>
                </RadioGroupItem>
                <div className="flex flex-col">
                  <Text
                    variant="small"
                    color="primary"
                    className="text-gray-300"
                  >
                    {provider.label}
                  </Text>
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleActionClick("pay")}
          disabled={!selectedToken || createIntentPending}
          className="px-2 sm:px-2.5 py-1 shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-300"
        >
          {createIntentPending && createIntentArgs === "pay" ? (
            "Processing..."
          ) : (
            <>
              <NetworkImage
                chainId={PAY_CHAIN_ID}
                size="sm"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <span className="text-gray-300">
                Pay Action{" "}
                <Text
                  variant="small"
                  color="secondary"
                  className="text-xs sm:text-sm text-gray-300"
                >
                  {PAY_DISPLAY_TEXT}
                </Text>
              </span>
            </>
          )}
        </Button>
        <Button
          variant="raised"
          size="sm"
          onClick={() => handleActionClick("mock_interaction")}
          disabled={!selectedToken || createIntentPending}
          className="px-2 sm:px-2.5 py-1 shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-300"
        >
          {createIntentPending && intentActionType === "mock_interaction" ? (
            "Processing..."
          ) : (
            <>
              <NetworkImage
                chainId={chains.arbitrum.id}
                size="sm"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <span>Mock Interaction</span>
            </>
          )}
        </Button>
        <Button
          variant="feature"
          size="sm"
          onClick={() => handleActionClick("custom_call")}
          disabled={!selectedToken || createIntentPending}
          className="px-2 sm:px-2.5 py-1 shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-300"
        >
          {createIntentPending && intentActionType === "custom_call" ? (
            "Processing..."
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              <PenSquare className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Custom Call</span>
            </div>
          )}
        </Button>
      </div>

      {showCustomCallForm && (
        <div className="mt-3 sm:mt-4 bg-gray-800/50 p-3 sm:p-4 rounded-lg border border-gray-700/30">
          <form
            onSubmit={handleCustomCallSubmit}
            className="space-y-3 sm:space-y-4"
          >
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                To Address
              </label>
              <input
                type="text"
                value={customCallData.to}
                onChange={(e) =>
                  setCustomCallData({ ...customCallData, to: e.target.value })
                }
                placeholder="0x..."
                className="w-full px-2 sm:px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                Call Data
              </label>
              <input
                type="text"
                value={customCallData.data}
                onChange={(e) =>
                  setCustomCallData({ ...customCallData, data: e.target.value })
                }
                placeholder="0x..."
                className="w-full px-2 sm:px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                Value (in wei)
              </label>
              <input
                type="text"
                value={customCallData.value}
                onChange={(e) =>
                  setCustomCallData({
                    ...customCallData,
                    value: e.target.value,
                  })
                }
                placeholder="0"
                className="w-full px-2 sm:px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                Chain ID
              </label>
              <input
                type="text"
                value={customCallData.chainId}
                onChange={(e) =>
                  setCustomCallData({
                    ...customCallData,
                    chainId: e.target.value,
                  })
                }
                placeholder="1"
                className="w-full px-2 sm:px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                Token Amount
              </label>
              <input
                type="text"
                value={customCallData.tokenAmount}
                onChange={(e) =>
                  setCustomCallData({
                    ...customCallData,
                    tokenAmount: e.target.value,
                  })
                }
                placeholder="0"
                className="w-full px-2 sm:px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
                Token Address
              </label>
              <input
                type="text"
                value={customCallData.tokenAddress}
                onChange={(e) =>
                  setCustomCallData({
                    ...customCallData,
                    tokenAddress: e.target.value,
                  })
                }
                placeholder="0x..."
                className="w-full px-2 sm:px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                required
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm"
              >
                Submit Custom Call
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomCallForm(false)}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {!selectedToken && (
        <Text
          variant="small"
          color="warning"
          className="mt-2 bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-2 flex items-center"
        >
          <AlertTriangle className="h-4 w-4 mr-1" />
          Please select a token first.
        </Text>
      )}
    </SectionHeader>
  )
}
