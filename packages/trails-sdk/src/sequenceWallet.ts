import { Account } from "@0xsequence/account"
import { commons } from "@0xsequence/core"
import { allNetworks } from "@0xsequence/network"
import { trackers } from "@0xsequence/sessions"
import { Orchestrator, type signers } from "@0xsequence/signhub"
import type { Payload } from "@0xsequence/wallet-primitives"
import { ethers } from "ethers"
import { Abi, AbiFunction } from "ox"
import {
  bytesToHex,
  type Chain,
  hexToBytes,
  type PublicClient,
  toHex,
  type WalletClient,
} from "viem"
import type { Relayer, RelayerEnvConfig } from "./relayer.js"
import { getRelayerUrl } from "./relayer.js"

export type FlatTransaction = {
  to: string
  value?: string
  data?: string
  gasLimit?: string
  delegateCall?: boolean
  revertOnError?: boolean
}

export type TransactionsEntry = {
  subdigest?: string
  wallet: string
  space: string
  nonce: string
  chainId: string
  transactions: FlatTransaction[]
}

export const TRACKER = new trackers.remote.RemoteConfigTracker(
  "https://sessions.sequence.app",
)

type GetAccountNetworksInput = {
  relayerConfig: RelayerEnvConfig
  sequenceProjectAccessKey: string
}

export function getAccountNetworks(input: GetAccountNetworksInput): any[] {
  return allNetworks.map((network) => {
    try {
      const relayerUrl = getRelayerUrl(input.relayerConfig, network.chainId)
      if (relayerUrl) {
        const relayer: any = {
          provider: new ethers.JsonRpcProvider(network.rpcUrl),
          url: relayerUrl,
          projectAccessKey: input.sequenceProjectAccessKey,
        }
        return {
          ...network,
          relayer,
        }
      }
    } catch (_err: unknown) {
      // noop
    }
    return network
  })
}

export async function createSequenceWallet(
  threshold: number,
  signers: { address: string; weight: number }[],
  relayerConfig: RelayerEnvConfig,
  sequenceProjectAccessKey: string,
): Promise<Account> {
  const account = await Account.new({
    config: {
      threshold,
      // By default a random checkpoint is generated every second
      checkpoint: Math.floor(Date.now() / 1000),
      signers: signers,
    },
    tracker: TRACKER,
    contexts: commons.context.defaultContexts,
    orchestrator: new Orchestrator([]),
    networks: getAccountNetworks({ relayerConfig, sequenceProjectAccessKey }),
  })

  // Try to fetch the config from the tracker
  const reverse1 = await TRACKER.imageHashOfCounterfactualWallet({
    wallet: account.address,
  })
  if (!reverse1) {
    throw new Error("Failed to fetch imageHash from the tracker")
  }

  // Try to fetch the imageHash from the tracker
  const reverse2 = await TRACKER.configOfImageHash({
    imageHash: reverse1.imageHash,
  })
  if (!reverse2) {
    throw new Error("Failed to fetch config from the tracker")
  }

  return account
}

export function toSequenceTransactions(
  txs: FlatTransaction[],
): commons.transaction.Transaction[] {
  return txs.map(toSequenceTransaction)
}

export function toSequenceTransaction(
  tx: FlatTransaction,
): commons.transaction.Transaction {
  return {
    to: tx.to,
    value: tx.value ? BigInt(tx.value) : undefined,
    data: tx.data,
    gasLimit: tx.gasLimit ? BigInt(tx.gasLimit) : undefined,
    delegateCall: tx.delegateCall || false,
    revertOnError: tx.revertOnError || false,
  }
}

export function accountFor(args: {
  address: string
  signatures?: { signer: string; signature: string }[]
  relayerConfig: RelayerEnvConfig
  sequenceProjectAccessKey: string
}): Account {
  const signers: signers.SapientSigner[] = []

  if (args.signatures) {
    for (const { signer, signature } of args.signatures) {
      // Some ECDSA libraries may return the signature with `v` as 0x00 or 0x01
      // but the Sequence protocol expects it to be 0x1b or 0x1c. We need to
      // adjust the signature to match the protocol.
      const signatureArr = hexToBytes(signature as `0x${string}`)
      if (
        signatureArr.length === 66 &&
        (signatureArr[64] === 0 || signatureArr[64] === 1)
      ) {
        signatureArr[64] = signatureArr[64] + 27
      }

      signers.push(new StaticSigner(signer, bytesToHex(signatureArr)))
    }
  }

  console.log("[trails-sdk] signers", signers)

  return new Account({
    address: args.address,
    tracker: TRACKER,
    contexts: commons.context.defaultContexts,
    orchestrator: new Orchestrator(signers),
    networks: getAccountNetworks({
      relayerConfig: args.relayerConfig,
      sequenceProjectAccessKey: args.sequenceProjectAccessKey,
    }),
  })
}

export function digestOf(tx: TransactionsEntry): string {
  return commons.transaction.digestOfTransactions(
    commons.transaction.encodeNonce(tx.space, tx.nonce),
    toSequenceTransactions(tx.transactions),
  )
}

export function subdigestOf(tx: TransactionsEntry): string {
  const digest = digestOf(tx)

  return commons.signature.subdigestOf({
    digest,
    chainId: tx.chainId,
    address: tx.wallet,
  })
}

export function fromSequenceTransactions(
  wallet: string,
  txs: commons.transaction.Transactionish,
): FlatTransaction[] {
  const sequenceTxs = commons.transaction.fromTransactionish(wallet, txs)
  return sequenceTxs.map((stx: any) => ({
    to: stx.to,
    value: stx.value?.toString(),
    data: stx.data?.toString(),
    gasLimit: stx.gasLimit?.toString(),
    delegateCall: stx.delegateCall,
    revertOnError: stx.revertOnError,
  }))
}

export function recoverSigner(
  signatures: string[],
  subdigest: string,
): { signer: string; signature: string }[] {
  const res: { signer: string; signature: string }[] = []

  for (const signature of signatures) {
    try {
      const r = commons.signer.recoverSigner(subdigest, signature)
      res.push({ signer: r, signature: signature })
    } catch (e) {
      console.error("[trails-sdk] Failed to recover signature", e)
    }
  }

  return res
}

export async function simpleCreateSequenceWallet(
  account: Account,
  relayerConfig: RelayerEnvConfig,
  sequenceProjectAccessKey: string,
): Promise<`0x${string}`> {
  const signer = account.address
  const threshold = 1
  const weight = 1
  const wallet = await createSequenceWallet(
    threshold,
    [{ address: signer, weight: weight }],
    relayerConfig,
    sequenceProjectAccessKey,
  )

  return wallet.address as `0x${string}`
}

export async function getIsWalletDeployed(
  wallet: `0x${string}`,
  publicClient: PublicClient,
): Promise<boolean> {
  const hasCode = await publicClient?.getCode({
    address: wallet as `0x${string}`,
  })

  const isDeployed = hasCode !== undefined && hasCode !== "0x"
  return isDeployed
}

export async function waitForWalletDeployment(
  wallet: `0x${string}`,
  publicClient: PublicClient,
): Promise<void> {
  while (true) {
    const isDeployed = await getIsWalletDeployed(wallet, publicClient)
    if (isDeployed) {
      break
    }
    console.log("[trails-sdk] waiting for wallet deployment")
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
}
export async function sequenceSendTransaction(
  sequenceWalletAddress: string,
  accountClient: WalletClient,
  publicClient: PublicClient,
  calls: any[],
  chain: Chain,
  relayerConfig: RelayerEnvConfig,
  sequenceProjectAccessKey: string,
): Promise<string | null> {
  const chainId = chain.id
  if (!accountClient?.account?.address || !sequenceWalletAddress) {
    throw new Error("Privy signer or sequence wallet address not available")
  }
  const txsToExecute = calls.map((call: any) => {
    return {
      to: call.to,
      data: call.data,
      value: call.value || "0",
      revertOnError: true,
    }
  })

  const txe: TransactionsEntry = {
    wallet: sequenceWalletAddress as `0x${string}`,
    space: Math.floor(Date.now()).toString(),
    nonce: "0",
    chainId: chainId.toString(),
    transactions: txsToExecute,
  }
  // Calculate the tx subdigest
  const subdigest = subdigestOf(txe)
  const digestBytes = hexToBytes(subdigest as `0x${string}`)
  // Sign the tx subdigest
  const signature = await accountClient.signMessage({
    account: accountClient.account,
    message: { raw: digestBytes },
  })
  const suffixed = `${signature}02`
  // Get the account for the Sequence Wallet with signatures
  const sequenceAccount = accountFor({
    address: sequenceWalletAddress as `0x${string}`,
    signatures: [
      {
        signer: accountClient.account?.address as `0x${string}`,
        signature: suffixed,
      },
    ],
    relayerConfig,
    sequenceProjectAccessKey,
  })
  const sequenceTxs = toSequenceTransactions(txsToExecute)
  const status = await sequenceAccount.status(chainId)
  const wallet = sequenceAccount.walletForStatus(chainId, status)

  console.log("[trails-sdk] sequence wallet", wallet)

  const isDeployed = await getIsWalletDeployed(
    wallet.address as `0x${string}`,
    publicClient,
  )
  if (!isDeployed) {
    console.log("[trails-sdk] deploying sequence wallet")

    const deployTx = await wallet.buildDeployTransaction()
    if (!wallet.relayer) throw new Error("Wallet deploy requires a relayer")
    console.log("[trails-sdk] deploy Tx", deployTx)
    console.log("[trails-sdk] deployTx entrypoint:", deployTx!.entrypoint)
    console.log("[trails-sdk] deployTx transactions:", deployTx!.transactions)

    console.log("[trails-sdk] getting fee options 0")
    const feeOptions = await wallet.relayer.getFeeOptions(
      wallet.address as `0x${string}`,
      ...deployTx!.transactions,
    )

    const quote = feeOptions?.quote
    console.log("[trails-sdk] feeOptions", feeOptions)

    // Check if deployment is whitelisted (no fees required)
    if (feeOptions?.options.length === 0) {
      console.log("[trails-sdk] Deployment is whitelisted - no fees required")

      const bytes = new Uint8Array(32)
      crypto.getRandomValues(bytes)

      wallet.relayer.relay(
        {
          entrypoint: deployTx!.entrypoint as `0x${string}`,
          transactions: deployTx!.transactions,
          chainId: wallet.chainId,
          intent: {
            id: toHex(bytes),
            wallet: wallet.address,
          },
        },
        quote,
      )

      console.log("[trails-sdk] Deployment relayed")

      await waitForWalletDeployment(
        wallet.address as `0x${string}`,
        publicClient,
      )
      console.log("[trails-sdk] sequence wallet deployed")
    } else {
      const option = feeOptions?.options[0]
      if (!option) {
        throw new Error("fee option not found")
      }

      console.log("[trails-sdk] option", option)

      if (option) {
        console.log("[trails-sdk] Using native token for deployment fee")

        // Use encodeGasRefundTransaction to create the fee transaction
        const feeTransactions = encodeGasRefundTransaction(option)
        console.log("[trails-sdk] Fee transactions:", feeTransactions)

        // Include both deployment and fee transactions
        const allTransactions = [...deployTx!.transactions]
        console.log(
          "[trails-sdk] All transactions (deployment + fees):",
          allTransactions,
        )

        const predecorated = await sequenceAccount.predecorateTransactions(
          allTransactions,
          status,
          chainId,
        )
        const signed = await sequenceAccount.signTransactions(
          predecorated,
          chainId,
        )

        console.log(
          "[trails-sdk] signed transactions with fees:",
          signed.transactions,
        )
        console.log(
          "[trails-sdk] signed entrypoint with fees:",
          signed.entrypoint,
        )

        const bytes = new Uint8Array(32)
        crypto.getRandomValues(bytes)

        wallet.relayer.relay(
          {
            entrypoint: deployTx!.entrypoint as `0x${string}`,
            transactions: deployTx!.transactions,
            chainId: wallet.chainId,
            intent: {
              id: toHex(bytes),
              wallet: wallet.address,
            },
          },
          quote,
        )

        console.log("[trails-sdk] relayed deployment")

        await waitForWalletDeployment(
          wallet.address as `0x${string}`,
          publicClient,
        )
        console.log("[trails-sdk] sequence wallet deployed")
      } else {
        throw new Error(
          "ERC20 fee payment for deployment is not supported yet. Please use native token or a relayer with free wallet deployments.",
        )
      }
    }
  }

  console.log("[trails-sdk] getting fee options 1")
  const feeOptions = await wallet.relayer!.getFeeOptions(
    wallet.address as `0x${string}`,
    ...sequenceTxs,
  )

  // Find the USDC option for fee payment
  const option = feeOptions?.options.find(
    (option) => option.token.symbol === "USDC",
  )

  const quote = feeOptions?.quote

  // Use encodeGasRefundTransaction to create the fee transaction
  const feeTransactions = encodeGasRefundTransaction(option)
  console.log("[trails-sdk] Fee transactions:", feeTransactions)

  // Sign the txs with the Sequence Wallet
  const signed = await wallet.signTransactions(
    [...feeTransactions, ...sequenceTxs],
    commons.transaction.encodeNonce(txe.space, txe.nonce),
  )
  // Relay the txs to sponsor them
  const relayer = sequenceAccount.relayer(chainId)
  const relayed = await relayer.relay(signed, quote)
  return relayed?.hash || null
}

type TransactionBundle = commons.transaction.TransactionBundle
type SignedTransactionBundle = commons.transaction.SignedTransactionBundle
type IntendedTransactionBundle = commons.transaction.IntendedTransactionBundle
type BytesLike = `0x${string}` | Uint8Array

export class StaticSigner implements signers.SapientSigner {
  private readonly signatureBytes: Uint8Array
  private readonly savedSuffix: Uint8Array

  constructor(
    private readonly address: string,
    private readonly signature: string,
  ) {
    const raw = hexToBytes(this.signature as `0x${string}`)

    // Separate last byte as suffix
    this.savedSuffix = raw.slice(-1)
    this.signatureBytes = raw.slice(0, -1)
  }

  async buildDeployTransaction(): Promise<TransactionBundle | undefined> {
    return undefined
  }

  async predecorateSignedTransactions(): Promise<SignedTransactionBundle[]> {
    return []
  }

  async decorateTransactions(
    og: IntendedTransactionBundle,
  ): Promise<IntendedTransactionBundle> {
    return og
  }

  async sign(): Promise<BytesLike> {
    return this.signatureBytes
  }

  notifyStatusChange(): void {}

  suffix(): BytesLike {
    return this.savedSuffix
  }

  async getAddress() {
    return this.address
  }
}

export async function getFeeOptions(
  relayer: Relayer.Standard.Rpc.RpcRelayer,
  wallet: string,
  chainId: number,
  calls: Payload.Call[],
) {
  const feeOptions = await relayer.feeOptions(
    wallet as `0x${string}`,
    BigInt(chainId),
    calls,
  )

  return feeOptions
}

// Import the encodeGasRefundTransaction function
function encodeGasRefundTransaction(option?: any): FlatTransaction[] {
  if (!option) return []

  const value = BigInt(option.value)

  switch (option.token.type) {
    case "UNKNOWN":
      return [
        {
          delegateCall: false,
          revertOnError: true,
          gasLimit: option.gasLimit,
          to: option.to,
          value: value.toString(),
          data: "0x",
        },
      ]

    case "ERC20_TOKEN": {
      if (!option.token.contractAddress) {
        throw new Error(`No contract address for ERC-20 fee option`)
      }

      const [transfer] = Abi.from([
        {
          inputs: [{ type: "address" }, { type: "uint256" }],
          name: "transfer",
          outputs: [{ type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
      ])

      return [
        {
          delegateCall: false,
          revertOnError: true,
          gasLimit: option.gasLimit,
          to: option.token.contractAddress,
          value: "0",
          data: AbiFunction.encodeData(transfer, [
            option.to as `0x${string}`,
            value,
          ]),
        },
      ]
    }

    default:
      throw new Error(`Unhandled fee token type ${option.token.type}`)
  }
}
