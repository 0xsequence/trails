import { type Account, type Address, type Assign, BaseError, type Chain, type Client, type EIP1193Provider, type Hex, type JsonRpcAccount, type LocalAccount, type OneOf, type Prettify, type Transport, type WalletClient } from "viem";
import { entryPoint07Abi, type SmartAccount, type SmartAccountImplementation } from "viem/account-abstraction";
export type ToSimpleSmartAccountParameters<owner extends OneOf<EthereumProvider | WalletClient<Transport, Chain | undefined, Account> | LocalAccount>> = {
    client: Client<Transport, Chain | undefined, JsonRpcAccount | LocalAccount | undefined>;
    owner: owner;
    entryPoint?: {
        address: Address;
        version: "0.7";
    };
    factoryAddress?: Address;
    index?: bigint;
    address?: Address;
    nonceKey?: bigint;
    accountLogicAddress?: Address;
};
export type SimpleSmartAccountImplementation = Assign<SmartAccountImplementation<typeof entryPoint07Abi, "0.7", object, false>, {
    sign: NonNullable<SmartAccountImplementation["sign"]>;
}>;
export type ToSimpleSmartAccountReturnType = SmartAccount<SimpleSmartAccountImplementation>;
/**
 * @description Creates an Simple Account from a private key.
 *
 * @returns A Private Key Simple Account.
 */
export declare function toSimpleSmartAccount<owner extends OneOf<EthereumProvider | WalletClient<Transport, Chain | undefined, Account> | LocalAccount>>(parameters: ToSimpleSmartAccountParameters<owner>): Promise<ToSimpleSmartAccountReturnType>;
export type GetAccountNonceParams = {
    address: Address;
    entryPointAddress: Address;
    key?: bigint;
};
/**
 * Returns the nonce of the account with the entry point.
 */
export declare const getAccountNonce: (client: Client, args: GetAccountNonceParams) => Promise<bigint>;
export type GetSenderAddressParams = OneOf<{
    initCode: Hex;
    entryPointAddress: Address;
    factory?: never;
    factoryData?: never;
} | {
    entryPointAddress: Address;
    factory: Address;
    factoryData: Hex;
    initCode?: never;
}>;
export declare class InvalidEntryPointError extends BaseError {
    name: string;
    constructor({ cause, entryPointAddress, }?: {
        cause?: BaseError;
        entryPointAddress?: Address;
    });
}
/**
 * Returns the address of the account that will be deployed with the given init code.
 */
export declare const getSenderAddress: (client: Client, args: Prettify<GetSenderAddressParams>) => Promise<Address>;
export type EthereumProvider = OneOf<{
    request(...args: any): Promise<any>;
} | EIP1193Provider>;
export declare function toOwner<provider extends EthereumProvider>({ owner, address, }: {
    owner: OneOf<provider | WalletClient<Transport, Chain | undefined, Account> | LocalAccount>;
    address?: Address;
}): Promise<LocalAccount>;
//# sourceMappingURL=toSimpleSmartAccount.d.ts.map