import type React from "react"
import { useState } from "react"

interface QrCodeProps {
  url: string
  size?: number
  className?: string
}

export const QrCode: React.FC<QrCodeProps> = ({
  url,
  size = 250,
  className = "",
}) => {
  const [imageError, setImageError] = useState(false)

  const generateQrCodeUrl = (data: string, size: number) => {
    const encodedData = encodeURIComponent(data)
    return `http://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=${encodedData}&qzone=1&margin=0&size=${size}x${size}&ecc=L`
  }

  const qrCodeImageUrl = generateQrCodeUrl(url, size)

  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="text-center p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Failed to load QR code
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`inline-block ${className}`}>
      <img
        src={qrCodeImageUrl}
        alt="QR Code"
        width={size}
        height={size}
        onError={() => setImageError(true)}
        className="rounded-lg border border-gray-200 dark:border-gray-700"
      />
    </div>
  )
}

export default QrCode
