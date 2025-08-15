import { NetworkImage } from "@0xsequence/design-system"
import type React from "react"

interface TokenImageProps {
  chainId?: number
  size?: number
}

export const ChainImage: React.FC<TokenImageProps> = ({
  chainId,
  size = 24,
}) => {
  return (
    <div
      className={`rounded-full flex items-center justify-center text-sm relative bg-black-100 bg-opacity-90`}
      style={{ width: size, height: size }}
      title={`Chain ID: ${chainId}`}
    >
      <NetworkImage
        chainId={chainId ?? 0}
        size="xl"
        className="absolute w-full h-full text-white"
        disableAnimation={true}
      />
    </div>
  )
}

export default ChainImage
