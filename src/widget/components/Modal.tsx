import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import type React from "react"
import { useEffect, useRef } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  // Handle click outside
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 h-full w-full"
            onClick={onClose}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4 h-full w-full text-gray-900 dark:text-white"
            onClick={handleClickOutside}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.8,
              }}
              className="pointer-events-auto relative"
              layoutId="modal-content"
              layout="preserve-aspect"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute right-2 top-2 p-2 rounded-full transition-colors cursor-pointer z-10 hover:bg-gray-100 text-gray-600 dark:hover:bg-gray-800 dark:text-gray-400"
              >
                <X className="h-6 w-6" />
              </button>
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal
