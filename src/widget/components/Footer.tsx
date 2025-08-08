import { motion } from "motion/react"
import type React from "react"
import TrailsLogoBlack from "../assets/Trails-logo-black.svg"
import TrailsLogoWhite from "../assets/Trails-logo-white.svg"
import { SITE_URL } from "../config.js"
import DebugScreensDropdown from "./DebugScreensDropdown.js"

interface FooterProps {
  onDebugScreenSelect: (screen: string) => void
}

export const Footer: React.FC<FooterProps> = ({ onDebugScreenSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="mt-auto pt-4 text-center text-sm relative flex items-center justify-center text-gray-500 dark:text-gray-400"
      layout
    >
      <div className="absolute right-0 flex items-center h-full">
        <DebugScreensDropdown onScreenSelect={onDebugScreenSelect} />
      </div>
      Powered by&nbsp;
      <a
        href={SITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium transition-colors hover:opacity-80 leading-none text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
      >
        <img
          src={TrailsLogoBlack}
          alt="Trails"
          className="h-4 inline-block dark:hidden"
        />
        <img
          src={TrailsLogoWhite}
          alt="Trails"
          className="h-4 hidden dark:inline-block"
        />
      </a>
    </motion.div>
  )
}

export default Footer
