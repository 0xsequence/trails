export function getFullErrorMessage(err) {
    const messages = [];
    let current = err;
    while (current) {
        if (current.message) {
            messages.push(current.message);
        }
        // Check for nested error cause
        current = current.cause ?? current.originalError ?? current.error ?? null;
    }
    return messages.join(" | Caused by: ");
}
export function getErrorString(err) {
    return err instanceof Error ? err.message : (err?.toString() ?? "");
}
export function getIsWalletRejectedError(err) {
    const isRejected = /rejected|denied/gi.test(getErrorString(err).toLowerCase());
    return isRejected;
}
export function getIsBalanceTooLowError(err) {
    const isBalanceTooLow = /have enough balance|not enough balance|insufficient balance|insufficient funds|not enough funds|too low/gi.test(getErrorString(err).toLowerCase());
    return isBalanceTooLow;
}
export class InsufficientBalanceError extends Error {
    constructor(message) {
        super(message);
        this.name = "InsufficientBalanceError";
    }
}
