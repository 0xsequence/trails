export function truncateAddress(address: string, length = 4) {
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`
}
