import type React from "react"
import type { SupportedToken } from "../../tokens.js"
import { TokenImage } from "./TokenImage.js"

interface RecentTokensProps {
  recentTokens: SupportedToken[]
  onTokenSelect: (token: SupportedToken) => void
  selectedToken?: SupportedToken | null
}

export const RecentTokens: React.FC<RecentTokensProps> = ({
  recentTokens,
  onTokenSelect,
  selectedToken,
}) => {
  if (recentTokens.length === 0) {
    return null
  }

  const isTokenSelected = (token: SupportedToken) => {
    if (!selectedToken) return false
    return (
      token.contractAddress === selectedToken.contractAddress &&
      token.chainId === selectedToken.chainId
    )
  }

  return (
    <div className="mb-0">
      <h3 className="text-xs font-medium text-gray-500 dark:text-gray-500">
        Recently Used
      </h3>
      <div className="flex gap-2 overflow-x-auto pb-1 trails-scrollbar">
        {recentTokens.map((token) => {
          const isSelected = isTokenSelected(token)

          return (
            <button
              key={`${token.chainId}-${token.contractAddress}`}
              type="button"
              onClick={() => onTokenSelect(token)}
              title={`${token.symbol} - ${token.name}`}
              className={`flex-shrink-0 p-2 rounded-lg transition-colors cursor-pointer ${
                isSelected
                  ? "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500"
                  : "trails-bg-secondary border-2 border-transparent hover:trails-hover-bg"
              }`}
            >
              <div className="rounded-full flex items-center justify-center bg-white dark:bg-gray-600">
                <TokenImage
                  symbol={token.symbol}
                  imageUrl={token.imageUrl}
                  chainId={token.chainId}
                  size={32}
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default RecentTokens
