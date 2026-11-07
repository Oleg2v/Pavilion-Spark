import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * SPARK input. 48px tall (touch), Edge outline (≥3:1), Plate Yellow focus
 * drawn as a 2px border so it hugs the field. 16px+ text: no iOS zoom.
 */
const inputBase = [
  "h-12 w-full min-w-0 rounded-sm border border-edge bg-panel px-4 text-body text-paper",
  "placeholder:text-fog",
  "transition-[border-color,box-shadow,background-color] duration-fast ease-snap",
  "hover:border-steel",
  "focus-visible:border-plate focus-visible:shadow-[0_0_0_1px_var(--color-plate)] focus-visible:outline-hidden",
  "aria-invalid:border-fault aria-invalid:shadow-[0_0_0_1px_var(--color-fault)]",
  // focus beats the error state; the error stays readable from the message + red border at rest
  "aria-invalid:focus-visible:border-plate! aria-invalid:focus-visible:shadow-[0_0_0_1px_var(--color-plate)]!",
  "disabled:cursor-not-allowed disabled:opacity-40",
  "read-only:border-line read-only:bg-graphite",
]

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputBase, className)}
      {...props}
    />
  )
}

export { Input, inputBase }
