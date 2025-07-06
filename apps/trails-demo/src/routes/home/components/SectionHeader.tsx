import { ChevronDown, ChevronRight } from "lucide-react"
import { type ReactNode, useState } from "react"

interface SectionHeaderProps {
  title: ReactNode
  children?: ReactNode
  defaultOpen?: boolean
  isCollapsible?: boolean
  statusPill?: ReactNode
  noFrame?: boolean
  className?: string
  titleContainerClassName?: string
  contentContainerClassName?: string
  actionSubtitle?: ReactNode
  subtitle?: ReactNode
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  children,
  defaultOpen = false,
  isCollapsible = false,
  statusPill,
  noFrame = false,
  className = "",
  titleContainerClassName = "",
  contentContainerClassName = "",
  actionSubtitle,
  subtitle,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen && isCollapsible)

  const handleHeaderClick = () => {
    if (isCollapsible) {
      setIsOpen(!isOpen)
    }
  }

  const rootClasses = `${noFrame ? "" : "border border-gray-700/50 rounded-lg"} ${className}`

  let titleEffectiveClasses = `w-full flex items-center justify-between ${titleContainerClassName}`
  if (isCollapsible) {
    titleEffectiveClasses += " cursor-pointer transition-colors duration-200"
    if (!noFrame) {
      titleEffectiveClasses += " hover:bg-gray-700/90"
    }
  }

  if (!noFrame) {
    if (isCollapsible && isOpen) {
      titleEffectiveClasses += " rounded-t-lg"
    } else {
      titleEffectiveClasses += " rounded-lg"
    }
  }

  const contentEffectiveClasses = `${contentContainerClassName} ${!noFrame && isCollapsible && isOpen ? "rounded-b-lg" : ""}`

  return (
    <div className={rootClasses}>
      <div onClick={handleHeaderClick} className={titleEffectiveClasses}>
        <div className="flex-grow">
          {typeof title === "string" ? (
            <div className="flex items-center text-white font-semibold text-sm sm:text-base">
              {title}
            </div>
          ) : (
            title
          )}
          {actionSubtitle && (
            <div className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2 ml-1 sm:ml-1.5 flex items-center">
              {actionSubtitle}
            </div>
          )}
          {subtitle && (
            <div className="text-xs sm:text-sm text-gray-400 mt-1 ml-1 sm:ml-1.5 flex items-center">
              {subtitle}
            </div>
          )}
        </div>
        {statusPill ? (
          statusPill
        ) : isCollapsible ? (
          isOpen ? (
            <ChevronDown className="text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <ChevronRight className="text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
          )
        ) : null}
      </div>

      {isCollapsible && isOpen && children && (
        <div className={contentEffectiveClasses}>{children}</div>
      )}
      {!isCollapsible && children && (
        <div className={contentContainerClassName}>{children}</div>
      )}
    </div>
  )
}
