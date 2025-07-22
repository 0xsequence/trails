import { Databeat, Event as DatabeatEvent } from "@databeat/tracker"
import { DATABEAT_KEY, DATABEAT_SERVER } from "./constants.js"
import { getQueryParam } from "./queryParams.js"
import { Hash } from "ox"
import { Bytes } from "ox"

// Pseudonymize sensitive data like transaction hashes and addresses
export function pseudonymize(value: string): string {
  if (!value) return value

  // Use ox Hash function for proper synchronous hashing
  // Convert any string to Bytes and then to hex
  const inputBytes = Bytes.fromString(value)
  const hashBytes = Hash.sha256(inputBytes)
  const hashHex = Bytes.toHex(hashBytes)
  const id = `anon_${hashHex.replace("0x", "")}`

  return id
}

export const EventType = {
  PAGEVIEW: "PAGEVIEW" as const,
  WIDGET_SCREEN: "WIDGET_SCREEN" as const,
  PAYMENT_START: "PAYMENT_START" as const,
  PAYMENT_COMPLETED: "PAYMENT_COMPLETED" as const,
  PAYMENT_ERROR: "PAYMENT_ERROR" as const,

  // Wallet events
  WALLET_CONNECTED: "WALLET_CONNECTED" as const,
  WALLET_DISCONNECTED: "WALLET_DISCONNECTED" as const,
  WALLET_DEPLOYED: "WALLET_DEPLOYED" as const,
  WALLET_DEPLOYMENT_ERROR: "WALLET_DEPLOYMENT_ERROR" as const,

  // Intent events
  INTENT_QUOTE_REQUESTED: "INTENT_QUOTE_REQUESTED" as const,
  INTENT_QUOTE_RECEIVED: "INTENT_QUOTE_RECEIVED" as const,
  INTENT_QUOTE_ERROR: "INTENT_QUOTE_ERROR" as const,
  INTENT_COMMITTED: "INTENT_COMMITTED" as const,
  INTENT_COMMIT_ERROR: "INTENT_COMMIT_ERROR" as const,

  // Transaction events
  TRANSACTION_STARTED: "TRANSACTION_STARTED" as const,
  TRANSACTION_SIGNED: "TRANSACTION_SIGNED" as const,
  TRANSACTION_SUBMITTED: "TRANSACTION_SUBMITTED" as const,
  TRANSACTION_CONFIRMED: "TRANSACTION_CONFIRMED" as const,
  TRANSACTION_FAILED: "TRANSACTION_FAILED" as const,

  // Cross-chain events
  CROSS_CHAIN_SWAP_STARTED: "CROSS_CHAIN_SWAP_STARTED" as const,
  CROSS_CHAIN_SWAP_COMPLETED: "CROSS_CHAIN_SWAP_COMPLETED" as const,
  CROSS_CHAIN_SWAP_FAILED: "CROSS_CHAIN_SWAP_FAILED" as const,

  // Provider and relayer events
  RELAYER_CALL_STARTED: "RELAYER_CALL_STARTED" as const,
  RELAYER_CALL_COMPLETED: "RELAYER_CALL_COMPLETED" as const,
  RELAYER_CALL_FAILED: "RELAYER_CALL_FAILED" as const,
  PROVIDER_ERROR: "PROVIDER_ERROR" as const,

  // Fee events
  FEE_QUOTE_REQUESTED: "FEE_QUOTE_REQUESTED" as const,
  FEE_QUOTE_RECEIVED: "FEE_QUOTE_RECEIVED" as const,
  FEE_QUOTE_ERROR: "FEE_QUOTE_ERROR" as const,
  FEE_PAYMENT_STARTED: "FEE_PAYMENT_STARTED" as const,
  FEE_PAYMENT_COMPLETED: "FEE_PAYMENT_COMPLETED" as const,
  FEE_PAYMENT_FAILED: "FEE_PAYMENT_FAILED" as const,
}

export type EventTypes = keyof typeof EventType
export type Event = DatabeatEvent<EventTypes>
export type EventProps = any

abstract class BaseAnalytics {
  private getCommonProps(): Record<string, string> {
    return {
      title: document.title,
      url: window.location.href,
      referrer: document.referrer,
    }
  }

  abstract track(event: EventProps): void

  trackPageview() {
    this.track({
      event: "PAGEVIEW",
      props: this.getCommonProps(),
    })
  }

  trackWidgetScreen(data: { screen: string; userAddress?: string }) {
    this.track({
      event: "WIDGET_SCREEN",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
      },
    })
  }

  trackPaymentStart(data: {
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "PAYMENT_START",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackPaymentCompleted(data: {
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "PAYMENT_COMPLETED",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackPaymentError(data: {
    error: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "PAYMENT_ERROR",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  // Wallet tracking methods
  trackWalletConnected(data: {
    walletType: string
    address: string
    [key: string]: any
  }) {
    this.track({
      event: "WALLET_CONNECTED",
      props: {
        ...this.getCommonProps(),
        ...data,
        address: pseudonymize(data.address),
      },
    })
  }

  trackWalletDisconnected(data?: { [key: string]: any }) {
    this.track({
      event: "WALLET_DISCONNECTED",
      props: {
        ...this.getCommonProps(),
        ...(data || {}),
      },
    })
  }

  trackWalletDeployed(data: {
    address: string
    chainId: number
    [key: string]: any
  }) {
    this.track({
      event: "WALLET_DEPLOYED",
      props: {
        ...this.getCommonProps(),
        ...data,
        address: pseudonymize(data.address),
      },
    })
  }

  trackWalletDeploymentError(data: {
    error: string
    chainId: number
    [key: string]: any
  }) {
    this.track({
      event: "WALLET_DEPLOYMENT_ERROR",
      props: {
        ...this.getCommonProps(),
        ...data,
      },
    })
  }

  // Intent tracking methods
  trackIntentQuoteRequested(data: {
    originChainId: number
    destinationChainId: number
    originTokenAddress?: string
    destinationTokenAddress?: string
    userAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "INTENT_QUOTE_REQUESTED",
      props: {
        ...this.getCommonProps(),
        originChainId: data.originChainId,
        destinationChainId: data.destinationChainId,
        originTokenAddress: data.originTokenAddress,
        destinationTokenAddress: data.destinationTokenAddress,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
      },
    })
  }

  trackIntentQuoteReceived(data: {
    quoteId: string
    totalFeeUSD?: string
    trailsFixedFeeUSD?: number
    crossChainFeeTotalUSD?: number
    takerFeeUSD?: number
    providerFeeUSD?: number
    trailsSwapFeeUSD?: number
    gasFeesPerChainUSD?: number[]
    originTokenTotalAmount?: string
    destinationTokenAmount?: string
    provider?: string
    feeToken?: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "INTENT_QUOTE_RECEIVED",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackIntentQuoteError(data: {
    error: string
    userAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "INTENT_QUOTE_ERROR",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
      },
    })
  }

  trackIntentCommitted(data: {
    intentAddress: string
    userAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "INTENT_COMMITTED",
      props: {
        ...this.getCommonProps(),
        ...data,
        intentAddress: pseudonymize(data.intentAddress),
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
      },
    })
  }

  trackIntentCommitError(data: {
    error: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "INTENT_COMMIT_ERROR",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  // Transaction tracking methods
  trackTransactionStarted(data: {
    transactionType: string
    chainId: number
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "TRANSACTION_STARTED",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackTransactionSigned(data: {
    transactionHash: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "TRANSACTION_SIGNED",
      props: {
        ...this.getCommonProps(),
        ...data,
        transactionHash: pseudonymize(data.transactionHash),
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackTransactionSubmitted(data: {
    transactionHash: string
    chainId: number
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "TRANSACTION_SUBMITTED",
      props: {
        ...this.getCommonProps(),
        ...data,
        transactionHash: pseudonymize(data.transactionHash),
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackTransactionConfirmed(data: {
    transactionHash: string
    blockNumber?: number
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "TRANSACTION_CONFIRMED",
      props: {
        ...this.getCommonProps(),
        ...data,
        transactionHash: pseudonymize(data.transactionHash),
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackTransactionFailed(data: {
    transactionHash: string
    error: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "TRANSACTION_FAILED",
      props: {
        ...this.getCommonProps(),
        ...data,
        transactionHash: pseudonymize(data.transactionHash),
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  // Cross-chain tracking methods
  trackCrossChainSwapStarted(data: {
    originChainId: number
    destinationChainId: number
    provider: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "CROSS_CHAIN_SWAP_STARTED",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackCrossChainSwapCompleted(data: {
    originTxHash: string
    destinationTxHash: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "CROSS_CHAIN_SWAP_COMPLETED",
      props: {
        ...this.getCommonProps(),
        ...data,
        originTxHash: pseudonymize(data.originTxHash),
        destinationTxHash: pseudonymize(data.destinationTxHash),
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackCrossChainSwapFailed(data: {
    error: string
    stage: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "CROSS_CHAIN_SWAP_FAILED",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  // Relayer tracking methods
  trackRelayerCallStarted(data: {
    endpoint: string
    chainId: number
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "RELAYER_CALL_STARTED",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackRelayerCallCompleted(data: {
    endpoint: string
    duration: number
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "RELAYER_CALL_COMPLETED",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackRelayerCallFailed(data: {
    endpoint: string
    error: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "RELAYER_CALL_FAILED",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackProviderError(data: {
    provider: string
    error: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "PROVIDER_ERROR",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  // Fee tracking methods
  trackFeeQuoteRequested(data: {
    chainId: number
    tokenAddress?: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "FEE_QUOTE_REQUESTED",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackFeeQuoteReceived(data: {
    quoteId: string
    feeAmount: string
    feeToken: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "FEE_QUOTE_RECEIVED",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackFeeQuoteError(data: {
    error: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "FEE_QUOTE_ERROR",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackFeePaymentStarted(data: {
    feeAmount: string
    feeToken: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "FEE_PAYMENT_STARTED",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackFeePaymentCompleted(data: {
    transactionHash: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "FEE_PAYMENT_COMPLETED",
      props: {
        ...this.getCommonProps(),
        ...data,
        transactionHash: pseudonymize(data.transactionHash),
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }

  trackFeePaymentFailed(data: {
    error: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: "FEE_PAYMENT_FAILED",
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
        ...(data.intentAddress && {
          intentAddress: pseudonymize(data.intentAddress),
        }),
      },
    })
  }
}

class Analytics extends BaseAnalytics {
  private databeat: Databeat<EventTypes>

  constructor(server: string, config: any) {
    super()
    this.databeat = new Databeat<EventTypes>(server, config)
  }

  track(event: EventProps) {
    return this.databeat
      .track(event)
      .catch(() => {})
      .then(() => this.logEvent(event))
  }

  enable() {
    return this.databeat.enable()
  }

  allowTracking(allowTracking: boolean) {
    return this.databeat.allowTracking(allowTracking)
  }

  disable() {
    return this.databeat.disable()
  }

  logEvent(event: EventProps) {
    console.log("[trails-sdk] Analytics track:", event)
  }
}

class MockAnalytics extends BaseAnalytics {
  enable() {
    return this
  }

  allowTracking(allowTracking: boolean) {
    return this
  }

  track(event: EventProps) {
    this.logEvent(event)
    return this
  }

  disable() {
    return this
  }

  logEvent(event: EventProps) {
    console.log("[trails-sdk] MockAnalytics track:", event)
  }
}

let singleton: Analytics | null = null

export const getAnalytics = () => {
  const debugMode = getQueryParam("analyticsDebug") === "true"
  if (!DATABEAT_KEY || debugMode) {
    return new MockAnalytics() // return a dummy analytics object
  }
  if (!singleton) {
    singleton = new Analytics(DATABEAT_SERVER, {
      jwt: DATABEAT_KEY,
    })
  }
  return singleton
}

export const enableAnalytics = () => {
  const analytics = getAnalytics()
  analytics.enable()
  analytics.allowTracking(true)
  analytics.trackPageview()
}

export const disableAnalytics = () => {
  const analytics = getAnalytics()
  analytics.disable()
  analytics.allowTracking(false)
}

export const trackPageview = () => {
  const analytics = getAnalytics()
  analytics.trackPageview()
}

export const trackWidgetScreen = (data: {
  screen: string
  userAddress?: string
}) => {
  const analytics = getAnalytics()
  analytics.trackWidgetScreen(data)
}

export const trackPaymentStart = (data: {
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackPaymentStart(data)
}

export const trackPaymentCompleted = (data: {
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackPaymentCompleted(data)
}

export const trackPaymentError = (data: {
  error: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackPaymentError(data)
}

// Wallet tracking exports
export const trackWalletConnected = (data: {
  walletType: string
  address: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackWalletConnected(data)
}

export const trackWalletDisconnected = (data?: { [key: string]: any }) => {
  const analytics = getAnalytics()
  analytics.trackWalletDisconnected(data)
}

export const trackWalletDeployed = (data: {
  address: string
  chainId: number
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackWalletDeployed(data)
}

export const trackWalletDeploymentError = (data: {
  error: string
  chainId: number
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackWalletDeploymentError(data)
}

// Intent tracking exports
export const trackIntentQuoteRequested = (data: {
  originChainId: number
  destinationChainId: number
  tokenAddress?: string
  userAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackIntentQuoteRequested(data)
}

export const trackIntentQuoteReceived = (data: {
  quoteId: string
  totalFeeUSD?: string
  trailsFixedFeeUSD?: number
  crossChainFeeTotalUSD?: number
  takerFeeUSD?: number
  providerFeeUSD?: number
  trailsSwapFeeUSD?: number
  gasFeesPerChainUSD?: number[]
  originTokenTotalAmount?: string
  destinationTokenAmount?: string
  provider?: string
  feeToken?: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackIntentQuoteReceived(data)
}

export const trackIntentQuoteError = (data: {
  error: string
  userAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackIntentQuoteError(data)
}

export const trackIntentCommitted = (data: {
  intentAddress: string
  userAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackIntentCommitted(data)
}

export const trackIntentCommitError = (data: {
  error: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackIntentCommitError(data)
}

// Transaction tracking exports
export const trackTransactionStarted = (data: {
  transactionType: string
  chainId: number
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackTransactionStarted(data)
}

export const trackTransactionSigned = (data: {
  transactionHash: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackTransactionSigned(data)
}

export const trackTransactionSubmitted = (data: {
  transactionHash: string
  chainId: number
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackTransactionSubmitted(data)
}

export const trackTransactionConfirmed = (data: {
  transactionHash: string
  blockNumber?: number
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackTransactionConfirmed(data)
}

export const trackTransactionFailed = (data: {
  transactionHash: string
  error: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackTransactionFailed(data)
}

// Cross-chain tracking exports
export const trackCrossChainSwapStarted = (data: {
  originChainId: number
  destinationChainId: number
  provider: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackCrossChainSwapStarted(data)
}

export const trackCrossChainSwapCompleted = (data: {
  originTxHash: string
  destinationTxHash: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackCrossChainSwapCompleted(data)
}

export const trackCrossChainSwapFailed = (data: {
  error: string
  stage: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackCrossChainSwapFailed(data)
}

// Relayer tracking exports
export const trackRelayerCallStarted = (data: {
  endpoint: string
  chainId: number
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackRelayerCallStarted(data)
}

export const trackRelayerCallCompleted = (data: {
  endpoint: string
  duration: number
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackRelayerCallCompleted(data)
}

export const trackRelayerCallFailed = (data: {
  endpoint: string
  error: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackRelayerCallFailed(data)
}

export const trackProviderError = (data: {
  provider: string
  error: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackProviderError(data)
}

// Fee tracking exports
export const trackFeeQuoteRequested = (data: {
  chainId: number
  tokenAddress?: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackFeeQuoteRequested(data)
}

export const trackFeeQuoteReceived = (data: {
  quoteId: string
  feeAmount: string
  feeToken: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackFeeQuoteReceived(data)
}

export const trackFeeQuoteError = (data: {
  error: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackFeeQuoteError(data)
}

export const trackFeePaymentStarted = (data: {
  feeAmount: string
  feeToken: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackFeePaymentStarted(data)
}

export const trackFeePaymentCompleted = (data: {
  transactionHash: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackFeePaymentCompleted(data)
}

export const trackFeePaymentFailed = (data: {
  error: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackFeePaymentFailed(data)
}
