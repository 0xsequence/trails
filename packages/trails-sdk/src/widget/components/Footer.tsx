import { motion } from "motion/react"
import type React from "react"
import type { ActiveTheme } from "../../theme.js"
import TrailsLogoBlack from "../assets/Trails-logo-black.svg"
import TrailsLogoWhite from "../assets/Trails-logo-white.svg"
import DebugScreensDropdown from "./DebugScreensDropdown.js"

interface FooterProps {
  theme: ActiveTheme
  onDebugScreenSelect: (screen: string) => void
}

export const Footer: React.FC<FooterProps> = ({
  theme,
  onDebugScreenSelect,
}) => {
  const TrailsLogo = theme === "dark" ? TrailsLogoWhite : TrailsLogoBlack

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className={`mt-auto pt-4 text-center text-sm relative flex items-center justify-center ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
      layout
    >
      <div className="absolute right-0 flex items-center h-full">
        <DebugScreensDropdown
          onScreenSelect={onDebugScreenSelect}
          theme={theme}
        />
      </div>
      Powered by&nbsp;
      <a
        href="https://anypay.sequence-demos.xyz/"
        target="_blank"
        rel="noopener noreferrer"
        className={`font-medium transition-colors hover:opacity-80 leading-none ${
          theme === "dark"
            ? "text-gray-400 hover:text-white"
            : "text-gray-500 hover:text-black"
        }`}
      >
        <img src={TrailsLogo} alt="Trails" className="h-4 inline-block" />
      </a>
    </motion.div>
  )
}

export default Footer
