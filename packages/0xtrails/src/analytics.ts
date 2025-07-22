import { Databeat, type Event as DatabeatEvent } from "@databeat/tracker"
import { Bytes, Hash } from "ox"
import { DATABEAT_KEY, DATABEAT_SERVER } from "./constants.js"
import { getQueryParam } from "./queryParams.js"

// Pseudonymize sensitive data like transaction hashes and addresses
export function pseudonymize(value: string): string {
  if (!value) return value

  // Use ox Hash function for proper synchronous hashing
  // Convert any string to Bytes and then to hex
  const inputBytes = Bytes.fromString(value?.toString() || "")
  const hashBytes = Hash.sha256(inputBytes)
  const hashHex = Bytes.toHex(hashBytes)
  const id = `anon_${hashHex.replace("0x", "")}`

  return id
}

export const EventType = {
  PAGEVIEW: "PAGEVIEW" as const,
  WIDGET_SCREEN: "WIDGET_SCREEN" as const,
  PAYMENT_STARTED: "PAYMENT_STARTED" as const,
  PAYMENT_COMPLETED: "PAYMENT_COMPLETED" as const,
  PAYMENT_ERROR: "PAYMENT_ERROR" as const,

  // Wallet events
  WALLET_CONNECTED: "WALLET_CONNECTED" as const,
  WALLET_DISCONNECTED: "WALLET_DISCONNECTED" as const,

  // Intent events
  INTENT_QUOTE_REQUESTED: "INTENT_QUOTE_REQUESTED" as const,
  INTENT_QUOTE_RECEIVED: "INTENT_QUOTE_RECEIVED" as const,
  INTENT_QUOTE_ERROR: "INTENT_QUOTE_ERROR" as const,
  INTENT_COMMIT_STARTED: "INTENT_COMMIT_STARTED" as const,
  INTENT_COMMIT_COMPLETED: "INTENT_COMMIT_COMPLETED" as const,
  INTENT_COMMIT_ERROR: "INTENT_COMMIT_ERROR" as const,

  // Transaction events
  TRANSACTION_STARTED: "TRANSACTION_STARTED" as const,
  TRANSACTION_SIGNED: "TRANSACTION_SIGNED" as const,
  TRANSACTION_SUBMITTED: "TRANSACTION_SUBMITTED" as const,
  TRANSACTION_CONFIRMED: "TRANSACTION_CONFIRMED" as const,
  TRANSACTION_ERROR: "TRANSACTION_ERROR" as const,

  // Relayer events
  RELAYER_CALL_STARTED: "RELAYER_CALL_STARTED" as const,
  RELAYER_CALL_COMPLETED: "RELAYER_CALL_COMPLETED" as const,
  RELAYER_CALL_ERROR: "RELAYER_CALL_ERROR" as const,
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
      event: EventType.PAGEVIEW,
      props: this.getCommonProps(),
    })
  }

  trackWidgetScreen(data: {
    screen: string
    userAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: EventType.WIDGET_SCREEN,
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
      },
    })
  }

  trackPaymentStarted(data: {
    userAddress?: string
    intentAddress?: string
    originChainId?: number
    destinationChainId?: number
    originTokenAddress?: string
    destinationTokenAddress?: string
    destinationTokenAmount?: string
    [key: string]: any
  }) {
    this.track({
      event: EventType.PAYMENT_STARTED,
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
      event: EventType.PAYMENT_COMPLETED,
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
      event: EventType.PAYMENT_ERROR,
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
    chainId: number
    [key: string]: any
  }) {
    this.track({
      event: EventType.WALLET_CONNECTED,
      props: {
        ...this.getCommonProps(),
        ...data,
        address: pseudonymize(data.address),
      },
    })
  }

  trackWalletDisconnected(data?: { [key: string]: any }) {
    this.track({
      event: EventType.WALLET_DISCONNECTED,
      props: {
        ...this.getCommonProps(),
        ...(data || {}),
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
      event: EventType.INTENT_QUOTE_REQUESTED,
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
      event: EventType.INTENT_QUOTE_RECEIVED,
      props: {
        ...this.getCommonProps(),
        quoteId: pseudonymize(data.quoteId),
        totalFeeUSD: data.totalFeeUSD,
        trailsFixedFeeUSD: data.trailsFixedFeeUSD,
        crossChainFeeTotalUSD: data.crossChainFeeTotalUSD,
        takerFeeUSD: data.takerFeeUSD,
        providerFeeUSD: data.providerFeeUSD,
        trailsSwapFeeUSD: data.trailsSwapFeeUSD,
        gasFeesPerChainUSD: data.gasFeesPerChainUSD,
        originTokenTotalAmount: data.originTokenTotalAmount,
        destinationTokenAmount: data.destinationTokenAmount,
        provider: data.provider,
        feeToken: data.feeToken,
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
    originChainId?: number
    destinationChainId?: number
    originTokenAddress?: string
    destinationTokenAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: EventType.INTENT_QUOTE_ERROR,
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.userAddress && {
          userAddress: pseudonymize(data.userAddress),
        }),
      },
    })
  }

  trackIntentCommitStarted(data: {
    intentAddress: string
    userAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: EventType.INTENT_COMMIT_STARTED,
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

  trackIntentCommitCompleted(data: {
    intentAddress: string
    userAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: EventType.INTENT_COMMIT_COMPLETED,
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
    originChainId?: number
    destinationChainId?: number
    [key: string]: any
  }) {
    this.track({
      event: EventType.INTENT_COMMIT_ERROR,
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
      event: EventType.TRANSACTION_STARTED,
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
      event: EventType.TRANSACTION_SIGNED,
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
      event: EventType.TRANSACTION_SUBMITTED,
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
      event: EventType.TRANSACTION_CONFIRMED,
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

  trackTransactionError(data: {
    transactionHash: string
    error: string
    userAddress?: string
    intentAddress?: string
    [key: string]: any
  }) {
    this.track({
      event: EventType.TRANSACTION_ERROR,
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

  // Relayer tracking methods
  trackRelayerCallStarted(data: {
    walletAddress?: string
    contractAddress?: string
    chainId?: number
    [key: string]: any
  }) {
    this.track({
      event: EventType.RELAYER_CALL_STARTED,
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.walletAddress && {
          walletAddress: pseudonymize(data.walletAddress),
        }),
        ...(data.contractAddress && {
          contractAddress: pseudonymize(data.contractAddress),
        }),
      },
    })
  }

  trackRelayerCallCompleted(data: {
    walletAddress?: string
    contractAddress?: string
    chainId?: number
    [key: string]: any
  }) {
    this.track({
      event: EventType.RELAYER_CALL_COMPLETED,
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.walletAddress && {
          walletAddress: pseudonymize(data.walletAddress),
        }),
        ...(data.contractAddress && {
          contractAddress: pseudonymize(data.contractAddress),
        }),
      },
    })
  }

  trackRelayerCallError(data: {
    error: string
    walletAddress?: string
    contractAddress?: string
    chainId?: number
    [key: string]: any
  }) {
    this.track({
      event: EventType.RELAYER_CALL_ERROR,
      props: {
        ...this.getCommonProps(),
        ...data,
        ...(data.walletAddress && {
          walletAddress: pseudonymize(data.walletAddress),
        }),
        ...(data.contractAddress && {
          contractAddress: pseudonymize(data.contractAddress),
        }),
      },
    })
  }
}

class Analytics extends BaseAnalytics {
  private databeat: Databeat<EventTypes>
  private loggingEnabled: boolean = false

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
    if (this.loggingEnabled) {
      console.log("[trails-sdk] Analytics track:", event)
    }
  }
}

class MockAnalytics extends BaseAnalytics {
  private loggingEnabled: boolean = true

  enable() {
    return this
  }

  allowTracking(_allowTracking: boolean) {
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
    if (this.loggingEnabled) {
      console.log("[trails-sdk] MockAnalytics track:", event)
    }
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
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackWidgetScreen(data)
}

export const trackPaymentStarted = (data: {
  userAddress?: string
  intentAddress?: string
  originChainId?: number
  destinationChainId?: number
  originTokenAddress?: string
  destinationTokenAddress?: string
  destinationTokenAmount?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackPaymentStarted(data)
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
  chainId: number
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackWalletConnected(data)
}

export const trackWalletDisconnected = (data?: { [key: string]: any }) => {
  const analytics = getAnalytics()
  analytics.trackWalletDisconnected(data)
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
  originChainId?: number
  destinationChainId?: number
  originTokenAddress?: string
  destinationTokenAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackIntentQuoteError(data)
}

export const trackIntentCommitStarted = (data: {
  intentAddress: string
  userAddress?: string
  originChainId?: number
  destinationChainId?: number
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackIntentCommitStarted(data)
}

export const trackIntentCommitCompleted = (data: {
  intentAddress: string
  userAddress?: string
  originChainId?: number
  destinationChainId?: number
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackIntentCommitCompleted(data)
}

export const trackIntentCommitError = (data: {
  error: string
  userAddress?: string
  intentAddress?: string
  originChainId?: number
  destinationChainId?: number
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

export const trackTransactionError = (data: {
  transactionHash: string
  error: string
  userAddress?: string
  intentAddress?: string
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackTransactionError(data)
}

// Relayer tracking exports
export const trackRelayerCallStarted = (data: {
  walletAddress?: string
  contractAddress?: string
  chainId?: number
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackRelayerCallStarted(data)
}

export const trackRelayerCallCompleted = (data: {
  walletAddress?: string
  contractAddress?: string
  chainId?: number
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackRelayerCallCompleted(data)
}

export const trackRelayerCallError = (data: {
  error: string
  walletAddress?: string
  contractAddress?: string
  chainId?: number
  [key: string]: any
}) => {
  const analytics = getAnalytics()
  analytics.trackRelayerCallError(data)
}
