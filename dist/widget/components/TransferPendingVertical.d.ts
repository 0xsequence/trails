import type React from "react";
import type { TransactionState } from "../../prepareSend.js";
import type { ActiveTheme } from "../../theme.js";
interface TransferPendingProps {
    onComplete: () => void;
    theme?: ActiveTheme;
    transactionStates: TransactionState[];
    fromAmount: string;
    fromAmountUsd: string;
    fromTokenSymbol: string;
    fromTokenName: string;
    fromChainId: number;
    fromTokenImageUrl?: string;
    timestamp?: number;
}
export declare const TransferPending: React.FC<TransferPendingProps>;
export default TransferPending;
//# sourceMappingURL=TransferPendingVertical.d.ts.map