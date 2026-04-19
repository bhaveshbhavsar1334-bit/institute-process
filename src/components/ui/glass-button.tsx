import React from "react"
import { cn } from "@/lib/utils"

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-md shadow-lg",
          "transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:shadow-white/10 hover:shadow-2xl active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
GlassButton.displayName = "GlassButton"
