import {
  type Account,
  type Address,
  type Assign,
  BaseError,
  type Chain,
  type Client,
  concat,
  createWalletClient,
  custom,
  decodeAbiParameters,
  decodeFunctionData,
  type EIP1193Provider,
  encodeDeployData,
  encodeFunctionData,
  type Hex,
  type JsonRpcAccount,
  type LocalAccount,
  type OneOf,
  type Prettify,
  type Transport,
  type WalletClient,
} from "viem"
import {
  entryPoint07Abi,
  entryPoint07Address,
  getUserOperationHash,
  type SmartAccount,
  type SmartAccountImplementation,
  toSmartAccount,
  type UserOperation,
} from "viem/account-abstraction"
import { toAccount } from "viem/accounts"
import {
  call,
  getChainId,
  readContract,
  signMessage,
  signTypedData,
} from "viem/actions"
import { getAction } from "viem/utils"

export const getAccountInitCode = async (
  owner: Address,
  index = BigInt(0),
): Promise<Hex> => {
  if (!owner) throw new Error("Owner account not found")

  return encodeFunctionData({
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "salt",
            type: "uint256",
          },
        ],
        name: "createAccount",
        outputs: [
          {
            internalType: "contract SimpleAccount",
            name: "ret",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "createAccount",
    args: [owner, index],
  })
}

export type ToSimpleSmartAccountParameters<
  owner extends OneOf<
    | EthereumProvider
    | WalletClient<Transport, Chain | undefined, Account>
    | LocalAccount
  >,
> = {
  client: Client<
    Transport,
    Chain | undefined,
    JsonRpcAccount | LocalAccount | undefined
  >
  owner: owner
  entryPoint?: {
    address: Address
    version: "0.7"
  }
  factoryAddress?: Address
  index?: bigint
  address?: Address
  nonceKey?: bigint
  accountLogicAddress?: Address
}

export const getFactoryAddress = (factoryAddress?: Address): Address => {
  if (factoryAddress) return factoryAddress
  return "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985"
}

export type SimpleSmartAccountImplementation = Assign<
  SmartAccountImplementation<typeof entryPoint07Abi, "0.7", object, false>,
  { sign: NonNullable<SmartAccountImplementation["sign"]> }
>

export type ToSimpleSmartAccountReturnType =
  SmartAccount<SimpleSmartAccountImplementation>

/**
 * @description Creates an Simple Account from a private key.
 *
 * @returns A Private Key Simple Account.
 */
export async function toSimpleSmartAccount<
  owner extends OneOf<
    | EthereumProvider
    | WalletClient<Transport, Chain | undefined, Account>
    | LocalAccount
  >,
>(
  parameters: ToSimpleSmartAccountParameters<owner>,
): Promise<ToSimpleSmartAccountReturnType> {
  const {
    client,
    owner,
    factoryAddress: _factoryAddress,
    index = BigInt(0),
    address,
    nonceKey,
    // accountLogicAddress = "0xe6Cae83BdE06E4c305530e199D7217f42808555B",
  } = parameters

  const localOwner = await toOwner({ owner })

  const entryPoint = parameters.entryPoint
    ? {
        address: parameters.entryPoint.address,
        abi: entryPoint07Abi,
        version: "0.7" as const,
      }
    : {
        address: entryPoint07Address,
        abi: entryPoint07Abi,
        version: "0.7" as const,
      }

  const factoryAddress = getFactoryAddress(_factoryAddress)

  let chainId: number

  const getMemoizedChainId = async () => {
    if (chainId) return chainId
    chainId = client.chain
      ? client.chain.id
      : await getAction(client, getChainId, "getChainId")({})
    return chainId
  }

  const getFactoryArgsFunc = () => async () => {
    return {
      factory: factoryAddress,
      factoryData: await getAccountInitCode(localOwner.address, index),
    }
  }

  const { accountAddress, getFactoryArgs } = await (async () => {
    const getFactoryArgs = getFactoryArgsFunc()

    if (address) {
      return { accountAddress: address, getFactoryArgs }
    }

    const { factory, factoryData } = await getFactoryArgs()

    const accountAddress = await getSenderAddress(client, {
      factory,
      factoryData,
      entryPointAddress: entryPoint.address,
    })

    return { accountAddress, getFactoryArgs }
  })()

  return toSmartAccount({
    client,
    entryPoint,
    getFactoryArgs,
    async getAddress() {
      return accountAddress
    },
    async encodeCalls(calls) {
      if (calls.length > 1) {
        return encodeFunctionData({
          abi: executeBatch07Abi,
          functionName: "executeBatch",
          args: [
            calls.map((a) => a.to),
            calls.map((a) => a.value ?? 0n),
            calls.map((a) => a.data ?? "0x"),
          ],
        })
      }

      const call = calls.length === 0 ? undefined : calls[0]

      if (!call) {
        throw new Error("No calls to encode")
      }

      return encodeFunctionData({
        abi: executeSingleAbi,
        functionName: "execute",
        args: [call.to, call.value ?? 0n, call.data ?? "0x"],
      })
    },
    decodeCalls: async (callData) => {
      try {
        const calls: {
          to: Address
          data: Hex
          value?: bigint
        }[] = []

        const decodedV7 = decodeFunctionData({
          abi: executeBatch07Abi,
          data: callData,
        })

        const destinations = decodedV7.args[0]
        const values = decodedV7.args[1]
        const datas = decodedV7.args[2]

        for (let i = 0; i < destinations.length; i++) {
          calls.push({
            to: destinations[i]!,
            data: datas[i]!,
            value: values[i],
          })
        }

        return calls
      } catch (_) {
        const decodedSingle = decodeFunctionData({
          abi: executeSingleAbi,
          data: callData,
        })

        return [
          {
            to: decodedSingle.args[0],
            value: decodedSingle.args[1],
            data: decodedSingle.args[2],
          },
        ]
      }
    },
    async getNonce(args) {
      return getAccountNonce(client, {
        address: await this.getAddress(),
        entryPointAddress: entryPoint.address,
        key: nonceKey ?? args?.key,
      })
    },
    async getStubSignature() {
      return "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c"
    },
    async sign({ hash }) {
      return this.signMessage({ message: hash })
    },
    signMessage: async (_) => {
      throw new Error("Simple account isn't 1271 compliant")
    },
    signTypedData: async (_) => {
      throw new Error("Simple account isn't 1271 compliant")
    },
    async signUserOperation(parameters) {
      const { chainId = await getMemoizedChainId(), ...userOperation } =
        parameters

      return signMessage(client, {
        account: localOwner,
        message: {
          raw: getUserOperationHash({
            userOperation: {
              ...userOperation,
              sender: userOperation.sender ?? (await this.getAddress()),
              signature: "0x",
            } as UserOperation<"0.7">,
            entryPointAddress: entryPoint.address,
            entryPointVersion: entryPoint.version,
            chainId: chainId,
          }),
        },
      })
    },
  }) as Promise<ToSimpleSmartAccountReturnType>
}

export const executeSingleAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "dest",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "func",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const

const executeBatch07Abi = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "dest",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "value",
        type: "uint256[]",
      },
      {
        internalType: "bytes[]",
        name: "func",
        type: "bytes[]",
      },
    ],
    name: "executeBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const

export type GetAccountNonceParams = {
  address: Address
  entryPointAddress: Address
  key?: bigint
}

/**
 * Returns the nonce of the account with the entry point.
 */
export const getAccountNonce = async (
  client: Client,
  args: GetAccountNonceParams,
): Promise<bigint> => {
  const { address, entryPointAddress, key = BigInt(0) } = args

  return await getAction(
    client,
    readContract,
    "readContract",
  )({
    address: entryPointAddress,
    abi: [
      {
        inputs: [
          {
            name: "sender",
            type: "address",
          },
          {
            name: "key",
            type: "uint192",
          },
        ],
        name: "getNonce",
        outputs: [
          {
            name: "nonce",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getNonce",
    args: [address, key],
  })
}

// https://github.com/pimlicolabs/contracts/blob/80277d0de609e6b5fb4cedeeb1fb9a023caed59f/src/GetSenderAddressHelper.sol
export const GetSenderAddressHelperByteCode =
  "0x60806040526102a28038038091610015826100ae565b6080396040816080019112610093576080516001600160a01b03811681036100935760a0516001600160401b0381116100935782609f82011215610093578060800151610061816100fc565b9361006f60405195866100d9565b81855260a082840101116100935761008e9160a0602086019101610117565b610196565b600080fd5b634e487b7160e01b600052604160045260246000fd5b6080601f91909101601f19168101906001600160401b038211908210176100d457604052565b610098565b601f909101601f19168101906001600160401b038211908210176100d457604052565b6001600160401b0381116100d457601f01601f191660200190565b60005b83811061012a5750506000910152565b818101518382015260200161011a565b6040916020825261015a8151809281602086015260208686019101610117565b601f01601f1916010190565b3d15610191573d90610177826100fc565b9161018560405193846100d9565b82523d6000602084013e565b606090565b600091908291826040516101cd816101bf6020820195639b249f6960e01b87526024830161013a565b03601f1981018352826100d9565b51925af16101d9610166565b906102485760048151116000146101f7576024015160005260206000f35b60405162461bcd60e51b8152602060048201526024808201527f67657453656e64657241646472657373206661696c656420776974686f7574206044820152636461746160e01b6064820152608490fd5b60405162461bcd60e51b815260206004820152602b60248201527f67657453656e6465724164647265737320646964206e6f74207265766572742060448201526a185cc8195e1c1958dd195960aa1b6064820152608490fdfe"

export const GetSenderAddressHelperAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_entryPoint",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
]

export type GetSenderAddressParams = OneOf<
  | {
      initCode: Hex
      entryPointAddress: Address
      factory?: never
      factoryData?: never
    }
  | {
      entryPointAddress: Address
      factory: Address
      factoryData: Hex
      initCode?: never
    }
>

export class InvalidEntryPointError extends BaseError {
  override name = "InvalidEntryPointError"

  constructor({
    cause,
    entryPointAddress,
  }: { cause?: BaseError; entryPointAddress?: Address } = {}) {
    super(
      `The entry point address (\`entryPoint\`${
        entryPointAddress ? ` = ${entryPointAddress}` : ""
      }) is not a valid entry point. getSenderAddress did not revert with a SenderAddressResult error.`,
      {
        cause,
      },
    )
  }
}

/**
 * Returns the address of the account that will be deployed with the given init code.
 */
export const getSenderAddress = async (
  client: Client,
  args: Prettify<GetSenderAddressParams>,
): Promise<Address> => {
  const { initCode, entryPointAddress, factory, factoryData } = args

  if (!initCode && !factory && !factoryData) {
    throw new Error(
      "Either `initCode` or `factory` and `factoryData` must be provided",
    )
  }

  const formattedInitCode =
    initCode || concat([factory as Hex, factoryData as Hex])

  const { data } = await getAction(
    client,
    call,
    "call",
  )({
    data: encodeDeployData({
      abi: GetSenderAddressHelperAbi,
      bytecode: GetSenderAddressHelperByteCode,
      args: [entryPointAddress, formattedInitCode],
    }),
  })

  if (!data) {
    throw new Error("Failed to get sender address")
  }

  return decodeAbiParameters([{ type: "address" }], data)[0]
}

export type EthereumProvider = OneOf<
  { request(...args: any): Promise<any> } | EIP1193Provider
>

export async function toOwner<provider extends EthereumProvider>({
  owner,
  address,
}: {
  owner: OneOf<
    | provider
    | WalletClient<Transport, Chain | undefined, Account>
    | LocalAccount
  >
  address?: Address
}): Promise<LocalAccount> {
  if ("type" in owner && owner.type === "local") {
    return owner as LocalAccount
  }

  let walletClient:
    | WalletClient<Transport, Chain | undefined, Account>
    | undefined

  if ("request" in owner) {
    if (!address) {
      try {
        ;[address] = await (owner as EthereumProvider).request({
          method: "eth_requestAccounts",
        })
      } catch {
        ;[address] = await (owner as EthereumProvider).request({
          method: "eth_accounts",
        })
      }
    }
    if (!address) {
      // For TS to be happy
      throw new Error("address is required")
    }
    walletClient = createWalletClient({
      account: address,
      transport: custom(owner as EthereumProvider),
    })
  }

  if (!walletClient) {
    walletClient = owner as WalletClient<Transport, Chain | undefined, Account>
  }

  return toAccount({
    address: walletClient.account.address,
    async signMessage({ message }) {
      return walletClient.signMessage({ message })
    },
    async signTypedData(typedData) {
      return getAction(
        walletClient,
        signTypedData,
        "signTypedData",
      )(typedData as any)
    },
    async signTransaction(_) {
      throw new Error("Smart account signer doesn't need to sign transactions")
    },
  })
}
