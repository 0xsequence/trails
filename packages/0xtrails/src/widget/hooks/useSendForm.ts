import type { TokenPrice } from "@0xsequence/trails-api"
import type { MetaTxnReceipt } from "@0xsequence/trails-relayer"
import type React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  type Account,
  formatUnits,
  getAddress,
  isAddress,
  parseUnits,
  type TransactionReceipt,
  type WalletClient,
} from "viem"
import { mainnet } from "viem/chains"
import { useEnsAddress } from "wagmi"
import { useAPIClient } from "../../apiClient.js"
import { getChainInfo, useSupportedChains } from "../../chains.js"
import { getFullErrorMessage } from "../../error.js"
import {
  prepareSend,
  TradeType,
  type PrepareSendFees,
} from "../../prepareSend.js"
import type { TransactionState } from "../../transactions.js"
import { useTokenPrices } from "../../prices.js"
import { useQueryParams } from "../../queryParams.js"
import { getRelayer, type RelayerEnv } from "../../relayer.js"
import type { Theme } from "../../theme.js"
import {
  formatBalance,
  formatUsdValue,
  formatValue,
} from "../../tokenBalances.js"
import type { SupportedToken } from "../../tokens.js"
import {
  useSupportedTokens,
  useTokenAddress,
  useTokenInfo,
} from "../../tokens.js"
import { DEFAULT_USE_V3_RELAYERS } from "../../constants.js"

export interface Token {
  id: number
  name: string
  symbol: string
  balance: string
  imageUrl: string
  chainId: number
  contractAddress: string
  tokenPriceUsd?: number
  balanceUsdFormatted?: string
  contractInfo?: {
    decimals: number
    symbol: string
    name: string
  }
}

export type TokenInfo = {
  symbol: string
  name: string
  imageUrl: string
  decimals: number
}

type ChainInfo = {
  id: number
  name: string
  imageUrl?: string
}

type PaymasterUrl = {
  chainId: number
  url: string
}

// Add FEE_TOKENS constant after SUPPORTED_TOKENS
const FEE_TOKENS: TokenInfo[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    imageUrl: `https://assets.sequence.info/images/tokens/large/1/0x0000000000000000000000000000000000000000.webp`,
    decimals: 18,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    imageUrl: `https://assets.sequence.info/images/tokens/large/1/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.webp`,
    decimals: 6,
  },
]

export type OnCompleteProps = {
  originChainId: number
  destinationChainId: number
  originUserTxReceipt: TransactionReceipt | null
  originMetaTxnReceipt: MetaTxnReceipt | null
  destinationMetaTxnReceipt: MetaTxnReceipt | null
}

export type SendFormQuote = {
  intentAddress?: string
  amount: string
  amountUsd: string
  tokenSymbol: string
  tokenName: string
  chainId: number
  imageUrl: string
  fees?: PrepareSendFees
  slippageTolerance?: string
  priceImpact?: string
  destinationTokenSymbol?: string
  destinationTokenAmount?: string
  destinationTokenAmountUsd?: string
  destinationChainId?: number
  destinationTokenImageUrl?: string
}

export type UseSendProps = {
  account: Account
  sequenceProjectAccessKey: string
  apiUrl?: string
  env?: RelayerEnv
  toAmount?: string
  toRecipient?: string
  toChainId?: number
  toToken?: string
  toCalldata?: string
  walletClient: WalletClient
  theme: Theme
  onTransactionStateChange: (transactionStates: TransactionState[]) => void
  useSourceTokenForButtonText: boolean
  onError: (error: Error | string | null) => void
  onWaitingForWalletConfirm: (quote: SendFormQuote) => void
  paymasterUrls?: PaymasterUrl[]
  gasless?: boolean
  onSend: (amount: string, recipient: string) => void
  onConfirm: () => void
  onComplete: (result: OnCompleteProps) => void
  selectedToken: Token
  setWalletConfirmRetryHandler: (handler: () => Promise<void>) => void
  tradeType?: TradeType
}

export type UseSendReturn = {
  amount: string
  amountUsdFormatted: string
  balanceUsdFormatted: string
  chainInfo: ChainInfo | null
  error: string | null
  toChainId: number | undefined
  balanceFormatted: string
  handleRecipientInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  isChainDropdownOpen: boolean
  isSubmitting: boolean
  isLoadingQuote: boolean
  isTokenDropdownOpen: boolean
  recipient: string
  recipientInput: string
  selectedDestinationChain: ChainInfo | null
  selectedDestToken: TokenInfo
  setAmount: (amount: string) => void
  setRecipient: (recipient: string) => void
  setRecipientInput: (recipientInput: string) => void
  setSelectedDestinationChain: (chain: ChainInfo) => void
  setSelectedDestToken: (token: TokenInfo) => void
  setSelectedFeeToken: (token: TokenInfo) => void
  FEE_TOKENS: TokenInfo[]
  supportedTokens: SupportedToken[]
  supportedChains: ChainInfo[]
  ensAddress: string | null
  isWaitingForWalletConfirm: boolean
  buttonText: string
  isValidRecipient: boolean
  useSourceTokenForButtonText: boolean
  destTokenPrices: TokenPrice[] | null
  sourceTokenPrices: TokenPrice[] | null
  selectedToken: Token
  selectedFeeToken: TokenInfo | null
  setIsChainDropdownOpen: (isOpen: boolean) => void
  setIsTokenDropdownOpen: (isOpen: boolean) => void
  toAmountFormatted: string
  destinationTokenAddress: string | null
  isValidCustomToken: boolean
}

export function useSendForm({
  account,
  sequenceProjectAccessKey,
  apiUrl,
  env,
  toAmount, // Custom specified amount
  toRecipient, // Custom specified recipient
  toChainId, // Custom specified destination chain id
  toToken, // Custom specified destination token address or symbol
  toCalldata, // Custom specified destination calldata
  walletClient,
  onTransactionStateChange,
  useSourceTokenForButtonText,
  onError,
  onWaitingForWalletConfirm,
  paymasterUrls,
  gasless,
  selectedToken,
  onSend,
  onConfirm,
  onComplete,
  setWalletConfirmRetryHandler,
  tradeType = TradeType.EXACT_OUTPUT,
}: UseSendProps): UseSendReturn {
  const [amount, setAmount] = useState(
    tradeType === TradeType.EXACT_INPUT ? "" : (toAmount ?? ""),
  )
  const [recipientInput, setRecipientInput] = useState(toRecipient ?? "")
  const [recipient, setRecipient] = useState(toRecipient ?? "")
  const [error, setError] = useState<string | null>(null)
  const { supportedChains } = useSupportedChains()
  const { data: ensAddress } = useEnsAddress({
    name: recipientInput?.endsWith(".eth") ? recipientInput : undefined,
    chainId: mainnet.id,
    query: {
      enabled: !!recipientInput && recipientInput.endsWith(".eth"),
    },
  })

  useEffect(() => {
    if (ensAddress) {
      setRecipient(ensAddress)
    } else {
      setRecipient(recipientInput)
    }
  }, [ensAddress, recipientInput])

  useEffect(() => {
    if (onError) {
      onError(error)
    }
  }, [error, onError])

  const handleRecipientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRecipientInput(e.target.value.trim())
  }

  const [selectedDestinationChain, setSelectedDestinationChain] =
    useState<ChainInfo>(() => {
      const chain = supportedChains.find((chain) => chain.id === toChainId)
      if (chain) {
        return chain
      }
      return supportedChains[0]!
    })

  const { supportedTokens } = useSupportedTokens({
    chainId: selectedDestinationChain?.id,
  })

  const isCustomToken = useMemo(() => toToken?.startsWith("0x"), [toToken])

  const {
    tokenInfo: customTokenInfo,
    isLoading: isLoadingCustomToken,
    error: errorCustomToken,
  } = useTokenInfo({
    address: isCustomToken ? toToken! : "",
    chainId: toChainId,
  })

  const isValidCustomToken = useMemo(() => {
    if (!isCustomToken) {
      return true
    }

    return Boolean(
      isCustomToken &&
        !errorCustomToken &&
        !isLoadingCustomToken &&
        !!customTokenInfo,
    )
  }, [isCustomToken, errorCustomToken, isLoadingCustomToken, customTokenInfo])

  useEffect(() => {
    if (isCustomToken && customTokenInfo && !isLoadingCustomToken) {
      setSelectedDestToken(customTokenInfo as TokenInfo)
    }
  }, [customTokenInfo, isCustomToken, isLoadingCustomToken])

  useEffect(() => {
    if (isCustomToken && errorCustomToken && !isLoadingCustomToken) {
      console.error("[trails-sdk] errorCustomToken", errorCustomToken)
      setError(
        `Invalid custom toToken address. Error: ${errorCustomToken.message}`,
      )
    }
  }, [errorCustomToken, isCustomToken, isLoadingCustomToken])

  const defaultDestToken = useMemo(() => {
    if (selectedDestinationChain) {
      return supportedTokens.find(
        (token) => token.chainId === selectedDestinationChain.id,
      )
    }
    return supportedTokens?.[0] as TokenInfo
  }, [supportedTokens, selectedDestinationChain])

  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false)
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false)
  const [selectedDestToken, setSelectedDestToken] = useState<TokenInfo>(() => {
    let token = defaultDestToken
    if (toToken && !isCustomToken) {
      const isToTokenAddress = isAddress(toToken)
      token = supportedTokens.find(
        (token) =>
          (isToTokenAddress // Match by specified destination token address or symbol
            ? token.contractAddress === toToken
            : token.symbol === toToken) &&
          (toChainId // Match by specified destination chain id
            ? token.chainId === toChainId
            : selectedDestinationChain.id), // Select by selected destination chain id
      )
    }

    return token as TokenInfo
  })

  useEffect(() => {
    if (!selectedDestToken && defaultDestToken) {
      setSelectedDestToken(defaultDestToken as TokenInfo)
    }
  }, [selectedDestToken, defaultDestToken])

  const apiClient = useAPIClient({
    apiUrl,
    projectAccessKey: sequenceProjectAccessKey,
  })

  const destTokenAddress = useTokenAddress({
    chainId: selectedDestinationChain?.id,
    tokenSymbol: selectedDestToken?.symbol,
  })

  const { tokenPrices: destTokenPrices } = useTokenPrices(
    selectedDestToken && destTokenAddress
      ? [
          {
            tokenId: selectedDestToken.symbol,
            contractAddress: destTokenAddress,
            chainId: selectedDestinationChain.id,
          },
        ]
      : [],
    apiClient,
  )

  const { tokenPrices: sourceTokenPrices } = useTokenPrices(
    selectedToken
      ? [
          {
            tokenId: selectedToken.symbol,
            contractAddress: selectedToken.contractAddress,
            chainId: selectedToken.chainId,
          },
        ]
      : [],
    apiClient,
  )

  // Update selectedChain when toChainId prop changes
  useEffect(() => {
    if (toChainId) {
      const newChain = supportedChains.find((chain) => chain.id === toChainId)
      if (newChain) {
        setSelectedDestinationChain(newChain)
      }
    }
  }, [toChainId, supportedChains])

  // Update selectedDestToken when toToken prop changes
  useEffect(() => {
    if (toToken && !isCustomToken) {
      const isToTokenAddress = isAddress(toToken)
      const newToken = supportedTokens.find(
        (token) =>
          (isToTokenAddress // Match by specified destination token address or symbol
            ? token.contractAddress === toToken
            : token.symbol === toToken) &&
          (toChainId // Match by specified destination chain id
            ? token.chainId === toChainId
            : token.chainId === selectedDestinationChain.id),
      )
      if (newToken) {
        setSelectedDestToken(newToken as TokenInfo)
      }
    }
  }, [
    toToken,
    supportedTokens,
    toChainId,
    selectedDestinationChain.id,
    isCustomToken,
  ])

  // Update amount when toAmount prop changes (only for EXACT_OUTPUT)
  useEffect(() => {
    if (tradeType === TradeType.EXACT_OUTPUT) {
      setAmount(toAmount ?? "")
    }
  }, [toAmount, tradeType])

  const toAmountFormatted = useMemo(() => {
    return formatValue(toAmount || 0)
  }, [toAmount])

  // Update recipient when toRecipient prop changes
  useEffect(() => {
    setRecipientInput(toRecipient ?? "")
    setRecipient(toRecipient ?? "")
  }, [toRecipient])

  const chainInfo = getChainInfo(selectedToken.chainId)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isWaitingForWalletConfirm, setIsWaitingForWalletConfirm] =
    useState(false)
  const [isLoadingQuote, setIsLoadingQuote] = useState(false)
  const [prepareSendResult, setPrepareSendResult] = useState<any>(null)

  const balanceFormatted = formatBalance(
    selectedToken.balance,
    selectedToken.contractInfo?.decimals,
  )
  const balanceUsdFormatted = selectedToken.balanceUsdFormatted ?? ""
  const relayerConfig = useMemo(
    () => ({ env, useV3Relayers: DEFAULT_USE_V3_RELAYERS }),
    [env],
  )

  const isValidRecipient = Boolean(recipient && isAddress(recipient))

  // Calculate USD value based on trade type
  const amountUsdFormatted = useMemo(() => {
    const tokenPrice =
      tradeType === TradeType.EXACT_INPUT
        ? (sourceTokenPrices?.[0]?.price?.value ?? 0) // For fund form, use source token price
        : (destTokenPrices?.[0]?.price?.value ?? 0) // For payment form, use dest token price
    const amountUsd = Number(amount) * tokenPrice
    return formatUsdValue(amountUsd)
  }, [amount, destTokenPrices, sourceTokenPrices, tradeType])

  const [selectedFeeToken, setSelectedFeeToken] = useState<TokenInfo | null>(
    null,
  )

  const { hasParam } = useQueryParams()
  const isDryMode = hasParam("dryMode", "true")

  const destinationTokenAddressFromTokenSymbol = useTokenAddress({
    chainId: selectedDestinationChain?.id,
    tokenSymbol: selectedDestToken?.symbol,
  })

  const destinationTokenAddress = useMemo(() => {
    if (isCustomToken) {
      return toToken ?? null
    }
    return destinationTokenAddressFromTokenSymbol ?? null
  }, [isCustomToken, toToken, destinationTokenAddressFromTokenSymbol])

  // Get quote automatically when inputs change
  const getQuote = useCallback(async () => {
    // Only get quote if all required inputs are present
    if (
      !amount ||
      !destinationTokenAddress ||
      !isValidRecipient ||
      !selectedDestToken ||
      !selectedDestinationChain
    ) {
      setPrepareSendResult(null)
      return
    }

    try {
      setIsLoadingQuote(true)
      setError(null)

      // For EXACT_INPUT: use source token decimals (user enters source amount)
      // For EXACT_OUTPUT: use destination token decimals (user enters destination amount)
      const decimals =
        tradeType === TradeType.EXACT_INPUT
          ? selectedToken.contractInfo?.decimals
          : selectedDestToken?.decimals

      if (!decimals) {
        console.warn("[trails-sdk] Invalid token decimals for quote")
        setPrepareSendResult(null)
        setIsLoadingQuote(false)
        return
      }

      const parsedAmount = parseUnits(amount, decimals).toString()

      const originRelayer = getRelayer(relayerConfig, selectedToken.chainId)
      const destinationRelayer = getRelayer(
        relayerConfig,
        selectedDestinationChain.id,
      )

      const sourceTokenDecimals = selectedToken.contractInfo?.decimals
      const destinationTokenDecimals = selectedDestToken.decimals

      if (!sourceTokenDecimals || !destinationTokenDecimals) {
        console.warn("[trails-sdk] Missing token decimals for quote")
        setPrepareSendResult(null)
        setIsLoadingQuote(false)
        return
      }

      const sourceTokenPriceUsd = selectedToken.tokenPriceUsd ?? null
      const destinationTokenPriceUsd =
        destTokenPrices?.[0]?.price?.value ?? null

      const options = {
        account,
        originTokenAddress: selectedToken.contractAddress,
        originChainId: selectedToken.chainId,
        originTokenAmount: selectedToken.balance,
        destinationChainId: selectedDestinationChain.id,
        recipient,
        destinationTokenAddress,
        swapAmount: parsedAmount,
        tradeType,
        destinationTokenSymbol: selectedDestToken.symbol,
        sequenceProjectAccessKey,
        fee: "0",
        client: walletClient,
        apiClient,
        originRelayer,
        destinationRelayer,
        destinationCalldata: toCalldata,
        dryMode: isDryMode,
        onTransactionStateChange: (transactionStates: TransactionState[]) => {
          onTransactionStateChange(transactionStates)
        },
        sourceTokenPriceUsd,
        destinationTokenPriceUsd,
        sourceTokenDecimals,
        destinationTokenDecimals,
        paymasterUrl:
          paymasterUrls?.find(
            (p) => p.chainId.toString() === selectedToken.chainId.toString(),
          )?.url ?? undefined,
        gasless,
        relayerConfig,
      }

      const result = await prepareSend(options)
      setPrepareSendResult(result)
      setIsLoadingQuote(false)
    } catch (error) {
      console.error("[trails-sdk] Error getting quote:", error)
      setPrepareSendResult(null)
      setIsLoadingQuote(false)
    }
  }, [
    tradeType,
    relayerConfig,
    isDryMode,
    sequenceProjectAccessKey,
    account,
    walletClient,
    apiClient,
    selectedDestToken?.decimals,
    recipient,
    destinationTokenAddress,
    selectedDestToken,
    selectedDestinationChain,
    selectedToken,
    toCalldata,
    paymasterUrls,
    gasless,
    onTransactionStateChange,
    isValidRecipient,
    destTokenPrices?.[0]?.price?.value,
    amount,
  ])

  // Auto-fetch quotes when inputs change (debounced)
  useEffect(() => {
    // Only trigger if we have the essential inputs
    if (
      !amount ||
      !destinationTokenAddress ||
      !isValidRecipient ||
      !selectedDestToken ||
      !selectedDestinationChain
    ) {
      setPrepareSendResult(null)
      return
    }

    const timeoutId = setTimeout(() => {
      getQuote()
    }, 500) // Debounce by 500ms

    return () => clearTimeout(timeoutId)
  }, [
    amount,
    destinationTokenAddress,
    isValidRecipient,
    selectedDestToken?.symbol,
    selectedDestinationChain?.id,
    selectedDestToken,
    selectedDestinationChain,
    getQuote,
  ])

  // Calculate destination amount from quote if available
  const quotedDestinationAmount = useMemo(() => {
    if (prepareSendResult && tradeType === TradeType.EXACT_INPUT) {
      // For EXACT_INPUT, use the destination amount from the quote
      const decimals = selectedDestToken?.decimals ?? 18
      try {
        const destinationAmount = parseFloat(
          formatUnits(
            BigInt(prepareSendResult.destinationTokenAmount || "0"),
            decimals,
          ),
        )
        console.log("[trails-sdk] Quote destination amount:", {
          destinationTokenAmount: prepareSendResult.destinationTokenAmount,
          decimals,
          formatted: destinationAmount,
          finalFormatted: formatValue(destinationAmount),
        })
        return formatValue(destinationAmount)
      } catch (error) {
        console.warn("[trails-sdk] Error formatting destination amount:", error)
        return "0.00"
      }
    }
    return toAmountFormatted
  }, [
    prepareSendResult,
    tradeType,
    selectedDestToken?.decimals,
    toAmountFormatted,
  ])

  const processSend = useCallback(async () => {
    try {
      if (!prepareSendResult) {
        setError("No quote available. Please wait for quote to load.")
        return
      }

      setError(null)
      setIsSubmitting(true)

      // Get necessary variables for calculations
      const sourceTokenPriceUsd = selectedToken.tokenPriceUsd ?? null
      const destinationTokenPriceUsd =
        destTokenPrices?.[0]?.price?.value ?? null

      const decimals =
        tradeType === TradeType.EXACT_INPUT
          ? selectedToken.contractInfo?.decimals
          : selectedDestToken?.decimals
      const parsedAmount = parseUnits(amount, decimals!).toString()

      const {
        intentAddress,
        originSendAmount,
        fees,
        slippageTolerance,
        priceImpact,
        send,
      } = prepareSendResult

      console.log("[trails-sdk] Using prepared send result:", {
        intentAddress: intentAddress?.toString(),
        originSendAmount,
        fees,
        slippageTolerance,
        priceImpact,
      })

      function onOriginSend() {
        console.log("[trails-sdk] onOriginSend called")
        onConfirm()
        setIsWaitingForWalletConfirm(false)
        onSend(amount, recipient)
      }

      const originSendAmountFormatted = Number(
        formatUnits(
          BigInt(originSendAmount),
          selectedToken.contractInfo?.decimals ?? 18,
        ),
      )

      const originSendAmountUsdFormatted =
        originSendAmountFormatted * (sourceTokenPriceUsd ?? 0)

      const destinationTokenAmountFormatted = Number(
        formatUnits(BigInt(parsedAmount), selectedDestToken.decimals ?? 18),
      )

      const destinationTokenAmountUsdFormatted =
        destinationTokenAmountFormatted * (destinationTokenPriceUsd ?? 0)

      setIsWaitingForWalletConfirm(true)
      onWaitingForWalletConfirm({
        intentAddress: intentAddress?.toString() ?? "",
        amount: formatValue(originSendAmountFormatted),
        amountUsd: formatUsdValue(originSendAmountUsdFormatted),
        tokenSymbol: selectedToken.symbol,
        tokenName: selectedToken.name,
        chainId: selectedToken.chainId,
        imageUrl: selectedToken.imageUrl,
        fees,
        slippageTolerance,
        priceImpact,
        destinationTokenSymbol: selectedDestToken.symbol,
        destinationTokenAmount: formatValue(destinationTokenAmountFormatted),
        destinationTokenAmountUsd: formatUsdValue(
          destinationTokenAmountUsdFormatted,
        ),
        destinationChainId: selectedDestinationChain.id,
        destinationTokenImageUrl: selectedDestToken.imageUrl,
      })

      async function handleSend() {
        console.log("[trails-sdk] handleRetry called, about to call send()")
        // Wait for full send to complete
        const {
          originUserTxReceipt,
          originMetaTxnReceipt,
          destinationMetaTxnReceipt,
        } = await send(onOriginSend)
        console.log("[trails-sdk] send() completed, receipts:", {
          originUserTxReceipt,
          originMetaTxnReceipt,
          destinationMetaTxnReceipt,
        })

        // Move to receipt screen
        onComplete({
          originChainId: selectedToken.chainId,
          destinationChainId: selectedDestinationChain.id,
          originUserTxReceipt,
          originMetaTxnReceipt,
          destinationMetaTxnReceipt,
        })
      }

      async function walletConfirmRetryHandler() {
        console.log("[trails-sdk] walletConfirmRetryHandler called")
        try {
          console.log("[trails-sdk] About to call handleRetry")
          await handleSend()
          console.log("[trails-sdk] handleRetry completed successfully")
        } catch (error) {
          console.error(
            "[trails-sdk] Error in prepareSend walletConfirmRetryHandler:",
            error,
          )
          const errorMessage = getFullErrorMessage(error)
          setError(errorMessage)
          if (onError) {
            onError(errorMessage)
          }
        }
      }

      setWalletConfirmRetryHandler(
        () => walletConfirmRetryHandler as unknown as Promise<void>,
      )

      await handleSend()
    } catch (error) {
      console.error("[trails-sdk] Error in prepareSend:", error)
      const errorMessage = getFullErrorMessage(error)
      setError(errorMessage)
      if (onError) {
        onError(errorMessage)
      }
    }

    setIsSubmitting(false)
    setIsWaitingForWalletConfirm(false)
  }, [
    prepareSendResult,
    amount,
    selectedToken,
    selectedDestToken,
    destTokenPrices,
    tradeType,
    onSend,
    onConfirm,
    onComplete,
    setWalletConfirmRetryHandler,
    onWaitingForWalletConfirm,
    recipient,
    onError,
    selectedDestinationChain?.id,
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    processSend().catch((error) => {
      console.error("[trails-sdk] Error in processSend:", error)
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      )
    })
  }

  // Get button text based on recipient and calldata
  const buttonText = useMemo(() => {
    if (isWaitingForWalletConfirm) return "Waiting for wallet..."
    if (isSubmitting) return "Processing..."
    if (!amount) return "Enter amount"
    if (!isValidRecipient) return "Enter recipient"
    if (isLoadingQuote) return "Getting quote..."
    if (!prepareSendResult) return "No quote available"

    const amountFormatted = formatValue(amount)

    // For EXACT_INPUT (Fund mode), use source token since user enters source amount
    // For EXACT_OUTPUT (Payment mode), use dest token since user enters dest amount
    const tokenSymbol =
      tradeType === TradeType.EXACT_INPUT
        ? selectedToken.symbol
        : (selectedDestToken?.symbol ?? "Token")

    try {
      const checksummedRecipient = getAddress(recipient)
      const checksummedAccount = getAddress(account.address)

      if (checksummedRecipient === checksummedAccount) {
        if (tradeType === TradeType.EXACT_INPUT) {
          return `Fund with ${amountFormatted} ${tokenSymbol}`
        }
        return `Receive ${amountFormatted} ${tokenSymbol}`
      }
      if (toCalldata) {
        if (useSourceTokenForButtonText) {
          const destPrice = destTokenPrices?.[0]?.price?.value ?? 0
          const sourcePrice = selectedToken.tokenPriceUsd ?? 0
          if (destPrice > 0 && sourcePrice > 0) {
            const destAmountUsd = Number(amount) * destPrice
            const sourceAmount = destAmountUsd / sourcePrice
            const formattedSourceAmount = formatValue(sourceAmount)
            return `Spend ~${formattedSourceAmount} ${selectedToken.symbol}`
          }
        }
        return `Spend ${amountFormatted} ${tokenSymbol}`
      }
      if (tradeType === TradeType.EXACT_INPUT) {
        return `Fund with ${amountFormatted} ${tokenSymbol}`
      }
      return `Pay ${amountFormatted} ${tokenSymbol}`
    } catch {
      return `Send ${amountFormatted} ${tokenSymbol}`
    }
  }, [
    amount,
    isValidRecipient,
    recipient,
    account.address,
    selectedDestToken?.symbol,
    toCalldata,
    isWaitingForWalletConfirm,
    isSubmitting,
    isLoadingQuote,
    prepareSendResult,
    useSourceTokenForButtonText,
    destTokenPrices,
    selectedToken,
    tradeType,
  ])

  return {
    amount,
    amountUsdFormatted,
    balanceUsdFormatted,
    chainInfo,
    toChainId,
    error,
    balanceFormatted,
    handleRecipientInputChange,
    handleSubmit,
    isChainDropdownOpen,
    isSubmitting,
    isLoadingQuote,
    isTokenDropdownOpen,
    recipient,
    recipientInput,
    selectedDestinationChain,
    selectedDestToken,
    setAmount,
    setRecipient,
    setRecipientInput,
    setSelectedDestinationChain,
    setSelectedDestToken,
    setSelectedFeeToken,
    FEE_TOKENS,
    supportedTokens,
    supportedChains,
    ensAddress: ensAddress ?? null,
    isWaitingForWalletConfirm,
    buttonText,
    isValidRecipient,
    useSourceTokenForButtonText,
    destTokenPrices: destTokenPrices ?? null,
    sourceTokenPrices: sourceTokenPrices ?? null,
    selectedToken,
    selectedFeeToken,
    setIsChainDropdownOpen,
    setIsTokenDropdownOpen,
    toAmountFormatted: quotedDestinationAmount,
    destinationTokenAddress,
    isValidCustomToken,
  }
}
