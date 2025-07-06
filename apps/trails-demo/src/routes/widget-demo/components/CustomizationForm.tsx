import { InfoIcon, TokenImage, Tooltip } from "@0xsequence/design-system"
import {
  SUPPORTED_TO_CHAINS,
  SUPPORTED_TO_TOKENS,
} from "@0xsequence/trails-sdk"
import { defaultWalletOptions } from "@0xsequence/trails-sdk/widget"
import { ChevronDown } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { encodeFunctionData, parseUnits, zeroAddress } from "viem"
import { useAccount } from "wagmi"
import { ChainSelector } from "./ChainSelector"

// Reusable Checkmark Component
const Checkmark: React.FC<{ className?: string }> = ({
  className = "w-4 h-4",
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <title>Selected</title>
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
)

interface CustomizationFormProps {
  sequenceProjectAccessKey: string
  setSequenceProjectAccessKey: (value: string) => void
  toAddress: string
  setToAddress: (value: string) => void
  toAmount: string
  setToAmount: (value: string) => void
  toChainId: number | undefined
  setToChainId: (value: number | undefined) => void
  toToken: string | undefined
  setToToken: (value: string | undefined) => void
  toCalldata: string
  setToCalldata: (value: string) => void
  useCustomButton: boolean | null
  setUseCustomButton: (value: boolean | null) => void
  renderInline: boolean | null
  setRenderInline: (value: boolean | null) => void
  theme: string | null
  setTheme: (value: string | null) => void
  walletOptions: string[] | null
  setWalletOptions: (value: string[] | null) => void
  paymasterUrls: Array<{ chainId: number; url: string }>
  setPaymasterUrls: (value: Array<{ chainId: number; url: string }>) => void
  gasless: boolean | null
  setGasless: (value: boolean | null) => void
  isWalletConnected?: boolean
}

// Local storage keys
export const STORAGE_KEYS = {
  SEQUENCE_PROJECT_ACCESS_KEY: "trails_demo_sequence_project_access_key",
  TO_ADDRESS: "trails_demo_to_address",
  TO_AMOUNT: "trails_demo_to_amount",
  TO_CHAIN_ID: "trails_demo_to_chain_id",
  TO_TOKEN: "trails_demo_to_token",
  TO_CALLLDATA: "trails_demo_to_calldata",
  TO_RECIPIENT: "trails_demo_to_recipient",
  USE_CUSTOM_BUTTON: "trails_demo_use_custom_button",
  RENDER_INLINE: "trails_demo_render_inline",
  THEME: "trails_demo_theme",
  WALLET_OPTIONS: "trails_demo_wallet_options",
  PAYMASTER_URLS: "trails_demo_paymaster_urls",
  GASLESS: "trails_demo_gasless",
} as const

interface UseAccountButtonProps {
  onAddressSelect: (address: string) => void
}

const UseAccountButton: React.FC<UseAccountButtonProps> = ({
  onAddressSelect,
}) => {
  const { address, isConnected } = useAccount()

  if (!isConnected || !address) {
    return (
      <button
        type="button"
        disabled
        className="px-2 sm:px-3 py-1 text-xs bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed"
        title="Connect your wallet first"
      >
        Use Account
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onAddressSelect(address)}
      className="px-2 sm:px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-lg transition-colors cursor-pointer"
    >
      Use Account
    </button>
  )
}

export const CustomizationForm: React.FC<CustomizationFormProps> = ({
  sequenceProjectAccessKey,
  setSequenceProjectAccessKey,
  toAddress,
  setToAddress,
  toAmount,
  setToAmount,
  toChainId,
  setToChainId,
  toToken,
  setToToken,
  toCalldata,
  setToCalldata,
  useCustomButton,
  setUseCustomButton,
  renderInline,
  setRenderInline,
  theme,
  setTheme,
  walletOptions,
  setWalletOptions,
  paymasterUrls,
  setPaymasterUrls,
  gasless,
  setGasless,
  isWalletConnected = false,
}) => {
  const { address } = useAccount()
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false)
  const [isScenarioDropdownOpen, setIsScenarioDropdownOpen] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState("")

  const tokenDropdownRef = useRef<HTMLDivElement>(null)

  // Scenario options based on example subtitles
  const scenarioOptions = [
    "Pay USDC on Base to a recipient",
    "Mint an NFT on Arbitrum with ETH",
    "Mint an NFT on Polygon with BAT",
    "Deposit ETH to Aave lending pool on Base",
  ]

  // Scenario recipient
  const [toRecipient, setToRecipient] = useState("")

  // Add state for editing chain
  const [paymasterKey, setPaymasterKey] = useState(0)

  // Debug useEffect for paymasterUrls
  useEffect(() => {
    console.log("paymasterUrls changed:", paymasterUrls)
  }, [paymasterUrls])

  // Add helper to format address for calldata
  const formatAddressForCalldata = useCallback((address: string) => {
    // Remove 0x prefix if present and pad to 40 characters
    return address.toLowerCase().replace("0x", "").padStart(40, "0")
  }, [])

  // Function to apply scenario settings
  const applyScenario = (scenario: string) => {
    // Set recipient to connected account if available
    if (isWalletConnected && address) {
      setToRecipient(address)
    }

    switch (scenario) {
      case "Pay USDC on Base to a recipient": {
        setToAmount("0.1")
        setToToken("USDC")
        setToChainId(8453)
        setToCalldata("")
        // For scenarios without calldata, recipient becomes the toAddress
        if (toRecipient) {
          setToAddress(toRecipient)
        } else {
          setToAddress(zeroAddress)
        }
        break
      }
      case "Mint an NFT on Arbitrum with ETH": {
        setToAddress("0xAA3df3c86EdB6aA4D03b75092b4dd0b99515EC83")
        setToAmount("0.00002")
        setToToken("ETH")
        setToChainId(42161)
        // Encode recipient into calldata if set
        const arbitrumCalldata = `0x6a627842000000000000000000000000${formatAddressForCalldata(toRecipient || zeroAddress)}`
        setToCalldata(arbitrumCalldata)
        break
      }
      case "Mint an NFT on Polygon with BAT": {
        setToAddress("0x15e68e3Cdf84ea8bB2CeF2c3b49976903543F708")
        setToAmount("1")
        setToToken("BAT")
        setToChainId(137)
        // Encode recipient into calldata if set
        const polygonCalldata = `0x6a627842000000000000000000000000${formatAddressForCalldata(toRecipient || zeroAddress)}`
        setToCalldata(polygonCalldata)
        break
      }
      case "Deposit ETH to Aave lending pool on Base": {
        setToAddress("0xa0d9C1E9E48Ca30c8d8C3B5D69FF5dc1f6DFfC24")
        setToAmount("0.00004")
        setToToken("ETH")
        setToChainId(8453)
        // Encode recipient into calldata if set
        const aaveCalldata = encodeAaveEthDepositCalldata(
          toRecipient || zeroAddress,
        )
        setToCalldata(aaveCalldata)
        break
      }
    }
  }

  // Function to update calldata when toRecipient changes
  const updateCalldataForRecipient = useCallback(() => {
    if (!selectedScenario) return

    // Use toRecipient if set, otherwise use connected account address
    const effectiveRecipient =
      toRecipient || (isWalletConnected && address ? address : zeroAddress)
    if (!effectiveRecipient) return

    switch (selectedScenario) {
      case "Mint an NFT on Arbitrum with ETH": {
        const arbitrumCalldata = `0x6a627842000000000000000000000000${formatAddressForCalldata(effectiveRecipient)}`
        setToCalldata(arbitrumCalldata)
        break
      }
      case "Mint an NFT on Polygon with BAT": {
        const polygonCalldata = `0x6a627842000000000000000000000000${formatAddressForCalldata(effectiveRecipient)}`
        setToCalldata(polygonCalldata)
        break
      }
      case "Deposit ETH to Aave lending pool on Base": {
        const aaveCalldata = encodeAaveEthDepositCalldata(effectiveRecipient)
        setToCalldata(aaveCalldata)
        break
      }
    }
  }, [
    selectedScenario,
    toRecipient,
    setToCalldata,
    isWalletConnected,
    address,
    formatAddressForCalldata,
  ])

  // Update calldata when toRecipient changes
  useEffect(() => {
    updateCalldataForRecipient()
  }, [updateCalldataForRecipient])

  // Load saved values from localStorage on mount
  useEffect(() => {
    const savedSequenceProjectAccessKey = localStorage.getItem(
      STORAGE_KEYS.SEQUENCE_PROJECT_ACCESS_KEY,
    )
    const savedToAddress = localStorage.getItem(STORAGE_KEYS.TO_ADDRESS)
    const savedToAmount = localStorage.getItem(STORAGE_KEYS.TO_AMOUNT)
    const savedToChainId = localStorage.getItem(STORAGE_KEYS.TO_CHAIN_ID)
    const savedToToken = localStorage.getItem(STORAGE_KEYS.TO_TOKEN)
    const savedToCalldata = localStorage.getItem(STORAGE_KEYS.TO_CALLLDATA)
    const savedToRecipient = localStorage.getItem(STORAGE_KEYS.TO_RECIPIENT)
    const savedUseCustomButton = localStorage.getItem(
      STORAGE_KEYS.USE_CUSTOM_BUTTON,
    )
    const savedRenderInline = localStorage.getItem(STORAGE_KEYS.RENDER_INLINE)
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME)
    const savedWalletOptions = localStorage.getItem(STORAGE_KEYS.WALLET_OPTIONS)
    const savedPaymasterUrls = localStorage.getItem(STORAGE_KEYS.PAYMASTER_URLS)
    const savedGasless = localStorage.getItem(STORAGE_KEYS.GASLESS)

    // Only set values if they exist in localStorage
    if (savedSequenceProjectAccessKey !== null)
      setSequenceProjectAccessKey(savedSequenceProjectAccessKey)
    if (savedToAddress !== null) setToAddress(savedToAddress)
    if (savedToAmount !== null) setToAmount(savedToAmount)
    if (savedToChainId !== null) setToChainId(Number(savedToChainId))
    if (savedToToken !== null) setToToken(savedToToken)
    if (savedToCalldata !== null) setToCalldata(savedToCalldata)
    if (savedToRecipient !== null) setToRecipient(savedToRecipient)
    if (savedUseCustomButton !== null)
      setUseCustomButton(savedUseCustomButton === "true")
    if (savedRenderInline !== null)
      setRenderInline(savedRenderInline === "true")
    if (savedTheme !== null) setTheme(savedTheme)
    if (savedWalletOptions !== null)
      setWalletOptions(JSON.parse(savedWalletOptions))
    if (savedPaymasterUrls !== null) {
      try {
        const parsed = JSON.parse(savedPaymasterUrls)
        // Handle both old object format and new array format
        if (Array.isArray(parsed)) {
          setPaymasterUrls(parsed)
        } else {
          // Convert old object format to new array format
          const converted = Object.entries(parsed).map(([chainId, url]) => ({
            chainId: Number(chainId),
            url: url as string,
          }))
          setPaymasterUrls(converted)
        }
      } catch (error) {
        console.error("Failed to parse paymasterUrls from localStorage:", error)
        setPaymasterUrls([])
      }
    }
    if (savedGasless !== null) setGasless(savedGasless === "true")
  }, [
    setSequenceProjectAccessKey,
    setToAddress,
    setToAmount,
    setToChainId,
    setToToken,
    setToCalldata,
    setUseCustomButton,
    setRenderInline,
    setTheme,
    setWalletOptions,
    setPaymasterUrls,
    setGasless,
  ])

  // Save values to localStorage whenever they change
  useEffect(() => {
    if (sequenceProjectAccessKey) {
      localStorage.setItem(
        STORAGE_KEYS.SEQUENCE_PROJECT_ACCESS_KEY,
        sequenceProjectAccessKey,
      )
    } else {
      localStorage.removeItem(STORAGE_KEYS.SEQUENCE_PROJECT_ACCESS_KEY)
    }
  }, [sequenceProjectAccessKey])

  useEffect(() => {
    if (toAddress) {
      localStorage.setItem(STORAGE_KEYS.TO_ADDRESS, toAddress)
    } else {
      localStorage.removeItem(STORAGE_KEYS.TO_ADDRESS)
    }
  }, [toAddress])

  useEffect(() => {
    if (toAmount) {
      localStorage.setItem(STORAGE_KEYS.TO_AMOUNT, toAmount)
    } else {
      localStorage.removeItem(STORAGE_KEYS.TO_AMOUNT)
    }
  }, [toAmount])

  useEffect(() => {
    if (toChainId) {
      localStorage.setItem(STORAGE_KEYS.TO_CHAIN_ID, toChainId.toString())
    } else {
      localStorage.removeItem(STORAGE_KEYS.TO_CHAIN_ID)
    }
  }, [toChainId])

  useEffect(() => {
    if (toToken) {
      localStorage.setItem(STORAGE_KEYS.TO_TOKEN, toToken)
    } else {
      localStorage.removeItem(STORAGE_KEYS.TO_TOKEN)
    }
  }, [toToken])

  useEffect(() => {
    if (toCalldata) {
      localStorage.setItem(STORAGE_KEYS.TO_CALLLDATA, toCalldata)
    } else {
      localStorage.removeItem(STORAGE_KEYS.TO_CALLLDATA)
    }
  }, [toCalldata])

  useEffect(() => {
    if (toRecipient) {
      localStorage.setItem(STORAGE_KEYS.TO_RECIPIENT, toRecipient)
    } else {
      localStorage.removeItem(STORAGE_KEYS.TO_RECIPIENT)
    }
  }, [toRecipient])

  // Save custom button state to localStorage
  useEffect(() => {
    if (typeof useCustomButton === "boolean") {
      localStorage.setItem(
        STORAGE_KEYS.USE_CUSTOM_BUTTON,
        useCustomButton.toString(),
      )
    }
  }, [useCustomButton])

  // Save theme to localStorage
  useEffect(() => {
    if (theme) localStorage.setItem(STORAGE_KEYS.THEME, theme)
  }, [theme])

  useEffect(() => {
    if (typeof renderInline === "boolean") {
      localStorage.setItem(STORAGE_KEYS.RENDER_INLINE, renderInline.toString())
    }
  }, [renderInline])

  // Save wallet options to localStorage
  useEffect(() => {
    if (walletOptions) {
      localStorage.setItem(
        STORAGE_KEYS.WALLET_OPTIONS,
        JSON.stringify(walletOptions),
      )
    }
  }, [walletOptions])

  // Save paymasterUrls to localStorage
  useEffect(() => {
    if (paymasterUrls.length > 0) {
      localStorage.setItem(
        STORAGE_KEYS.PAYMASTER_URLS,
        JSON.stringify(paymasterUrls),
      )
    } else {
      localStorage.removeItem(STORAGE_KEYS.PAYMASTER_URLS)
    }
  }, [paymasterUrls])

  // Save gasless to localStorage
  useEffect(() => {
    if (typeof gasless === "boolean") {
      localStorage.setItem(STORAGE_KEYS.GASLESS, gasless.toString())
    }
  }, [gasless])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tokenDropdownRef.current &&
        !tokenDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTokenDropdownOpen(false)
      }
      // Close scenario dropdown when clicking outside
      if (
        !event.target ||
        !(event.target as Element).closest("[data-scenario-dropdown]")
      ) {
        setIsScenarioDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleReset = () => {
    // Clear form state
    setSequenceProjectAccessKey("")
    setToAddress("")
    setToAmount("")
    setToChainId(undefined)
    setToToken(undefined)
    setToCalldata("")
    setToRecipient("") // Clear toRecipient
    setUseCustomButton(false)
    setRenderInline(true) // Reset to default true
    setTheme("auto") // Reset to default light
    setPaymasterUrls([]) // Reset paymasterUrls
    setGasless(false) // Reset gasless to default false
    // Clear localStorage
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })
  }

  const handleWalletOptionToggle = (wallet: string) => {
    if (!walletOptions) {
      setWalletOptions([wallet])
      return
    }

    if (walletOptions.includes(wallet)) {
      const newOptions = walletOptions.filter((w) => w !== wallet)
      setWalletOptions(newOptions)
    } else {
      setWalletOptions([...walletOptions, wallet])
    }
  }

  return (
    <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 h-full">
      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-200 mb-2"
            htmlFor="scenario"
          >
            Scenario
          </label>
          <div className="relative" data-scenario-dropdown>
            <button
              type="button"
              onClick={() =>
                isWalletConnected &&
                setIsScenarioDropdownOpen(!isScenarioDropdownOpen)
              }
              disabled={!isWalletConnected}
              className={`w-full flex items-center px-3 sm:px-4 py-3 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isWalletConnected
                  ? "bg-gray-700 border-gray-600 hover:border-gray-500 text-gray-200"
                  : "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              <span className="flex-1 text-left text-sm">
                {selectedScenario || "Select a scenario"}
              </span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  isScenarioDropdownOpen ? "transform rotate-180" : ""
                } ${isWalletConnected ? "text-gray-400" : "text-gray-600"}`}
              />
            </button>
            {!isWalletConnected && (
              <p className="mt-1 text-xs text-gray-500">
                Connect your wallet to select a scenario
              </p>
            )}
            {selectedScenario && (
              <p className="mt-1 text-xs text-gray-500">
                Fields are auto-filled based on the selected scenario
              </p>
            )}

            {isScenarioDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedScenario("")
                    setIsScenarioDropdownOpen(false)
                    setToRecipient("")
                  }}
                  className={`w-full flex items-center px-3 sm:px-4 py-3 hover:bg-gray-600 ${!selectedScenario ? "bg-gray-600 text-blue-400" : "text-gray-200"} cursor-pointer text-sm`}
                >
                  <span className="ml-2">Select a scenario</span>
                  {!selectedScenario && (
                    <span className="ml-auto text-blue-400">•</span>
                  )}
                </button>
                {scenarioOptions.map((scenario) => (
                  <button
                    key={scenario}
                    type="button"
                    onClick={() => {
                      setSelectedScenario(scenario)
                      setIsScenarioDropdownOpen(false)
                      applyScenario(scenario)
                    }}
                    className={`w-full flex items-center px-3 sm:px-4 py-3 hover:bg-gray-600 cursor-pointer text-sm ${
                      selectedScenario === scenario
                        ? "bg-gray-600 text-blue-400"
                        : "text-gray-200"
                    }`}
                  >
                    <span className="ml-2">{scenario}</span>
                    {selectedScenario === scenario && (
                      <span className="ml-auto text-blue-400">•</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedScenario && (
          <div>
            <label
              className="block text-sm font-medium text-gray-200 mb-2"
              htmlFor="toRecipient"
            >
              To Recipient
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={toRecipient}
                onChange={(e) => setToRecipient(e.target.value.trim())}
                placeholder="0x..."
                className="flex-1 px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <UseAccountButton onAddressSelect={setToRecipient} />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Customize the recipient address for this scenario
            </p>
          </div>
        )}

        <div>
          <label
            className="block text-sm font-medium text-gray-200 mb-2"
            htmlFor="toAddress"
          >
            To Address
          </label>
          <input
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value.trim())}
            placeholder="0x..."
            disabled={!!selectedScenario}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
              selectedScenario
                ? "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-700 border-gray-600 text-gray-200"
            }`}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label
              className="block text-sm font-medium text-gray-200 mb-2"
              htmlFor="toAmount"
            >
              To Amount
            </label>
            <input
              type="text"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value.trim())}
              placeholder="0.00"
              disabled={!!selectedScenario}
              className={`w-full px-3 sm:px-4 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                selectedScenario
                  ? "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-700 border-gray-600 text-gray-200"
              }`}
            />
          </div>

          <div className="flex-1 space-y-2" ref={tokenDropdownRef}>
            <label
              className="block text-sm font-medium text-gray-200 mb-2"
              htmlFor="toToken"
            >
              To Token
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  !selectedScenario &&
                  setIsTokenDropdownOpen(!isTokenDropdownOpen)
                }
                disabled={!!selectedScenario}
                className={`w-full flex items-center px-3 sm:px-4 py-3 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  selectedScenario
                    ? "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-700 border-gray-600 hover:border-gray-500 text-gray-200"
                }`}
              >
                {toToken ? (
                  <>
                    <TokenImage
                      symbol={toToken}
                      src={
                        SUPPORTED_TO_TOKENS.find(
                          (t: { symbol: string; imageUrl: string }) =>
                            t.symbol === toToken,
                        )?.imageUrl
                      }
                      size="sm"
                      disableAnimation={true}
                      className={selectedScenario ? "opacity-50" : ""}
                    />
                    <span
                      className={`ml-2 flex-1 text-left text-sm ${
                        selectedScenario ? "text-gray-500" : "text-gray-200"
                      }`}
                    >
                      {
                        SUPPORTED_TO_TOKENS.find(
                          (t: { symbol: string; name: string }) =>
                            t.symbol === toToken,
                        )?.name
                      }{" "}
                      ({toToken})
                    </span>
                  </>
                ) : (
                  <span
                    className={`flex-1 text-left text-sm ${
                      selectedScenario ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Select Token
                  </span>
                )}
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform ${isTokenDropdownOpen ? "transform rotate-180" : ""}`}
                />
              </button>

              {isTokenDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setToToken(undefined)
                      setIsTokenDropdownOpen(false)
                    }}
                    className={`w-full flex items-center px-3 sm:px-4 py-3 hover:bg-gray-600 ${!toToken ? "bg-gray-600 text-blue-400" : "text-gray-200"} cursor-pointer text-sm`}
                  >
                    <span className="ml-2">Select Token</span>
                    {!toToken && (
                      <span className="ml-auto text-blue-400">•</span>
                    )}
                  </button>
                  {SUPPORTED_TO_TOKENS.map(
                    (token: {
                      symbol: string
                      name: string
                      imageUrl: string
                    }) => (
                      <button
                        key={token.symbol}
                        type="button"
                        onClick={() => {
                          setToToken(token.symbol as "ETH" | "USDC")
                          setIsTokenDropdownOpen(false)
                        }}
                        className={`w-full flex items-center px-3 sm:px-4 py-3 hover:bg-gray-600 cursor-pointer text-sm ${
                          toToken === token.symbol
                            ? "bg-gray-600 text-blue-400"
                            : "text-gray-200"
                        }`}
                      >
                        <TokenImage
                          symbol={token.symbol}
                          src={token.imageUrl}
                          size="sm"
                          disableAnimation={true}
                        />
                        <span className="ml-2">
                          {token.name} ({token.symbol})
                        </span>
                        {toToken === token.symbol && (
                          <span className="ml-auto text-blue-400">•</span>
                        )}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-200 mb-2"
            htmlFor="toChainId"
          >
            To Chain ID
          </label>
          <ChainSelector
            selectedChainId={toChainId}
            onChainSelect={setToChainId}
            disabled={!!selectedScenario}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-200 mb-2"
            htmlFor="toCalldata"
          >
            To Calldata
          </label>
          <textarea
            value={toCalldata}
            onChange={(e) => setToCalldata(e.target.value.trim())}
            placeholder="0x..."
            rows={3}
            disabled={!!selectedScenario}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-xs sm:text-sm ${
              selectedScenario
                ? "bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-700 border-gray-600 text-gray-200"
            }`}
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <label
            className="block text-sm font-medium text-gray-200 flex items-center gap-2"
            htmlFor="gasless"
          >
            Gasless
            <Tooltip message="Enable gasless transactions using Sequence Relayer based on your project access key sponsorship settings">
              <InfoIcon size="sm" className="text-gray-400 cursor-pointer" />
            </Tooltip>
          </label>
          <button
            type="button"
            onClick={() => setGasless(!gasless)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              gasless ? "bg-blue-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                gasless ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-200 mb-2 flex items-center gap-2"
            htmlFor="paymasterUrls"
          >
            Paymaster URLs (Chain-specific)
            <Tooltip message="Use 4337-compatible bundler/paymaster URLs for gasless transactions, such as Alchemy, Thirdweb, Pimlico, ZeroDev, etc. Set different URLs for different chains.">
              <InfoIcon size="sm" className="text-gray-400 cursor-pointer" />
            </Tooltip>
          </label>

          {/* Paymaster URLs List */}
          <div className="space-y-3">
            {paymasterUrls.map(({ chainId, url }, index) => {
              const currentChainId = chainId

              return (
                <div
                  key={`paymaster-${currentChainId}-${index}-${paymasterKey}`}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
                >
                  {/* Chain Selector */}
                  <div className="flex-shrink-0 w-full sm:w-32">
                    <ChainSelector
                      selectedChainId={currentChainId}
                      onChainSelect={(newChainId) => {
                        const newPaymasterUrls = paymasterUrls.map((p) =>
                          p.chainId === currentChainId
                            ? { ...p, chainId: newChainId }
                            : p,
                        )
                        console.log("Updating paymaster URLs:", {
                          currentChainId,
                          newChainId,
                          newPaymasterUrls,
                        })

                        setPaymasterUrls(newPaymasterUrls)
                        setPaymasterKey((prev) => prev + 1) // Force re-render
                      }}
                      className="w-full sm:w-32"
                      showIconsOnly={true}
                    />
                  </div>

                  {/* URL Input */}
                  <input
                    type="text"
                    value={url}
                    onChange={(e) =>
                      setPaymasterUrls(
                        paymasterUrls.map((p) =>
                          p.chainId === currentChainId
                            ? { ...p, url: e.target.value.trim() }
                            : p,
                        ),
                      )
                    }
                    placeholder="https://..."
                    className="flex-1 px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />

                  {/* Remove Button - Styled like text */}
                  <button
                    type="button"
                    onClick={() => {
                      const newPaymasterUrls = paymasterUrls.filter(
                        (p) => p.chainId !== currentChainId,
                      )
                      setPaymasterUrls(newPaymasterUrls)
                    }}
                    className="px-3 py-2 text-gray-400 hover:text-gray-200 transition-colors text-lg font-medium cursor-pointer self-center"
                  >
                    ×
                  </button>
                </div>
              )
            })}

            {/* Add Button */}
            <button
              type="button"
              onClick={() => {
                // Find first available chain that's not already used
                const usedChainIds = paymasterUrls.map((p) => p.chainId)
                const availableChain = SUPPORTED_TO_CHAINS.find(
                  (chain) => !usedChainIds.includes(chain.id),
                )
                if (availableChain) {
                  setPaymasterUrls([
                    ...paymasterUrls,
                    { chainId: availableChain.id, url: "" },
                  ])
                }
              }}
              disabled={paymasterUrls.length >= SUPPORTED_TO_CHAINS.length}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium disabled:cursor-not-allowed cursor-pointer"
            >
              + Add Paymaster URL
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 gap-2">
          <label
            className="block text-sm font-medium text-gray-200"
            htmlFor="walletOptions"
          >
            Wallet Options
          </label>
          <div className="flex flex-wrap gap-3">
            {defaultWalletOptions.map((wallet: string) => {
              const isSelected = walletOptions?.includes(wallet)
              return (
                <div key={wallet} className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleWalletOptionToggle(wallet)}
                    className={`w-7 h-7 rounded border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-600"
                    }`}
                  >
                    {isSelected && <Checkmark />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleWalletOptionToggle(wallet)}
                    className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {wallet.charAt(0).toUpperCase() + wallet.slice(1)}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 gap-2">
          <label
            className="block text-sm font-medium text-gray-200"
            htmlFor="theme"
          >
            Theme Mode
          </label>
          <div className="flex space-x-4">
            {(["auto", "light", "dark"] as const).map((mode) => (
              <div key={mode} className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setTheme(mode)}
                  className={`w-7 h-7 rounded-full border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    theme === mode
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {theme === mode && <Checkmark />}
                </button>
                <button
                  type="button"
                  onClick={() => setTheme(mode)}
                  className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <label
            className="block text-sm font-medium text-gray-200"
            htmlFor="useCustomButton"
          >
            Custom Button
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setUseCustomButton(!useCustomButton)}
              className={`w-7 h-7 rounded border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                useCustomButton
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-600"
              }`}
            >
              {useCustomButton && <Checkmark />}
            </button>
            <button
              type="button"
              onClick={() => setUseCustomButton(!useCustomButton)}
              className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Enable
            </button>
          </div>
        </div>

        <div
          className="flex items-center justify-between py-2"
          style={{ display: "none" }}
        >
          <label
            className="block text-sm font-medium text-gray-200"
            htmlFor="renderInline"
          >
            Render Inline
          </label>
          <button
            type="button"
            onClick={() => setRenderInline(!renderInline)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
              renderInline ? "bg-blue-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                renderInline ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="pt-2">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer list-none py-2">
              <span className="text-sm font-medium text-gray-200">
                Sequence Project Access Key
              </span>
              <ChevronDown className="h-5 w-5 text-gray-400 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3">
              <input
                type="text"
                value={sequenceProjectAccessKey}
                onChange={(e) =>
                  setSequenceProjectAccessKey(e.target.value.trim())
                }
                placeholder="Enter your sequence project access key"
                className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </details>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors duration-200 text-sm font-medium border border-gray-600 hover:border-gray-500 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export function encodeAaveEthDepositCalldata(recipient: string = zeroAddress) {
  const calldata = encodeFunctionData({
    abi: [
      {
        type: "function",
        name: "depositETH",
        stateMutability: "payable",
        inputs: [
          { name: "pool", type: "address" },
          { name: "onBehalfOf", type: "address" },
          { name: "referralCode", type: "uint16" },
        ],
        outputs: [],
      },
    ],
    functionName: "depositETH",
    args: [
      "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5", // pool address
      recipient as `0x${string}`, // onBehalfOf
      0, // referralCode
    ],
  })

  console.log(calldata)
  return calldata
}

export function encodeErc20AaveDepositCalldata(
  recipient: string = zeroAddress,
) {
  const calldata = encodeFunctionData({
    abi: [
      {
        type: "function",
        name: "supply",
        stateMutability: "nonpayable",
        inputs: [
          { name: "asset", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "onBehalfOf", type: "address" },
          { name: "referralCode", type: "uint16" },
        ],
        outputs: [],
      },
    ],
    functionName: "supply",
    args: [
      "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
      parseUnits("0.1", 6), // 0.1 USDC (6 decimals)
      recipient as `0x${string}`, // onBehalfOf
      0, // referralCode
    ],
  })

  console.log(calldata)
  return calldata
}
