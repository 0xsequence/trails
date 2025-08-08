import type React from "react"
import { useState } from "react"
import { getExplorerUrlForAddress } from "../../explorer.js"

interface TruncatedAddressProps {
  address: string
  chainId: number
  className?: string
  expandOnHover?: boolean
}

export const TruncatedAddress: React.FC<TruncatedAddressProps> = ({
  address,
  chainId,
  className = "",
  expandOnHover = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const truncatedAddress = `${address.slice(0, 6)}…${address.slice(-4)}`
  const explorerUrl = getExplorerUrlForAddress({ address, chainId })

  if (!expandOnHover) {
    return (
      <a
        href={explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-mono cursor-pointer hover:underline ${className}`}
      >
        {truncatedAddress}
      </a>
    )
  }

  return (
    <a
      href={explorerUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`font-mono transition-all duration-300 cursor-pointer hover:underline relative inline-block ${className}`}
    >
      <span
        className={`transition-all duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        {truncatedAddress}
      </span>
      <span
        className={`absolute left-0 top-0 transition-all duration-300 underline ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {address}
      </span>
    </a>
  )
}

export default TruncatedAddress
