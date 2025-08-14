import { useAaveMarkets, chainId } from "@aave/react"
import { useMemo } from "react"

// Chain ID to Aave market name mapping
const CHAIN_TO_MARKET_NAME: Record<number, string> = {
  1: "proto_mainnet_v3", // Ethereum Mainnet
  8453: "proto_base_v3", // Base
  42161: "proto_arbitrum_v3", // Arbitrum
  137: "proto_polygon_v3", // Polygon
  10: "proto_optimism_v3", // Optimism
  100: "proto_gnosis_v3", // Gnosis
}

// List: https://aave.com/docs/resources/addresses
const WRAPPED_TOKEN_GATEWAY_ADDRESS: Record<number, string> = {
  1: "0xd01607c3C5eCABa394D8be377a08590149325722",
  137: "0xBC302053db3aA514A3c86B9221082f162B91ad63",
  42161: "0x5283BEcEd7ADF6D003225C13896E536f2D4264FF",
  10: "0x5f2508cAE9923b02316254026CD43d7902866725",
  8453: "0xa0d9C1E9E48Ca30c8d8C3B5D69FF5dc1f6DFfC24",
  100: "0x721B9abAb6511b46b9ee83A1aba23BDAcB004149",
}

export function getAaveV3WrappedTokenGatewayAddress(
  chainId: number,
): string | null {
  return WRAPPED_TOKEN_GATEWAY_ADDRESS[chainId] ?? null
}

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
  poolUrl?: string
  protocolUrl?: string
  wrappedTokenGatewayAddress?: string
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

  console.log("[trails-sdk] === AAVE HOOK DEBUG ===")
  console.log("[trails-sdk] Aave markets data:", markets)
  console.log("[trails-sdk] Loading:", loading)
  console.log("[trails-sdk] Error:", error)
  console.log("[trails-sdk] Markets type:", typeof markets)
  console.log("[trails-sdk] Markets length:", markets?.length)
  console.log("[trails-sdk] ========================")

  // Transform Aave markets data to our Pool interface with caching
  const pools: Pool[] = useMemo(() => {
    if (!markets) return []

    return markets.flatMap((market) => {
      console.log("[trails-sdk] Processing market:", market)
      console.log("[trails-sdk] Market chain:", market.chain)
      console.log("[trails-sdk] Supply reserves:", market.supplyReserves)
      console.log(
        "[trails-sdk] Supply reserves type:",
        typeof market.supplyReserves,
      )
      console.log(
        "[trails-sdk] Supply reserves length:",
        market.supplyReserves?.length,
      )

      if (!market.supplyReserves || market.supplyReserves.length === 0) {
        console.log(
          "[trails-sdk] No supply reserves found for market:",
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
              `[trails-sdk] Reserve ${reserve.underlyingToken?.symbol}: hasSupplyInfo=${hasSupplyInfo}, hasLiquidity=${hasLiquidity}, sizeUSD=${reserve.size?.usd}`,
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
              protocolUrl: "https://app.aave.com/",
              poolUrl: `https://app.aave.com/reserve-overview/?underlyingAsset=${reserve.underlyingToken?.address?.toLowerCase()}&marketName=${CHAIN_TO_MARKET_NAME[market.chain.chainId] || "proto_mainnet_v3"}`,
              wrappedTokenGatewayAddress:
                getAaveV3WrappedTokenGatewayAddress(market.chain.chainId) ||
                undefined,
            }

            console.log("[trails-sdk] pool object:", pool)
            return pool
          }) || []
      )
    })
  }, [markets])

  console.log("[trails-sdk] Final pools array:", pools)
  console.log("[trails-sdk] Final pools length:", pools.length)

  // Sort by APY descending with caching
  const sortedPools = useMemo(() => {
    return pools.sort((a: Pool, b: Pool) => b.apy - a.apy)
  }, [pools])

  return {
    data: sortedPools,
    loading,
    error,
  }
}
