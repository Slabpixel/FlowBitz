import * as React from "react"
import { cn } from "../../../shared/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full h-10 rounded bg-base-medium px-3 py-3 ring-offset-background outline-none shadow-none file:border-0 file:bg-transparent file:text-link file:font-medium placeholder:text-base-medium focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 active:outline-none active:ring-0 active:shadow-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
