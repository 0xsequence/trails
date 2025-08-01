import type { SequenceIndexerGateway } from "@0xsequence/indexer"
import { ResourceStatus } from "@0xsequence/indexer"
import { Address } from "ox"
import { useEffect, useMemo, useState } from "react"
import { isAddressEqual, zeroAddress } from "viem"
import { useAccount } from "wagmi"
import { getChainInfo, useSupportedChains } from "../../chains.js"
import type {
  TokenBalanceExtended,
  TokenBalanceWithPrice,
} from "../../tokenBalances.js"
import {
  formatRawAmount,
  useAccountTotalBalanceUsd,
  useHasSufficientBalanceUsd,
  useTokenBalances,
} from "../../tokenBalances.js"
import { getFormatttedTokenName } from "../../tokens.js"

export interface Token {
  id: number
  name: string
  symbol: string
  balance: string
  imageUrl: string
  chainId: number
  contractAddress: string
  balanceUsdFormatted: string
  tokenPriceUsd: number
  contractInfo?: {
    decimals: number
    symbol: string
    name: string
  }
}

export type TokenFormatted = Token &
  TokenBalanceExtended & {
    balanceFormatted: string
    tokenPriceUsd: number
    balanceUsdFormatted: string
    isNative: boolean
    tokenName: string
    priceUsd: number
    isSufficientBalance: boolean
    chainName: string
  }

export type UseTokenListProps = {
  onContinue: (selectedToken: Token) => void
  targetAmountUsd?: number | null
  indexerGatewayClient: SequenceIndexerGateway
  onError: (error: Error | string | null) => void
}

export type UseTokenListReturn = {
  selectedToken: Token | null
  searchQuery: string
  handleTokenSelect: (token: TokenFormatted) => void
  filteredTokens: TokenBalanceExtended[]
  isLoadingSortedTokens: boolean
  balanceError: Error | null
  showContinueButton: boolean
  isTokenSelected: (token: TokenBalanceExtended) => boolean
  setSearchQuery: (query: string) => void
  filteredTokensFormatted: TokenFormatted[]
  totalBalanceUsd: number
  totalBalanceUsdFormatted: string
  isLoadingTotalBalanceUsd: boolean
  showInsufficientBalance: boolean
}

export function useTokenList({
  onContinue,
  targetAmountUsd,
  indexerGatewayClient,
  onError,
}: UseTokenListProps): UseTokenListReturn {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { address } = useAccount()
  const {
    sortedTokens: allSortedTokens,
    isLoadingSortedTokens,
    balanceError,
  } = useTokenBalances(address as Address.Address, indexerGatewayClient)

  const {
    totalBalanceUsd,
    totalBalanceUsdFormatted,
    isLoadingTotalBalanceUsd,
  } = useAccountTotalBalanceUsd(address as Address.Address)
  const {
    hasSufficientBalanceUsd,
    isLoadingHasSufficientBalanceUsd,
    hasSufficientBalanceUsdError,
  } = useHasSufficientBalanceUsd(address as Address.Address, targetAmountUsd)
  const showContinueButton = false
  const { supportedChains: supportedToChains } = useSupportedChains()

  const supportedChainIds = useMemo(() => {
    return new Set(supportedToChains.map((c) => c.id))
  }, [supportedToChains])

  const sortedTokens = useMemo<Array<TokenBalanceExtended>>(() => {
    return allSortedTokens.filter((token: TokenBalanceExtended) => {
      if (!supportedChainIds.has(token.chainId)) {
        return false
      }
      return true
    })
  }, [allSortedTokens, supportedChainIds])

  useEffect(() => {
    if (onError) {
      onError(balanceError)
    }
  }, [balanceError, onError])

  const handleTokenSelect = (token: TokenFormatted) => {
    const isNative = !("contractAddress" in token)
    const chainInfo = getChainInfo(token.chainId)
    const imageUrl = token.imageUrl

    let formattedToken: Token
    if (isNative) {
      formattedToken = {
        id: (token as TokenBalanceExtended).chainId,
        name: chainInfo?.nativeCurrency.name || "Native Token",
        symbol: chainInfo?.nativeCurrency.symbol || "ETH",
        balance: (token as TokenBalanceExtended).balance,
        imageUrl,
        chainId: (token as TokenBalanceExtended).chainId,
        contractAddress: zeroAddress,
        balanceUsdFormatted:
          (token as TokenBalanceExtended).balanceUsdFormatted ?? "",
        tokenPriceUsd: (token as TokenBalanceExtended).price?.value ?? 0,
        contractInfo: {
          decimals: 18,
          symbol: chainInfo?.nativeCurrency.symbol || "ETH",
          name: chainInfo?.nativeCurrency.name || "Native Token",
        },
      }
    } else {
      formattedToken = {
        id: token.chainId,
        name: token.contractInfo?.name || "Unknown Token",
        symbol: token.contractInfo?.symbol || "???",
        balance: token.balance,
        imageUrl,
        chainId: token.chainId,
        contractAddress: token.contractAddress,
        contractInfo: {
          ...token.contractInfo,
          name: token.contractInfo?.name ?? "Unknown Token",
          symbol: token.contractInfo?.symbol ?? "???",
          decimals: token.contractInfo?.decimals ?? 18,
        },
        balanceUsdFormatted: token.balanceUsdFormatted ?? "",
        tokenPriceUsd: token.price?.value ?? 0,
      }
    }

    setSelectedToken(formattedToken)
    const canContinue =
      (!targetAmountUsd || (targetAmountUsd && hasSufficientBalanceUsd)) &&
      token.isSufficientBalance

    if (!canContinue) {
      console.warn("[trails-sdk] Cannot continue with token selection", {
        token: formattedToken,
        targetAmountUsd,
        hasSufficientBalanceUsd,
        isSufficientBalance: token.isSufficientBalance,
      })
    }

    onContinue(formattedToken)
  }

  const isTokenSelected = (token: TokenBalanceExtended): boolean => {
    if (!selectedToken) return false

    const isNative = !("contractAddress" in token)
    return (
      selectedToken.chainId === token.chainId &&
      (isNative
        ? selectedToken.contractAddress === zeroAddress
        : isAddressEqual(
            Address.from(selectedToken.contractAddress),
            Address.from(token.contractAddress),
          ))
    )
  }

  const filteredTokens = useMemo(() => {
    if (!searchQuery.trim()) {
      return sortedTokens
    }

    const query = searchQuery.toLowerCase().trim()
    const queryParts = query.split(/\s+/).filter((part) => part.length > 0)

    return sortedTokens.filter((token: TokenBalanceExtended) => {
      const isNative = !("contractAddress" in token)
      const chainInfo = getChainInfo(token.chainId)
      const chainName = chainInfo?.name || ""
      const chainNameLower = chainName.toLowerCase()

      if (isNative) {
        const nativeSymbol = chainInfo?.nativeCurrency.symbol || "ETH"
        const nativeName = chainInfo?.nativeCurrency.name || "Native Token"
        const nativeSymbolLower = nativeSymbol.toLowerCase()
        const nativeNameLower = nativeName.toLowerCase()

        // If multiple query parts, check if they match chain + token combination
        if (queryParts.length > 1) {
          const matchesChain = queryParts.some((part) =>
            chainNameLower.includes(part),
          )
          const matchesToken = queryParts.some(
            (part) =>
              nativeSymbolLower.includes(part) ||
              nativeNameLower.includes(part),
          )
          return matchesChain && matchesToken
        }

        // Single query part - match against any field
        return queryParts.some(
          (part) =>
            nativeSymbolLower.includes(part) ||
            nativeNameLower.includes(part) ||
            chainNameLower.includes(part),
        )
      }

      const tokenSymbol = token.contractInfo?.symbol || "???"
      const tokenName = token.contractInfo?.name || "Unknown Token"
      const tokenSymbolLower = tokenSymbol.toLowerCase()
      const tokenNameLower = tokenName.toLowerCase()

      // If multiple query parts, check if they match chain + token combination
      if (queryParts.length > 1) {
        const matchesChain = queryParts.some((part) =>
          chainNameLower.includes(part),
        )
        const matchesToken = queryParts.some(
          (part) =>
            tokenSymbolLower.includes(part) || tokenNameLower.includes(part),
        )
        return matchesChain && matchesToken
      }

      // Single query part - match against any field
      return queryParts.some(
        (part) =>
          tokenSymbolLower.includes(part) ||
          tokenNameLower.includes(part) ||
          chainNameLower.includes(part),
      )
    })
  }, [sortedTokens, searchQuery])

  const filteredTokensFormatted = useMemo(() => {
    return filteredTokens.map((token: TokenBalanceExtended): TokenFormatted => {
      const isNative = !("contractAddress" in token)
      const chainInfo = getChainInfo(token.chainId)
      const nativeSymbol = chainInfo?.nativeCurrency.symbol || "ETH"
      const tokenSymbol = isNative
        ? nativeSymbol
        : token.contractInfo?.symbol || "???"
      const contractAddress = isNative ? zeroAddress : token.contractAddress
      let imageContractAddress = contractAddress
      if (tokenSymbol === "WETH") {
        imageContractAddress = zeroAddress
      }
      const imageUrl = `https://assets.sequence.info/images/tokens/small/${token.chainId}/${imageContractAddress}.webp`
      const currentTokenName =
        (token as TokenBalanceWithPrice).contractInfo?.name || ""
      const tokenName = getFormatttedTokenName(
        currentTokenName,
        tokenSymbol,
        token.chainId,
      )
      const formattedBalance = formatRawAmount(
        token.balance,
        isNative ? 18 : token.contractInfo?.decimals,
      )
      const priceUsd = Number(token.price?.value) ?? 0
      const balanceUsdFormatted = token.balanceUsdFormatted ?? ""
      const decimals = isNative ? 18 : (token.contractInfo?.decimals ?? 18)
      let isSufficientBalance = true
      if (targetAmountUsd) {
        isSufficientBalance = (token.balanceUsd ?? 0) >= targetAmountUsd
      }
      const chainName = chainInfo?.name || ""

      return {
        ...token,
        id: token.chainId,
        contractInfo: {
          ...(token as TokenBalanceWithPrice).contractInfo,
          chainId: Number(token.chainId),
          source: (token as TokenBalanceWithPrice).contractInfo?.source || "",
          type: (token as TokenBalanceWithPrice).contractInfo?.type || "",
          logoURI: (token as TokenBalanceWithPrice).contractInfo?.logoURI || "",
          deployed:
            (token as TokenBalanceWithPrice).contractInfo?.deployed || false,
          bytecodeHash:
            (token as TokenBalanceWithPrice).contractInfo?.bytecodeHash || "",
          updatedAt:
            (token as TokenBalanceWithPrice).contractInfo?.updatedAt || "",
          queuedAt:
            (token as TokenBalanceWithPrice).contractInfo?.queuedAt || "",
          extensions: (token as TokenBalanceWithPrice).contractInfo
            ?.extensions || {
            link: "",
            description: "",
            categories: [],
            ogImage: "",
            ogName: "",
            originChainId: 0,
            originAddress: "",
            blacklist: false,
            verified: false,
            featureIndex: 0,
            verifiedBy: "",
            featured: false,
          },
          status:
            (token as TokenBalanceWithPrice).contractInfo?.status ||
            ResourceStatus.NOT_AVAILABLE,
          address: contractAddress,
          name: tokenName,
          symbol: tokenSymbol,
          decimals: decimals,
        },
        name: tokenName,
        symbol: tokenSymbol,
        balanceFormatted: formattedBalance,
        imageUrl,
        chainId: token.chainId,
        contractAddress: contractAddress,
        balanceUsdFormatted,
        tokenPriceUsd: priceUsd,
        isNative: isNative,
        tokenName: tokenName,
        priceUsd: priceUsd,
        isSufficientBalance,
        chainName,
      }
    })
  }, [filteredTokens, targetAmountUsd])

  const showInsufficientBalance = useMemo(() => {
    return (
      (totalBalanceUsd &&
        targetAmountUsd &&
        !hasSufficientBalanceUsd &&
        !isLoadingHasSufficientBalanceUsd &&
        !hasSufficientBalanceUsdError) ||
      (filteredTokensFormatted?.length > 0 &&
        !filteredTokensFormatted.some((token) => token.isSufficientBalance))
    )
  }, [
    targetAmountUsd,
    hasSufficientBalanceUsd,
    isLoadingHasSufficientBalanceUsd,
    hasSufficientBalanceUsdError,
    filteredTokensFormatted,
    totalBalanceUsd,
  ])

  return {
    selectedToken,
    searchQuery,
    handleTokenSelect,
    filteredTokens,
    isLoadingSortedTokens,
    balanceError,
    showContinueButton,
    isTokenSelected,
    setSearchQuery,
    filteredTokensFormatted,
    totalBalanceUsd,
    totalBalanceUsdFormatted,
    isLoadingTotalBalanceUsd,
    showInsufficientBalance,
  }
}
