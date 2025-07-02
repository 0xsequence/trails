import React from "react";
import type { ActiveTheme } from "../../theme.js";
interface TransactionState {
    transactionHash: string;
    explorerUrl: string;
    chainId: number;
    state: "pending" | "failed" | "confirmed";
}
interface TransferPendingProps {
    onComplete: () => void;
    theme?: ActiveTheme;
    transactionStates: TransactionState[];
}
export declare const TransferPending: React.FC<TransferPendingProps>;
export default TransferPending;
//# sourceMappingURL=TransferPending.d.ts.map