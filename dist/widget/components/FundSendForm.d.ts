/**
 * FundSendForm Component - Requirements:
 *
 * - Be able to toggle between token and USD input
 * - Limit USD input display to 2 decimals
 * - Token display limit should be 8 decimals
 * - Input field should be limited to 16 chars
 * - Input field should limit decimals to 8
 * - When toggling to USD input, only show 2 decimals max in input, but allow user to enter up to 8 as state previously
 * - Input amount to useSendForm should always be in terms of the token, not USD
 * - I should be able to enter decimals into input field, entering periods and 0s should work
 * - I should be able to backspace chars in input field
 */
import type React from "react";
import type { Account, WalletClient } from "viem";
import type { TransactionState } from "../../transactions.js";
import type { RelayerEnv } from "../../relayer.js";
import type { ActiveTheme } from "../../theme.js";
import type { OnCompleteProps, Token } from "../hooks/useSendForm.js";
import type { PrepareSendQuote } from "../../prepareSend.js";
interface FundSendFormProps {
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
    onError: (error: Error | string | null) => void;
    onWaitingForWalletConfirm: (props: PrepareSendQuote) => void;
    paymasterUrls?: Array<{
        chainId: number;
        url: string;
    }>;
    gasless?: boolean;
    setWalletConfirmRetryHandler: (handler: () => Promise<void>) => void;
}
export declare const FundSendForm: React.FC<FundSendFormProps>;
export {};
//# sourceMappingURL=FundSendForm.d.ts.map