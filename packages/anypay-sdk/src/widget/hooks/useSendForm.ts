import type { TokenPrice } from "@0xsequence/anypay-api"
import type { MetaTxnReceipt } from "@0xsequence/anypay-relayer"
import type React from "react"
import { useEffect, useMemo, useState } from "react"
import {
  type Account,
  formatUnits,
  getAddress,
  isAddress,
  parseUnits,
  type TransactionReceipt,
  type WalletClient,
  zeroAddress,
} from "viem"
import * as chains from "viem/chains"
import { mainnet } from "viem/chains"
import { useEnsAddress } from "wagmi"
import { useAPIClient } from "../../apiClient.js"
import { getChainInfo } from "../../chains.js"
import { prepareSend, type TransactionState } from "../../prepareSend.js"
import { useTokenPrices } from "../../prices.js"
import { useQueryParams } from "../../queryParams.js"
import { getRelayer, type RelayerEnv } from "../../relayer.js"
import type { Theme } from "../../theme.js"
import { formatBalance } from "../../tokenBalances.js"

// Available chains
export const SUPPORTED_TO_CHAINS: ChainInfo[] = [
  { id: chains.mainnet.id, name: "Ethereum" },
  { id: chains.base.id, name: "Base" },
  { id: chains.optimism.id, name: "Optimism" },
  { id: chains.arbitrum.id, name: "Arbitrum" },
  { id: chains.polygon.id, name: "Polygon" },
]

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

type TokenInfo = {
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

// Available tokens
// TODO: make this dynamic
export const SUPPORTED_TO_TOKENS = [
  {
    symbol: "ETH",
    name: "Ethereum",
    imageUrl: `https://assets.sequence.info/images/tokens/small/1/0x0000000000000000000000000000000000000000.webp`,
    decimals: 18,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    imageUrl: `https://assets.sequence.info/images/tokens/small/1/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.webp`,
    decimals: 6,
  },
  {
    symbol: "USDT",
    name: "Tether",
    imageUrl: `https://assets.sequence.info/images/tokens/small/1/0xdac17f958d2ee523a2206206994597c13d831ec7.webp`,
    decimals: 6,
  },
  {
    symbol: "BAT",
    name: "Basic Attention Token",
    imageUrl: `https://assets.sequence.info/images/tokens/small/1/0x0d8775f648430679a709e98d2b0cb6250d2887ef.webp`,
    decimals: 18,
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    imageUrl: `https://assets.sequence.info/images/tokens/small/42161/0x912ce59144191c1204e64559fe8253a0e49e6548.webp`,
    decimals: 18,
  },
]

// Add FEE_TOKENS constant after SUPPORTED_TOKENS
const FEE_TOKENS: TokenInfo[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    imageUrl: `https://assets.sequence.info/images/tokens/small/1/0x0000000000000000000000000000000000000000.webp`,
    decimals: 18,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    imageUrl: `https://assets.sequence.info/images/tokens/small/1/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.webp`,
    decimals: 6,
  },
]

function getDestTokenAddress(chainId: number, tokenSymbol: string) {
  if (tokenSymbol === "ETH") {
    return zeroAddress
  }

  if (chainId === 1) {
    if (tokenSymbol === "USDC") {
      return "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    }
    if (tokenSymbol === "USDT") {
      return "0xdac17f958d2ee523a2206206994597c13d831ec7"
    }
    if (tokenSymbol === "BAT") {
      return "0x0d8775f648430679a709e98d2b0cb6250d2887ef"
    }
    if (tokenSymbol === "ARB") {
      return "0xb50721bcf8d664c30412cfbc6cf7a15145234ad1"
    }
  }

  if (chainId === 10) {
    if (tokenSymbol === "USDC") {
      return "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85"
    }
    if (tokenSymbol === "USDT") {
      return "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58"
    }
  }

  if (chainId === 42161) {
    if (tokenSymbol === "USDC") {
      return "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
    }
    if (tokenSymbol === "USDT") {
      return "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
    }
    if (tokenSymbol === "ARB") {
      return "0x912ce59144191c1204e64559fe8253a0e49e6548"
    }
  }

  if (chainId === 8453) {
    if (tokenSymbol === "USDC") {
      return "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
    }
    if (tokenSymbol === "USDT") {
      return "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2"
    }
  }

  if (chainId === 137) {
    if (tokenSymbol === "USDC") {
      return "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"
    }
    if (tokenSymbol === "USDT") {
      return "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
    }
    if (tokenSymbol === "BAT") {
      return "0x3cef98bb43d732e2f285ee605a8158cde967d219"
    }
  }

  throw new Error(
    `Unsupported token symbol: ${tokenSymbol} for chainId: ${chainId}`,
  )
}

export type OnCompleteProps = {
  originChainId: number
  destinationChainId: number
  originUserTxReceipt: TransactionReceipt | null
  originMetaTxnReceipt: MetaTxnReceipt | null
  destinationMetaTxnReceipt: MetaTxnReceipt | null
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
  onError: (error: Error) => void
  onWaitingForWalletConfirm: (intentAddress: string, amount: string) => void
  paymasterUrls?: PaymasterUrl[]
  gasless?: boolean
  onSend: (amount: string, recipient: string) => void
  onConfirm: () => void
  onComplete: (result: OnCompleteProps) => void
  selectedToken: Token
  setWalletConfirmRetryHandler: (handler: () => Promise<void>) => void
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
  isTokenDropdownOpen: boolean
  recipient: string
  recipientInput: string
  selectedChain: ChainInfo | null
  selectedDestToken: TokenInfo
  setAmount: (amount: string) => void
  setRecipient: (recipient: string) => void
  setRecipientInput: (recipientInput: string) => void
  setSelectedChain: (chain: ChainInfo) => void
  setSelectedDestToken: (token: TokenInfo) => void
  setSelectedFeeToken: (token: TokenInfo) => void
  FEE_TOKENS: TokenInfo[]
  SUPPORTED_TO_TOKENS: TokenInfo[]
  SUPPORTED_TO_CHAINS: ChainInfo[]
  ensAddress: string | null
  isWaitingForWalletConfirm: boolean
  buttonText: string
  isValidRecipient: boolean
  useSourceTokenForButtonText: boolean
  destTokenPrices: TokenPrice[] | null
  selectedToken: Token
  selectedFeeToken: TokenInfo | null
  setIsChainDropdownOpen: (isOpen: boolean) => void
  setIsTokenDropdownOpen: (isOpen: boolean) => void
}

export function useSendForm({
  account,
  sequenceProjectAccessKey,
  apiUrl,
  env,
  toAmount,
  toRecipient,
  toChainId,
  toToken,
  toCalldata,
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
}: UseSendProps): UseSendReturn {
  const [amount, setAmount] = useState(toAmount ?? "")
  const [recipientInput, setRecipientInput] = useState(toRecipient ?? "")
  const [recipient, setRecipient] = useState(toRecipient ?? "")
  const [error, setError] = useState<string | null>(null)
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

  const handleRecipientInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRecipientInput(e.target.value.trim())
  }

  const [selectedChain, setSelectedChain] = useState<ChainInfo>(
    () =>
      SUPPORTED_TO_CHAINS.find(
        (chain) => chain.id === (toChainId ?? selectedToken.chainId),
      ) || SUPPORTED_TO_CHAINS[0]!,
  )
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false)
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false)
  const [selectedDestToken, setSelectedDestToken] = useState(() =>
    toToken
      ? SUPPORTED_TO_TOKENS.find((token) => token.symbol === toToken) ||
        SUPPORTED_TO_TOKENS[0]!
      : SUPPORTED_TO_TOKENS[0]!,
  )

  const apiClient = useAPIClient({
    apiUrl,
    projectAccessKey: sequenceProjectAccessKey,
  })

  const { data: destTokenPrices } = useTokenPrices(
    selectedDestToken
      ? (() => {
          try {
            const contractAddress = getDestTokenAddress(
              selectedChain.id,
              selectedDestToken.symbol,
            )
            return [
              {
                tokenId: selectedDestToken.symbol,
                contractAddress,
                chainId: selectedChain.id,
              },
            ]
          } catch (_error) {
            return []
          }
        })()
      : [],
    apiClient,
  )

  // Update selectedChain when toChainId prop changes
  useEffect(() => {
    if (toChainId) {
      const newChain = SUPPORTED_TO_CHAINS.find(
        (chain) => chain.id === toChainId,
      )
      if (newChain) {
        setSelectedChain(newChain)
      }
    }
  }, [toChainId])

  // Update selectedDestToken when toToken prop changes
  useEffect(() => {
    if (toToken) {
      const newToken = SUPPORTED_TO_TOKENS.find(
        (token) => token.symbol === toToken,
      )
      if (newToken) {
        setSelectedDestToken(newToken)
      }
    }
  }, [toToken])

  // Update amount when toAmount prop changes
  useEffect(() => {
    setAmount(toAmount ?? "")
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

  const balanceFormatted = formatBalance(
    selectedToken.balance,
    selectedToken.contractInfo?.decimals,
  )
  const balanceUsdFormatted = selectedToken.balanceUsdFormatted ?? ""
  const relayerConfig = { env, useV3Relayers: true }

  const isValidRecipient = Boolean(recipient && isAddress(recipient))

  // Calculate USD value
  const amountUsdFormatted = useMemo(() => {
    const amountUsd =
      parseFloat(amount) * (destTokenPrices?.[0]?.price?.value ?? 0)
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amountUsd)
  }, [amount, destTokenPrices])

  const [selectedFeeToken, setSelectedFeeToken] = useState<TokenInfo | null>(
    null,
  )

  const { hasParam } = useQueryParams()
  const isDryMode = hasParam("dryMode", "true")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      setIsSubmitting(true)
      const decimals = selectedDestToken?.decimals
      const parsedAmount = parseUnits(amount, decimals).toString()

      let destinationTokenAddress: string
      try {
        destinationTokenAddress =
          selectedDestToken.symbol === "ETH"
            ? zeroAddress
            : getDestTokenAddress(selectedChain.id, selectedDestToken.symbol)
      } catch (_error) {
        setError(
          `${selectedDestToken.symbol} is not available on ${selectedChain.name}`,
        )
        setIsSubmitting(false)
        return
      }

      const originRelayer = getRelayer(relayerConfig, selectedToken.chainId)
      const destinationRelayer = getRelayer(relayerConfig, selectedChain.id)

      const sourceTokenDecimals =
        typeof selectedToken.contractInfo?.decimals === "number"
          ? selectedToken.contractInfo.decimals
          : null
      const destinationTokenDecimals =
        typeof selectedDestToken.decimals === "number"
          ? selectedDestToken.decimals
          : null

      if (sourceTokenDecimals === null || destinationTokenDecimals === null) {
        setError("Invalid token decimals")
        setIsSubmitting(false)
        return
      }

      const options = {
        account,
        originTokenAddress: selectedToken.contractAddress,
        originChainId: selectedToken.chainId,
        originTokenAmount: selectedToken.balance,
        destinationChainId: selectedChain.id,
        recipient,
        destinationTokenAddress,
        destinationTokenAmount: parsedAmount,
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
        sourceTokenPriceUsd: selectedToken.tokenPriceUsd ?? null,
        destinationTokenPriceUsd: destTokenPrices?.[0]?.price?.value ?? null,
        sourceTokenDecimals,
        destinationTokenDecimals,
        paymasterUrl:
          paymasterUrls?.find(
            (p) => p.chainId.toString() === selectedToken.chainId.toString(),
          )?.url ?? undefined,
        gasless,
        relayerConfig,
      }

      console.log("options", options)

      const { intentAddress, originSendAmount, send } =
        await prepareSend(options)
      console.log("Intent address:", intentAddress?.toString())

      function onOriginSend() {
        onConfirm()
        setIsWaitingForWalletConfirm(false)
        onSend(amount, recipient)
      }

      setIsWaitingForWalletConfirm(true)
      onWaitingForWalletConfirm(
        intentAddress?.toString() ?? "",
        formatUnits(
          BigInt(originSendAmount),
          selectedToken.contractInfo?.decimals ?? 18,
        ),
      )

      async function handleSend() {
        console.log("handleRetry called, about to call send()")
        // Wait for full send to complete
        const {
          originUserTxReceipt,
          originMetaTxnReceipt,
          destinationMetaTxnReceipt,
        } = await send(onOriginSend)
        console.log("send() completed, receipts:", {
          originUserTxReceipt,
          originMetaTxnReceipt,
          destinationMetaTxnReceipt,
        })

        // Move to receipt screen
        onComplete({
          originChainId: selectedToken.chainId,
          destinationChainId: selectedChain.id,
          originUserTxReceipt,
          originMetaTxnReceipt,
          destinationMetaTxnReceipt,
        })
      }

      async function walletConfirmRetryHandler() {
        console.log("walletConfirmRetryHandler called")
        try {
          console.log("About to call handleRetry")
          await handleSend()
          console.log("handleRetry completed successfully")
        } catch (error) {
          console.error("Error in prepareSend:", error)
          setError(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
          )
          onError(error as Error)
        }
      }

      setWalletConfirmRetryHandler(
        () => walletConfirmRetryHandler as unknown as Promise<void>,
      )

      await handleSend()
    } catch (error) {
      console.error("Error in prepareSend:", error)
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      )
      onError(error as Error)
    }

    setIsSubmitting(false)
    setIsWaitingForWalletConfirm(false)
  }

  // Get button text based on recipient and calldata
  const buttonText = useMemo(() => {
    if (isWaitingForWalletConfirm) return "Waiting for wallet..."
    if (isSubmitting) return "Processing..."
    if (!amount) return "Enter amount"
    if (!isValidRecipient) return "Enter recipient"

    try {
      const checksummedRecipient = getAddress(recipient)
      const checksummedAccount = getAddress(account.address)

      if (checksummedRecipient === checksummedAccount) {
        return `Receive ${amount} ${selectedDestToken.symbol}`
      }
      if (toCalldata) {
        if (useSourceTokenForButtonText) {
          const destPrice = destTokenPrices?.[0]?.price?.value ?? 0
          const sourcePrice = selectedToken.tokenPriceUsd ?? 0
          if (destPrice > 0 && sourcePrice > 0) {
            const destAmountUsd = parseFloat(amount) * destPrice
            const sourceAmount = destAmountUsd / sourcePrice
            const formattedSourceAmount = sourceAmount.toLocaleString(
              undefined,
              {
                maximumFractionDigits: 5,
                minimumFractionDigits: 2,
              },
            )
            return `Spend ~${formattedSourceAmount} ${selectedToken.symbol}`
          }
        }
        return `Spend ${amount} ${selectedDestToken.symbol}`
      }
      return `Pay ${amount} ${selectedDestToken.symbol}`
    } catch {
      return `Send ${amount} ${selectedDestToken.symbol}`
    }
  }, [
    amount,
    isValidRecipient,
    recipient,
    account.address,
    selectedDestToken.symbol,
    toCalldata,
    isWaitingForWalletConfirm,
    isSubmitting,
    useSourceTokenForButtonText,
    destTokenPrices,
    selectedToken,
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
    isTokenDropdownOpen,
    recipient,
    recipientInput,
    selectedChain,
    selectedDestToken,
    setAmount,
    setRecipient,
    setRecipientInput,
    setSelectedChain,
    setSelectedDestToken,
    setSelectedFeeToken,
    FEE_TOKENS,
    SUPPORTED_TO_TOKENS,
    SUPPORTED_TO_CHAINS,
    ensAddress: ensAddress ?? null,
    isWaitingForWalletConfirm,
    buttonText,
    isValidRecipient,
    useSourceTokenForButtonText,
    destTokenPrices: destTokenPrices ?? null,
    selectedToken,
    selectedFeeToken,
    setIsChainDropdownOpen,
    setIsTokenDropdownOpen,
  }
}
