import type { SequenceAPIClient } from "@0xsequence/trails-api";
type UseAmountUsdProps = {
    amount?: string | null;
    token?: string | null;
    chainId?: number | null;
    apiClient: SequenceAPIClient;
};
export declare function useAmountUsd({ amount, token, chainId, apiClient, }: UseAmountUsdProps): {
    amountUsd: number | null;
    amountUsdFormatted: string;
};
export {};
//# sourceMappingURL=useAmountUsd.d.ts.map