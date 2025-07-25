import type React from "react";
import type { ActiveTheme } from "../../theme.js";
import type { PrepareSendFees } from "../../prepareSend.js";
interface WalletConfirmationProps {
    onBack: () => void;
    onComplete: () => void;
    theme?: ActiveTheme;
    amount?: string;
    amountUsd?: string;
    recipient?: string;
    tokenSymbol?: string;
    retryEnabled?: boolean;
    onRetry?: () => void;
    fromTokenSymbol: string;
    fromChainId: number;
    fromTokenImageUrl: string;
    fees?: PrepareSendFees;
    slippageTolerance?: string;
    priceImpact?: string;
    destinationTokenSymbol?: string;
    destinationTokenAmount?: string;
    destinationTokenAmountUsd?: string;
    destinationChainId?: number;
    destinationTokenImageUrl?: string;
}
export declare const WalletConfirmation: React.FC<WalletConfirmationProps>;
export default WalletConfirmation;
//# sourceMappingURL=WalletConfirmation.d.ts.map