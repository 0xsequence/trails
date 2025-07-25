import React, { useEffect } from "react"
import { ChainImage } from "./ChainImage.js"
import { useTokenImageUrl } from "../../tokens.js"

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
  const [effectiveImageUrl, setEffectiveImageUrl] = React.useState(() => {
    if (imageUrl) {
      return imageUrl.replace("/small/", "/large/")
    }
    return null
  })

  const { imageUrl: fetchedImageUrl } = useTokenImageUrl({
    chainId,
    contractAddress: symbol,
    symbol,
  })

  useEffect(() => {
    if (fetchedImageUrl) {
      setEffectiveImageUrl(fetchedImageUrl)
    }
  }, [fetchedImageUrl])

  const displaySymbol = symbol?.[0]?.toUpperCase() || "?"

  const handleImageError = () => {
    setImageError(true)
  }

  const shouldShowText = !effectiveImageUrl || imageError

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
          src={effectiveImageUrl}
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
