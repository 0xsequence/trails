import { InfoIcon, TokenImage, Tooltip } from "@0xsequence/design-system"
import {
  SUPPORTED_TO_CHAINS,
  SUPPORTED_TO_TOKENS,
} from "@0xsequence/trails-sdk"
import { defaultWalletOptions } from "@0xsequence/trails-sdk/widget"
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { encodeFunctionData, parseUnits, zeroAddress } from "viem"
import { useAccount } from "wagmi"
import { ChainSelector } from "./ChainSelector"

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
}

// Local storage keys
export const STORAGE_KEYS = {
  SEQUENCE_PROJECT_ACCESS_KEY: "trails_demo_sequence_project_access_key",
  TO_ADDRESS: "trails_demo_to_address",
  TO_AMOUNT: "trails_demo_to_amount",
  TO_CHAIN_ID: "trails_demo_to_chain_id",
  TO_TOKEN: "trails_demo_to_token",
  TO_CALLLDATA: "trails_demo_to_calldata",
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
}) => {
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false)

  const tokenDropdownRef = useRef<HTMLDivElement>(null)

  // Add state for NFT mint forms
  const [isArbitrumNftMintFormOpen, setIsArbitrumNftMintFormOpen] =
    useState(false)
  const [isPolygonNftMintFormOpen, setIsPolygonNftMintFormOpen] =
    useState(false)
  const [isSendUsdcFormOpen, setIsSendUsdcFormOpen] = useState(false)
  const [isAaveDepositFormOpen, setIsAaveDepositFormOpen] = useState(false)
  const [nftRecipient, setNftRecipient] = useState("")
  const [usdcRecipient, setUsdcRecipient] = useState("")
  const [aaveRecipient, setAaveRecipient] = useState("")

  // Add state for editing chain
  const [paymasterKey, setPaymasterKey] = useState(0)

  // Debug useEffect for paymasterUrls
  useEffect(() => {
    console.log("paymasterUrls changed:", paymasterUrls)
  }, [paymasterUrls])

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
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Add helper to format address for calldata
  const formatAddressForCalldata = (address: string) => {
    // Remove 0x prefix if present and pad to 40 characters
    return address.toLowerCase().replace("0x", "").padStart(40, "0")
  }

  const handleReset = () => {
    // Clear form state
    setSequenceProjectAccessKey("")
    setToAddress("")
    setToAmount("")
    setToChainId(undefined)
    setToToken(undefined)
    setToCalldata("")
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
    <div className="bg-gray-800 rounded-lg p-4 sm:p-6 h-full">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-200">
            Customize Widget
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            All fields are optional. Use these to preset the widget's state.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-200 mb-2"
              htmlFor="sequenceProjectAccessKey"
            >
              Sequence Project Access Key
            </label>
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
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
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
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="space-y-2" ref={tokenDropdownRef}>
            <label
              className="block text-sm font-medium text-gray-200 mb-2"
              htmlFor="toToken"
            >
              To Token
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTokenDropdownOpen(!isTokenDropdownOpen)}
                className="w-full flex items-center px-3 sm:px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg hover:border-gray-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
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
                    />
                    <span className="ml-2 flex-1 text-left text-gray-200 text-sm">
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
                  <span className="flex-1 text-left text-gray-400 text-sm">
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
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-xs sm:text-sm"
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

          <div className="flex items-center justify-between py-2">
            <label
              className="block text-sm font-medium text-gray-200"
              htmlFor="useCustomButton"
            >
              Custom Button
            </label>
            <button
              type="button"
              onClick={() => setUseCustomButton(!useCustomButton)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer ${
                useCustomButton ? "bg-blue-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  useCustomButton ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 gap-2">
            <label
              className="block text-sm font-medium text-gray-200"
              htmlFor="theme"
            >
              Theme Mode
            </label>
            <div className="flex rounded-lg overflow-hidden border border-gray-600">
              {(["auto", "light", "dark"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTheme(mode)}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    theme === mode
                      ? "bg-blue-500 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 gap-2">
            <label
              className="block text-sm font-medium text-gray-200"
              htmlFor="walletOptions"
            >
              Wallet Options
            </label>
            <div className="flex flex-wrap rounded-lg overflow-hidden border border-gray-600">
              {defaultWalletOptions.map((wallet: string) => (
                <button
                  key={wallet}
                  type="button"
                  onClick={() => handleWalletOptionToggle(wallet)}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    walletOptions?.includes(wallet)
                      ? "bg-blue-500 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {wallet.charAt(0).toUpperCase() + wallet.slice(1)}
                </button>
              ))}
            </div>
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

          <div className="pt-6 space-y-3">
            <h3 className="text-lg font-medium text-gray-200">Examples</h3>
            <div className="space-y-2">
              {/* Send USDC Example */}
              <div className="rounded-lg border border-gray-600 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsSendUsdcFormOpen(!isSendUsdcFormOpen)}
                  className="w-full px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors duration-200 text-sm font-medium cursor-pointer text-left flex justify-between items-center"
                >
                  <div>
                    <div>Pay USDC on Base</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Pay 0.1 USDC on Base to a recipient
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      isSendUsdcFormOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {isSendUsdcFormOpen && (
                  <div className="p-3 sm:p-4 bg-gray-800 space-y-4">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                        <label
                          className="block text-sm font-medium text-gray-200"
                          htmlFor="usdcRecipient"
                        >
                          Recipient
                        </label>
                        <UseAccountButton onAddressSelect={setUsdcRecipient} />
                      </div>
                      <input
                        type="text"
                        value={usdcRecipient}
                        onChange={(e) =>
                          setUsdcRecipient(e.target.value.trim())
                        }
                        placeholder="0x..."
                        className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setToAddress(usdcRecipient)
                        setToAmount("0.1")
                        setToToken("USDC")
                        setToChainId(8453)
                        setToCalldata("")
                      }}
                      disabled={!usdcRecipient}
                      className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium disabled:cursor-not-allowed cursor-pointer"
                    >
                      Apply Example
                    </button>
                  </div>
                )}
              </div>

              <div className="rounded-lg border border-gray-600 overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setIsArbitrumNftMintFormOpen(!isArbitrumNftMintFormOpen)
                  }
                  className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors duration-200 text-sm font-medium cursor-pointer text-left flex justify-between items-center"
                >
                  <div>
                    <div>NFT Mint on Arbitrum</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Mint an NFT on Arbitrum with ETH
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      isArbitrumNftMintFormOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {isArbitrumNftMintFormOpen && (
                  <div className="p-4 bg-gray-800 space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label
                          className="block text-sm font-medium text-gray-200"
                          htmlFor="nftRecipient"
                        >
                          NFT Recipient
                        </label>
                        <UseAccountButton onAddressSelect={setNftRecipient} />
                      </div>
                      <input
                        type="text"
                        value={nftRecipient}
                        onChange={(e) => setNftRecipient(e.target.value.trim())}
                        placeholder="0x..."
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const formattedAddress = nftRecipient
                          ? formatAddressForCalldata(nftRecipient)
                          : ""
                        setToAddress(
                          "0xAA3df3c86EdB6aA4D03b75092b4dd0b99515EC83",
                        )
                        setToCalldata(
                          `0x6a627842000000000000000000000000${formattedAddress}`,
                        )
                        setToAmount("0.00002")
                        setToToken("ETH")
                        setToChainId(42161)
                      }}
                      disabled={!nftRecipient}
                      className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium disabled:cursor-not-allowed cursor-pointer"
                    >
                      Apply Example
                    </button>
                  </div>
                )}
              </div>

              {/* Polygon NFT Mint Example */}
              <div className="rounded-lg border border-gray-600 overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setIsPolygonNftMintFormOpen(!isPolygonNftMintFormOpen)
                  }
                  className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors duration-200 text-sm font-medium cursor-pointer text-left flex justify-between items-center"
                >
                  <div>
                    <div>NFT Mint on Polygon</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Mint an NFT on Polygon with BAT
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      isPolygonNftMintFormOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {isPolygonNftMintFormOpen && (
                  <div className="p-4 bg-gray-800 space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label
                          className="block text-sm font-medium text-gray-200"
                          htmlFor="nftRecipient"
                        >
                          NFT Recipient
                        </label>
                        <UseAccountButton onAddressSelect={setNftRecipient} />
                      </div>
                      <input
                        type="text"
                        value={nftRecipient}
                        onChange={(e) => setNftRecipient(e.target.value.trim())}
                        placeholder="0x..."
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const formattedAddress = nftRecipient
                          ? formatAddressForCalldata(nftRecipient)
                          : ""
                        setToAddress(
                          "0x15e68e3Cdf84ea8bB2CeF2c3b49976903543F708",
                        )
                        setToCalldata(
                          `0x6a627842000000000000000000000000${formattedAddress}`,
                        )
                        setToAmount("1")
                        setToToken("BAT")
                        setToChainId(137)
                      }}
                      disabled={!nftRecipient}
                      className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium disabled:cursor-not-allowed cursor-pointer"
                    >
                      Apply Example
                    </button>
                  </div>
                )}
              </div>

              {/* Aave Deposit Example */}
              <div className="rounded-lg border border-gray-600 overflow-hidden">
                <button
                  type="button"
                  onClick={() =>
                    setIsAaveDepositFormOpen(!isAaveDepositFormOpen)
                  }
                  className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors duration-200 text-sm font-medium cursor-pointer text-left flex justify-between items-center"
                >
                  <div>
                    <div>Deposit ETH to Aave on Base</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Deposit ETH to Aave lending pool on Base
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      isAaveDepositFormOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {isAaveDepositFormOpen && (
                  <div className="p-4 bg-gray-800 space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label
                          className="block text-sm font-medium text-gray-200"
                          htmlFor="aaveRecipient"
                        >
                          On Behalf Of
                        </label>
                        <UseAccountButton onAddressSelect={setAaveRecipient} />
                      </div>
                      <input
                        type="text"
                        value={aaveRecipient}
                        onChange={(e) =>
                          setAaveRecipient(e.target.value.trim())
                        }
                        placeholder="0x..."
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setToAddress(
                          "0xa0d9C1E9E48Ca30c8d8C3B5D69FF5dc1f6DFfC24",
                        ) // Aave lending pool address
                        setToCalldata(
                          encodeAaveEthDepositCalldata(aaveRecipient),
                        ) // deposit() calldata
                        setToAmount("0.00004")
                        setToToken("ETH")
                        setToChainId(8453)
                      }}
                      disabled={!aaveRecipient}
                      className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium disabled:cursor-not-allowed cursor-pointer"
                    >
                      Apply Example
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
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
