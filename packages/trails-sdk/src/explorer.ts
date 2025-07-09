import * as chains from "viem/chains"

export type ExplorerUrlParams = {
  txHash: string
  chainId: number
}

export type ExplorerUrlForAddressParams = {
  address: string
  chainId: number
}

export function getBaseExplorerUrl(chainId: number): string {
  const chainsArray = Object.values(chains) as Array<{
    id: number
    blockExplorers: { default: { url: string } }
  }>
  for (const chain of chainsArray) {
    if (chain.id === chainId) {
      return `${chain.blockExplorers?.default?.url}`
    }
  }
  return ""
}

export function getExplorerUrl({ txHash, chainId }: ExplorerUrlParams): string {
  const baseExplorerUrl = getBaseExplorerUrl(chainId)
  return `${baseExplorerUrl}/tx/${txHash}`
}

export function getExplorerUrlForAddress({
  address,
  chainId,
}: ExplorerUrlForAddressParams): string {
  const baseExplorerUrl = getBaseExplorerUrl(chainId)
  return `${baseExplorerUrl}/address/${address}`
}
