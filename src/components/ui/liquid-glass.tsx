import React from "react"
import { cn } from "@/lib/utils"

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string;
}

export const LiquidGlass = React.forwardRef<HTMLDivElement, LiquidGlassProps>(
  ({ className, children, imageUrl = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3", ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("relative min-h-screen w-full overflow-hidden bg-[#0F172A]", className)}
        {...props}
      >
        {/* Background Animation Layer */}
        <div 
          className="absolute inset-0 z-0 animate-moveBackground opacity-80"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat-y',
            filter: 'blur(20px) saturate(150%)',
          }}
        />
        
        {/* Secondary Overlay for deeper glass effect */}
        <div className="absolute inset-0 z-0 bg-black/40" />

        {/* Liquid Gradient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] z-0 h-[40vw] w-[40vw] rounded-full bg-purple-500/30 mix-blend-screen blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] z-0 h-[40vw] w-[40vw] rounded-full bg-blue-500/30 mix-blend-screen blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[60%] z-0 h-[30vw] w-[30vw] rounded-full bg-pink-500/30 mix-blend-screen blur-[100px] animate-pulse delay-700" />

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>
      </div>
    )
  }
)
LiquidGlass.displayName = "LiquidGlass"
