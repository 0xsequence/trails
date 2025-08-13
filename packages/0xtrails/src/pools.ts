import { useAaveMarkets, chainId } from "@aave/react"

// Pool data interface
export interface Pool {
  id: string
  name: string
  protocol: string
  chainId: number
  apy: number
  tvl: number
  token: {
    symbol: string
    name: string
    address: string
    decimals: number
    logoUrl?: string
  }
  depositAddress: string
  isActive: boolean
}

export function usePools() {
  const {
    data: markets,
    loading,
    error,
  } = useAaveMarkets({
    chainIds: [
      chainId(1),
      chainId(8453),
      chainId(42161),
      chainId(137),
      chainId(10),
    ], // Ethereum, Base, Arbitrum, Polygon, Optimism
  })

  console.log("=== AAVE HOOK DEBUG ===")
  console.log("Aave markets data:", markets)
  console.log("Loading:", loading)
  console.log("Error:", error)
  console.log("Markets type:", typeof markets)
  console.log("Markets length:", markets?.length)
  console.log("========================")

  // Transform Aave markets data to our Pool interface
  const pools: Pool[] =
    markets?.flatMap((market) => {
      console.log("Processing market:", market)
      console.log("Market chain:", market.chain)
      console.log("Supply reserves:", market.supplyReserves)
      console.log("Supply reserves type:", typeof market.supplyReserves)
      console.log("Supply reserves length:", market.supplyReserves?.length)

      if (!market.supplyReserves || market.supplyReserves.length === 0) {
        console.log(
          "No supply reserves found for market:",
          market.chain.chainId,
        )
        return []
      }

      return (
        market.supplyReserves
          ?.filter((reserve: any) => {
            // Check if reserve has supply info and is not frozen/paused
            const hasSupplyInfo =
              reserve.supplyInfo && !reserve.isFrozen && !reserve.isPaused
            const hasLiquidity = parseFloat(reserve.size?.usd || "0") > 0
            console.log(
              `Reserve ${reserve.underlyingToken?.symbol}: hasSupplyInfo=${hasSupplyInfo}, hasLiquidity=${hasLiquidity}, sizeUSD=${reserve.size?.usd}`,
            )
            return hasSupplyInfo && hasLiquidity
          })
          .map((reserve: any) => {
            const tokenMetadata = {
              symbol: reserve.underlyingToken?.symbol || "UNKNOWN",
              name: reserve.underlyingToken?.name || "Unknown Token",
              decimals: reserve.underlyingToken?.decimals || 18,
            }

            const pool = {
              id: `${reserve.underlyingToken?.address}-${market.chain.chainId}-${reserve.aToken?.address}`,
              name: `${tokenMetadata.symbol} Lending Pool`,
              protocol: "Aave",
              chainId: market.chain.chainId,
              apy: parseFloat(reserve.supplyInfo?.apy?.value || "0") * 100, // Convert to percentage
              tvl: parseFloat(reserve.size?.usd || "0"),
              token: {
                symbol: tokenMetadata.symbol,
                name: tokenMetadata.name,
                address: reserve.underlyingToken?.address,
                decimals: tokenMetadata.decimals,
                logoUrl:
                  "logoUrl" in tokenMetadata
                    ? tokenMetadata.logoUrl
                    : reserve.underlyingToken?.imageUrl,
              },
              depositAddress: market.address,
              isActive: !reserve.isFrozen && !reserve.isPaused,
            }

            console.log("Created pool:", pool)
            return pool
          }) || []
      )
    }) || []

  console.log("Final pools array:", pools)
  console.log("Final pools length:", pools.length)

  // Sort by APY descending
  const sortedPools = pools.sort((a: Pool, b: Pool) => b.apy - a.apy)

  return {
    data: sortedPools,
    loading,
    error,
  }
}
