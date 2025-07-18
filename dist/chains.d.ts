import type { Chain } from "viem";
export declare const supportedSequenceChains: Record<number, Chain>;
export declare const supportedSequenceTestnetChains: Record<number, Chain>;
export declare function getChainInfo(chainId: number): Chain | null;
export declare function getTestnetChainInfo(mainnetChain: Chain | number): Chain | null;
export declare function getSupportedSequenceChains(): Promise<Chain[]>;
export declare function getSupportedSequenceTestnetChains(): Promise<Chain[]>;
export declare function getSupportedChains(): Promise<Chain[]>;
export declare function useSupportedChains(): {
    supportedChains: Chain[];
    isLoadingChains: boolean;
};
//# sourceMappingURL=chains.d.ts.map