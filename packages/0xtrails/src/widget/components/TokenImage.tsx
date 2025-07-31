import React, { useMemo } from "react"
import { ChainImage } from "./ChainImage.js"
import { getCommonTokenImageUrl } from "../../tokens.js"

interface TokenImageProps {
  imageUrl?: string | null
  symbol?: string | null
  chainId?: number | null
  size?: number
}

export const TokenImage: React.FC<TokenImageProps> = ({
  imageUrl,
  symbol,
  chainId,
  size = 24,
}) => {
  const [imageError, setImageError] = React.useState(false)
  const effectiveImageUrl = useMemo(() => {
    if (imageUrl) {
      return imageUrl.replace("/small/", "/large/")
    } else if (symbol) {
      return getCommonTokenImageUrl({ symbol, chainId })
    }
    return null
  }, [imageUrl, symbol, chainId])

  const displaySymbol = symbol?.[0]?.toUpperCase() || "?"

  const handleImageError = () => {
    setImageError(true)
  }

  const shouldShowText = !effectiveImageUrl || imageError

  return (
    <div
      className={`rounded-full flex items-center justify-center text-sm relative bg-gray-900`}
      style={{ width: size, height: size }}
      title={`${symbol}${chainId ? `on chain ${chainId}` : ""}`}
    >
      {shouldShowText ? (
        <div
          className="absolute w-full h-full rounded-full flex items-center justify-center"
          title={symbol?.length && symbol.length > 1 ? `Token: ${symbol}` : ""}
        >
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
          title={`Token: ${symbol}`}
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
