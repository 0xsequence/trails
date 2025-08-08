import type React from "react";
import type { Account, WalletClient } from "viem";
import type { TransactionState } from "../../transactions.js";
import type { OnCompleteProps, Token } from "../hooks/useSendForm.js";
import { type PrepareSendQuote } from "../../prepareSend.js";
interface PaySendFormProps {
    selectedToken: Token;
    onSend: (amount: string, recipient: string) => void;
    onBack: () => void;
    onConfirm: () => void;
    onComplete: (result: OnCompleteProps) => void;
    account: Account;
    toRecipient?: string;
    toAmount?: string;
    toChainId?: number;
    toToken?: string;
    toCalldata?: string;
    walletClient: WalletClient;
    onTransactionStateChange: (transactionStates: TransactionState[]) => void;
    onError: (error: Error | string | null) => void;
    onWaitingForWalletConfirm: (props: PrepareSendQuote) => void;
    paymasterUrls?: Array<{
        chainId: number;
        url: string;
    }>;
    gasless?: boolean;
    setWalletConfirmRetryHandler: (handler: () => Promise<void>) => void;
    quoteProvider?: string;
}
export declare const PaySendForm: React.FC<PaySendFormProps>;
export {};
//# sourceMappingURL=PaySendForm.d.ts.map