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
