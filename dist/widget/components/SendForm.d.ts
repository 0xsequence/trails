import type React from "react";
import type { Account, WalletClient } from "viem";
import type { TransactionState } from "../../prepareSend.js";
import type { RelayerEnv } from "../../relayer.js";
import type { ActiveTheme } from "../../theme.js";
import type { OnCompleteProps, Token } from "../hooks/useSendForm.js";
interface SendFormProps {
    selectedToken: Token;
    onSend: (amount: string, recipient: string) => void;
    onBack: () => void;
    onConfirm: () => void;
    onComplete: (result: OnCompleteProps) => void;
    account: Account;
    sequenceProjectAccessKey: string;
    apiUrl?: string;
    env?: RelayerEnv;
    toRecipient?: string;
    toAmount?: string;
    toChainId?: number;
    toToken?: string;
    toCalldata?: string;
    walletClient: WalletClient;
    theme?: ActiveTheme;
    onTransactionStateChange: (transactionStates: TransactionState[]) => void;
    useSourceTokenForButtonText?: boolean;
    onError: (error: Error | string | null) => void;
    onWaitingForWalletConfirm: (intentAddress?: string, originTokenInfo?: {
        amount: string;
        amountUsd: string;
        tokenSymbol: string;
        tokenName: string;
        chainId: number;
        imageUrl: string;
    }) => void;
    paymasterUrls?: Array<{
        chainId: number;
        url: string;
    }>;
    gasless?: boolean;
    setWalletConfirmRetryHandler: (handler: () => Promise<void>) => void;
}
export declare const SendForm: React.FC<SendFormProps>;
export default SendForm;
//# sourceMappingURL=SendForm.d.ts.map