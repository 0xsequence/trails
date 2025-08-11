import { InfoIcon, Tooltip } from "@0xsequence/design-system"
import { useSupportedChains, useSupportedTokens } from "0xtrails"
import { defaultWalletOptions } from "0xtrails/widget"
import type { Mode } from "0xtrails"
import { ChevronDown, X } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { encodeFunctionData, parseUnits, zeroAddress } from "viem"
import { useAccount } from "wagmi"
import { ChainSelector } from "./ChainSelector"
import { TokenSelector } from "./TokenSelector"
import { QuoteProviderSelector } from "./QuoteProviderSelector"
import { CSS_PRESETS, DEFAULT_CSS_VALUES, type PresetName } from "./cssPresets"

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
  appId: string
  setAppId: (value: string) => void
  mode: Mode | null
  setMode: (value: Mode) => void
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
  customTokenAddress: string
  setCustomTokenAddress: (value: string) => void
  buttonText: string
  setButtonText: (value: string) => void
  customCss: string
  setCustomCss: (value: string) => void
  quoteProvider: string
  setQuoteProvider: (value: string) => void
}

// Local storage keys
export const STORAGE_KEYS = {
  APP_ID: "trails_demo_app_id",
  MODE: "trails_demo_mode",
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
  CUSTOM_TOKEN_ADDRESS: "trails_demo_custom_token_address",
  BUTTON_TEXT: "trails_demo_button_text",
  CUSTOM_CSS: "trails_demo_custom_css",
  QUOTE_PROVIDER: "trails_demo_quote_provider",
} as const

interface UseAccountButtonProps {
  onAddressSelect: (address: string) => void
  currentRecipient?: string
}

const UseAccountButton: React.FC<UseAccountButtonProps> = ({
  onAddressSelect,
  currentRecipient = "",
}) => {
  const { address, isConnected } = useAccount()

  // Check if connected address matches current recipient (case-insensitive)
  const isAddressAlreadySet =
    isConnected &&
    address &&
    currentRecipient &&
    address.toLowerCase() === currentRecipient.toLowerCase()

  if (!isConnected || !address) {
    return (
      <button
        type="button"
        disabled
        className="px-2 sm:px-3 py-1 text-xs bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
        title="Connect your wallet first"
      >
        Use Account
      </button>
    )
  }

  if (isAddressAlreadySet) {
    return (
      <button
        type="button"
        disabled
        className="px-2 sm:px-3 py-1 text-xs bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
        title="Account address already set"
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
  appId,
  setAppId,
  mode,
  setMode,
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
  customTokenAddress,
  setCustomTokenAddress,
  buttonText,
  setButtonText,
  customCss,
  setCustomCss,
  quoteProvider,
  setQuoteProvider,
}) => {
  // Separate state for textarea content - initialize from localStorage
  const [textareaCss, setTextareaCss] = useState(() => {
    const savedCustomCss = localStorage.getItem(STORAGE_KEYS.CUSTOM_CSS)
    return savedCustomCss || ""
  })
  const { address, isConnected } = useAccount()
  const [isScenarioDropdownOpen, setIsScenarioDropdownOpen] = useState(false)
  const [selectedScenario, setSelectedScenario] = useState<string>("")
  const [showCustomTokenInput, setShowCustomTokenInput] = useState(false)
  const [initialStateLoaded, setInitialStateLoaded] = useState(false)

  // Scenario keys
  const SCENARIO_KEYS = {
    PAY_USDC_BASE: "pay_usdc_base",
    FUND_USDC_BASE: "fund_usdc_base",
    MINT_NFT_BASE_USDC: "mint_nft_base_usdc",
    MINT_NFT_ARBITRUM_ETH: "mint_nft_arbitrum_eth",
    MINT_NFT_ARBITRUM_USDC: "mint_nft_arbitrum_usdc",
    MINT_NFT_ARBITRUM_CCTP_TESTNET: "mint_nft_arbitrum_cctp_testnet",
    MINT_NFT_POLYGON_BAT: "mint_nft_polygon_bat",
    DEPOSIT_AAVE_BASE_ETH: "deposit_aave_base_eth",
    DEPOSIT_AAVE_BASE_USDC: "deposit_aave_base_usdc",
    DEPOSIT_MORPHO_BASE_USDC: "deposit_morpho_base_usdc",
    DEPOSIT_GAUNLET_VAULT_BASE: "deposit_gaunlet_vault_base",
    FUND_DEPOSIT_AAVE_BASE_USDC: "fund_deposit_aave_base_usdc",
  } as const

  // Scenario options based on example subtitles
  const scenarioOptions = useMemo(() => {
    const payScenarios: { key: string; label: string; disabled?: boolean }[] = [
      {
        key: SCENARIO_KEYS.PAY_USDC_BASE,
        label: "Pay USDC on Base to a recipient",
      },
      {
        key: SCENARIO_KEYS.MINT_NFT_BASE_USDC,
        label: "Mint an NFT on Base with USDC",
      },
      {
        key: SCENARIO_KEYS.MINT_NFT_ARBITRUM_ETH,
        label: "Mint an NFT on Arbitrum with ETH",
      },
      {
        key: SCENARIO_KEYS.MINT_NFT_ARBITRUM_USDC,
        label: "Mint an NFT on Arbitrum with USDC",
      },
      {
        key: SCENARIO_KEYS.MINT_NFT_POLYGON_BAT,
        label: "Mint an NFT on Polygon with BAT",
      },
      {
        key: SCENARIO_KEYS.MINT_NFT_ARBITRUM_CCTP_TESTNET,
        label: "Mint an NFT on Arbitrum Sepolia with USDC using CCTP",
        disabled: true,
      },
      {
        key: SCENARIO_KEYS.DEPOSIT_AAVE_BASE_USDC,
        label: "Deposit USDC to Aave lending pool on Base",
      },
      {
        key: SCENARIO_KEYS.DEPOSIT_AAVE_BASE_ETH,
        label: "Deposit ETH to Aave lending pool on Base",
      },
      {
        key: SCENARIO_KEYS.DEPOSIT_MORPHO_BASE_USDC,
        label: "Deposit USDC to Morpho vault on Base",
      },
      {
        key: SCENARIO_KEYS.DEPOSIT_GAUNLET_VAULT_BASE,
        label: "Deposit USDC to Gaunlet vault on Base",
        disabled: true,
      },
    ]

    const fundScenarios: { key: string; label: string; disabled?: boolean }[] =
      [
        {
          key: SCENARIO_KEYS.FUND_USDC_BASE,
          label: "Bridge USDC to Base",
        },
        {
          key: SCENARIO_KEYS.FUND_DEPOSIT_AAVE_BASE_USDC,
          label: "Fund USDC Aave lending pool on Base",
        },
      ]

    return mode === "fund" ? fundScenarios : payScenarios
  }, [
    mode,
    SCENARIO_KEYS.PAY_USDC_BASE,
    SCENARIO_KEYS.FUND_USDC_BASE,
    SCENARIO_KEYS.MINT_NFT_BASE_USDC,
    SCENARIO_KEYS.MINT_NFT_ARBITRUM_ETH,
    SCENARIO_KEYS.MINT_NFT_ARBITRUM_USDC,
    SCENARIO_KEYS.MINT_NFT_POLYGON_BAT,
    SCENARIO_KEYS.MINT_NFT_ARBITRUM_CCTP_TESTNET,
    SCENARIO_KEYS.DEPOSIT_AAVE_BASE_ETH,
    SCENARIO_KEYS.DEPOSIT_AAVE_BASE_USDC,
    SCENARIO_KEYS.DEPOSIT_MORPHO_BASE_USDC,
    SCENARIO_KEYS.DEPOSIT_GAUNLET_VAULT_BASE,
    SCENARIO_KEYS.FUND_DEPOSIT_AAVE_BASE_USDC,
  ])

  // Scenario recipient
  const [toRecipient, setToRecipient] = useState("")

  // Add state for editing chain
  const [paymasterKey, setPaymasterKey] = useState(0)

  // Debug useEffect for paymasterUrls
  useEffect(() => {
    console.log("[trails-demo] paymasterUrls changed:", paymasterUrls)
  }, [paymasterUrls])

  const defaultToAmounts = useMemo<Record<string, string>>(() => {
    return {
      USDC: "0.1",
      ETH: "0.00001",
      BAT: "0.1",
    }
  }, [])

  // Function to apply scenario settings
  const applyScenario = useCallback(
    (scenarioKey: string, skipRecipientSet = false) => {
      // Set recipient to connected account if available (but not when called due to toRecipient changes)
      if (!skipRecipientSet && isConnected && address) {
        setToRecipient(address)
      }

      const effectiveRecipient =
        toRecipient || (isConnected && address ? address : zeroAddress)

      switch (scenarioKey) {
        case SCENARIO_KEYS.PAY_USDC_BASE: {
          setToAmount(defaultToAmounts.USDC)
          setToToken("USDC")
          setToChainId(8453)
          setToCalldata("")
          // For scenarios without calldata, recipient becomes the toAddress
          if (toRecipient) {
            setToAddress(toRecipient)
          } else {
            setToAddress("")
          }
          break
        }
        case SCENARIO_KEYS.FUND_USDC_BASE: {
          setToAmount(defaultToAmounts.USDC)
          setToToken("USDC")
          setToChainId(8453)
          setToCalldata("")
          // For scenarios without calldata, recipient becomes the toAddress
          if (toRecipient) {
            setToAddress(toRecipient)
          } else {
            setToAddress("")
          }
          break
        }
        case SCENARIO_KEYS.MINT_NFT_BASE_USDC: {
          setToAddress("0xF69F076c7225651b30d17B1a9C454319A4CfE77c")
          setToAmount(defaultToAmounts.USDC)
          setToToken("USDC")
          setToChainId(8453)
          setToCalldata(encodeNftMintCalldata(effectiveRecipient))
          break
        }
        case SCENARIO_KEYS.MINT_NFT_ARBITRUM_ETH: {
          setToAddress("0x384A39B36B278e6F53404eecc784855e9C1f75f8")
          setToAmount(defaultToAmounts.ETH)
          setToToken("ETH")
          setToChainId(42161)
          setToCalldata(encodeNftMintCalldata(effectiveRecipient))
          break
        }
        case SCENARIO_KEYS.MINT_NFT_ARBITRUM_USDC: {
          setToAddress("0xF69F076c7225651b30d17B1a9C454319A4CfE77c")
          setToAmount(defaultToAmounts.USDC)
          setToToken("USDC")
          setToChainId(42161)
          setToCalldata(encodeNftMintCalldata(effectiveRecipient))
          break
        }
        case SCENARIO_KEYS.MINT_NFT_ARBITRUM_CCTP_TESTNET: {
          setToAddress("0x8a5dCBf3e5D19cF8Efcc3130BeaCC83B4739D7eD")
          setToAmount(defaultToAmounts.USDC)
          setToToken("USDC")
          setToChainId(42161)
          setToCalldata(encodeNftMintCalldata(effectiveRecipient))
          break
        }
        case SCENARIO_KEYS.MINT_NFT_POLYGON_BAT: {
          setToAddress("0x92Dc1cCE6767F82494BCBC54235A08B4FD457c26")
          setToAmount(defaultToAmounts.BAT)
          setToToken("BAT")
          setToChainId(137)
          setToCalldata(encodeNftMintCalldata(effectiveRecipient))
          break
        }
        case SCENARIO_KEYS.DEPOSIT_AAVE_BASE_ETH: {
          setToAddress("0xa0d9C1E9E48Ca30c8d8C3B5D69FF5dc1f6DFfC24")
          setToAmount(defaultToAmounts.ETH)
          setToToken("ETH")
          setToChainId(8453)
          setToCalldata(encodeAaveEthDepositCalldata(effectiveRecipient))
          break
        }
        case SCENARIO_KEYS.DEPOSIT_AAVE_BASE_USDC: {
          setToAddress("0xA238Dd80C259a72e81d7e4664a9801593F98d1c5")
          setToAmount(defaultToAmounts.USDC)
          setToToken("USDC")
          setToChainId(8453)
          setToCalldata(
            encodeErc20AaveDepositCalldata(
              effectiveRecipient,
              defaultToAmounts.USDC,
            ),
          )
          break
        }
        case SCENARIO_KEYS.FUND_DEPOSIT_AAVE_BASE_USDC: {
          setToAddress("0xA238Dd80C259a72e81d7e4664a9801593F98d1c5")
          setToAmount("")
          setToToken("USDC")
          setToChainId(8453)
          setToCalldata(encodeErc20AaveDepositCalldata(effectiveRecipient, ""))
          break
        }
        case SCENARIO_KEYS.DEPOSIT_MORPHO_BASE_USDC: {
          setToAddress("0xbeeF010f9cb27031ad51e3333f9aF9C6B1228183")
          setToAmount(defaultToAmounts.USDC)
          setToToken("USDC")
          setToChainId(8453)
          setToCalldata(
            encodeMorphoDepositCalldata(
              effectiveRecipient,
              defaultToAmounts.USDC,
            ),
          )
          break
        }

        // Currently not working because the requestDeposit function doesn't support onBehalfOf
        case SCENARIO_KEYS.DEPOSIT_GAUNLET_VAULT_BASE: {
          setToAddress("0x18CF8d963E1a727F9bbF3AEffa0Bd04FB4dBdA07")
          setToAmount(defaultToAmounts.USDC)
          setToToken("USDC")
          setToChainId(8453)
          setToCalldata(encodeGaunletDepositCalldata(defaultToAmounts.USDC))
          break
        }
      }
    },
    [
      isConnected,
      address,
      toRecipient,
      setToAmount,
      setToToken,
      setToChainId,
      setToCalldata,
      setToAddress,
      SCENARIO_KEYS,
      defaultToAmounts,
    ],
  )

  // Function to update calldata when toRecipient changes
  const updateCalldataForRecipient = useCallback(() => {
    if (!selectedScenario) return

    // Use toRecipient if set, otherwise use connected account address
    const effectiveRecipient =
      toRecipient || (isConnected && address ? address : zeroAddress)
    if (!effectiveRecipient) return

    switch (selectedScenario) {
      case SCENARIO_KEYS.MINT_NFT_BASE_USDC: {
        const baseCalldata = encodeNftMintCalldata(effectiveRecipient)
        setToCalldata(baseCalldata)
        break
      }
      case SCENARIO_KEYS.MINT_NFT_ARBITRUM_ETH: {
        const arbitrumCalldata = encodeNftMintCalldata(effectiveRecipient)
        setToCalldata(arbitrumCalldata)
        break
      }
      case SCENARIO_KEYS.MINT_NFT_ARBITRUM_USDC: {
        const arbitrumCalldata = encodeNftMintCalldata(effectiveRecipient)
        setToCalldata(arbitrumCalldata)
        break
      }
      case SCENARIO_KEYS.MINT_NFT_POLYGON_BAT: {
        const polygonCalldata = encodeNftMintCalldata(effectiveRecipient)
        setToCalldata(polygonCalldata)
        break
      }
      case SCENARIO_KEYS.DEPOSIT_AAVE_BASE_ETH: {
        const aaveCalldata = encodeAaveEthDepositCalldata(effectiveRecipient)
        setToCalldata(aaveCalldata)
        break
      }
      case SCENARIO_KEYS.DEPOSIT_AAVE_BASE_USDC: {
        const aaveUsdcCalldata = encodeErc20AaveDepositCalldata(
          effectiveRecipient,
          toAmount,
        )
        setToCalldata(aaveUsdcCalldata)
        break
      }
      case SCENARIO_KEYS.DEPOSIT_MORPHO_BASE_USDC: {
        const morphoCalldata = encodeMorphoDepositCalldata(
          effectiveRecipient,
          toAmount,
        )
        setToCalldata(morphoCalldata)
        break
      }
    }
  }, [
    selectedScenario,
    toRecipient,
    setToCalldata,
    isConnected,
    address,
    SCENARIO_KEYS,
    toAmount,
  ])

  // Update calldata when toRecipient changes
  useEffect(() => {
    updateCalldataForRecipient()
  }, [updateCalldataForRecipient])

  // Reapply scenario when toRecipient changes
  useEffect(() => {
    if (selectedScenario && toRecipient) {
      applyScenario(selectedScenario, true) // Skip setting recipient to avoid infinite loop
    }
  }, [toRecipient, selectedScenario, applyScenario])

  // Load saved values from localStorage on mount
  useEffect(() => {
    const savedAppId = localStorage.getItem(STORAGE_KEYS.APP_ID)
    const savedMode = localStorage.getItem(STORAGE_KEYS.MODE)
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
    const savedCustomTokenAddress = localStorage.getItem(
      STORAGE_KEYS.CUSTOM_TOKEN_ADDRESS,
    )
    const savedButtonText = localStorage.getItem(STORAGE_KEYS.BUTTON_TEXT)
    const savedCustomCss = localStorage.getItem(STORAGE_KEYS.CUSTOM_CSS)
    const savedQuoteProvider = localStorage.getItem(STORAGE_KEYS.QUOTE_PROVIDER)

    // Only set values if they exist in localStorage
    if (savedAppId !== null) setAppId(savedAppId)
    if (savedMode !== null) setMode(savedMode as Mode)
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
    if (savedCustomTokenAddress !== null) {
      setCustomTokenAddress(savedCustomTokenAddress)
      setShowCustomTokenInput(true) // Show custom input if custom token address exists
    }
    if (savedButtonText !== null) setButtonText(savedButtonText)
    if (savedCustomCss !== null) setCustomCss(savedCustomCss)
    if (savedQuoteProvider !== null) setQuoteProvider(savedQuoteProvider)

    setInitialStateLoaded(true)
  }, [
    setAppId,
    setMode,
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
    setCustomTokenAddress,
    setButtonText,
    setCustomCss,
    setQuoteProvider,
  ])

  // Save values to localStorage whenever they change and clear scenario when mode changes
  useEffect(() => {
    if (!initialStateLoaded) return
    localStorage.setItem(STORAGE_KEYS.MODE, mode || "pay")
    // Clear scenario selection when mode changes
    setSelectedScenario("")
    setToRecipient("")
  }, [mode, initialStateLoaded])

  useEffect(() => {
    if (appId) {
      localStorage.setItem(STORAGE_KEYS.APP_ID, appId)
    } else {
      localStorage.removeItem(STORAGE_KEYS.APP_ID)
    }
  }, [appId])

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

  // Save customTokenAddress to localStorage
  useEffect(() => {
    if (customTokenAddress) {
      localStorage.setItem(
        STORAGE_KEYS.CUSTOM_TOKEN_ADDRESS,
        customTokenAddress,
      )
    } else {
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_TOKEN_ADDRESS)
    }
  }, [customTokenAddress])

  // Save buttonText to localStorage
  useEffect(() => {
    if (buttonText) {
      localStorage.setItem(STORAGE_KEYS.BUTTON_TEXT, buttonText)
    } else {
      localStorage.removeItem(STORAGE_KEYS.BUTTON_TEXT)
    }
  }, [buttonText])

  // Save customCss to localStorage
  useEffect(() => {
    if (customCss) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_CSS, customCss)
    } else {
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_CSS)
    }
  }, [customCss])

  // Save quoteProvider to localStorage
  useEffect(() => {
    if (quoteProvider) {
      localStorage.setItem(STORAGE_KEYS.QUOTE_PROVIDER, quoteProvider)
    } else {
      localStorage.removeItem(STORAGE_KEYS.QUOTE_PROVIDER)
    }
  }, [quoteProvider])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    setAppId("")
    setMode("pay") // Reset to default "pay"
    setToAddress("")
    setToAmount("")
    setToChainId(undefined)
    setToToken(undefined)
    setToCalldata("")
    setToRecipient("") // Clear toRecipient
    setUseCustomButton(false)
    setRenderInline(true) // Reset to default true
    setTheme("auto") // Reset to default auto
    setPaymasterUrls([]) // Reset paymasterUrls
    setGasless(false) // Reset gasless to default false
    setCustomTokenAddress("") // Reset customTokenAddress
    setShowCustomTokenInput(false) // Reset custom token input visibility
    setButtonText("") // Reset buttonText
    setQuoteProvider("auto") // Reset quoteProvider to default
    resetCustomCss() // Reset custom CSS
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

  const { supportedChains: supportedToChains, isLoadingChains } =
    useSupportedChains()

  const { supportedTokens: supportedDestinationTokens } = useSupportedTokens()

  // Filter tokens based on selected chain
  const filteredTokens = useMemo(() => {
    if (!toChainId) return []

    return supportedDestinationTokens.filter((token: any) => {
      // If token has chainId property, filter by it
      if (token.chainId !== undefined) {
        return token.chainId === toChainId
      }
      // Otherwise, include all tokens (fallback for tokens without chainId)
      return true
    })
  }, [supportedDestinationTokens, toChainId])

  const handleCustomTokenToggle = () => {
    setShowCustomTokenInput(!showCustomTokenInput)
    if (showCustomTokenInput) {
      // When hiding custom input, clear the custom token address
      setCustomTokenAddress("")
    } else {
      // When showing custom input, focus on the input field after a brief delay
      setTimeout(() => {
        const customTokenInput = document.getElementById("custom-token-input")
        if (customTokenInput) {
          customTokenInput.focus()
        }
      }, 100)
    }
  }

  const handleClearCustomToken = () => {
    setCustomTokenAddress("")
    setShowCustomTokenInput(false)
  }

  // CSS Management Functions
  const applyCustomCss = useCallback(() => {
    // Apply the textarea content to the widget
    setCustomCss(textareaCss)
    // Save custom CSS to localStorage
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CSS, textareaCss)
  }, [textareaCss, setCustomCss])

  const resetCustomCss = useCallback(() => {
    // Clear textarea and apply empty CSS
    setTextareaCss("")
    setCustomCss("")
    // Clear custom CSS from localStorage
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_CSS)
    setTheme("light")
  }, [setCustomCss, setTheme])

  const applyPreset = useCallback(
    (presetName: PresetName) => {
      const preset = CSS_PRESETS[presetName]
      // Set textarea to preset values
      setTextareaCss(preset)
      // Automatically apply the CSS to the widget
      setCustomCss(preset)

      // Save CSS content to localStorage
      localStorage.setItem(STORAGE_KEYS.CUSTOM_CSS, preset)

      // Set widget theme based on preset
      if (
        presetName === "square" ||
        presetName === "binance" ||
        presetName === "neon" ||
        presetName === "sequence"
      ) {
        setTheme("dark")
      } else {
        setTheme("light")
      }
    },
    [setCustomCss, setTheme],
  )

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 sm:p-6 min-h-[775px]">
      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2"
            htmlFor="mode"
          >
            Mode
            <Tooltip message="Choose between payment and funding widget modes">
              <InfoIcon
                size="sm"
                className="text-gray-500 dark:text-gray-400 cursor-pointer"
              />
            </Tooltip>
          </label>
          <div className="flex space-x-4">
            {(["pay", "fund"] as const).map((modeOption) => (
              <div key={modeOption} className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setMode(modeOption)}
                  className={`w-7 h-7 rounded-full border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    mode === modeOption
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {mode === modeOption && <Checkmark />}
                </button>
                <button
                  type="button"
                  onClick={() => setMode(modeOption)}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {modeOption.charAt(0).toUpperCase() + modeOption.slice(1)}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2"
            htmlFor="scenario"
          >
            Scenario
            <Tooltip message="Preset values for the widget to demonstrate different use cases">
              <InfoIcon
                size="sm"
                className="text-gray-500 dark:text-gray-400 cursor-pointer"
              />
            </Tooltip>
          </label>
          <div className="relative" data-scenario-dropdown>
            <button
              type="button"
              onClick={() =>
                isConnected &&
                setIsScenarioDropdownOpen(!isScenarioDropdownOpen)
              }
              disabled={!isConnected}
              className={`w-full flex items-center px-3 sm:px-4 py-3 border rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isConnected
                  ? "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-900 dark:text-gray-200"
                  : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              <span className="flex-1 text-left text-sm">
                {selectedScenario
                  ? scenarioOptions.find((s) => s.key === selectedScenario)
                      ?.label || selectedScenario
                  : "Select a scenario"}
              </span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  isScenarioDropdownOpen ? "transform rotate-180" : ""
                } ${isConnected ? "text-gray-400 dark:text-gray-400" : "text-gray-600 dark:text-gray-600"}`}
              />
            </button>
            {!isConnected && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                Connect your wallet to select a scenario
              </p>
            )}
            {selectedScenario && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                Fields are auto-filled based on the selected scenario
              </p>
            )}

            {isScenarioDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedScenario("")
                    setIsScenarioDropdownOpen(false)
                    setToRecipient("")
                  }}
                  className={`w-full flex items-center px-3 sm:px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 ${!selectedScenario ? "bg-gray-100 dark:bg-gray-600 text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-gray-200"} cursor-pointer text-sm`}
                >
                  <span className="ml-2">Select a scenario</span>
                  {!selectedScenario && (
                    <span className="ml-auto text-blue-400">•</span>
                  )}
                </button>
                {scenarioOptions
                  .filter((scenario) => !scenario.disabled)
                  .map((scenario) => (
                    <button
                      key={scenario.key}
                      type="button"
                      onClick={() => {
                        setSelectedScenario(scenario.key)
                        setIsScenarioDropdownOpen(false)
                        applyScenario(scenario.key)
                        setCustomTokenAddress("")
                        setShowCustomTokenInput(false)
                      }}
                      className={`w-full flex items-center px-3 sm:px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                        selectedScenario === scenario.key
                          ? "bg-gray-100 dark:bg-gray-600 text-blue-600 dark:text-blue-400"
                          : "text-gray-900 dark:text-gray-200"
                      } cursor-pointer text-sm`}
                    >
                      <span className="ml-2">{scenario.label}</span>
                      {selectedScenario === scenario.key && (
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
              className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2"
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
                className="flex-1 px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <UseAccountButton
                onAddressSelect={setToRecipient}
                currentRecipient={toRecipient}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              Customize the recipient address for this scenario
            </p>
          </div>
        )}

        <div>
          <label
            className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2"
            htmlFor="toAddress"
          >
            To Address
            <Tooltip message="The target address for the transaction (e.g. the recipient address or contract address if using calldata)">
              <InfoIcon
                size="sm"
                className="text-gray-500 dark:text-gray-400 cursor-pointer"
              />
            </Tooltip>
          </label>
          <input
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value.trim())}
            placeholder="0x..."
            disabled={!!selectedScenario}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
              selectedScenario
                ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200"
            }`}
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2"
            htmlFor="toChainId"
          >
            To Chain ID
            <Tooltip message="The chain where the transaction will be executed">
              <InfoIcon
                size="sm"
                className="text-gray-500 dark:text-gray-400 cursor-pointer"
              />
            </Tooltip>
          </label>
          <ChainSelector
            selectedChainId={toChainId}
            onChainSelect={setToChainId}
            chains={supportedToChains}
            disabled={!!selectedScenario}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2"
              htmlFor="toAmount"
            >
              To Amount
              <Tooltip
                message={`The exact amount of tokens to receive when widget mode="pay". This has no effect when widget mode="fund"`}
              >
                <InfoIcon
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 cursor-pointer"
                />
              </Tooltip>
            </label>
            <input
              type="text"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value.trim())}
              placeholder="0.00"
              disabled={!!selectedScenario}
              className={`w-full px-3 sm:px-4 h-12 border rounded-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm leading-none ${
                selectedScenario
                  ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200"
              }`}
            />
          </div>

          <div className="flex-1 space-y-2">
            <label
              className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2"
              htmlFor="toToken"
            >
              To Token
              <Tooltip message="The target token to receive">
                <InfoIcon
                  size="sm"
                  className="text-gray-500 dark:text-gray-400 cursor-pointer"
                />
              </Tooltip>
            </label>
            {showCustomTokenInput ? (
              <div className="relative">
                <input
                  id="custom-token-input"
                  type="text"
                  value={customTokenAddress}
                  onChange={(e) => setCustomTokenAddress(e.target.value.trim())}
                  placeholder="0x..."
                  disabled={!!selectedScenario || !toChainId}
                  className={`w-full px-3 sm:px-4 h-12 pr-10 border rounded-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm leading-none ${
                    selectedScenario || !toChainId
                      ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                      : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={handleClearCustomToken}
                  className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 rounded transition-colors"
                  title="Clear custom token"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <TokenSelector
                  selectedToken={
                    toToken && toChainId
                      ? {
                          chainId: toChainId,
                          contractAddress:
                            filteredTokens.find((t) => t.symbol === toToken)
                              ?.contractAddress || zeroAddress,
                        }
                      : undefined
                  }
                  onTokenSelect={(token) =>
                    setToToken(token?.symbol || undefined)
                  }
                  tokens={filteredTokens}
                  disabled={!!selectedScenario || !toChainId}
                  placeholder="Select Token"
                />
                <button
                  type="button"
                  onClick={handleCustomTokenToggle}
                  disabled={!!selectedScenario || !toChainId}
                  className={`text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors ${
                    selectedScenario || !toChainId
                      ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  Use Custom Token
                </button>
              </>
            )}
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2"
            htmlFor="toCalldata"
          >
            To Calldata
            <Tooltip message="The encoded function call data for complex transactions (e.g., contract interactions)">
              <InfoIcon
                size="sm"
                className="text-gray-500 dark:text-gray-400 cursor-pointer"
              />
            </Tooltip>
          </label>
          <textarea
            value={toCalldata}
            onChange={(e) => setToCalldata(e.target.value.trim())}
            placeholder="0x..."
            rows={3}
            disabled={!!selectedScenario}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-xs sm:text-sm ${
              selectedScenario
                ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200"
            }`}
          />
        </div>

        <div className="pt-2">
          <details className="group">
            <summary className="flex items-center cursor-pointer list-none py-2">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                Gas & Wallet Settings
              </span>
              <ChevronDown className="text-gray-500 dark:text-gray-400 h-5 w-5 transition-transform group-open:rotate-180 ml-2" />
            </summary>
            <div className="mt-3 space-y-4">
              <div className="flex items-center justify-between py-2">
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-gray-200 flex items-center gap-2"
                  htmlFor="gasless"
                >
                  Gasless
                  <Tooltip message="Enable gasless transactions using Sequence Relayer based on your project access key (app ID) sponsorship settings">
                    <InfoIcon
                      size="sm"
                      className="text-gray-500 dark:text-gray-400 cursor-pointer"
                    />
                  </Tooltip>
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setGasless(!gasless)}
                    className={`w-7 h-7 rounded border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      gasless
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {gasless && <Checkmark />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGasless(!gasless)}
                    className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Enable
                  </button>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2"
                  htmlFor="paymasterUrls"
                >
                  Paymaster URLs (Chain-specific)
                  <Tooltip message="Use 4337-compatible bundler/paymaster URLs for gasless transactions, such as Alchemy, Thirdweb, Pimlico, ZeroDev, etc. Set different URLs for different chains.">
                    <InfoIcon
                      size="sm"
                      className="text-gray-500 dark:text-gray-400 cursor-pointer"
                    />
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
                            chains={supportedToChains}
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
                          className="flex-1 px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                          className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-lg font-medium cursor-pointer self-center"
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
                      const availableChain = supportedToChains.find(
                        (chain: { id: number }) =>
                          !usedChainIds.includes(chain.id),
                      )
                      if (availableChain) {
                        setPaymasterUrls([
                          ...paymasterUrls,
                          { chainId: availableChain.id, url: "" },
                        ])
                      }
                    }}
                    disabled={
                      isLoadingChains ||
                      paymasterUrls.length >= supportedToChains.length
                    }
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium disabled:cursor-not-allowed cursor-pointer"
                  >
                    + Add Paymaster URL
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 gap-2">
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-gray-200 flex items-center gap-2"
                  htmlFor="walletOptions"
                >
                  Wallet Options
                  <Tooltip message="Wallet options like 'injected' (Metamask) and Privy are supported">
                    <InfoIcon
                      size="sm"
                      className="text-gray-500 dark:text-gray-400 cursor-pointer"
                    />
                  </Tooltip>
                </label>
                <div className="flex flex-wrap gap-3">
                  {[...new Set([...defaultWalletOptions, "walletconnect"])].map(
                    (wallet: string) => {
                      const isSelected = walletOptions?.includes(wallet)
                      return (
                        <div
                          key={wallet}
                          className="flex items-center space-x-2"
                        >
                          <button
                            type="button"
                            onClick={() => handleWalletOptionToggle(wallet)}
                            className={`w-7 h-7 rounded border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? "bg-blue-500 border-blue-500 text-white"
                                : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600"
                            }`}
                          >
                            {isSelected && <Checkmark />}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWalletOptionToggle(wallet)}
                            className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                          >
                            {wallet.charAt(0).toUpperCase() + wallet.slice(1)}
                          </button>
                        </div>
                      )
                    },
                  )}
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2"
                  htmlFor="appId"
                >
                  Custom App ID
                  <Tooltip message="Your Sequence project access key for gasless transactions">
                    <InfoIcon
                      size="sm"
                      className="text-gray-500 dark:text-gray-400 cursor-pointer"
                    />
                  </Tooltip>
                </label>
                <input
                  type="text"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value.trim())}
                  placeholder="Enter your app ID"
                  className="w-full px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </details>
        </div>

        <div className="pt-2">
          <details className="group">
            <summary className="flex items-center cursor-pointer list-none py-2">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                UI & Interaction Settings
              </span>
              <ChevronDown className="text-gray-500 dark:text-gray-400 h-5 w-5 transition-transform group-open:rotate-180 ml-2" />
            </summary>
            <div className="mt-3 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 gap-2">
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-gray-200 flex items-center gap-2"
                  htmlFor="theme"
                >
                  Theme Mode
                  <Tooltip message="Set widget theme to light or dark mode. Auto mode detects your OS appearance theme preference">
                    <InfoIcon
                      size="sm"
                      className="text-gray-500 dark:text-gray-400 cursor-pointer"
                    />
                  </Tooltip>
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
                            : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                      >
                        {theme === mode && <Checkmark />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setTheme(mode)}
                        className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-gray-200 flex items-center gap-2"
                  htmlFor="useCustomButton"
                >
                  Custom Button
                  <Tooltip message="Shows in the code snippet an example of how to use a custom button">
                    <InfoIcon
                      size="sm"
                      className="text-gray-500 dark:text-gray-400 cursor-pointer"
                    />
                  </Tooltip>
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setUseCustomButton(!useCustomButton)}
                    className={`w-7 h-7 rounded border-2 transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      useCustomButton
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {useCustomButton && <Checkmark />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseCustomButton(!useCustomButton)}
                    className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Enable
                  </button>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2"
                  htmlFor="buttonText"
                >
                  Button Text
                  <Tooltip message="Custom text for the widget button (leave empty for default)">
                    <InfoIcon
                      size="sm"
                      className="text-gray-500 dark:text-gray-400 cursor-pointer"
                    />
                  </Tooltip>
                </label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="Custom button text"
                  className="w-full px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2"
                  htmlFor="customCss"
                >
                  Custom CSS Variables
                  <Tooltip message="Customize widget appearance by modifying CSS variables. Prefix all variables with '--trails-'">
                    <InfoIcon
                      size="sm"
                      className="text-gray-500 dark:text-gray-400 cursor-pointer"
                    />
                  </Tooltip>
                </label>
                <div className="space-y-2">
                  <textarea
                    id="customCss"
                    value={textareaCss}
                    onChange={(e) => {
                      const newValue = e.target.value
                      setTextareaCss(newValue)

                      // Auto-apply CSS if it's not the default
                      if (newValue.trim() !== DEFAULT_CSS_VALUES.trim()) {
                        setCustomCss(newValue)
                      } else {
                        setCustomCss("")
                      }
                    }}
                    placeholder="Enter custom CSS variables..."
                    rows={8}
                    className="w-full px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-xs"
                  />
                  <div className="flex gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={applyCustomCss}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
                    >
                      Apply CSS
                    </button>
                    <button
                      type="button"
                      onClick={resetCustomCss}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm font-medium cursor-pointer"
                    >
                      Reset CSS
                    </button>
                  </div>
                  <div className="mt-2">
                    <span className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Examples:
                    </span>
                    <div className="flex gap-1 flex-wrap">
                      <button
                        type="button"
                        onClick={() => applyPreset("default")}
                        className="px-2 py-1 bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 rounded text-xs font-medium cursor-pointer"
                      >
                        Default
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("square")}
                        className="px-2 py-1 text-white text-xs font-medium cursor-pointer"
                        style={
                          {
                            backgroundColor: "rgb(31 41 55)",
                            "--tw-hover-bg": "rgb(31 41 55)",
                            borderRadius: "0px",
                            fontFamily: '"Courier New", "Courier", monospace',
                          } as React.CSSProperties
                        }
                      >
                        Square
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("mono")}
                        className="px-2 py-1 bg-white border border-black text-gray-900 hover:bg-gray-50 rounded text-xs font-medium cursor-pointer"
                        style={
                          {
                            fontFamily: "monospace",
                          } as React.CSSProperties
                        }
                      >
                        Mono
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("neon")}
                        className="px-2 py-1 text-black rounded text-xs font-medium cursor-pointer"
                        style={
                          {
                            backgroundColor: "rgb(0 0 0)",
                            color: "rgb(0 255 255)",
                            "--tw-hover-bg": "rgb(0 200 200)",
                            fontFamily: '"Courier New", "Courier", monospace',
                          } as React.CSSProperties
                        }
                      >
                        Neon
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("gray")}
                        className="px-2 py-1 text-white rounded text-xs font-medium cursor-pointer"
                        style={
                          {
                            backgroundColor: "rgb(153 158 169)",
                            "--tw-hover-bg": "rgb(75 85 99)",
                            fontFamily: '"Arial", "Helvetica", sans-serif',
                          } as React.CSSProperties
                        }
                      >
                        Gray
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("green")}
                        className="px-2 py-1 text-white rounded text-xs font-medium cursor-pointer"
                        style={
                          {
                            backgroundColor: "white",
                            color: "rgb(0 200 83)",
                            "--tw-hover-bg": "rgb(0 180 73)",
                            fontFamily:
                              '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          } as React.CSSProperties
                        }
                      >
                        Mint
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("metamask")}
                        className="px-2 py-1 text-white rounded text-xs font-medium cursor-pointer"
                        style={
                          {
                            backgroundColor: "white",
                            color: "rgb(242 101 34)",
                            border: "1px solid rgb(242 101 34)",
                            "--tw-hover-bg": "rgb(220 92 31)",
                            fontFamily: '"Tahoma", "Arial", sans-serif',
                          } as React.CSSProperties
                        }
                      >
                        MetaMask
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("coinbase")}
                        className="px-2 py-1 text-white rounded text-xs font-medium cursor-pointer"
                        style={
                          {
                            backgroundColor: "white",
                            color: "rgb(0 82 204)",
                            border: "2px solid rgb(0 82 204)",
                            "--tw-hover-bg": "rgb(0 66 163)",
                            fontFamily: '"Trebuchet MS", "Arial", sans-serif',
                          } as React.CSSProperties
                        }
                      >
                        Coinbase
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("binance")}
                        className="px-2 py-1 text-black rounded text-xs font-medium cursor-pointer"
                        style={
                          {
                            backgroundColor: "black",
                            color: "rgb(245 158 11)",
                            "--tw-hover-bg": "rgb(217 119 6)",
                            fontFamily:
                              '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
                          } as React.CSSProperties
                        }
                      >
                        Binance
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("uniswap")}
                        className="px-2 py-1 text-white rounded text-xs font-medium cursor-pointer"
                        style={
                          {
                            backgroundColor: "white",
                            color: "rgb(255 0 199)",
                            border: "1px solid rgb(255 0 199)",
                            "--tw-hover-bg": "rgb(230 0 179)",
                            fontFamily: '"Century Gothic", "Arial", sans-serif',
                          } as React.CSSProperties
                        }
                      >
                        Uniswap
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("win95")}
                        className="px-2 py-1 text-xs font-medium cursor-pointer border border-gray-400"
                        style={
                          {
                            backgroundColor: "#c0c0c0",
                            color: "#222",
                            fontFamily:
                              '"MS Sans Serif", "Tahoma", "Geneva", sans-serif',
                            borderRadius: "0px",
                            boxShadow: "2px 2px 0 #fff, 4px 4px 0 #808080",
                          } as React.CSSProperties
                        }
                      >
                        Win95
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("sequence")}
                        className="px-2 py-1 text-xs font-medium cursor-pointer"
                        style={
                          {
                            background:
                              "linear-gradient(135deg, #4411E1 0%, #7537F9 100%)",
                            color: "#ffffff",
                            fontFamily:
                              '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            borderRadius: "8px",
                            border: "none",
                          } as React.CSSProperties
                        }
                      >
                        Sequence
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("swap")}
                        className="px-2 py-1 text-xs font-medium cursor-pointer"
                        style={
                          {
                            backgroundColor: "rgb(255 255 255)",
                            color: "rgb(9 9 11)",
                            border: "1px solid rgb(228 228 231)",
                            fontFamily:
                              '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            borderRadius: "8px",
                            boxShadow: "0 50px 200px 0 rgb(0 0 0 / 0.1)",
                          } as React.CSSProperties
                        }
                      >
                        Swap
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>

        <div className="pt-2">
          <details className="group">
            <summary className="flex items-center cursor-pointer list-none py-2">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                Advanced Settings
              </span>
              <ChevronDown className="text-gray-500 dark:text-gray-400 h-5 w-5 transition-transform group-open:rotate-180 ml-2" />
            </summary>
            <div className="mt-3 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2 flex items-center gap-2"
                  htmlFor="quoteProvider"
                >
                  Quote Provider
                  <Tooltip message="Choose which swap provider to use for quote. Auto will select the best available provider automatically.">
                    <InfoIcon
                      size="sm"
                      className="text-gray-500 dark:text-gray-400 cursor-pointer"
                    />
                  </Tooltip>
                </label>
                <QuoteProviderSelector
                  selectedProvider={quoteProvider}
                  onProviderSelect={setQuoteProvider}
                />
              </div>
            </div>
          </details>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 text-sm font-medium border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer"
          >
            Reset All Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export function encodeNftMintCalldata(recipient: string = zeroAddress) {
  const calldata = encodeFunctionData({
    abi: [
      {
        type: "function",
        name: "mint",
        stateMutability: "nonpayable",
        inputs: [{ name: "to", type: "address" }],
        outputs: [],
      },
    ],
    functionName: "mint",
    args: [recipient as `0x${string}`],
  })
  return calldata
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

  return calldata
}

const PLACEHOLDER_AMOUNT =
  0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefn // used by proxyCaller.ts in widget sdk

export function encodeErc20AaveDepositCalldata(
  recipient: string = zeroAddress,
  amount: string = "0.1",
) {
  let effectiveAmount = BigInt(0)
  if (amount === "") {
    effectiveAmount = PLACEHOLDER_AMOUNT
  } else {
    effectiveAmount = parseUnits(amount, 6)
  }

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
      effectiveAmount,
      recipient as `0x${string}`, // onBehalfOf
      0, // referralCode
    ],
  })

  return calldata
}

export function encodeMorphoDepositCalldata(
  recipient: string = zeroAddress,
  amount: string = "0.1",
) {
  const calldata = encodeFunctionData({
    abi: [
      {
        type: "function",
        name: "deposit",
        stateMutability: "nonpayable",
        inputs: [
          { name: "assets", type: "uint256" },
          { name: "receiver", type: "address" },
        ],
        outputs: [{ name: "shares", type: "uint256" }],
      },
    ],
    functionName: "deposit",
    args: [
      parseUnits(amount, 6), // amount in USDC (6 decimals)
      recipient as `0x${string}`, // receiver
    ],
  })

  return calldata
}

export function encodeGaunletDepositCalldata(amount: string = "0.1") {
  const calldata = encodeFunctionData({
    abi: [
      {
        type: "function",
        name: "requestDeposit",
        stateMutability: "nonpayable",
        inputs: [
          { name: "token", type: "address" },
          { name: "tokensIn", type: "uint256" },
          { name: "minUnitsOut", type: "uint256" },
          { name: "solverTip", type: "uint256" },
          { name: "deadline", type: "uint256" },
          { name: "maxPriceAge", type: "uint256" },
          { name: "isFixedPrice", type: "bool" },
        ],
        outputs: [],
      },
    ],
    functionName: "requestDeposit",
    args: [
      "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
      parseUnits(amount, 6), // 1 USDC (6 decimals)
      1n, // minUnitsOut set to 0 for now
      0n, // solverTip
      BigInt(Math.floor(Date.now() / 1000) + 259200), // deadline: current timestamp + 3 days
      3600n, // maxPriceAge: 1 hour in seconds
      false, // isFixedPrice
    ],
  })

  return calldata
}
