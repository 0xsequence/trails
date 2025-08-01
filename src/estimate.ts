import { type PublicClient, formatUnits } from "viem"

/**
 * Estimates gas cost for a transaction on a given chain
 * @param publicClient - Viem public client for the chain
 * @param gasLimit - Gas limit in wei (defaults to 100,000)
 * @returns Promise<bigint> - Estimated gas cost in wei
 */
export async function estimateGasCost(
  publicClient: PublicClient,
  gasLimit: bigint = 100_000n,
): Promise<bigint> {
  try {
    // Get current gas price from the chain
    const gasPrice = await publicClient.getGasPrice()

    // Calculate gas cost: gas limit * gas price
    const gasCost = gasLimit * gasPrice

    return gasCost
  } catch (error) {
    throw new Error(`Failed to estimate gas cost: ${error}`)
  }
}

/**
 * Estimates gas cost and returns it formatted as a string
 * @param publicClient - Viem public client for the chain
 * @param gasLimit - Gas limit in wei (defaults to 100,000)
 * @param decimals - Number of decimals for formatting (defaults to 18)
 * @returns Promise<string> - Formatted gas cost string
 */
export async function estimateGasCostFormatted(
  publicClient: PublicClient,
  gasLimit: bigint = 100_000n,
  decimals: number = 18,
): Promise<string> {
  const gasCost = await estimateGasCost(publicClient, gasLimit)
  return formatUnits(gasCost, decimals)
}

/**
 * Estimates gas cost in USD (requires price feed)
 * @param publicClient - Viem public client for the chain
 * @param nativeTokenPriceUSD - Price of native token in USD
 * @param gasLimit - Gas limit in wei (defaults to 100,000)
 * @returns Promise<number> - Estimated gas cost in USD
 */
export async function estimateGasCostUsd(
  publicClient: PublicClient,
  nativeTokenPriceUsd: number,
  gasLimit: bigint = 100_000n,
): Promise<number> {
  const gasCost = await estimateGasCost(publicClient, gasLimit)
  const gasCostInEth = parseFloat(formatUnits(gasCost, 18))
  return gasCostInEth * nativeTokenPriceUsd
}
