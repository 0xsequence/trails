import { Account } from "@0xsequence/account"
import { trackers } from "@0xsequence/sessions"
import { commons } from "@0xsequence/core"
import { Payload } from "@0xsequence/wallet-primitives"
import { Orchestrator, type signers } from "@0xsequence/signhub"
import { allNetworks } from "@0xsequence/network"
import {
  type PublicClient,
  hexToBytes,
  bytesToHex,
  type Chain,
  type WalletClient,
} from "viem"
import { AbiFunction } from "ox"
import { Relayer } from "./relayer.js"
import { toHex } from "viem"
import { Abi } from "ox"

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

export const NETWORKS = allNetworks

export async function createSequenceWallet(
  threshold: number,
  signers: { address: string; weight: number }[],
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
    networks: NETWORKS,
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
}) {
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

  console.log("signers", signers)

  return new Account({
    address: args.address,
    tracker: TRACKER,
    contexts: commons.context.defaultContexts,
    orchestrator: new Orchestrator(signers),
    networks: NETWORKS,
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
      console.error("Failed to recover signature", e)
    }
  }

  return res
}

export async function simpleCreateSequenceWallet(
  publicClient: PublicClient,
  account: Account,
) {
  const signer = account.address
  const threshold = 1
  const weight = 1
  const wallet = await createSequenceWallet(threshold, [
    { address: signer, weight: weight },
  ])

  return wallet.address as `0x${string}`
}

export async function sequenceSendTransaction(
  sequenceWalletAddress: string,
  accountClient: WalletClient,
  publicClient: PublicClient,
  calls: any[],
  chain: Chain,
) {
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
    transactions: [],
  }
  // Calculate the tx subdigest
  const subdigest = subdigestOf(txe)
  const digestBytes = hexToBytes(subdigest as `0x${string}`)
  // Sign the tx subdigest
  const signature = await accountClient.signMessage({
    account: accountClient.account,
    message: { raw: digestBytes },
  })
  const suffixed = signature + "02"
  // Get the account for the Sequence Wallet with signatures
  const sequenceAccount = accountFor({
    address: sequenceWalletAddress as `0x${string}`,
    signatures: [
      {
        signer: accountClient.account?.address as `0x${string}`,
        signature: suffixed,
      },
    ],
  })
  const sequenceTxs = toSequenceTransactions(txsToExecute)
  const status = await sequenceAccount.status(chainId)
  const wallet = sequenceAccount.walletForStatus(chainId, status)

  console.log("sequence wallet1", wallet)

  console.log("sequence wallet", wallet)
  const hasCode = await publicClient?.getCode({
    address: wallet.address as `0x${string}`,
  })

  const isDeployed = hasCode !== undefined
  let sponsored = false
  if (!isDeployed) {
    console.log("deploying sequence wallet")

    const deployTx = await wallet.buildDeployTransaction()
    if (!wallet.relayer) throw new Error("Wallet deploy requires a relayer")
    console.log("deploy Tx", deployTx)
    console.log("deployTx entrypoint:", deployTx!.entrypoint)
    console.log("deployTx transactions:", deployTx!.transactions)

    const feeOptions = await wallet.relayer.getFeeOptions(
      wallet.address as `0x${string}`,
      ...deployTx!.transactions,
    )

    const quote = feeOptions?.quote
    console.log("feeOptions", feeOptions)

    // Check if deployment is whitelisted (no fees required)
    if (feeOptions?.options.length === 0 || sponsored) {
      console.log("Deployment is whitelisted - no fees required")

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

      console.log("Deployment relayed")

      // Wait for deployment to complete
      await new Promise((resolve) => setTimeout(resolve, 3000))
    } else {
      // Find the USDC option for fee payment
      const option = feeOptions?.options.find(
        (option) => option.token.symbol === "USDC",
      )
      if (!option) {
        throw new Error("USDC option not found")
      }

      console.log("option", option)

      if (option) {
        console.log("Using native token for deployment fee")

        // Use encodeGasRefundTransaction to create the fee transaction
        const feeTransactions = encodeGasRefundTransaction(option)
        console.log("Fee transactions:", feeTransactions)

        // Include both deployment and fee transactions
        const allTransactions = [...feeTransactions, ...deployTx!.transactions]
        console.log("All transactions (deployment + fees):", allTransactions)

        const predecorated = await sequenceAccount.predecorateTransactions(
          allTransactions,
          status,
          chainId,
        )
        const signed = await sequenceAccount.signTransactions(
          predecorated,
          chainId,
        )

        console.log("signed transactions with fees:", signed.transactions)
        console.log("signed entrypoint with fees:", signed.entrypoint)

        const bytes = new Uint8Array(32)
        crypto.getRandomValues(bytes)

        wallet.relayer.relay(
          {
            entrypoint: signed!.entrypoint as `0x${string}`,
            transactions: signed.transactions,
            chainId: wallet.chainId,
            intent: {
              id: toHex(bytes),
              wallet: wallet.address,
            },
          },
          quote,
        )

        // Wait for deployment to complete
        await new Promise((resolve) => setTimeout(resolve, 3000))
        console.log("sequence wallet deployed")
      } else {
        throw new Error(
          "ERC20 fee payment for deployment is not supported yet. Please use native token or a relayer with free wallet deployments.",
        )
      }
    }
  }

  // Sign the txs with the Sequence Wallet
  const signed = await wallet.signTransactions(
    sequenceTxs,
    commons.transaction.encodeNonce(txe.space, txe.nonce),
  )
  // Relay the txs to sponsor them
  const relayer = sequenceAccount.relayer(chainId)
  const relayed = await relayer.relay(signed)
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
  relayer: Relayer.Rpc.RpcRelayer,
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
function encodeGasRefundTransaction(option?: any) {
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

    case "ERC20_TOKEN":
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
          value: 0,
          data: AbiFunction.encodeData(transfer, [
            option.to as `0x${string}`,
            value,
          ]),
        },
      ]

    default:
      throw new Error(`Unhandled fee token type ${option.token.type}`)
  }
}
