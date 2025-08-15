import type { IntentPrecondition } from "@0xsequence/trails-api";
export declare function findPreconditionAddresses(preconditions: IntentPrecondition[], originChainId: number, destinationChainId: number): {
    originAddress?: string;
    destinationAddress?: string;
};
export declare function findChainAndAddressesFromPreconditions(preconditions: IntentPrecondition[]): {
    chainId: number;
    address: string;
}[];
export declare function findFirstPreconditionForChainId(preconditions: IntentPrecondition[], chainId: number): IntentPrecondition | null;
//# sourceMappingURL=preconditions.d.ts.map