import type { SequenceAPIClient } from "@0xsequence/trails-api"
import { useQuery } from "@tanstack/react-query"
import { useTokenPrice } from "../../prices.js"
import { formatUsdAmountDisplay } from "../../tokenBalances.js"
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
  const isTokenAddress = token?.startsWith("0x")
  const resolvedTokenAddress = useTokenAddress({
    chainId,
    tokenSymbol: isTokenAddress ? undefined : token,
  })
  const tokenAddress = isTokenAddress ? token : resolvedTokenAddress

  const { tokenPrice } = useTokenPrice(
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
    amountUsdFormatted: formatUsdAmountDisplay(amountUsd || 0),
  }
}
