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
    fundMethod?: string | null;
    onNavigateToMeshConnect?: (props: {
        toTokenSymbol: string;
        toTokenAmount: string;
        toChainId: number;
        toRecipientAddress: string;
    }, quote?: PrepareSendQuote | null) => void;
    onAmountUpdate?: (amount: string) => void;
    mode?: "pay" | "fund" | "earn";
    selectedPool?: {
        id: string;
        name: string;
        protocol: string;
        chainId: number;
        apy: number;
        tvl: number;
        token: {
            symbol: string;
            name: string;
            address: string;
            decimals: number;
            logoUrl?: string;
        };
        depositAddress: string;
        isActive: boolean;
        poolUrl?: string;
        protocolUrl?: string;
    } | null;
}
export declare const PaySendForm: React.FC<PaySendFormProps>;
export {};
//# sourceMappingURL=PaySendForm.d.ts.map