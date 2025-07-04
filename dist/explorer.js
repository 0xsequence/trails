import * as chains from "viem/chains";
export function getExplorerUrl(txHash, chainId) {
    const chainsArray = Object.values(chains);
    for (const chain of chainsArray) {
        if (chain.id === chainId) {
            return `${chain.blockExplorers?.default?.url}/tx/${txHash}`;
        }
    }
    return "";
}
