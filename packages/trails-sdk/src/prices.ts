import type {
  SequenceAPIClient,
  Token,
  TokenPrice,
} from "@0xsequence/trails-api"
import { useQuery } from "@tanstack/react-query"

export const getTokenPrices = async (
  apiClient: SequenceAPIClient,
  tokens: Token[],
): Promise<TokenPrice[]> => {
  if (tokens.length === 0) {
    return [] as TokenPrice[]
  }

  const res = await apiClient.getCoinPrices({ tokens })

  return res?.tokenPrices || []
}

export const useTokenPrices = (
  tokens: Token[],
  apiClient: SequenceAPIClient,
) => {
  return useQuery({
    queryKey: ["coinPrices", tokens],
    queryFn: () => {
      return getTokenPrices(apiClient, tokens)
    },
    retry: true,
    staleTime: 60_000,
    enabled: tokens.length > 0,
  })
}
