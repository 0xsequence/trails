import type { SequenceAPIClient } from "@0xsequence/trails-api"
import { useEffect, useState } from "react"
import { useTokenPrice } from "../../prices.js"
import { formatUsdValue } from "../../tokenBalances.js"
import { useTokenAddress } from "./useTokenAddress.js"

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
  const [amountUsd, setAmountUsd] = useState<number | null>(null)
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

  useEffect(() => {
    if (!amount || !tokenPrice) {
      return
    }

    const tokenPriceValue = tokenPrice?.price?.value

    if (!tokenPriceValue) {
      return
    }

    const value = Number(amount) * tokenPriceValue
    setAmountUsd(value)
  }, [amount, tokenPrice])

  return {
    amountUsd,
    amountUsdFormatted: formatUsdValue(amountUsd || 0),
  }
}
