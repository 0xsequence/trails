import * as chains from "viem/chains";
// Helper to get chain info
export function getChainInfo(chainId) {
    return (Object.values(chains).find((chain) => chain.id === chainId) || null);
}
