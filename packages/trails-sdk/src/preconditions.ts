import type { IntentPrecondition } from "@0xsequence/trails-api"

export function findPreconditionAddresses(
  preconditions: IntentPrecondition[],
  originChainId: number,
  destinationChainId: number,
): { originAddress?: string; destinationAddress?: string } {
  const origin = preconditions.find(
    (p) => p.chainId === originChainId.toString() && p.data?.address,
  )
  const destination = preconditions.find(
    (p) => p.chainId === destinationChainId.toString() && p.data?.address,
  )

  return {
    originAddress: origin?.data?.address,
    destinationAddress: destination?.data?.address,
  }
}

export function findChainAndAddressesFromPreconditions(
  preconditions: IntentPrecondition[],
): { chainId: number; address: string }[] {
  const addressesFromPreconditions: { chainId: number; address: string }[] = []
  preconditions.forEach((p) => {
    if (
      (p.type === "erc20-balance" ||
        p.type === "native-balance" ||
        p.type === "transfer-native") &&
      p.data?.address &&
      p.chainId
    ) {
      addressesFromPreconditions.push({
        chainId: parseInt(p.chainId),
        address: p.data.address,
      })
    }
  })
  return addressesFromPreconditions
}

export function findFirstPreconditionForChainId(
  preconditions: IntentPrecondition[],
  chainId: number,
): IntentPrecondition | null {
  const precondition = preconditions.find(
    (p) =>
      (p.type === "erc20-balance" || p.type === "native-balance") &&
      p.chainId === chainId?.toString(),
  )
  return precondition ?? null
}
