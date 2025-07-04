import * as chains from "viem/chains"

export function getExplorerUrl(txHash: string, chainId: number) {
  const chainsArray = Object.values(chains) as Array<{
    id: number
    blockExplorers: { default: { url: string } }
  }>
  for (const chain of chainsArray) {
    if (chain.id === chainId) {
      return `${chain.blockExplorers?.default?.url}/tx/${txHash}`
    }
  }
  return ""
}
