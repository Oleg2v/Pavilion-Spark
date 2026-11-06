import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

/**
 * SPARK chip (restyled shadcn Badge). 2px radius — tags on a drawing, not
 * pills. Colour never carries meaning alone: every status has a word.
 */
const chipVariants = cva(
  [
    "inline-flex h-6 w-fit shrink-0 items-center gap-2 rounded-xs border px-2",
    "text-caption leading-none font-medium whitespace-nowrap",
    "[&>svg]:pointer-events-none [&>svg]:size-3.5 [&>svg]:shrink-0",
  ],
  {
    variants: {
      tone: {
        neutral: "border-line-strong bg-panel text-steel",
        stock: "border-stock/30 bg-stock/12 text-stock",
        low: "border-low/30 bg-low/12 text-low",
        out: "border-fault/30 bg-fault/10 text-fault",
        eta: "border-cyan/35 bg-cyan/8 text-cyan",
        tier: "border-paper/25 bg-transparent text-paper",
        demo: "border-dashed border-edge bg-transparent text-steel",
        beta: "border-cyan/50 bg-transparent text-cyan",
        solid: "border-paper bg-paper text-graphite",
      },
      size: {
        sm: "h-6",
        md: "h-8 px-3",
      },
    },
    defaultVariants: { tone: "neutral", size: "sm" },
  },
)

type ChipProps = React.ComponentProps<"span"> &
  VariantProps<typeof chipVariants> & { asChild?: boolean; dot?: boolean }

function Chip({ className, tone, size, asChild = false, dot = false, children, ...props }: ChipProps) {
  const Comp = asChild ? Slot.Root : "span"
  return (
    <Comp data-slot="chip" data-tone={tone} className={cn(chipVariants({ tone, size }), className)} {...props}>
      {dot ? (
        <span
          aria-hidden
          className={cn("size-2 shrink-0 rounded-full bg-current", tone === "low" && "animate-blink")}
        />
      ) : null}
      {children}
    </Comp>
  )
}

/** Toggle chip for filters — a real button with aria-pressed. */
function FilterChip({
  className,
  pressed,
  ...props
}: React.ComponentProps<"button"> & { pressed?: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      data-slot="filter-chip"
      className={cn(
        chipVariants({ tone: "neutral", size: "md" }),
        "transition-[background-color,border-color,color,translate] duration-fast ease-snap",
        "hover:border-edge hover:text-paper active:translate-y-px active:duration-press",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plate",
        "aria-pressed:border-paper aria-pressed:bg-paper aria-pressed:text-graphite",
        className,
      )}
      {...props}
    />
  )
}

export { Chip, FilterChip, chipVariants }
