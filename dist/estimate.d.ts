import { type PublicClient } from "viem";
/**
 * Estimates gas cost for a transaction on a given chain
 * @param publicClient - Viem public client for the chain
 * @param gasLimit - Gas limit in wei (defaults to 100,000)
 * @returns Promise<bigint> - Estimated gas cost in wei
 */
export declare function estimateGasCost(publicClient: PublicClient, gasLimit?: bigint): Promise<bigint>;
/**
 * Estimates gas cost and returns it formatted as a string
 * @param publicClient - Viem public client for the chain
 * @param gasLimit - Gas limit in wei (defaults to 100,000)
 * @param decimals - Number of decimals for formatting (defaults to 18)
 * @returns Promise<string> - Formatted gas cost string
 */
export declare function estimateGasCostFormatted(publicClient: PublicClient, gasLimit?: bigint, decimals?: number): Promise<string>;
/**
 * Estimates gas cost in USD (requires price feed)
 * @param publicClient - Viem public client for the chain
 * @param nativeTokenPriceUSD - Price of native token in USD
 * @param gasLimit - Gas limit in wei (defaults to 100,000)
 * @returns Promise<number> - Estimated gas cost in USD
 */
export declare function estimateGasCostUsd(publicClient: PublicClient, nativeTokenPriceUsd: number, gasLimit?: bigint): Promise<number>;
//# sourceMappingURL=estimate.d.ts.map