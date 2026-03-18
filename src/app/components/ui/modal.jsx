import * as React from "react"
import { useEffect, useCallback } from "react"
import { X, ArrowLeft } from "lucide-react"
import { cn } from "../../../shared/lib/utils"

const Modal = ({ open, onClose, children, className }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, handleKeyDown])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-background/75"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-[110] w-full h-full md:h-auto md:max-w-lg lg:max-w-none lg:w-[700px] md:mt-14 lg:mt-0 rounded bg-background px-4 md:px-8 py-18 md:py-[3.625rem] md:border md:border-foreground/10 shadow-lg animate-in fade-in-0 zoom-in-95",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute hidden md:block top-6 right-6 rounded-sm p-1 text-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className='w-4 h-4'/>
        </button>

        <button
          onClick={onClose}
          className="flex md:hidden h-10 gap-2 items-center mb-6"
          aria-label="Close"
        >
          <ArrowLeft className='w-3 h-3 opacity-60'/>
          Back
        </button>

        {children}
      </div>
    </div>
  )
}

export { Modal }
