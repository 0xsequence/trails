import type { WalletClient } from "viem";
export type AttemptSwitchChainParams = {
    walletClient: WalletClient;
    desiredChainId: number;
};
export declare function attemptSwitchChain({ walletClient, desiredChainId, }: AttemptSwitchChainParams): Promise<void>;
//# sourceMappingURL=chainSwitch.d.ts.map