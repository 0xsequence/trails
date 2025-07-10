export declare function requestWithTimeout<T>(client: {
    request: (...args: any[]) => Promise<T>;
}, args: Parameters<typeof client.request>, timeoutMs: number): Promise<T>;
export declare function bigintToString(n: bigint): string;
//# sourceMappingURL=utils.d.ts.map