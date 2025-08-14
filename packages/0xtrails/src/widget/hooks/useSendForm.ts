import type { TokenPrice } from "@0xsequence/trails-api"
import type React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  type Account,
  getAddress,
  isAddress,
  parseUnits,
  type WalletClient,
  zeroAddress,
} from "viem"
import { mainnet } from "viem/chains"
import { useEnsAddress } from "wagmi"
import { useAPIClient } from "../../apiClient.js"
import { getChainInfo, useSupportedChains } from "../../chains.js"
import { getFullErrorMessage } from "../../error.js"
import {
  prepareSend,
  TradeType,
  type PrepareSendReturn,
  type PrepareSendQuote,
} from "../../prepareSend.js"
import type { TransactionState } from "../../transactions.js"
import { getTokenPrice, useTokenPrices, normalizeNumber } from "../../prices.js"
import { useQueryParams } from "../../queryParams.js"
import { getRelayer } from "../../relayer.js"
import {
  formatRawAmount,
  formatUsdAmountDisplay,
  formatAmount,
  formatAmountDisplay,
} from "../../tokenBalances.js"
import type { SupportedToken } from "../../tokens.js"
import {
  useSupportedTokens,
  useTokenAddress,
  useTokenInfo,
} from "../../tokens.js"

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
  transactionStates: TransactionState[]
}

export type UseSendProps = {
  account: Account
  toAmount?: string
  toRecipient?: string
  toChainId?: number
  toToken?: string
  toCalldata?: string
  walletClient: WalletClient
  onTransactionStateChange: (transactionStates: TransactionState[]) => void
  onError: (error: Error | string | null) => void
  onWaitingForWalletConfirm: (quote: PrepareSendQuote) => void
  paymasterUrls?: PaymasterUrl[]
  gasless?: boolean
  onSend: (amount: string, recipient: string) => void
  onConfirm: () => void
  onComplete: (result: OnCompleteProps) => void
  selectedToken: Token
  setWalletConfirmRetryHandler: (handler: () => Promise<void>) => void
  tradeType?: TradeType
  quoteProvider?: string
  fundMethod?: string | null
  mode?: "pay" | "fund" | "earn"
  onNavigateToMeshConnect?: (
    props: {
      toTokenSymbol: string
      toTokenAmount: string
      toChainId: number
      toRecipientAddress: string
    },
    quote?: PrepareSendQuote | null,
  ) => void
}

export type UseSendReturn = {
  amount: string
  amountRaw: string
  amountUsdDisplay: string
  balanceUsdDisplay: string
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
  destTokenPrices: TokenPrice[] | null
  sourceTokenPrices: TokenPrice[] | null
  selectedToken: Token
  selectedFeeToken: TokenInfo | null
  setIsChainDropdownOpen: (isOpen: boolean) => void
  setIsTokenDropdownOpen: (isOpen: boolean) => void
  toAmountFormatted: string
  destinationTokenAddress: string | null
  isValidCustomToken: boolean
  prepareSendQuote: PrepareSendQuote | null
  toAmountDisplay: string
}

export function useSendForm({
  account,
  toAmount, // Custom specified amount
  toRecipient, // Custom specified recipient
  toChainId, // Custom specified destination chain id
  toToken, // Custom specified destination token address or symbol
  toCalldata, // Custom specified destination calldata
  walletClient,
  onTransactionStateChange,
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
  quoteProvider,
  fundMethod,
  mode,
  onNavigateToMeshConnect,
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

  console.log("GENERATED CALLLDATA", toCalldata)

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

  const apiClient = useAPIClient()

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
    return formatAmount(toAmount || 0)
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
  const [prepareSendResult, setPrepareSendResult] =
    useState<PrepareSendReturn | null>(null)
  // Create a stable callback for transaction state changes
  const handleTransactionStateChange = useCallback(
    (transactionStates: TransactionState[]) => {
      // Pass transaction states to widget-level handler
      onTransactionStateChange(transactionStates)
    },
    [onTransactionStateChange],
  )

  const balanceFormatted = formatRawAmount(
    selectedToken.balance,
    selectedToken.contractInfo?.decimals,
  )
  const balanceUsdDisplay = selectedToken.balanceUsdFormatted ?? ""
  const isValidRecipient = Boolean(recipient && isAddress(recipient))

  // Calculate USD value based on trade type
  const amountUsdDisplay = useMemo(() => {
    const tokenPrice =
      tradeType === TradeType.EXACT_INPUT
        ? (sourceTokenPrices?.[0]?.price?.value ?? 0) // For fund form, use source token price
        : (destTokenPrices?.[0]?.price?.value ?? 0) // For payment form, use dest token price
    const amountUsd = Number(amount) * tokenPrice
    return formatUsdAmountDisplay(amountUsd)
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

  // Calculate raw amount (in wei/smallest unit)
  const amountRaw = useMemo(() => {
    if (!amount) {
      return "0"
    }

    // For EXACT_INPUT: use source token decimals (user enters source amount)
    // For EXACT_OUTPUT: use destination token decimals (user enters destination amount)
    const decimals =
      tradeType === TradeType.EXACT_INPUT
        ? selectedToken.contractInfo?.decimals
        : selectedDestToken?.decimals

    if (!decimals) {
      return "0"
    }

    try {
      return parseUnits(amount, decimals).toString()
    } catch {
      return "0"
    }
  }, [
    amount,
    selectedDestToken?.decimals,
    selectedToken.contractInfo?.decimals,
    tradeType,
  ])

  // Get quote automatically when inputs change
  const getQuote = useCallback(async () => {
    // Only get quote if all required inputs are present
    if (
      !amount ||
      !destinationTokenAddress ||
      !isValidRecipient ||
      !selectedDestToken ||
      !selectedDestinationChain ||
      amount === "0" ||
      !amountRaw ||
      amountRaw === "0"
    ) {
      setPrepareSendResult(null)
      return
    }

    try {
      setIsLoadingQuote(true)
      setError(null)

      const originRelayer = getRelayer(undefined, selectedToken.chainId)
      const destinationRelayer = getRelayer(
        undefined,
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

      let sourceTokenPriceUsd = selectedToken.tokenPriceUsd ?? null
      let destinationTokenPriceUsd = destTokenPrices?.[0]?.price?.value ?? null

      if (!sourceTokenPriceUsd) {
        try {
          const price = await getTokenPrice(apiClient, selectedToken)
          sourceTokenPriceUsd = price?.price?.value ?? null
        } catch (error) {
          console.error("[trails-sdk] Error getting source token price:", error)
        }
      }

      if (!destinationTokenPriceUsd) {
        try {
          const price = await getTokenPrice(apiClient, {
            tokenId: selectedDestToken.symbol,
            contractAddress: destinationTokenAddress ?? "",
            chainId: selectedDestinationChain.id,
          })
          destinationTokenPriceUsd = price?.price?.value ?? null
        } catch (error) {
          console.error(
            "[trails-sdk] Error getting destination token price:",
            error,
          )
        }
      }

      if (
        !destinationTokenPriceUsd &&
        selectedToken.symbol === selectedDestToken.symbol
      ) {
        destinationTokenPriceUsd = sourceTokenPriceUsd
      }
      if (
        !sourceTokenPriceUsd &&
        selectedToken.symbol === selectedDestToken.symbol
      ) {
        sourceTokenPriceUsd = destinationTokenPriceUsd
      }

      if (!sourceTokenPriceUsd || !destinationTokenPriceUsd) {
        console.warn("[trails-sdk] Missing token prices for quote", {
          sourceTokenPriceUsd,
          destinationTokenPriceUsd,
        })
      }

      let nativeTokenPriceUsd = 0
      if (
        selectedToken.contractAddress === zeroAddress &&
        sourceTokenPriceUsd
      ) {
        nativeTokenPriceUsd = sourceTokenPriceUsd
      } else {
        const originChain = getChainInfo(selectedToken.chainId)
        const nativeTokenSymbol = originChain?.nativeCurrency?.symbol ?? ""
        const nativePrice = await getTokenPrice(apiClient, {
          tokenId: nativeTokenSymbol,
          contractAddress: zeroAddress,
          chainId: selectedToken.chainId,
        })
        nativeTokenPriceUsd = nativePrice?.price?.value ?? 0
      }

      const options = {
        account,
        originTokenAddress: selectedToken.contractAddress,
        originChainId: selectedToken.chainId,
        originTokenBalance:
          fundMethod === "qr-code" || fundMethod === "exchange"
            ? "1"
            : selectedToken.balance,
        destinationChainId: selectedDestinationChain.id,
        recipient,
        destinationTokenAddress,
        swapAmount: amountRaw,
        tradeType,
        destinationTokenSymbol: selectedDestToken.symbol,
        fee: "0",
        client: walletClient,
        apiClient,
        originRelayer,
        destinationRelayer,
        destinationCalldata: toCalldata,
        dryMode: isDryMode,
        onTransactionStateChange: handleTransactionStateChange,
        sourceTokenPriceUsd,
        destinationTokenPriceUsd,
        sourceTokenDecimals,
        destinationTokenDecimals,
        paymasterUrl:
          paymasterUrls?.find(
            (p) => p.chainId.toString() === selectedToken.chainId.toString(),
          )?.url ?? undefined,
        gasless,
        originNativeTokenPriceUsd: nativeTokenPriceUsd,
        quoteProvider,
        fundMethod,
      }

      const result = await prepareSend(options)

      console.log("[trails-sdk] prepareSend quote:", result.quote)

      setPrepareSendResult(result)
      setIsLoadingQuote(false)
    } catch (error) {
      console.error("[trails-sdk] Error getting quote:", error)
      setPrepareSendResult(null)
      setIsLoadingQuote(false)
    }
  }, [
    tradeType,
    isDryMode,
    account,
    walletClient,
    apiClient,
    selectedDestToken?.decimals,
    recipient,
    destinationTokenAddress,
    selectedDestToken?.symbol,
    selectedDestinationChain?.id,
    selectedToken?.contractAddress,
    selectedToken?.chainId,
    selectedToken?.balance,
    selectedToken?.tokenPriceUsd,
    toCalldata,
    paymasterUrls,
    gasless,
    handleTransactionStateChange,
    isValidRecipient,
    destTokenPrices?.[0]?.price?.value,
    amount,
    selectedDestToken,
    selectedDestinationChain,
    selectedToken,
    quoteProvider,
    fundMethod,
    amountRaw,
  ])

  // Auto-fetch quotes when inputs change (debounced)
  // biome-ignore lint/correctness/useExhaustiveDependencies: getQuote is intentionally excluded to prevent infinite loop
  useEffect(() => {
    // Only trigger if we have the essential inputs
    if (
      !amount ||
      !destinationTokenAddress ||
      !isValidRecipient ||
      !selectedDestToken?.symbol ||
      !selectedDestinationChain?.id
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
    toCalldata,
  ])

  // Calculate destination amount from quote if available
  const quotedDestinationAmount = useMemo(() => {
    if (prepareSendResult) {
      return prepareSendResult.quote.destinationAmountFormatted
    }

    return toAmountFormatted
  }, [prepareSendResult, toAmountFormatted])

  const quotedDestinationAmountDisplay = useMemo(() => {
    return formatAmountDisplay(quotedDestinationAmount || "0")
  }, [quotedDestinationAmount])

  const processSend = useCallback(async () => {
    try {
      if (!prepareSendResult) {
        setError("No quote available. Please wait for quote to load.")
        return
      }

      setError(null)
      setIsSubmitting(true)

      const { quote, send } = prepareSendResult

      console.log("[trails-sdk] Using prepared send result quote:", quote)

      // Handle exchange fund method - navigate to mesh-connect
      if (fundMethod === "exchange" && onNavigateToMeshConnect) {
        const originChainId = quote?.originChain?.id
        const destinationChainId = quote?.destinationChain?.id

        const toTokenSymbol = quote?.originToken?.symbol // MeshConnect will deposit origin token
        const toTokenAmount = normalizeNumber(
          quote.originAmountFormatted,
        ).toString() // MeshConnect will deposit origin token amount
        const toChainId = quote?.originChain?.id // MeshConnect will deposit to origin chain
        const toRecipientAddress = quote.originAddress // MeshConnect will deposit to origin address

        console.log("[trails-sdk] Navigating to mesh-connect with props:", {
          toTokenSymbol,
          toTokenAmount,
          toChainId,
          toRecipientAddress,
        })

        if (originChainId === destinationChainId) {
          throw new Error(
            "[trails-sdk] Must be different chain than the origin chain to use mesh-connect",
          )
        }

        if (
          !toTokenSymbol ||
          !toTokenAmount ||
          !toChainId ||
          !toRecipientAddress
        ) {
          throw new Error(
            "[trails-sdk] Missing required props for mesh-connect",
          )
        }

        onNavigateToMeshConnect(
          {
            toTokenSymbol,
            toTokenAmount,
            toChainId,
            toRecipientAddress,
          },
          prepareSendResult.quote,
        )

        await handleSend()
        return
      }

      function onOriginSend() {
        console.log("[trails-sdk] onOriginSend called")
        onConfirm()
        setIsWaitingForWalletConfirm(false)
        onSend(amount, recipient)
      }

      setIsWaitingForWalletConfirm(true)
      onWaitingForWalletConfirm(prepareSendResult.quote)

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
          transactionStates: quote.transactionStates,
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
    onSend,
    onConfirm,
    onComplete,
    setWalletConfirmRetryHandler,
    onWaitingForWalletConfirm,
    recipient,
    onError,
    fundMethod,
    onNavigateToMeshConnect,
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

    const amountFormatted =
      prepareSendResult?.quote?.originAmountFormatted ?? formatAmount(amount)
    const destinationAmountFormatted =
      prepareSendResult?.quote?.destinationAmountFormatted ??
      formatAmount(amount)
    const tokenSymbol = selectedToken.symbol
    const destinationTokenSymbol = selectedDestToken?.symbol

    const amountDisplay = formatAmountDisplay(amountFormatted)
    const destinationAmountDisplay = formatAmountDisplay(
      destinationAmountFormatted,
    )

    try {
      const isSameChain = selectedToken.chainId === selectedDestinationChain.id
      const isSameToken = selectedToken.symbol === selectedDestToken.symbol
      const checksummedRecipient = getAddress(recipient)
      const checksummedAccount = getAddress(account.address)

      if (fundMethod === "exchange") {
        return `Continue to Exchange`
      }

      if (fundMethod === "qr-code") {
        return `Continue to QR Code`
      }

      if (mode === "earn") {
        return `Deposit ${destinationAmountDisplay} ${destinationTokenSymbol}`
      }

      if (tradeType === TradeType.EXACT_INPUT) {
        return `Fund with ${amountDisplay} ${tokenSymbol}`
      }

      if (isSameChain && isSameToken) {
        return `Execute`
      }

      if (isSameChain && !isSameToken) {
        return `Swap ${amountDisplay} ${tokenSymbol}`
      }

      if (checksummedRecipient === checksummedAccount) {
        return `Receive ${destinationAmountDisplay} ${destinationTokenSymbol}`
      }

      return `Pay with ${amountDisplay} ${tokenSymbol}`
    } catch {
      return `Pay with ${amountDisplay} ${tokenSymbol}`
    }
  }, [
    amount,
    isValidRecipient,
    recipient,
    account.address,
    selectedDestToken?.symbol,
    isWaitingForWalletConfirm,
    isSubmitting,
    isLoadingQuote,
    prepareSendResult,
    selectedToken,
    tradeType,
    prepareSendResult?.quote?.originAmountFormatted,
    selectedDestinationChain.id,
    mode,
    fundMethod,
  ])

  return {
    amount,
    amountRaw,
    amountUsdDisplay,
    balanceUsdDisplay,
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
    destTokenPrices: destTokenPrices ?? null,
    sourceTokenPrices: sourceTokenPrices ?? null,
    selectedToken,
    selectedFeeToken,
    setIsChainDropdownOpen,
    setIsTokenDropdownOpen,
    toAmountFormatted: quotedDestinationAmount,
    toAmountDisplay: quotedDestinationAmountDisplay,
    destinationTokenAddress,
    isValidCustomToken,
    prepareSendQuote: prepareSendResult?.quote ?? null,
  }
}
