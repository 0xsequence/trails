import type { WalletClient } from "viem"
import { getChainInfo } from "./chains.js"

export type AttemptSwitchChainParams = {
  walletClient: WalletClient
  desiredChainId: number
}

export async function attemptSwitchChain({
  walletClient,
  desiredChainId,
}: AttemptSwitchChainParams): Promise<void> {
  try {
    // Check if the chain was switched successfully
    let currentChainId = await walletClient.getChainId()
    if (currentChainId === desiredChainId) {
      console.log("[trails-sdk] Chain already switched to:", desiredChainId)
      return
    }

    console.log(
      "[trails-sdk] Switching to chain:",
      desiredChainId,
      "currentChainId",
      currentChainId,
    )
    await walletClient.switchChain({ id: desiredChainId })

    // Check if the chain was switched successfully
    currentChainId = await walletClient.getChainId()
    if (currentChainId !== desiredChainId) {
      throw new Error("Failed to switch chain")
    }

    console.log("[trails-sdk] Chain switched to:", desiredChainId)
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.includes("wallet_addEthereumChain")
    ) {
      const chainInfo = getChainInfo(desiredChainId)
      if (chainInfo) {
        await walletClient.addChain({
          chain: chainInfo,
        })
        return attemptSwitchChain({ walletClient, desiredChainId })
      }
    }

    console.error("[trails-sdk] Chain switch failed:", error)
    throw new Error(
      `[trails-sdk] Failed to switch chain: ${error instanceof Error ? error.message : "Unknown error"}`,
    )
  }
}
