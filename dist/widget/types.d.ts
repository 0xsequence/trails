export interface FeeToken {
    chainId: number;
    name: string;
    symbol: string;
    type: string;
    decimals: number;
    logoURL?: string;
    contractAddress: string;
    tokenID?: string;
}
export interface FeeOption {
    token: FeeToken;
    to: string;
    value: string;
    gasLimit: number;
    feeValue: string;
    decimals: number;
    price: {
        value: number;
        currency: string;
    };
}
export interface FeeQuote {
    _tag: string;
    _quote: string;
}
export interface RelayerFeeOptions {
    options: FeeOption[];
    quote?: FeeQuote;
}
export interface FeeTokenMetadata {
    symbol: string;
    name: string;
    imageUrl: string;
    contractAddress: string;
}
export interface RawFeeOption {
    token: string;
    to: string;
    value: string;
    gasLimit: number;
}
export interface RawFeeQuote {
    _tag: string;
    _quote: unknown;
}
export interface RawRelayerFeeOptions {
    options: RawFeeOption[];
    quote?: RawFeeQuote;
}
//# sourceMappingURL=types.d.ts.map