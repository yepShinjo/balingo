import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {

        locked: "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",

        default: "bg-white text-black border-slate-00 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate500",

        primary: "bg-sky-400 text-primary-foreground hover:bg-sky-400/90 border-sky-500 border-b-4",

        primaryOutline: "bg-white text-emerald-500 hover:bg-blue-50",

        secondary: "bg-amber-300 text-primary-foreground hover:bg-amber-300/90 border-amber-400 border-b-4 border-r-4 active:border-b-0 active:border-r-0",

        secondaryOutline: "bg-white text-green-500 hover:bg-slate-100",

        danger: "bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",

        dangerOutline: "bg-white text-rose-500 hover:bg-slate-100",

        super: "bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",

        superOutline: "bg-white text-indigo-500 hover:bg-slate-100",

        ghost: "bg-transparent text-gray-800 hover:bg-gray-100" ,

        sidebar: "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none",

        sidebarOutline: "bg-orange-950/15 text-stone-500 border-orange-950/15 border-2 hover:bg-orange-200/20 transition-none",



      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
// our Button will extends the original button from react along with its original properties
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  // it will be extended with the buttonVariants we defined above with property asChild (boolean)
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// The Button component is created using React.forwardRef, which allows it to forward its ref to the underlying DOM element.
// ButtonProps is used to define the types of properties the Button component can accept.
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        
      />
    )
  }
)

// and then set the displayname property as Button (capital B)
Button.displayName = "Button"

export { Button, buttonVariants }
