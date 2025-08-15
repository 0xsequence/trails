import type { Chain } from "viem";
export declare const sequenceRpcUrls: Record<number, string>;
export declare const getRpcUrl: (chainId: number, sequenceProjectAccessKey?: string) => string | null;
export declare const supportedSequenceChains: Record<number, Chain>;
export declare const supportedSequenceTestnetChains: Record<number, Chain>;
export declare const mainnetChainsToTestnetChains: Record<number, Chain>;
export declare function getChainInfo(chainId: number, options?: {
    usePublicRpc?: boolean;
}): Chain | null;
export declare function getTestnetChainInfo(mainnetChain: Chain | number): Chain | null;
export declare function getSupportedSequenceChains(): Promise<Chain[]>;
export declare function getSupportedSequenceTestnetChains(): Promise<Chain[]>;
export declare function getSupportedChains(): Promise<Chain[]>;
export declare function useSupportedChains(): {
    supportedChains: Chain[];
    isLoadingChains: boolean;
};
export declare function getIsTestnetChainId(chainId: number): boolean;
export declare function getChainColor(chainId: number): string;
//# sourceMappingURL=chains.d.ts.map