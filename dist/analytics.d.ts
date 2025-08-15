import { type Event as DatabeatEvent } from "@databeat/tracker";
export declare function pseudonymize(value: string): string;
export declare const EventType: {
    PAGEVIEW: "PAGEVIEW";
    WIDGET_SCREEN: "WIDGET_SCREEN";
    PAYMENT_STARTED: "PAYMENT_STARTED";
    PAYMENT_COMPLETED: "PAYMENT_COMPLETED";
    PAYMENT_ERROR: "PAYMENT_ERROR";
    WALLET_CONNECTED: "WALLET_CONNECTED";
    WALLET_DISCONNECTED: "WALLET_DISCONNECTED";
    INTENT_QUOTE_REQUESTED: "INTENT_QUOTE_REQUESTED";
    INTENT_QUOTE_RECEIVED: "INTENT_QUOTE_RECEIVED";
    INTENT_QUOTE_ERROR: "INTENT_QUOTE_ERROR";
    INTENT_COMMIT_STARTED: "INTENT_COMMIT_STARTED";
    INTENT_COMMIT_COMPLETED: "INTENT_COMMIT_COMPLETED";
    INTENT_COMMIT_ERROR: "INTENT_COMMIT_ERROR";
    TRANSACTION_STARTED: "TRANSACTION_STARTED";
    TRANSACTION_SIGNED: "TRANSACTION_SIGNED";
    TRANSACTION_SUBMITTED: "TRANSACTION_SUBMITTED";
    TRANSACTION_CONFIRMED: "TRANSACTION_CONFIRMED";
    TRANSACTION_ERROR: "TRANSACTION_ERROR";
    RELAYER_CALL_STARTED: "RELAYER_CALL_STARTED";
    RELAYER_CALL_COMPLETED: "RELAYER_CALL_COMPLETED";
    RELAYER_CALL_ERROR: "RELAYER_CALL_ERROR";
};
export type EventTypes = keyof typeof EventType;
export type Event = DatabeatEvent<EventTypes>;
export type EventProps = any;
declare abstract class BaseAnalytics {
    private getCommonProps;
    private getNavigatorProps;
    private getDocumentProps;
    private getWindowProps;
    abstract track(event: EventProps): void;
    trackPageview(): void;
    trackWidgetScreen(data: {
        screen: string;
        userAddress?: string;
        [key: string]: any;
    }): void;
    trackPaymentStarted(data: {
        userAddress?: string;
        intentAddress?: string;
        originChainId?: number;
        destinationChainId?: number;
        originTokenAddress?: string;
        destinationTokenAddress?: string;
        destinationTokenAmount?: string;
        [key: string]: any;
    }): void;
    trackPaymentCompleted(data: {
        userAddress?: string;
        intentAddress?: string;
        [key: string]: any;
    }): void;
    trackPaymentError(data: {
        error: string;
        userAddress?: string;
        intentAddress?: string;
        [key: string]: any;
    }): void;
    trackWalletConnected(data: {
        walletType: string;
        address: string;
        chainId: number;
        [key: string]: any;
    }): void;
    trackWalletDisconnected(data?: {
        [key: string]: any;
    }): void;
    trackIntentQuoteRequested(data: {
        originChainId: number;
        destinationChainId: number;
        originTokenAddress?: string;
        destinationTokenAddress?: string;
        userAddress?: string;
        [key: string]: any;
    }): void;
    trackIntentQuoteReceived(data: {
        quoteId: string;
        totalFeeUSD?: string;
        trailsFixedFeeUSD?: number;
        crossChainFeeTotalUSD?: number;
        takerFeeUSD?: number;
        providerFeeUSD?: number;
        trailsSwapFeeUSD?: number;
        gasFeesPerChainUSD?: number[];
        originTokenTotalAmount?: string;
        destinationTokenAmount?: string;
        provider?: string;
        feeToken?: string;
        userAddress?: string;
        intentAddress?: string;
        [key: string]: any;
    }): void;
    trackIntentQuoteError(data: {
        error: string;
        userAddress?: string;
        originChainId?: number;
        destinationChainId?: number;
        originTokenAddress?: string;
        destinationTokenAddress?: string;
        [key: string]: any;
    }): void;
    trackIntentCommitStarted(data: {
        intentAddress: string;
        userAddress?: string;
        [key: string]: any;
    }): void;
    trackIntentCommitCompleted(data: {
        intentAddress: string;
        userAddress?: string;
        [key: string]: any;
    }): void;
    trackIntentCommitError(data: {
        error: string;
        userAddress?: string;
        intentAddress?: string;
        originChainId?: number;
        destinationChainId?: number;
        [key: string]: any;
    }): void;
    trackTransactionStarted(data: {
        transactionType: string;
        chainId: number;
        userAddress?: string;
        intentAddress?: string;
        [key: string]: any;
    }): void;
    trackTransactionSigned(data: {
        transactionHash: string;
        userAddress?: string;
        intentAddress?: string;
        [key: string]: any;
    }): void;
    trackTransactionSubmitted(data: {
        transactionHash: string;
        chainId: number;
        userAddress?: string;
        intentAddress?: string;
        [key: string]: any;
    }): void;
    trackTransactionConfirmed(data: {
        transactionHash: string;
        blockNumber?: number;
        userAddress?: string;
        intentAddress?: string;
        [key: string]: any;
    }): void;
    trackTransactionError(data: {
        transactionHash: string;
        error: string;
        userAddress?: string;
        intentAddress?: string;
        [key: string]: any;
    }): void;
    trackRelayerCallStarted(data: {
        walletAddress?: string;
        contractAddress?: string;
        chainId?: number;
        [key: string]: any;
    }): void;
    trackRelayerCallCompleted(data: {
        walletAddress?: string;
        contractAddress?: string;
        chainId?: number;
        [key: string]: any;
    }): void;
    trackRelayerCallError(data: {
        error: string;
        walletAddress?: string;
        contractAddress?: string;
        chainId?: number;
        [key: string]: any;
    }): void;
}
declare class Analytics extends BaseAnalytics {
    private databeat;
    private loggingEnabled;
    constructor(server: string, config: any);
    identifyUser({ address }: {
        address: string;
    }): void;
    unidentifyUser(): void;
    track(event: EventProps): Promise<void>;
    enable(): void;
    allowTracking(allowTracking: boolean): void;
    disable(): void;
    logEvent(event: EventProps): void;
}
declare class MockAnalytics extends BaseAnalytics {
    private loggingEnabled;
    constructor({ loggingEnabled }: {
        loggingEnabled: boolean;
    });
    identifyUser({ address }: {
        address: string;
    }): this;
    unidentifyUser(): this;
    enable(): this;
    allowTracking(_allowTracking: boolean): this;
    track(event: EventProps): this;
    disable(): this;
    logEvent(event: EventProps): void;
}
export declare const getAnalytics: () => Analytics | MockAnalytics;
export declare const enableAnalytics: () => void;
export declare const disableAnalytics: () => void;
export declare const trackPageview: () => void;
export declare const trackWidgetScreen: (data: {
    screen: string;
    userAddress?: string;
    [key: string]: any;
}) => void;
export declare const trackPaymentStarted: (data: {
    userAddress?: string;
    intentAddress?: string;
    originChainId?: number;
    destinationChainId?: number;
    originTokenAddress?: string;
    destinationTokenAddress?: string;
    destinationTokenAmount?: string;
    [key: string]: any;
}) => void;
export declare const trackPaymentCompleted: (data: {
    userAddress?: string;
    intentAddress?: string;
    [key: string]: any;
}) => void;
export declare const trackPaymentError: (data: {
    error: string;
    userAddress?: string;
    intentAddress?: string;
    [key: string]: any;
}) => void;
export declare const trackWalletConnected: (data: {
    walletType: string;
    address: string;
    chainId: number;
    [key: string]: any;
}) => void;
export declare const trackWalletDisconnected: (data?: {
    [key: string]: any;
}) => void;
export declare const trackIntentQuoteRequested: (data: {
    originChainId: number;
    destinationChainId: number;
    tokenAddress?: string;
    userAddress?: string;
    [key: string]: any;
}) => void;
export declare const trackIntentQuoteReceived: (data: {
    quoteId: string;
    totalFeeUSD?: string;
    trailsFixedFeeUSD?: number;
    crossChainFeeTotalUSD?: number;
    takerFeeUSD?: number;
    providerFeeUSD?: number;
    trailsSwapFeeUSD?: number;
    gasFeesPerChainUSD?: number[];
    originTokenTotalAmount?: string;
    destinationTokenAmount?: string;
    provider?: string;
    feeToken?: string;
    userAddress?: string;
    intentAddress?: string;
    [key: string]: any;
}) => void;
export declare const trackIntentQuoteError: (data: {
    error: string;
    userAddress?: string;
    originChainId?: number;
    destinationChainId?: number;
    originTokenAddress?: string;
    destinationTokenAddress?: string;
    [key: string]: any;
}) => void;
export declare const trackIntentCommitStarted: (data: {
    intentAddress: string;
    userAddress?: string;
    originChainId?: number;
    destinationChainId?: number;
    [key: string]: any;
}) => void;
export declare const trackIntentCommitCompleted: (data: {
    intentAddress: string;
    userAddress?: string;
    originChainId?: number;
    destinationChainId?: number;
    [key: string]: any;
}) => void;
export declare const trackIntentCommitError: (data: {
    error: string;
    userAddress?: string;
    intentAddress?: string;
    originChainId?: number;
    destinationChainId?: number;
    [key: string]: any;
}) => void;
export declare const trackTransactionStarted: (data: {
    transactionType: string;
    chainId: number;
    userAddress?: string;
    intentAddress?: string;
    [key: string]: any;
}) => void;
export declare const trackTransactionSigned: (data: {
    transactionHash: string;
    userAddress?: string;
    intentAddress?: string;
    [key: string]: any;
}) => void;
export declare const trackTransactionSubmitted: (data: {
    transactionHash: string;
    chainId: number;
    userAddress?: string;
    intentAddress?: string;
    [key: string]: any;
}) => void;
export declare const trackTransactionConfirmed: (data: {
    transactionHash: string;
    blockNumber?: number;
    userAddress?: string;
    intentAddress?: string;
    [key: string]: any;
}) => void;
export declare const trackTransactionError: (data: {
    transactionHash: string;
    error: string;
    userAddress?: string;
    intentAddress?: string;
    [key: string]: any;
}) => void;
export declare const trackRelayerCallStarted: (data: {
    walletAddress?: string;
    contractAddress?: string;
    chainId?: number;
    [key: string]: any;
}) => void;
export declare const trackRelayerCallCompleted: (data: {
    walletAddress?: string;
    contractAddress?: string;
    chainId?: number;
    [key: string]: any;
}) => void;
export declare const trackRelayerCallError: (data: {
    error: string;
    walletAddress?: string;
    contractAddress?: string;
    chainId?: number;
    [key: string]: any;
}) => void;
export {};
//# sourceMappingURL=analytics.d.ts.map