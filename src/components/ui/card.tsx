import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * SPARK card. Flat panel + hairline; on hover/focus-within it gets a CAD
 * selection frame (four cyan corner ticks) instead of a drop-shadow lift.
 */
function Card({
  className,
  interactive = false,
  ...props
}: React.ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "group/card relative flex flex-col rounded-md border border-line bg-panel text-paper",
        "transition-[border-color,background-color] duration-fast ease-snap",
        interactive && "cad-frame hover:border-line-strong",
        className,
      )}
      {...props}
    />
  )
}

function CardMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-media"
      className={cn(
        "relative overflow-hidden rounded-t-[7px] border-b border-line bg-graphite bg-grid",
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("grid gap-1 px-4 pt-4", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-lead font-semibold text-paper", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-caption text-steel", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 py-4", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("mt-auto flex items-center gap-3 border-t border-line px-4 py-3", className)}
      {...props}
    />
  )
}

export { Card, CardMedia, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
