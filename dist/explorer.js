import * as chains from "viem/chains";
export function getBaseExplorerUrl(chainId) {
    const chainsArray = Object.values(chains);
    for (const chain of chainsArray) {
        if (chain.id === chainId) {
            return `${chain.blockExplorers?.default?.url}`;
        }
    }
    return "";
}
export function getExplorerUrl({ txHash, chainId }) {
    if (!txHash) {
        return "";
    }
    const baseExplorerUrl = getBaseExplorerUrl(chainId);
    return `${baseExplorerUrl}/tx/${txHash}`;
}
export function getExplorerUrlForAddress({ address, chainId, }) {
    if (!address) {
        return "";
    }
    const baseExplorerUrl = getBaseExplorerUrl(chainId);
    return `${baseExplorerUrl}/address/${address}`;
}
