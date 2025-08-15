import { TokenImage } from "./TokenImage.js"
import { ChainImage } from "./ChainImage.js"
import { ChevronLeft, ExternalLink } from "lucide-react"
import type React from "react"
import { useState, useMemo } from "react"
import type { PrepareSendQuote } from "../../prepareSend.js"
import { QuoteDetails } from "./QuoteDetails.js"
import { QrCode } from "./QrCode.js"
import { formatUnits } from "viem"
import { getExplorerUrlForAddress } from "../../explorer.js"

interface QRCodeDepositProps {
  onBack: () => void
  quote?: PrepareSendQuote | null
}

export const QRCodeDeposit: React.FC<QRCodeDepositProps> = ({
  onBack,
  quote,
}) => {
  const [useSimpleQrCode, setUseSimpleQrCode] = useState(true)

  const eip631Url = useMemo(() => {
    if (!quote) return ""
    return `ethereum:${quote.originAddress}@${quote.originChain.id}`
  }, [quote])

  const eip681Url = useMemo(() => {
    if (!quote) return ""
    return `ethereum:${quote.originToken.contractAddress}@${quote.originChain.id}/transfer?address=${quote.originAddress}&uint256=${quote.originAmount}`
  }, [quote])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center relative">
        <button
          type="button"
          onClick={onBack}
          className="absolute -left-2 p-2 rounded-full transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:trails-hover-bg text-gray-400"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-bold w-full text-center text-gray-900 dark:text-white">
          Deposit
        </h2>
      </div>

      <div className="flex flex-col justify-center min-h-full space-y-6 pt-8">
        {/* Transaction Details Header */}
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Scan the QR code to deposit to the fund address the exact amount
            stated below
          </p>
        </div>

        {/* QR Code Section - Always Visible */}
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setUseSimpleQrCode(!useSimpleQrCode)}
                className="cursor-pointer transition-opacity hover:opacity-80"
                title={
                  useSimpleQrCode
                    ? `Click to show detailed transfer QR code (EIP-681). Current URL: ${eip631Url}`
                    : `Click to show simple address QR code (EIP-631). Current URL: ${eip681Url}`
                }
              >
                <QrCode
                  url={useSimpleQrCode ? eip631Url : eip681Url}
                  size={200}
                />
              </button>
              {!useSimpleQrCode && (
                <a
                  href="https://eips.ethereum.org/EIPS/eip-681"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 font-mono hover:underline transition-all"
                >
                  EIP-681
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {quote?.originAmount && (
            <div className="flex flex-col items-center justify-center gap-1 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  deposit exactly
                </span>
                <TokenImage
                  imageUrl={quote.originToken.imageUrl}
                  symbol={quote.originToken.symbol}
                  chainId={quote.originChain.id}
                  size={20}
                />
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {formatUnits(
                    BigInt(quote.originAmount),
                    quote.originToken.decimals,
                  )}{" "}
                  {quote.originToken.symbol}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  on
                </span>
                <ChainImage chainId={quote.originChain.id} size={16} />
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  {quote.originChain.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  to
                </span>
                <a
                  href={getExplorerUrlForAddress({
                    address: quote.originAddress,
                    chainId: quote.originChain.id,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:underline transition-all"
                >
                  <span>
                    {quote.originAddress.slice(0, 6)}...
                    {quote.originAddress.slice(-4)}
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Quote Details */}
        {quote && (
          <div className="space-y-2">
            <QuoteDetails quote={quote} showContent={true} />
          </div>
        )}
      </div>
    </div>
  )
}

export default QRCodeDeposit
