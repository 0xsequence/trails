import type React from "react"
import { QRCodeSVG } from "qrcode.react"

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
  return (
    <div className={`inline-block ${className}`}>
      <QRCodeSVG
        value={url}
        size={size}
        bgColor="#FFFFFF"
        fgColor="#000000"
        level="M"
        marginSize={0}
        imageSettings={{
          src: "https://demo.trails.build/favicon.ico",
          height: size * 0.15,
          width: size * 0.15,
          excavate: true,
        }}
        className="rounded-lg border border-gray-200 dark:border-gray-700"
      />
    </div>
  )
}

export default QrCode
