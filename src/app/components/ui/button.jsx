import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../../shared/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        animated: "group relative bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 overflow-hidden",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      iconPosition: {
        left: "flex-row gap-2",
        right: "flex-row-reverse gap-2",
        none: "gap-0",
        iconOnly: "gap-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      iconPosition: "left",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, iconPosition, asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? "span" : "button"
  const isAnimated = variant === "animated"
  
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, iconPosition, className }))}
      ref={ref}
      {...props}
    >
      {isAnimated && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      )}
      <span className={cn("contents", isAnimated && "relative z-10")}>{children}</span>
    </Comp>
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
