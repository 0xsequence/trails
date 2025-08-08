import type React from "react";
import type { TransactionState } from "../../transactions.js";
import type { PrepareSendQuote } from "../../prepareSend.js";
interface TransferPendingProps {
    onElapsedTime: (totalCompletionSeconds?: number) => void;
    transactionStates: TransactionState[];
    quote?: PrepareSendQuote | null;
    timestamp?: number;
}
export declare const TransferPending: React.FC<TransferPendingProps>;
export default TransferPending;
//# sourceMappingURL=TransferPendingVertical.d.ts.map