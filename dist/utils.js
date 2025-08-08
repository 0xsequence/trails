export async function requestWithTimeout(client, args, timeoutMs) {
    return Promise.race([
        client.request(...args),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeoutMs)),
    ]);
}
export function bigintToString(n) {
    return n.toString();
}
