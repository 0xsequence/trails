import React from "react";
import type { TransactionState } from "../../prepareSend.js";
import type { ActiveTheme } from "../../theme.js";
interface TransferPendingProps {
    onComplete: () => void;
    theme?: ActiveTheme;
    transactionStates: TransactionState[];
}
export declare const TransferPending: React.FC<TransferPendingProps>;
export default TransferPending;
//# sourceMappingURL=TransferPending.d.ts.map