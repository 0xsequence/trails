import type { TokenPrice } from "@0xsequence/trails-api";
import type React from "react";
import { type Account, type WalletClient } from "viem";
import { TradeType, type PrepareSendQuote } from "../../prepareSend.js";
import type { TransactionState } from "../../transactions.js";
import type { SupportedToken } from "../../tokens.js";
export interface Token {
    id: number;
    name: string;
    symbol: string;
    balance: string;
    imageUrl: string;
    chainId: number;
    contractAddress: string;
    tokenPriceUsd?: number;
    balanceUsdFormatted?: string;
    contractInfo?: {
        decimals: number;
        symbol: string;
        name: string;
    };
}
export type TokenInfo = {
    symbol: string;
    name: string;
    imageUrl: string;
    decimals: number;
};
type ChainInfo = {
    id: number;
    name: string;
    imageUrl?: string;
};
type PaymasterUrl = {
    chainId: number;
    url: string;
};
export type OnCompleteProps = {
    transactionStates: TransactionState[];
};
export type UseSendProps = {
    account: Account;
    toAmount?: string;
    toRecipient?: string;
    toChainId?: number;
    toToken?: string;
    toCalldata?: string;
    walletClient: WalletClient;
    onTransactionStateChange: (transactionStates: TransactionState[]) => void;
    onError: (error: Error | string | null) => void;
    onWaitingForWalletConfirm: (quote: PrepareSendQuote) => void;
    paymasterUrls?: PaymasterUrl[];
    gasless?: boolean;
    onSend: (amount: string, recipient: string) => void;
    onConfirm: () => void;
    onComplete: (result: OnCompleteProps) => void;
    selectedToken: Token;
    setWalletConfirmRetryHandler: (handler: () => Promise<void>) => void;
    tradeType?: TradeType;
    quoteProvider?: string;
    fundMethod?: string | null;
    mode?: "pay" | "fund" | "earn";
    onNavigateToMeshConnect?: (props: {
        toTokenSymbol: string;
        toTokenAmount: string;
        toChainId: number;
        toRecipientAddress: string;
    }, quote?: PrepareSendQuote | null) => void;
};
export type UseSendReturn = {
    amount: string;
    amountRaw: string;
    amountUsdDisplay: string;
    balanceUsdDisplay: string;
    chainInfo: ChainInfo | null;
    error: string | null;
    toChainId: number | undefined;
    balanceFormatted: string;
    handleRecipientInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    isChainDropdownOpen: boolean;
    isSubmitting: boolean;
    isLoadingQuote: boolean;
    isTokenDropdownOpen: boolean;
    recipient: string;
    recipientInput: string;
    selectedDestinationChain: ChainInfo | null;
    selectedDestToken: TokenInfo;
    setAmount: (amount: string) => void;
    setRecipient: (recipient: string) => void;
    setRecipientInput: (recipientInput: string) => void;
    setSelectedDestinationChain: (chain: ChainInfo) => void;
    setSelectedDestToken: (token: TokenInfo) => void;
    setSelectedFeeToken: (token: TokenInfo) => void;
    FEE_TOKENS: TokenInfo[];
    supportedTokens: SupportedToken[];
    supportedChains: ChainInfo[];
    ensAddress: string | null;
    isWaitingForWalletConfirm: boolean;
    buttonText: string;
    isValidRecipient: boolean;
    destTokenPrices: TokenPrice[] | null;
    sourceTokenPrices: TokenPrice[] | null;
    selectedToken: Token;
    selectedFeeToken: TokenInfo | null;
    setIsChainDropdownOpen: (isOpen: boolean) => void;
    setIsTokenDropdownOpen: (isOpen: boolean) => void;
    toAmountFormatted: string;
    destinationTokenAddress: string | null;
    isValidCustomToken: boolean;
    prepareSendQuote: PrepareSendQuote | null;
    toAmountDisplay: string;
};
export declare function useSendForm({ account, toAmount, // Custom specified amount
toRecipient, // Custom specified recipient
toChainId, // Custom specified destination chain id
toToken, // Custom specified destination token address or symbol
toCalldata, // Custom specified destination calldata
walletClient, onTransactionStateChange, onError, onWaitingForWalletConfirm, paymasterUrls, gasless, selectedToken, onSend, onConfirm, onComplete, setWalletConfirmRetryHandler, tradeType, quoteProvider, fundMethod, mode, onNavigateToMeshConnect, }: UseSendProps): UseSendReturn;
export {};
//# sourceMappingURL=useSendForm.d.ts.map