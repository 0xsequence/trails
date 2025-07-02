import type { AnypayExecutionInfo, CommitIntentConfigReturn, GetIntentCallsPayloadsArgs, GetIntentCallsPayloadsReturn as GetIntentCallsPayloadsReturnFromAPI, IntentCallsPayload, IntentPrecondition, SequenceAPIClient } from "@0xsequence/anypay-api";
import { type Context } from "@0xsequence/wallet-primitives";
import { Address, type Hex } from "ox";
import { type Account, type Chain, type WalletClient } from "viem";
export interface MetaTxnFeeDetail {
    metaTxnID: string;
    estimatedGasLimit: string;
    feeNative: string;
}
export interface ChainExecuteQuote {
    chainId: string;
    totalGasLimit: string;
    gasPrice: string;
    totalFeeAmount: string;
    nativeTokenSymbol: string;
    nativeTokenPrice?: string;
    metaTxnFeeDetails: Array<MetaTxnFeeDetail>;
    totalFeeUSD?: string;
}
export interface ExecuteQuote {
    chainQuotes: Array<ChainExecuteQuote>;
}
export interface CrossChainFee {
    providerFee: string;
    anypaySwapFee: string;
    providerFeeUSD: number;
    anypaySwapFeeUSD: number;
    totalFeeAmount: string;
    totalFeeUSD: number;
}
export interface AnypayFee {
    executeQuote: ExecuteQuote;
    crossChainFee?: CrossChainFee;
    anypayFixedFeeUSD?: number;
    feeToken?: string;
    originTokenTotalAmount?: string;
    totalFeeAmount?: string;
    totalFeeUSD?: string;
    quoteProvider?: string;
}
export type QuoteProvider = "lifi" | "relay";
export type GetIntentCallsPayloadsReturn = GetIntentCallsPayloadsReturnFromAPI;
export type OriginCallParams = {
    to: `0x${string}` | null;
    data: Hex.Hex | null;
    value: bigint | null;
    chainId: number | null;
    error?: string;
};
export type SendOriginCallTxArgs = {
    to: string;
    data: Hex.Hex;
    value: bigint;
    chain: Chain;
};
export declare function getIntentCallsPayloads(apiClient: SequenceAPIClient, args: GetIntentCallsPayloadsArgs): Promise<GetIntentCallsPayloadsReturn>;
export declare function calculateIntentAddress(mainSigner: string, calls: Array<IntentCallsPayload>, executionInfosArg: Array<AnypayExecutionInfo> | null | undefined, sapientType?: QuoteProvider): `0x${string}`;
export declare function commitIntentConfig(apiClient: SequenceAPIClient, mainSignerAddress: string, calls: Array<IntentCallsPayload>, preconditions: Array<IntentPrecondition>, executionInfos: Array<AnypayExecutionInfo>, sapientType?: QuoteProvider): Promise<CommitIntentConfigReturn>;
export declare function sendOriginTransaction(account: Account, walletClient: WalletClient, originParams: SendOriginCallTxArgs): Promise<`0x${string}`>;
export interface OriginTokenParam {
    address: Address.Address;
    chainId: bigint;
}
export interface DestinationTokenParam {
    address: Address.Address;
    chainId: bigint;
    amount: bigint;
}
export declare function hashIntentParams({ userAddress, nonce, originTokens, destinationCalls, destinationTokens, }: {
    userAddress: Address.Address;
    nonce: bigint;
    originTokens: OriginTokenParam[];
    destinationCalls: Array<IntentCallsPayload>;
    destinationTokens: DestinationTokenParam[];
}): string;
export declare function bigintReplacer(_key: string, value: any): any;
export declare function getAnypayExecutionInfoHash(executionInfos: AnypayExecutionInfo[], attestationAddress: Address.Address): Hex.Hex;
export declare function calculateIntentConfigurationAddress(mainSigner: Address.Address, calls: Array<IntentCallsPayload>, context: Context.Context, attestationSigner?: Address.Address, executionInfos?: Array<AnypayExecutionInfo>, sapientType?: QuoteProvider): Address.Address;
//# sourceMappingURL=intents.d.ts.map