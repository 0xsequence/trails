import type React from "react";
import type { ActiveTheme } from "../../theme.js";
import type { PrepareSendQuote } from "../../prepareSend.js";
interface WalletConfirmationProps {
    onBack: () => void;
    onComplete: () => void;
    theme?: ActiveTheme;
    retryEnabled?: boolean;
    onRetry?: () => void;
    quote?: PrepareSendQuote | null;
}
export declare const WalletConfirmation: React.FC<WalletConfirmationProps>;
export default WalletConfirmation;
//# sourceMappingURL=WalletConfirmation.d.ts.map