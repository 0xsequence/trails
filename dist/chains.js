import { useQuery } from "@tanstack/react-query";
import * as chains from "viem/chains";
import { getRelaySupportedChains } from "./relaySdk.js";
import { getRpcSequenceProjectAccessKey } from "./config.js";
export const sequenceRpcUrls = {
    [chains.arbitrum.id]: "https://nodes.sequence.app/arbitrum",
    [chains.base.id]: "https://nodes.sequence.app/base",
    [chains.mainnet.id]: "https://nodes.sequence.app/mainnet",
    [chains.optimism.id]: "https://nodes.sequence.app/optimism",
    [chains.gnosis.id]: "https://nodes.sequence.app/gnosis",
    [chains.polygon.id]: "https://nodes.sequence.app/polygon",
    [chains.soneium.id]: "https://nodes.sequence.app/soneium",
    [chains.xai.id]: "https://nodes.sequence.app/xai",
    [chains.apeChain.id]: "https://nodes.sequence.app/apechain",
    [chains.arbitrumNova.id]: "https://nodes.sequence.app/arbitrum-nova",
    [chains.avalanche.id]: "https://nodes.sequence.app/avalanche",
    [chains.b3.id]: "https://nodes.sequence.app/b3",
    [chains.blast.id]: "https://nodes.sequence.app/blast",
    [chains.bsc.id]: "https://nodes.sequence.app/bsc",
};
export const getRpcUrl = (chainId, sequenceProjectAccessKey = getRpcSequenceProjectAccessKey()) => {
    if (!sequenceRpcUrls[chainId]) {
        return null;
    }
    return `${sequenceRpcUrls[chainId]}/${sequenceProjectAccessKey}`;
};
export const supportedSequenceChains = {
    [chains.apeChain.id]: getChainInfo(chains.apeChain.id),
    [chains.arbitrum.id]: getChainInfo(chains.arbitrum.id),
    [chains.arbitrumNova.id]: getChainInfo(chains.arbitrumNova.id),
    [chains.avalanche.id]: getChainInfo(chains.avalanche.id),
    [chains.b3.id]: getChainInfo(chains.b3.id),
    [chains.base.id]: getChainInfo(chains.base.id),
    [chains.blast.id]: getChainInfo(chains.polygon.id),
    [chains.bsc.id]: getChainInfo(chains.bsc.id),
    [chains.mainnet.id]: getChainInfo(chains.mainnet.id),
    [chains.gnosis.id]: getChainInfo(chains.gnosis.id),
    [chains.optimism.id]: getChainInfo(chains.optimism.id),
    [chains.polygon.id]: getChainInfo(chains.polygon.id),
    [chains.soneium.id]: getChainInfo(chains.soneium.id),
    [chains.xai.id]: getChainInfo(chains.xai.id),
};
export const supportedSequenceTestnetChains = {
    [chains.arbitrumSepolia.id]: getChainInfo(chains.arbitrumSepolia.id),
    [chains.avalancheFuji.id]: getChainInfo(chains.avalancheFuji.id),
    [chains.b3Sepolia.id]: getChainInfo(chains.b3Sepolia.id),
    [chains.baseSepolia.id]: getChainInfo(chains.baseSepolia.id),
    [chains.blastSepolia.id]: getChainInfo(chains.blastSepolia.id),
    [chains.bscTestnet.id]: getChainInfo(chains.bscTestnet.id),
    [chains.sepolia.id]: getChainInfo(chains.sepolia.id),
    [chains.gnosisChiado.id]: getChainInfo(chains.gnosisChiado.id),
    [chains.polygonAmoy.id]: getChainInfo(chains.polygonAmoy.id),
    [chains.optimismSepolia.id]: getChainInfo(chains.optimismSepolia.id),
    [chains.soneiumMinato.id]: getChainInfo(chains.soneiumMinato.id),
    [chains.xaiTestnet.id]: getChainInfo(chains.xaiTestnet.id),
};
export const mainnetChainsToTestnetChains = {
    [chains.arbitrum.id]: chains.arbitrumSepolia,
    [chains.avalanche.id]: chains.avalancheFuji,
    [chains.base.id]: chains.baseSepolia,
    [chains.gnosis.id]: chains.gnosisChiado,
    [chains.optimism.id]: chains.optimismSepolia,
    [chains.polygon.id]: chains.polygonAmoy,
    [chains.mainnet.id]: chains.sepolia,
    [chains.xai.id]: chains.xaiTestnet,
    [chains.soneium.id]: chains.soneiumMinato,
    [chains.b3.id]: chains.b3Sepolia,
    [chains.blast.id]: chains.blastSepolia,
    [chains.bsc.id]: chains.bscTestnet,
    [chains.arbitrumNova.id]: chains.arbitrumSepolia,
    [chains.apeChain.id]: chains.sepolia,
};
// Helper to get chain info
export function getChainInfo(chainId, options) {
    const chainInfo = Object.values(chains).find((chain) => chain.id === chainId) || null;
    // Use Sequence RPC by default. We'll want to use public RPC when adding chains to user's metamask wallet.
    if (chainInfo && !options?.usePublicRpc) {
        const rpcUrl = getRpcUrl(chainId);
        if (rpcUrl) {
            chainInfo.rpcUrls = {
                default: {
                    ...chainInfo.rpcUrls.default,
                    http: [rpcUrl],
                },
                public: {
                    ...chainInfo.rpcUrls.public,
                    http: [rpcUrl],
                },
            };
        }
    }
    return chainInfo;
}
// Get testnet chain info from mainnet chain as input
export function getTestnetChainInfo(mainnetChain) {
    let chainId = 0;
    if (typeof mainnetChain === "number" || typeof mainnetChain === "string") {
        chainId = Number(mainnetChain);
    }
    else {
        chainId = mainnetChain.id;
    }
    return mainnetChainsToTestnetChains[chainId] || null;
}
export async function getSupportedSequenceChains() {
    return Object.values(supportedSequenceChains);
}
export async function getSupportedSequenceTestnetChains() {
    return Object.values(supportedSequenceTestnetChains);
}
// Priority chains that should appear first in the list
const PRIORITY_CHAIN_IDS = [1, 8453, 42161, 10, 137];
// Sort function for chains with priority order and then by name
function sortChains(chainList) {
    return chainList.sort((a, b) => {
        // 1. Priority chains first (1, 8453, 42161, 10, 137)
        const aPriority = PRIORITY_CHAIN_IDS.indexOf(a.id);
        const bPriority = PRIORITY_CHAIN_IDS.indexOf(b.id);
        // If both are priority chains, sort by priority order
        if (aPriority !== -1 && bPriority !== -1) {
            return aPriority - bPriority;
        }
        // If only one is a priority chain, prioritize it
        if (aPriority !== -1)
            return -1;
        if (bPriority !== -1)
            return 1;
        // 2. Sort by chain name alphabetically
        return a.name.localeCompare(b.name);
    });
}
export async function getSupportedChains() {
    const sequenceChains = await getSupportedSequenceChains();
    const relayChains = await getRelaySupportedChains();
    // Find intersection of sequence chains and relay chains
    const supportedChains = sequenceChains.filter((sequenceChain) => relayChains.some((relayChain) => relayChain.id === sequenceChain.id));
    // Ensure unique chain IDs by filtering duplicates
    const uniqueChains = supportedChains.filter((chain, index, self) => index === self.findIndex((c) => c.id === chain.id));
    // Sort chains by priority and then by name
    return sortChains(uniqueChains);
}
export function useSupportedChains() {
    const { data: supportedChains = [], isLoading: isLoadingChains } = useQuery({
        queryKey: ["supportedChains"],
        queryFn: getSupportedChains,
        staleTime: 60 * 60 * 1000, // 1 hour - chains rarely change
        gcTime: 24 * 60 * 60 * 1000, // 24 hours - keep in cache for a full day
        refetchOnWindowFocus: false, // Don't refetch when window regains focus
        refetchOnReconnect: false, // Don't refetch on network reconnect
    });
    return {
        supportedChains: supportedChains || [],
        isLoadingChains,
    };
}
export function getIsTestnetChainId(chainId) {
    const testnetChainIds = Object.keys(supportedSequenceTestnetChains);
    return testnetChainIds.includes(chainId.toString());
}
// Get chain color for UI styling
export function getChainColor(chainId) {
    switch (chainId) {
        case 1:
            return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"; // More gray-blue for Ethereum
        case 8453:
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"; // Blue for Base
        case 42161:
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
        case 137:
            return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
        case 10:
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
}
