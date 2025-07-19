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
