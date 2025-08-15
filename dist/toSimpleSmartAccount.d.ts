import { type Account, type Address, type Assign, BaseError, type Chain, type Client, type EIP1193Provider, type Hex, type JsonRpcAccount, type LocalAccount, type OneOf, type Prettify, type Transport, type WalletClient } from "viem";
import { entryPoint07Abi, type SmartAccount, type SmartAccountImplementation } from "viem/account-abstraction";
export declare const getAccountInitCode: (owner: Address, index?: bigint) => Promise<Hex>;
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
export declare const getFactoryAddress: (factoryAddress?: Address) => Address;
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
export declare const executeSingleAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "dest";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "func";
        readonly type: "bytes";
    }];
    readonly name: "execute";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
export type GetAccountNonceParams = {
    address: Address;
    entryPointAddress: Address;
    key?: bigint;
};
/**
 * Returns the nonce of the account with the entry point.
 */
export declare const getAccountNonce: (client: Client, args: GetAccountNonceParams) => Promise<bigint>;
export declare const GetSenderAddressHelperByteCode = "0x60806040526102a28038038091610015826100ae565b6080396040816080019112610093576080516001600160a01b03811681036100935760a0516001600160401b0381116100935782609f82011215610093578060800151610061816100fc565b9361006f60405195866100d9565b81855260a082840101116100935761008e9160a0602086019101610117565b610196565b600080fd5b634e487b7160e01b600052604160045260246000fd5b6080601f91909101601f19168101906001600160401b038211908210176100d457604052565b610098565b601f909101601f19168101906001600160401b038211908210176100d457604052565b6001600160401b0381116100d457601f01601f191660200190565b60005b83811061012a5750506000910152565b818101518382015260200161011a565b6040916020825261015a8151809281602086015260208686019101610117565b601f01601f1916010190565b3d15610191573d90610177826100fc565b9161018560405193846100d9565b82523d6000602084013e565b606090565b600091908291826040516101cd816101bf6020820195639b249f6960e01b87526024830161013a565b03601f1981018352826100d9565b51925af16101d9610166565b906102485760048151116000146101f7576024015160005260206000f35b60405162461bcd60e51b8152602060048201526024808201527f67657453656e64657241646472657373206661696c656420776974686f7574206044820152636461746160e01b6064820152608490fd5b60405162461bcd60e51b815260206004820152602b60248201527f67657453656e6465724164647265737320646964206e6f74207265766572742060448201526a185cc8195e1c1958dd195960aa1b6064820152608490fdfe";
export declare const GetSenderAddressHelperAbi: {
    inputs: {
        internalType: string;
        name: string;
        type: string;
    }[];
    stateMutability: string;
    type: string;
}[];
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