import { Account } from "@0xsequence/account";
import { commons } from "@0xsequence/core";
import { trackers } from "@0xsequence/sessions";
import { type signers } from "@0xsequence/signhub";
import type { Payload } from "@0xsequence/wallet-primitives";
import { type Chain, type PublicClient, type WalletClient } from "viem";
import type { Relayer, RelayerEnvConfig } from "./relayer.js";
export type FlatTransaction = {
    to: string;
    value?: string;
    data?: string;
    gasLimit?: string;
    delegateCall?: boolean;
    revertOnError?: boolean;
};
export type TransactionsEntry = {
    subdigest?: string;
    wallet: string;
    space: string;
    nonce: string;
    chainId: string;
    transactions: FlatTransaction[];
};
export declare const TRACKER: trackers.remote.RemoteConfigTracker;
type GetAccountNetworksInput = {
    relayerConfig: RelayerEnvConfig;
    sequenceProjectAccessKey: string;
};
export declare function getAccountNetworks(input: GetAccountNetworksInput): any[];
export declare function createSequenceWallet(threshold: number, signers: {
    address: string;
    weight: number;
}[], relayerConfig: RelayerEnvConfig, sequenceProjectAccessKey: string): Promise<Account>;
export declare function toSequenceTransactions(txs: FlatTransaction[]): commons.transaction.Transaction[];
export declare function toSequenceTransaction(tx: FlatTransaction): commons.transaction.Transaction;
export declare function accountFor(args: {
    address: string;
    signatures?: {
        signer: string;
        signature: string;
    }[];
    relayerConfig: RelayerEnvConfig;
    sequenceProjectAccessKey: string;
}): Account;
export declare function digestOf(tx: TransactionsEntry): string;
export declare function subdigestOf(tx: TransactionsEntry): string;
export declare function fromSequenceTransactions(wallet: string, txs: commons.transaction.Transactionish): FlatTransaction[];
export declare function recoverSigner(signatures: string[], subdigest: string): {
    signer: string;
    signature: string;
}[];
export declare function simpleCreateSequenceWallet(account: Account, relayerConfig?: RelayerEnvConfig, sequenceProjectAccessKey?: string): Promise<`0x${string}`>;
export declare function getIsWalletDeployed(wallet: `0x${string}`, publicClient: PublicClient): Promise<boolean>;
export declare function waitForWalletDeployment(wallet: `0x${string}`, publicClient: PublicClient): Promise<void>;
export declare function sequenceSendTransaction(sequenceWalletAddress: string, accountClient: WalletClient, publicClient: PublicClient, calls: any[], chain: Chain, relayerConfig?: RelayerEnvConfig, sequenceProjectAccessKey?: string): Promise<string | null>;
type TransactionBundle = commons.transaction.TransactionBundle;
type SignedTransactionBundle = commons.transaction.SignedTransactionBundle;
type IntendedTransactionBundle = commons.transaction.IntendedTransactionBundle;
type BytesLike = `0x${string}` | Uint8Array;
export declare class StaticSigner implements signers.SapientSigner {
    private readonly address;
    private readonly signature;
    private readonly signatureBytes;
    private readonly savedSuffix;
    constructor(address: string, signature: string);
    buildDeployTransaction(): Promise<TransactionBundle | undefined>;
    predecorateSignedTransactions(): Promise<SignedTransactionBundle[]>;
    decorateTransactions(og: IntendedTransactionBundle): Promise<IntendedTransactionBundle>;
    sign(): Promise<BytesLike>;
    notifyStatusChange(): void;
    suffix(): BytesLike;
    getAddress(): Promise<string>;
}
export declare function getFeeOptions(relayer: Relayer.Standard.Rpc.RpcRelayer, wallet: string, chainId: number, calls: Payload.Call[]): Promise<{
    options: Relayer.FeeOption[];
    quote?: Relayer.FeeQuote;
}>;
export {};
//# sourceMappingURL=sequenceWallet.d.ts.map