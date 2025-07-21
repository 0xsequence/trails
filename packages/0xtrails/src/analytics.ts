import { Databeat, Event as DatabeatEvent } from "@databeat/tracker"
import { DATABEAT_KEY, DATABEAT_SERVER } from "./constants.js"
import { getQueryParam } from "./queryParams.js"

export const EventType = {
  PAGEVIEW: "PAGEVIEW" as const,
  WIDGET_SCREEN: "WIDGET_SCREEN" as const,
  PAYMENT_START: "PAYMENT_START" as const,
  PAYMENT_COMPLETED: "PAYMENT_COMPLETED" as const,
  PAYMENT_ERROR: "PAYMENT_ERROR" as const,
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

  trackWidgetScreen(screen: string, props?: EventProps) {
    this.track({
      event: "WIDGET_SCREEN",
      props: {
        ...this.getCommonProps(),
        screen,
        ...props,
      },
    })
  }

  trackPaymentStart(props?: EventProps) {
    this.track({
      event: "PAYMENT_START",
      props: {
        ...this.getCommonProps(),
        ...props,
      },
    })
  }

  trackPaymentCompleted(props?: EventProps) {
    this.track({
      event: "PAYMENT_COMPLETED",
      props: {
        ...this.getCommonProps(),
        ...props,
      },
    })
  }

  trackPaymentError(error: string, props?: EventProps) {
    this.track({
      event: "PAYMENT_ERROR",
      props: {
        ...this.getCommonProps(),
        error,
        ...props,
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

export const trackWidgetScreen = (screen: string, props?: EventProps) => {
  const analytics = getAnalytics()
  analytics.trackWidgetScreen(screen, props)
}

export const trackPaymentStart = (props?: EventProps) => {
  const analytics = getAnalytics()
  analytics.trackPaymentStart(props)
}

export const trackPaymentCompleted = (props?: EventProps) => {
  const analytics = getAnalytics()
  analytics.trackPaymentCompleted(props)
}
