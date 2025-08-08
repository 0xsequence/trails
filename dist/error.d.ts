export declare function getFullErrorMessage(err: any): string;
export declare function getErrorString(err: unknown): string;
export declare function getIsWalletRejectedError(err: unknown): boolean;
export declare function getIsBalanceTooLowError(err: unknown): boolean;
export declare class InsufficientBalanceError extends Error {
    constructor(message: string);
}
//# sourceMappingURL=error.d.ts.map