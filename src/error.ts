export function getFullErrorMessage(err: any) {
  const messages = []

  let current = err
  while (current) {
    if (current.message) {
      messages.push(current.message)
    }

    // Check for nested error cause
    current = current.cause ?? current.originalError ?? current.error ?? null
  }

  return messages.join(" | Caused by: ")
}

export function getErrorString(err: unknown): string {
  return err instanceof Error ? err.message : (err?.toString() ?? "")
}

export function getIsWalletRejectedError(err: unknown) {
  const isRejected = /rejected|denied/gi.test(getErrorString(err).toLowerCase())
  return isRejected
}

export function getIsBalanceTooLowError(err: unknown) {
  const isBalanceTooLow =
    /have enough balance|not enough balance|insufficient balance|insufficient funds|not enough funds|too low/gi.test(
      getErrorString(err).toLowerCase(),
    )
  return isBalanceTooLow
}

export class InsufficientBalanceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InsufficientBalanceError"
  }
}
