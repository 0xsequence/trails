import type { IntentPrecondition } from "@0xsequence/trails-api"
import type { Relayer } from "@0xsequence/wallet-core"
import type { Hex } from "viem"
import type { MetaTxn } from "./metaTxnMonitor.js"

export async function relayerSendMetaTx(
  relayer: Relayer.Standard.Rpc.RpcRelayer,
  metaTx: MetaTxn,
  preconditions: IntentPrecondition[],
): Promise<Hex> {
  const { opHash } = await relayer.sendMetaTxn(
    metaTx.walletAddress as `0x${string}`,
    metaTx.contract as `0x${string}`,
    metaTx.input as Hex,
    BigInt(metaTx.chainId),
    undefined,
    preconditions,
  )

  return opHash
}
