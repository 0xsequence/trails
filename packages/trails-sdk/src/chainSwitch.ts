import type { WalletClient } from "viem"

export async function attemptSwitchChain(
  walletClient: WalletClient,
  desiredChainId: number,
): Promise<void> {
  try {
    // Check if the chain was switched successfully
    let currentChainId = await walletClient.getChainId()
    if (currentChainId === desiredChainId) {
      console.log("Chain already switched to:", desiredChainId)
      return
    }

    console.log(
      "Switching to chain:",
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

    console.log("Chain switched to:", desiredChainId)
  } catch (error: unknown) {
    console.error("Chain switch failed:", error)
    throw new Error(
      `Failed to switch chain: ${error instanceof Error ? error.message : "Unknown error"}`,
    )
  }
}
