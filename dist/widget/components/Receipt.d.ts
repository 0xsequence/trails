import type React from "react";
import type { TransactionState } from "../../transactions.js";
import type { ActiveTheme } from "../../theme.js";
import type { PrepareSendQuote } from "../../prepareSend.js";
interface ReceiptProps {
    onSendAnother: () => void;
    onClose: () => void;
    theme?: ActiveTheme;
    renderInline?: boolean;
    transactionStates?: TransactionState[];
    totalCompletionSeconds?: number;
    quote?: PrepareSendQuote | null;
}
export declare const Receipt: React.FC<ReceiptProps>;
export default Receipt;
//# sourceMappingURL=Receipt.d.ts.map