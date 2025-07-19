import React from "react"
import { ChainImage } from "./ChainImage.js"

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
  const [imageError, setImageError] = React.useState(false)
  imageUrl = imageUrl?.replace("/small/", "/large/")
  const displaySymbol = symbol?.[0]?.toUpperCase() || "?"

  const handleImageError = () => {
    setImageError(true)
  }

  const shouldShowText = !imageUrl || imageError

  return (
    <div
      className={`rounded-full flex items-center justify-center text-sm relative bg-gray-900`}
      style={{ width: size, height: size }}
    >
      {shouldShowText ? (
        <div className="absolute w-full h-full rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-xs">
            {displaySymbol}
          </span>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={symbol || "Token"}
          className="absolute w-full h-full rounded-full object-contain"
          onError={handleImageError}
        />
      )}
      {chainId && (
        <div className="absolute" style={{ right: "-2%", bottom: "-2%" }}>
          <div className="border-1 border-black rounded-full">
            <ChainImage chainId={chainId} size={Math.round(size * 0.4)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default TokenImage
