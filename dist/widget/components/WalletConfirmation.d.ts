import type React from "react";
import type { ActiveTheme } from "../../theme.js";
interface WalletConfirmationProps {
    onBack: () => void;
    onComplete: () => void;
    theme?: ActiveTheme;
    amount?: string;
    recipient?: string;
    tokenSymbol?: string;
    retryEnabled?: boolean;
    onRetry?: () => void;
    fromTokenSymbol: string;
    fromChainId: number;
    fromTokenImageUrl: string;
}
export declare const WalletConfirmation: React.FC<WalletConfirmationProps>;
export default WalletConfirmation;
//# sourceMappingURL=WalletConfirmation.d.ts.map