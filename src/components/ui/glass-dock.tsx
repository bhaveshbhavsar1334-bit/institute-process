import React from "react"
import { cn } from "@/lib/utils"

export interface GlassDockProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GlassDock = React.forwardRef<HTMLDivElement, GlassDockProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
          "flex items-center gap-4 rounded-full border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md shadow-2xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GlassDock.displayName = "GlassDock"

export const GlassDockItem = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-2 rounded-full text-white/70 transition-all duration-300 hover:text-white hover:bg-white/10 hover:scale-110",
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }
)
GlassDockItem.displayName = "GlassDockItem"
