import type { SequenceAPIClient } from "@0xsequence/trails-api"
import { useQuery } from "@tanstack/react-query"
import { useTokenPrice } from "../../prices.js"
import { formatUsdValue } from "../../tokenBalances.js"
import { useTokenAddress } from "../../tokens.js"

type UseAmountUsdProps = {
  amount?: string | null
  token?: string | null
  chainId?: number | null
  apiClient: SequenceAPIClient
}

export function useAmountUsd({
  amount,
  token,
  chainId,
  apiClient,
}: UseAmountUsdProps): {
  amountUsd: number | null
  amountUsdFormatted: string
} {
  const tokenAddress = useTokenAddress({ chainId, tokenSymbol: token })

  const { data: tokenPrice } = useTokenPrice(
    token && tokenAddress && chainId
      ? {
          tokenId: token,
          contractAddress: tokenAddress,
          chainId: Number(chainId),
        }
      : null,
    apiClient,
  )

  const { data: amountUsd } = useQuery({
    queryKey: ["amountUsd", amount, tokenPrice?.price?.value],
    queryFn: () => {
      if (!amount || !tokenPrice?.price?.value) {
        return null
      }

      const tokenPriceValue = tokenPrice.price.value
      const value = Number(amount) * tokenPriceValue
      return value
    },
    enabled: !!amount && !!tokenPrice?.price?.value,
  })

  return {
    amountUsd: amountUsd || null,
    amountUsdFormatted: formatUsdValue(amountUsd || 0),
  }
}
