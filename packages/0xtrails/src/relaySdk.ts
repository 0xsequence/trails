import {
  convertViemChainToRelayChain,
  createClient,
  getClient,
  MAINNET_RELAY_API,
} from "@reservoir0x/relay-sdk"
import type { WalletClient } from "viem"
import * as chains from "viem/chains"

export type Chain = any
export type RelayQuote = any
export type RelayExecuteResult = any
export type RelayProgressData = any

createClient({
  baseApiUrl: MAINNET_RELAY_API,
  source: "Trails",
  chains: Object.values(chains).map((chain: Chain) =>
    convertViemChainToRelayChain(chain),
  ),
})

export interface RelayQuoteOptions {
  wallet: WalletClient
  chainId: number
  toChainId?: number
  amount: string
  currency: string
  toCurrency?: string
  tradeType?: "EXACT_INPUT" | "EXACT_OUTPUT"
  txs: Array<{
    to: string
    value: string
    data: string
  }>
  recipient?: string
}

export interface RelayExecuteOptions {
  quote: RelayQuote
  wallet: WalletClient
  onProgress?: (data: RelayProgressData) => void
}

/**
 * Get a quote for a relay transaction
 */
export async function getRelaySDKQuote(
  options: RelayQuoteOptions,
): Promise<RelayQuote> {
  try {
    const client = getClient()
    if (!client) {
      throw new Error("Relay client not available")
    }

    console.log("[trails-sdk] getRelaySDKQuote", options)

    const quote = await client.actions.getQuote({
      wallet: options.wallet,
      chainId: options.chainId,
      toChainId: options.toChainId || options.chainId,
      amount: options.amount,
      currency: options.currency,
      toCurrency: options.toCurrency || options.currency,
      tradeType: options.tradeType || "EXACT_OUTPUT",
      txs: options.txs,
      user: options.wallet.account!.address,
      recipient: options.recipient || options.wallet.account!.address,
    })

    return quote
  } catch (error) {
    console.error("[trails-sdk] Error getting relay quote:", error)
    throw error
  }
}

/**
 * Execute a relay transaction
 */
export async function relaySDKExecute(
  options: RelayExecuteOptions,
): Promise<RelayExecuteResult> {
  try {
    const client = getClient()
    if (!client) {
      throw new Error("Relay client not available")
    }

    console.log("[trails-sdk] relaysdkclient", client.chains, options.quote)

    const result = await client.actions.execute({
      quote: options.quote,
      wallet: options.wallet,
      onProgress:
        options.onProgress ||
        ((data) => {
          console.log("[trails-sdk] Relay progress:", data)
        }),
    })

    return result
  } catch (error) {
    console.error("[trails-sdk] Error executing relay transaction:", error)
    throw error
  }
}

/**
 * Helper function to create a simple relay transaction for a contract call
 */
export async function createSimpleRelayTransaction(
  wallet: WalletClient,
  contractAddress: string,
  callData: string,
  value: string,
  chainId: number,
  currency: string = "0x0000000000000000000000000000000000000000", // ETH
): Promise<RelayQuote> {
  const options: RelayQuoteOptions = {
    wallet,
    chainId,
    amount: value,
    currency,
    txs: [
      {
        to: contractAddress,
        value,
        data: callData,
      },
    ],
  }

  return await getRelaySDKQuote(options)
}

/**
 * Helper function to execute a simple relay transaction
 */
export async function executeSimpleRelayTransaction(
  quote: RelayQuote,
  wallet: WalletClient,
  onProgress?: RelayExecuteOptions["onProgress"],
): Promise<RelayExecuteResult> {
  return await relaySDKExecute({
    quote,
    wallet,
    onProgress,
  })
}

export function getTxHashFromRelayResult(result: RelayExecuteResult): string {
  return result?.data?.steps?.[result?.data?.steps!.length - 1]?.items?.[0]
    ?.txHashes?.[0]?.txHash
}

// Source: https://docs.relay.link/resources/supported-chains
export const relaySupportedChains: Record<number, Chain> = {
  [chains.abstract.id]: chains.abstract,
  [chains.ancient8.id]: chains.ancient8,
  [chains.apeChain.id]: chains.apeChain,
  [chains.arbitrum.id]: chains.arbitrum,
  [chains.arbitrumNova.id]: chains.arbitrumNova,
  [chains.arenaz.id]: chains.arenaz,
  [chains.avalanche.id]: chains.avalanche,
  [chains.b3.id]: chains.b3,
  [chains.base.id]: chains.base,
  [chains.berachain.id]: chains.berachain,
  [chains.blast.id]: chains.blast,
  [chains.opBNB.id]: chains.opBNB,
  [chains.bob.id]: chains.bob,
  [chains.boba.id]: chains.boba,
  [chains.celo.id]: chains.celo,
  [chains.corn.id]: chains.corn,
  [chains.cronos.id]: chains.cronos,
  [chains.cyber.id]: chains.cyber,
  [chains.degen.id]: chains.degen,
  [chains.mainnet.id]: chains.mainnet,
  [chains.flowMainnet.id]: chains.flowMainnet,
  [chains.forma.id]: chains.forma,
  [chains.funkiMainnet.id]: chains.funkiMainnet,
  [chains.gnosis.id]: chains.gnosis,
  [chains.gravity.id]: chains.gravity,
  [chains.hemi.id]: chains.hemi,
  [chains.hychain.id]: chains.hychain,
  [chains.ink.id]: chains.ink,
  [chains.linea.id]: chains.linea,
  [chains.lisk.id]: chains.lisk,
  [chains.manta.id]: chains.manta,
  [chains.mantle.id]: chains.mantle,
  [chains.metis.id]: chains.metis,
  [chains.mint.id]: chains.mint,
  [chains.mode.id]: chains.mode,
  [chains.morph.id]: chains.morph,
  [chains.optimism.id]: chains.optimism,
  [chains.plume.id]: chains.plume,
  [chains.polygon.id]: chains.polygon,
  [chains.polygonZkEvm.id]: chains.polygonZkEvm,
  [chains.ronin.id]: chains.ronin,
  [chains.redstone.id]: chains.redstone,
  [chains.sanko.id]: chains.sanko,
  [chains.scroll.id]: chains.scroll,
  [chains.sei.id]: chains.sei,
  [chains.shape.id]: chains.shape,
  [chains.soneium.id]: chains.soneium,
  [chains.sonic.id]: chains.sonic,
  [chains.story.id]: chains.story,
  [chains.superposition.id]: chains.superposition,
  [chains.superseed.id]: chains.superseed,
  [chains.swellchain.id]: chains.swellchain,
  [chains.taiko.id]: chains.taiko,
  [chains.tron.id]: chains.tron,
  [chains.unichain.id]: chains.unichain,
  [chains.worldchain.id]: chains.worldchain,
  [chains.xai.id]: chains.xai,
  [chains.zeroG.id]: chains.zeroG,
  [chains.zircuit.id]: chains.zircuit,
  [chains.zksync.id]: chains.zksync,
  [chains.zora.id]: chains.zora,
}

export async function getRelaySupportedChains(): Promise<Chain[]> {
  return Object.values(relaySupportedChains)
}

export async function isChainSupported(chainId: number): Promise<boolean> {
  return Object.keys(relaySupportedChains).includes(chainId.toString())
}

export interface RelayToken {
  id: string
  symbol: string
  name: string
  contractAddress: string
  decimals: number
  chainId: number
  chainName: string
  imageUrl: string
}

export async function getRelaySupportedTokens(): Promise<RelayToken[]> {
  try {
    const chains = await fetchRelayChains()

    const tokens: RelayToken[] = []

    chains.forEach((chain) => {
      if (!chain.disabled) {
        // Add native currency
        tokens.push({
          id: chain.currency.id,
          symbol: chain.currency.symbol,
          name: chain.currency.name,
          contractAddress: chain.currency.address,
          decimals: chain.currency.decimals,
          chainId: chain.id,
          chainName: chain.displayName || chain.name,
          imageUrl: "", // Native currencies typically don't have logoURI
        })

        // Add featured tokens
        chain.featuredTokens.forEach((token) => {
          tokens.push({
            id: token.id,
            symbol: token.symbol,
            name: token.name,
            contractAddress: token.address,
            decimals: token.decimals,
            chainId: chain.id,
            chainName: chain.displayName || chain.name,
            imageUrl: token.metadata?.logoURI || "",
          })
        })

        // Add ERC20 currencies
        chain.erc20Currencies.forEach((token) => {
          tokens.push({
            id: token.id,
            symbol: token.symbol,
            name: token.name,
            contractAddress: token.address,
            decimals: token.decimals,
            chainId: chain.id,
            chainName: chain.displayName || chain.name,
            imageUrl: token.metadata?.logoURI || "",
          })
        })

        // Add solver currencies (fallback for chains that might not have featuredTokens/erc20Currencies)
        chain.solverCurrencies.forEach((token) => {
          tokens.push({
            id: token.id,
            symbol: token.symbol,
            name: token.name,
            contractAddress: token.address,
            decimals: token.decimals,
            chainId: chain.id,
            chainName: chain.displayName || chain.name,
            imageUrl: token.metadata?.logoURI || "",
          })
        })
      }
    })

    // Remove duplicates by chainId and contractAddress
    const uniqueTokens = tokens.filter(
      (token, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.chainId === token.chainId &&
            t.contractAddress.toLowerCase() ===
              token.contractAddress.toLowerCase(),
        ),
    )

    console.log(
      `[trails-sdk] Fetched ${uniqueTokens.length} unique tokens from Relay API`,
    )

    return uniqueTokens
  } catch (error) {
    console.error("[trails-sdk] Error fetching Relay supported tokens:", error)
    return []
  }
}

// Types for Relay API response
interface RelayApiToken {
  id: string
  symbol: string
  name: string
  address: string
  decimals: number
  metadata?: {
    logoURI?: string
  }
  supportsBridging?: boolean
  withdrawalFee?: number
  depositFee?: number
  surgeEnabled?: boolean
  supportsPermit?: boolean
}

interface RelayChain {
  id: number
  name: string
  displayName: string
  disabled: boolean
  currency: {
    id: string
    symbol: string
    name: string
    address: string
    decimals: number
    supportsBridging: boolean
  }
  featuredTokens: RelayApiToken[]
  erc20Currencies: RelayApiToken[]
  solverCurrencies: RelayApiToken[]
}

interface RelayChainsResponse {
  chains: RelayChain[]
}

// Cache for chains data
let cachedChains: RelayChain[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function fetchRelayChains(): Promise<RelayChain[]> {
  const now = Date.now()

  // Return cached data if still valid
  if (cachedChains && now - cacheTimestamp < CACHE_DURATION) {
    return cachedChains
  }

  try {
    const response = await fetch("https://api.relay.link/chains")
    if (!response.ok) {
      throw new Error(`Failed to fetch chains: ${response.status}`)
    }

    const data: RelayChainsResponse = await response.json()
    cachedChains = data.chains
    cacheTimestamp = now

    return data.chains
  } catch (error) {
    console.error("[trails-sdk] Error fetching Relay chains:", error)
    // Return cached data if available, even if expired
    if (cachedChains) {
      return cachedChains
    }
    throw error
  }
}

export type GetIsRouteSupportedOptions = {
  originChainId: number
  destinationChainId: number
  amount: string
  originToken: string
  destinationToken: string
}

export async function getIsRouteSupported({
  originChainId,
  destinationChainId,
  amount,
  originToken,
  destinationToken,
}: GetIsRouteSupportedOptions): Promise<boolean> {
  try {
    // Fetch supported chains from Relay API
    const chains = await fetchRelayChains()

    // Check if both chains are supported and not disabled
    const originChain = chains.find((chain) => chain.id === originChainId)
    const destinationChain = chains.find(
      (chain) => chain.id === destinationChainId,
    )

    if (
      !originChain ||
      !destinationChain ||
      originChain.disabled ||
      destinationChain.disabled
    ) {
      return false
    }

    // Check if destination token is supported on destination chain
    const isDestinationTokenSupported = destinationChain.solverCurrencies.some(
      (currency) =>
        currency.address.toLowerCase() === destinationToken.toLowerCase(),
    )

    if (!isDestinationTokenSupported) {
      return false
    }

    // If we have a client available, try to get a quote to verify the route
    const client = getClient()
    if (client) {
      try {
        const sender = "0x1111111111111111111111111111111111111111"

        const quote = await client.actions.getQuote({
          chainId: originChainId,
          toChainId: destinationChainId,
          amount: amount,
          currency: originToken,
          toCurrency: destinationToken,
          tradeType: "EXACT_OUTPUT",
          txs: [],
          user: sender,
          recipient: sender,
        })

        return quote.steps.length > 0
      } catch (error) {
        console.warn(
          "[trails-sdk] Quote check failed, falling back to chain/token validation:",
          error,
        )
        // If quote fails, we still return true if chains and tokens are supported
        return true
      }
    }

    // If no client available, return true if chains and tokens are supported
    return true
  } catch (error) {
    console.error("[trails-sdk] Error checking route support:", error)
    return false
  }
}
