import type {
  GatewayNativeTokenBalances,
  GatewayTokenBalance,
  GetTokenBalancesSummaryReturn,
  NativeTokenBalance,
  SequenceIndexerGateway,
  TokenBalance,
} from "@0xsequence/indexer"
import { ContractVerificationStatus } from "@0xsequence/indexer"
import type { Page, Price, SequenceAPIClient } from "@0xsequence/trails-api"
import { QueryClient, useQuery } from "@tanstack/react-query"
import type { Address } from "ox"
import { useEffect, useState } from "react"
import { formatUnits, parseUnits, zeroAddress } from "viem"
import { useAPIClient } from "./apiClient.js"
import { useIndexerGatewayClient } from "./indexerClient.js"
import { getTokenPrices, useTokenPrices } from "./prices.js"

export type { NativeTokenBalance, TokenBalance }

// Initialize query client for token balances
const tokenBalancesQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      gcTime: 300000, // 5 minutes
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})

// Default empty page info for query fallback
const defaultPage = { page: 1, pageSize: 10, more: false }

// Type guard for native token balance
export function isNativeToken(
  token: TokenBalance | NativeTokenBalance,
): token is NativeTokenBalance {
  if ("contractAddress" in token) {
    return false
  }
  return true
}

export interface TokenBalanceWithPrice extends TokenBalance {
  price?: Price
  balanceUsd?: number
  balanceUsdFormatted?: string
}

export interface NativeTokenBalanceWithPrice extends NativeTokenBalance {
  price?: Price
  balanceUsd?: number
  balanceUsdFormatted?: string
  symbol?: string
}

export type TokenBalanceExtended =
  | TokenBalanceWithPrice
  | NativeTokenBalanceWithPrice

export function sortTokensByPriority(
  a: TokenBalanceExtended,
  b: TokenBalanceExtended,
): number {
  // First sort by USD balance if available
  const aUsdBalance = a.balanceUsd ?? 0
  const bUsdBalance = b.balanceUsd ?? 0
  if (aUsdBalance !== bUsdBalance) {
    return bUsdBalance - aUsdBalance // Higher USD balance first
  }

  // Then sort by native token status
  if (isNativeToken(a) && !isNativeToken(b)) return -1
  if (!isNativeToken(a) && isNativeToken(b)) return 1

  // Finally sort by token balance
  try {
    const balanceA = BigInt(a.balance)
    const balanceB = BigInt(b.balance)
    if (balanceA > balanceB) return -1
    if (balanceA < balanceB) return 1
  } catch {
    // If balance comparison fails, maintain current order
    return 0
  }

  return 0
}

export interface GetTokenBalancesWithPrice {
  page: Page
  nativeBalances: Array<
    NativeTokenBalance & {
      price?: Price
      symbol?: string
      balanceUsd?: number
      balanceUsdFormatted?: string
    }
  >
  balances: Array<
    TokenBalance & {
      price?: Price
      balanceUsd?: number
      balanceUsdFormatted?: string
    }
  >
}

export function useTokenBalances(
  address: Address.Address,
  indexerGatewayClient?: SequenceIndexerGateway,
  sequenceApiClient?: SequenceAPIClient,
): {
  tokenBalancesData: GetTokenBalancesSummaryReturn | undefined
  isLoadingBalances: boolean
  isLoadingPrices: boolean
  isLoadingSortedTokens: boolean
  balanceError: Error | null
  sortedTokens: TokenBalanceExtended[]
} {
  // Always call hooks unconditionally to fix React rules violation
  const hookIndexerClient = useIndexerGatewayClient()
  const hookApiClient = useAPIClient()

  // Use passed parameters if available, otherwise use hook results
  const indexerClient = indexerGatewayClient ?? hookIndexerClient
  const apiClient = sequenceApiClient ?? hookApiClient

  // Fetch token balances with improved query key structure
  const {
    data: tokenBalancesData,
    isLoading: isLoadingBalances,
    error: balanceError,
  } = useQuery<GetTokenBalancesWithPrice>({
    queryKey: ["tokenBalances", "summary", address],
    queryFn: async (): Promise<GetTokenBalancesWithPrice> => {
      if (!address) {
        console.warn("[trails-sdk] No account address or indexer client")
        return {
          balances: [],
          nativeBalances: [],
          page: defaultPage,
        } as GetTokenBalancesWithPrice
      }
      try {
        const summaryFromGateway = await getTokenBalances({
          account: address,
          indexerGatewayClient: indexerClient,
        })

        return {
          page: summaryFromGateway.page,
          balances: (
            summaryFromGateway.balances as unknown as GatewayTokenBalance[]
          ).flatMap((b) => b.results),
          nativeBalances: (
            summaryFromGateway.nativeBalances as unknown as GatewayNativeTokenBalances[]
          ).flatMap((b) => b.results),
        }
      } catch (error) {
        console.error("[trails-sdk] Failed to fetch token balances:", error)
        throw error
      }
    },
    enabled: !!address && !!indexerClient,
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes cache time
    retry: (failureCount, error) => {
      // Don't retry 404s or network errors after 3 attempts
      if (error && "status" in error && error.status === 404) return false
      if (failureCount < 3) return true
      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    refetchOnReconnect: true, // Refetch on reconnect
    refetchInterval: 300000, // Background refetch every 5 minutes
    refetchIntervalInBackground: true,
  })

  const { tokenPrices, isLoadingTokenPrices } = useTokenPrices(
    (tokenBalancesData?.balances ?? [])
      .map((b: any) => {
        return {
          tokenId: b.contractInfo?.symbol,
          contractAddress: b.contractAddress,
          chainId: b.contractInfo?.chainId!,
        }
      })
      .concat(
        (tokenBalancesData?.nativeBalances ?? []).map((b) => {
          return {
            tokenId: b.symbol,
            contractAddress: zeroAddress,
            chainId: b.chainId,
          }
        }),
      ) ?? [],
    apiClient,
  )

  const { data: sortedTokens = [], isLoading: isLoadingSortedTokens } =
    useQuery<TokenBalanceExtended[]>({
      queryKey: [
        "tokenBalances",
        "sorted",
        address,
        tokenBalancesData?.page?.page,
        tokenPrices?.length,
      ],
      queryFn: () => {
        if (!tokenBalancesData || !tokenPrices) {
          return []
        }

        const balances = [
          ...tokenBalancesData.nativeBalances,
          ...tokenBalancesData.balances,
        ].filter((token) => {
          try {
            return BigInt(token.balance) > 0n
          } catch {
            return false
          }
        })

        // First pass: add prices to all tokens
        const tokensWithPrices = balances.map((token) => {
          const isNative = isNativeToken(token)
          const priceData = tokenPrices.find(
            (p: { token: { contractAddress: string; chainId: number } }) =>
              p.token.contractAddress ===
                (isNative ? zeroAddress : token.contractAddress) &&
              p.token.chainId ===
                (isNative ? token.chainId : token.contractInfo?.chainId),
          )

          if (priceData?.price) {
            const tokenWithPrice = { ...token, price: priceData.price }
            tokenWithPrice.balanceUsd = getTokenBalanceUsd(
              token,
              priceData.price,
            )
            tokenWithPrice.balanceUsdFormatted = getTokenBalanceUsdFormatted(
              token,
              priceData.price,
            )
            return tokenWithPrice
          }

          return token
        })

        return tokensWithPrices.sort(sortTokensByPriority)
      },
      enabled:
        !isLoadingBalances &&
        !isLoadingTokenPrices &&
        !!tokenBalancesData &&
        !!tokenPrices,
      staleTime: 30000, // 30 seconds for sorted tokens
      gcTime: 120000, // 2 minutes cache time
      refetchOnWindowFocus: false,
    })

  return {
    tokenBalancesData,
    isLoadingBalances,
    isLoadingPrices: isLoadingTokenPrices,
    isLoadingSortedTokens:
      isLoadingSortedTokens || isLoadingBalances || isLoadingTokenPrices,
    balanceError,
    sortedTokens,
  }
}

// Helper to format balance
export function formatRawAmount(
  balance: string | bigint,
  decimals: number = 18,
): string {
  try {
    const formatted = formatUnits(BigInt(balance), decimals)
    return formatAmount(formatted)
  } catch (e) {
    console.error("[trails-sdk] Error formatting balance:", e)
    return balance.toString()
  }
}

export function getTokenBalanceUsd(
  token: TokenBalance | NativeTokenBalance,
  tokenPrice: Price,
): number {
  const isNative = isNativeToken(token)
  const formattedBalance = formatRawAmount(
    token.balance,
    isNative ? 18 : token.contractInfo?.decimals,
  )
  const priceUsd = Number(tokenPrice.value) ?? 0
  return Number(formattedBalance) * priceUsd
}

export function formatAmount(value: string | number): string {
  if (!value) {
    value = 0
  }
  try {
    return Number(value).toLocaleString(undefined, {
      maximumFractionDigits: 7,
      minimumFractionDigits: 2,
    })
  } catch (err) {
    console.error("[trails-sdk] Error formatting value:", err)
  }

  return value.toString()
}

export function formatUsdAmountDisplay(value: number | string = 0): string {
  if (!value) {
    value = 0
  }
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(Number(value))
}

export function getTokenBalanceUsdFormatted(
  token: TokenBalance | NativeTokenBalance,
  tokenPrice: Price,
): string {
  const balanceUsd = getTokenBalanceUsd(token, tokenPrice)
  return formatUsdAmountDisplay(balanceUsd)
}

export function useTokenBalanceUsdFormat(
  token: TokenBalance | NativeTokenBalance,
  tokenPrice: Price,
): string {
  const [format, setFormat] = useState<string>("")
  useEffect(() => {
    const formattedBalance = getTokenBalanceUsdFormatted(token, tokenPrice)
    setFormat(formattedBalance)
  }, [token, tokenPrice])
  return format
}

export type GetTokenBalancesParams = {
  account: string
  indexerGatewayClient: SequenceIndexerGateway
}

// Separate fetch function for token balances summary
export async function fetchGetTokenBalancesSummary({
  account,
  indexerGatewayClient,
}: GetTokenBalancesParams): Promise<GetTokenBalancesSummaryReturn> {
  if (!account || !indexerGatewayClient) {
    throw new Error("Account address and indexer client are required")
  }

  try {
    const summaryFromGateway =
      await indexerGatewayClient.getTokenBalancesSummary({
        filter: {
          accountAddresses: [account],
          contractStatus: ContractVerificationStatus.VERIFIED,
          contractTypes: ["ERC20"],
          omitNativeBalances: false,
        },
      })

    return summaryFromGateway as unknown as GetTokenBalancesSummaryReturn
  } catch (error) {
    console.error("[trails-sdk] Failed to fetch token balances summary:", error)
    throw error
  }
}

export async function getTokenBalances({
  account,
  indexerGatewayClient,
}: GetTokenBalancesParams): Promise<GetTokenBalancesSummaryReturn> {
  return tokenBalancesQueryClient.fetchQuery({
    queryKey: ["tokenBalances", "summary", account],
    queryFn: () =>
      fetchGetTokenBalancesSummary({ account, indexerGatewayClient }),
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes
  })
}

// Cache invalidation utility function
export function invalidateTokenBalancesCache(account?: string) {
  if (account) {
    // Invalidate specific account's token balances
    tokenBalancesQueryClient.invalidateQueries({
      queryKey: ["tokenBalances", account],
    })
  } else {
    // Invalidate all token balance queries
    tokenBalancesQueryClient.invalidateQueries({
      queryKey: ["tokenBalances"],
    })
  }
}

export type GetTokenBalancesFlatArrayParams = {
  account: string
  indexerGatewayClient: SequenceIndexerGateway
}

export type GetTokenBalancesFlatArrayReturn = {
  balances: TokenBalance[]
}

export async function getTokenBalancesFlatArray({
  account,
  indexerGatewayClient,
}: GetTokenBalancesFlatArrayParams): Promise<TokenBalance[]> {
  const summaryFromGateway = await getTokenBalances({
    account,
    indexerGatewayClient,
  })
  const tokenMap = new Map<string, TokenBalance>()

  for (const balance of summaryFromGateway.balances) {
    ;(balance as any).results.forEach((b: any) => {
      tokenMap.set(
        `${b.contractAddress}-${b.contractInfo?.chainId}-${b.contractInfo?.symbol}`,
        {
          ...b,
          contractAddress: b.contractAddress ?? zeroAddress,
          tokenId: b.contractInfo?.symbol,
        },
      )
    })
  }

  for (const balance of summaryFromGateway.nativeBalances) {
    ;(balance as any).results.forEach((b: any) => {
      tokenMap.set(`${b.contractAddress}-${b.chainId}-${b.symbol}`, {
        ...b,
        contractAddress: b.contractAddress ?? zeroAddress,
        tokenId: b.symbol,
      })
    })
  }

  const tokens = Array.from(tokenMap.values())

  return tokens
}

export type GetTokenBalancesWithPricesParams = {
  account: string
  indexerGatewayClient: SequenceIndexerGateway
  apiClient: SequenceAPIClient
}

export type GetTokenBalancesWithPriceReturn = {
  balances: TokenBalanceWithPrice[]
}

export async function getTokenBalancesWithPrices({
  account,
  indexerGatewayClient,
  apiClient,
}: GetTokenBalancesWithPricesParams): Promise<GetTokenBalancesWithPriceReturn> {
  const tokens = await getTokenBalancesFlatArray({
    account,
    indexerGatewayClient,
  })
  const tokenPrices = await getTokenPrices(apiClient, tokens)
  const balancesWithPrices = tokens.map((b) => {
    const price = tokenPrices.find((p) => {
      const isSameChain = p.token.chainId === b.chainId
      let isSameToken = p.token.contractAddress === b.contractAddress
      if (!b.contractAddress) {
        isSameToken =
          p.token.contractAddress === zeroAddress || !p.token.contractAddress
      }
      return isSameChain && isSameToken
    })

    return {
      ...b,
      price: price?.price,
      balanceUsd: price?.price
        ? getTokenBalanceUsd(b, price?.price)
        : undefined,
      balanceUsdFormatted: price?.price
        ? getTokenBalanceUsdFormatted(b, price?.price)
        : undefined,
    }
  })

  return {
    balances: balancesWithPrices,
  }
}

export type UseAccountTokenBalanceParams = {
  account?: string | null
  token?: string | null
  chainId?: number | null
  indexerGatewayClient?: SequenceIndexerGateway | null
  apiClient?: SequenceAPIClient | null
}

export function useAccountTokenBalance({
  account,
  token,
  chainId,
  indexerGatewayClient,
  apiClient,
}: UseAccountTokenBalanceParams) {
  const { data: tokenBalance, isLoading: isLoadingTokenBalance } = useQuery({
    queryKey: ["tokenBalances", "balances", account],
    queryFn: async () => {
      if (
        !account ||
        !indexerGatewayClient ||
        !apiClient ||
        !token ||
        !chainId
      ) {
        return null
      }
      const { balances } = await getTokenBalancesWithPrices({
        account,
        indexerGatewayClient,
        apiClient,
      })
      const tokenBalance = balances.find(
        (b) =>
          b.chainId === chainId &&
          (b.contractAddress?.toLowerCase() === token.toLowerCase() ||
            (!b.contractAddress && token === zeroAddress)),
      )

      return tokenBalance
    },
  })

  return {
    tokenBalance,
    isLoadingTokenBalance,
  }
}

export type HasSufficientBalanceParams = {
  account: string
  token: string
  amount: string
  chainId: number
  indexerGatewayClient: SequenceIndexerGateway
  apiClient: SequenceAPIClient
}

export async function getHasSufficientBalanceToken({
  account,
  token,
  amount,
  chainId,
  indexerGatewayClient,
  apiClient,
}: HasSufficientBalanceParams): Promise<boolean> {
  const { balances } = await getTokenBalancesWithPrices({
    account,
    indexerGatewayClient,
    apiClient,
  })
  const tokenBalance = balances.find(
    (b) =>
      b.chainId === chainId &&
      (b.contractAddress?.toLowerCase() === token.toLowerCase() ||
        (!b.contractAddress && token === zeroAddress)),
  )
  if (!tokenBalance) {
    return false
  }
  const decimals = tokenBalance?.contractInfo?.decimals ?? 18
  return tokenBalance?.balance
    ? BigInt(tokenBalance.balance) >= parseUnits(amount, decimals)
    : false
}

export function useHasSufficientBalanceToken(
  account: string,
  token: string,
  amount: string,
  chainId: number,
): {
  hasSufficientBalanceToken: boolean
  isLoadingHasSufficientBalanceToken: boolean
} {
  const indexerGatewayClient = useIndexerGatewayClient()
  const apiClient = useAPIClient()

  const {
    data: hasSufficientBalanceToken,
    isLoading: isLoadingHasSufficientBalanceToken,
  } = useQuery({
    queryKey: ["tokenBalances", "sufficient", account, token, amount, chainId],
    queryFn: () =>
      account
        ? getHasSufficientBalanceToken({
            account: account,
            token: token,
            amount: amount,
            chainId: chainId,
            indexerGatewayClient: indexerGatewayClient,
            apiClient: apiClient,
          })
        : null,
    enabled: !!account && !!token && !!amount && !!chainId,
    staleTime: 45000, // 45 seconds
    gcTime: 180000, // 3 minutes cache time
    retry: (failureCount, error) => {
      if (error && "status" in error && error.status === 404) return false
      if (failureCount < 2) return true
      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
  })

  return {
    hasSufficientBalanceToken: hasSufficientBalanceToken || false,
    isLoadingHasSufficientBalanceToken,
  }
}

export type GetHasSufficientBalanceUsdParams = {
  account: string
  targetAmountUsd: number | string
  indexerGatewayClient: SequenceIndexerGateway
  apiClient: SequenceAPIClient
}

export async function getHasSufficientBalanceUsd({
  account,
  targetAmountUsd,
  indexerGatewayClient,
  apiClient,
}: GetHasSufficientBalanceUsdParams): Promise<boolean> {
  const totalBalanceUsd = await getAccountTotalBalanceUsd({
    account,
    indexerGatewayClient,
    apiClient,
  })
  return totalBalanceUsd >= Number(targetAmountUsd)
}

export function useHasSufficientBalanceUsd(
  account: string,
  targetAmountUsd?: number | string | null,
): {
  hasSufficientBalanceUsd: boolean
  isLoadingHasSufficientBalanceUsd: boolean
  hasSufficientBalanceUsdError: Error | null
} {
  const indexerGatewayClient = useIndexerGatewayClient()
  const apiClient = useAPIClient()

  const {
    data: hasSufficientBalanceUsd,
    isLoading: isLoadingHasSufficientBalanceUsd,
    error: hasSufficientBalanceUsdError,
  } = useQuery({
    queryKey: ["tokenBalances", "sufficientUsd", account, targetAmountUsd],
    queryFn: () =>
      account && targetAmountUsd
        ? getHasSufficientBalanceUsd({
            account: account,
            targetAmountUsd: targetAmountUsd,
            indexerGatewayClient: indexerGatewayClient,
            apiClient: apiClient,
          })
        : false,
    enabled: !!account && !!targetAmountUsd,
    staleTime: 45000, // 45 seconds
    gcTime: 180000, // 3 minutes cache time
    retry: (failureCount, error) => {
      if (error && "status" in error && error.status === 404) return false
      if (failureCount < 2) return true
      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
  })

  return {
    hasSufficientBalanceUsd: hasSufficientBalanceUsd || false,
    isLoadingHasSufficientBalanceUsd:
      isLoadingHasSufficientBalanceUsd || !targetAmountUsd || !account,
    hasSufficientBalanceUsdError,
  }
}

export type GetAccountTotalBalanceUsdParams = {
  account: string
  indexerGatewayClient: SequenceIndexerGateway
  apiClient: SequenceAPIClient
}

export async function getAccountTotalBalanceUsd({
  account,
  indexerGatewayClient,
  apiClient,
}: GetAccountTotalBalanceUsdParams): Promise<number> {
  const { balances } = await getTokenBalancesWithPrices({
    account,
    indexerGatewayClient,
    apiClient,
  })

  return balances.reduce((acc, b) => acc + (b.balanceUsd ?? 0), 0)
}

export function useAccountTotalBalanceUsd(account: string): {
  totalBalanceUsd: number
  isLoadingTotalBalanceUsd: boolean
  totalBalanceUsdFormatted: string
} {
  const indexerGatewayClient = useIndexerGatewayClient()
  const apiClient = useAPIClient()

  const { data: totalBalanceUsd, isLoading: isLoadingTotalBalanceUsd } =
    useQuery({
      queryKey: ["tokenBalances", "totalUsd", account],
      queryFn: () =>
        account
          ? getAccountTotalBalanceUsd({
              account: account,
              indexerGatewayClient: indexerGatewayClient,
              apiClient: apiClient,
            })
          : null,
      enabled: !!account,
      staleTime: 60000, // 1 minute
      gcTime: 300000, // 5 minutes cache time
      retry: (failureCount, error) => {
        if (error && "status" in error && error.status === 404) return false
        if (failureCount < 2) return true
        return false
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: 300000, // Background refetch every 5 minutes
      refetchIntervalInBackground: true,
    })

  return {
    totalBalanceUsd: totalBalanceUsd || 0,
    isLoadingTotalBalanceUsd,
    totalBalanceUsdFormatted: formatUsdAmountDisplay(totalBalanceUsd || 0),
  }
}
