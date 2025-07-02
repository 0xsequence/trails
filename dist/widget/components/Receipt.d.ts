import React from "react";
import type { TransactionState } from "../../prepareSend.js";
import type { ActiveTheme } from "../../theme.js";
interface ReceiptProps {
    txHash?: string;
    chainId?: number;
    onSendAnother: () => void;
    onClose: () => void;
    theme?: ActiveTheme;
    renderInline?: boolean;
    transactionStates?: TransactionState[];
}
export declare const Receipt: React.FC<ReceiptProps>;
export default Receipt;
//# sourceMappingURL=Receipt.d.ts.map