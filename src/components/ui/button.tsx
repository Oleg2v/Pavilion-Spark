import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

/**
 * SPARK button. One primary (Plate Yellow) per view. Press = 1px travel at
 * 80ms; hover = 180ms snap; loading = a "fuse" running along the baseline.
 */
const buttonVariants = cva(
  [
    "group/button relative isolate inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden",
    "rounded-sm border font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,translate] duration-fast ease-snap",
    "active:translate-y-px active:duration-press",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plate",
    "disabled:pointer-events-none disabled:opacity-40",
    "aria-disabled:pointer-events-none aria-disabled:opacity-40",
    "data-[loading=true]:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-transparent bg-plate font-semibold text-graphite",
          "shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-1px_0_rgb(0_0_0/0.14)]",
          "hover:bg-plate-hover active:bg-plate-press",
          "disabled:border-line disabled:bg-panel disabled:text-fog disabled:shadow-none disabled:opacity-100",
        ],
        secondary: [
          "border-line-strong bg-panel text-paper",
          "hover:border-edge hover:bg-panel-2 active:bg-panel",
        ],
        ghost: [
          "border-transparent bg-transparent text-steel",
          "hover:bg-panel hover:text-paper active:bg-panel-2",
        ],
        danger: [
          "border-fault/40 bg-transparent text-fault",
          "hover:border-fault/70 hover:bg-fault/10 active:bg-fault/15",
        ],
        link: [
          "h-auto border-transparent px-0 text-paper underline decoration-edge decoration-1 underline-offset-4",
          "hover:decoration-plate",
        ],
      },
      size: {
        sm: "h-8 px-3 text-caption",
        md: "h-10 px-4 text-body",
        lg: "h-12 px-6 text-body",
        "icon-sm": "size-8",
        icon: "size-10",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }

function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  loading = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {children}
          {loading ? (
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute bottom-0 block h-0.5 animate-fuse",
                variant === "primary" ? "bg-graphite" : "bg-plate",
              )}
            />
          ) : null}
        </>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
