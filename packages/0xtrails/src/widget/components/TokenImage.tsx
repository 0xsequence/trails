import { TokenImage as SeqTokenImage } from "@0xsequence/design-system"
import type React from "react"

interface TokenImageProps {
  imageUrl?: string
  symbol?: string
  chainId?: number
  size?: number
}

export const TokenImage: React.FC<TokenImageProps> = ({
  imageUrl,
  symbol,
  chainId,
  size = 24,
}) => {
  imageUrl = imageUrl?.replace("/small/", "/large/")
  symbol = imageUrl ? symbol : symbol?.[0]

  return (
    <div
      className={`rounded-full flex items-center justify-center text-sm relative bg-black-100 bg-opacity-90`}
      style={{ width: size, height: size }}
    >
      <SeqTokenImage
        src={imageUrl}
        symbol={symbol}
        withNetwork={chainId}
        size="xl"
        className="absolute w-full h-full text-white"
        disableAnimation={true}
      />
    </div>
  )
}

export default TokenImage
