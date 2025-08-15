import type React from "react";
import type { PrepareSendQuote } from "../../prepareSend.js";
interface WalletConfirmationProps {
    onBack: () => void;
    onComplete: () => void;
    retryEnabled?: boolean;
    onRetry?: () => void;
    quote?: PrepareSendQuote | null;
}
export declare const WalletConfirmation: React.FC<WalletConfirmationProps>;
export default WalletConfirmation;
//# sourceMappingURL=WalletConfirmation.d.ts.map