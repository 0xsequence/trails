import { Relayer } from "@0xsequence/wallet-core"
import fetch from "isomorphic-fetch"
import { useMemo } from "react"
import { getChainInfo } from "./chains.js"
import { DEFAULT_USE_V3_RELAYERS } from "./constants.js"
import { getSequenceProjectAccessKey } from "./config.js"

export type RelayerOperationStatus = Relayer.OperationStatus
export type RpcRelayer = Relayer.Standard.Rpc.RpcRelayer

export type RelayerConfig = {
  hostname: string
  chainId: number
  rpcUrl: string
}

export type RelayerEnv = "local" | "cors-anywhere" | "dev" | "prod"

export type RelayerEnvConfig = {
  env?: RelayerEnv
  useV3Relayers?: boolean
}

export type { Relayer }

// Wrapped fetch function that includes access token header
function wrappedFetch(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const headers = new Headers(init?.headers)
  headers.set("x-access-key", getSequenceProjectAccessKey())

  return fetch(input, {
    ...init,
    headers,
  })
}

export function getBackupRelayer(
  chainId: number,
): Relayer.Standard.Rpc.RpcRelayer | undefined {
  if (chainId === 42161) {
    return new Relayer.Standard.Rpc.RpcRelayer(
      "https://a1b4a8c5d856.ngrok.app/",
      chainId,
      "https://nodes.sequence.app/arbitrum",
    )
  } else if (chainId === 8453) {
    return new Relayer.Standard.Rpc.RpcRelayer(
      "https://644a6aeb891e.ngrok.app/",
      chainId,
      "https://nodes.sequence.app/base",
    )
  }

  return undefined
}

// TODO: add relayer url to config
export function getRelayerUrl(
  config: RelayerEnvConfig,
  chainId: number,
): string {
  let relayerUrl = ""
  if (config.env === "local") {
    // Use specific ports for different chains in local environment
    if (chainId === 1) {
      // Mainnet
      relayerUrl = "http://0.0.0.0:9969"
    } else if (chainId === 42161) {
      // Arbitrum
      relayerUrl = "http://0.0.0.0:9997"
    } else if (chainId === 10 || chainId === 420) {
      // Optimism
      relayerUrl = "http://0.0.0.0:9998"
    } else if (chainId === 137) {
      // Polygon
      relayerUrl = "http://0.0.0.0:9999"
    } else if (chainId === 8453) {
      // Base
      relayerUrl = "http://0.0.0.0:9996"
    } else {
      return ""
    }

    return relayerUrl
  }

  // For cors-anywhere, dev, and production environments
  const baseUrl =
    config.env === "cors-anywhere"
      ? "http://localhost:8080/https://"
      : config.env === "dev" && config.useV3Relayers
        ? "https://v3-"
        : config.env === "dev"
          ? "https://dev-relayer.sequence.app"
          : "https://"

  // Chain-specific relayer endpoints
  if (config.env === "dev" && config.useV3Relayers) {
    if (chainId === 42161) {
      // Arbitrum
      relayerUrl = "https://v3-arbitrum-relayer.sequence.app"
    } else if (chainId === 8453) {
      // Base
      relayerUrl = "https://v3-base-relayer.sequence.app"
    } else if (chainId === 84532) {
      // Base Sepolia
      relayerUrl = "https://base-sepolia-relayer.sequence.app"
    } else if (chainId === 10) {
      // Optimism
      relayerUrl = "https://v3-optimism-relayer.sequence.app"
    } else if (chainId === 137) {
      // Polygon
      relayerUrl = "https://v3-polygon-relayer.sequence.app"
    } else if (chainId === 1) {
      // Mainnet
      relayerUrl = "https://v3-mainnet-relayer.sequence.app"
    } else if (chainId === 33139) {
      relayerUrl = "https://v3-apechain-relayer.sequence.app"
    } else if (chainId === 42170) {
      relayerUrl = "https://v3-arbitrum-nova-relayer.sequence.app"
    } else if (chainId === 43114) {
      relayerUrl = "https://v3-avalanche-relayer.sequence.app"
    } else if (chainId === 8333) {
      relayerUrl = "https://v3-b3-relayer.sequence.app"
    } else if (chainId === 81457) {
      relayerUrl = "https://v3-blast-relayer.sequence.app"
    } else if (chainId === 100) {
      relayerUrl = "https://v3-gnosis-relayer.sequence.app"
    } else if (chainId === 1868) {
      relayerUrl = "https://v3-soneium-relayer.sequence.app"
    } else if (chainId === 660279) {
      relayerUrl = "https://v3-xai-relayer.sequence.app"
    } else if (chainId === 56) {
      relayerUrl = "https://v3-bsc-relayer.sequence.app"
    } else {
      // Fallback to general dev relayer for other chains if V3 is specified but chain not V3-supported
      relayerUrl = `${baseUrl}${getChainInfo(chainId)!.name?.replace(" ", "-")}-relayer.sequence.app`
    }

    return relayerUrl
  }

  if (config.env === "dev" && !config.useV3Relayers) {
    if (chainId === 42161) {
      // Arbitrum
      relayerUrl = "https://dev-arbitrum-relayer.sequence.app"
    } else if (chainId === 8453) {
      // Base
      relayerUrl = "https://dev-base-relayer.sequence.app"
    } else if (chainId === 84532) {
      // Base Sepolia
      relayerUrl = "https://dev-base-sepolia-relayer.sequence.app"
    } else if (chainId === 10) {
      // Optimism
      relayerUrl = "https://dev-optimism-relayer.sequence.app"
    } else if (chainId === 137) {
      // Polygon
      relayerUrl = "https://dev-polygon-relayer.sequence.app"
    } else if (chainId === 1) {
      // Mainnet
      relayerUrl = "https://dev-mainnet-relayer.sequence.app"
    } else if (chainId === 33139) {
      relayerUrl = "https://dev-apechain-relayer.sequence.app"
    } else if (chainId === 42170) {
      relayerUrl = "https://dev-arbitrum-nova-relayer.sequence.app"
    } else if (chainId === 43114) {
      relayerUrl = "https://dev-avalanche-relayer.sequence.app"
    } else if (chainId === 8333) {
      relayerUrl = "https://dev-b3-relayer.sequence.app"
    } else if (chainId === 81457) {
      relayerUrl = "https://dev-blast-relayer.sequence.app"
    } else if (chainId === 100) {
      relayerUrl = "https://dev-gnosis-relayer.sequence.app"
    } else if (chainId === 1868) {
      relayerUrl = "https://dev-soneium-relayer.sequence.app"
    } else if (chainId === 660279) {
      relayerUrl = "https://dev-xai-relayer.sequence.app"
    } else if (chainId === 56) {
      relayerUrl = "https://dev-bsc-relayer.sequence.app"
    } else {
      // Fallback to general dev relayer for other chains if V3 is specified but chain not V3-supported
      relayerUrl = `${baseUrl}${getChainInfo(chainId)!.name?.replace(" ", "-")}-relayer.sequence.app`
    }

    return relayerUrl
  }

  if (chainId === 42161) {
    // Arbitrum
    relayerUrl = `${baseUrl}arbitrum-relayer.sequence.app`
  } else if (chainId === 10) {
    // Optimism
    relayerUrl = `${baseUrl}optimism-relayer.sequence.app`
  } else if (chainId === 137) {
    // Polygon
    relayerUrl = `${baseUrl}polygon-relayer.sequence.app`
  } else if (chainId === 8453) {
    // Base
    relayerUrl = `${baseUrl}base-relayer.sequence.app`
  } else if (chainId === 43114) {
    // Avalanche
    relayerUrl = `${baseUrl}avalanche-relayer.sequence.app`
  } else if (chainId === 56) {
    // BSC
    relayerUrl = `${baseUrl}bsc-relayer.sequence.app`
  } else if (chainId === 1) {
    // Mainnet
    relayerUrl = `${baseUrl}mainnet-relayer.sequence.app`
  } else {
    // Default fallback
    relayerUrl = `${baseUrl}relayer.sequence.app`
  }

  return relayerUrl
}

export function getRelayer(
  config: RelayerEnvConfig,
  chainId: number,
): Relayer.Standard.Rpc.RpcRelayer {
  const chain = getChainInfo(chainId)

  if (!chain) {
    throw new Error(`Chain with id ${chainId} not found`)
  }

  const rpcUrl = chain.rpcUrls.default.http[0]
  if (!rpcUrl) {
    throw new Error(`No RPC URL found for chain ${chainId}`)
  }

  const relayerUrl = getRelayerUrl(config, chainId)

  return new Relayer.Standard.Rpc.RpcRelayer(
    relayerUrl,
    chainId,
    rpcUrl,
    wrappedFetch,
  )
}

export function useRelayers(
  config: RelayerEnvConfig = {
    useV3Relayers: DEFAULT_USE_V3_RELAYERS,
  },
): {
  relayers: Map<number, Relayer.Standard.Rpc.RpcRelayer>
  getRelayer: (chainId: number) => Relayer.Standard.Rpc.RpcRelayer
  getBackupRelayer: (
    chainId: number,
  ) => Relayer.Standard.Rpc.RpcRelayer | undefined
} {
  const relayers = useMemo(() => {
    const relayerMap = new Map<number, Relayer.Standard.Rpc.RpcRelayer>()
    return relayerMap
  }, [])

  const getCachedRelayer = (
    chainId: number,
  ): Relayer.Standard.Rpc.RpcRelayer => {
    let relayer = relayers.get(chainId)

    if (!relayer) {
      relayer = getRelayer(config, chainId)
      relayers.set(chainId, relayer)
    }

    return relayer
  }

  return {
    relayers,
    getRelayer: getCachedRelayer,
    getBackupRelayer,
  }
}
