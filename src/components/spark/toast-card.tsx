"use client"

import * as React from "react"
import { Check, OctagonAlert, ShoppingCart, TriangleAlert, X } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type Tone = "cart" | "success" | "warning" | "error"

const toneStyles: Record<Tone, { bar: string; icon: React.ReactNode; iconColor: string }> = {
  cart: { bar: "bg-plate", icon: <ShoppingCart strokeWidth={1.75} />, iconColor: "text-plate" },
  success: { bar: "bg-stock", icon: <Check strokeWidth={2} />, iconColor: "text-stock" },
  warning: { bar: "bg-low", icon: <TriangleAlert strokeWidth={1.75} />, iconColor: "text-low" },
  error: { bar: "bg-fault", icon: <OctagonAlert strokeWidth={1.75} />, iconColor: "text-fault" },
}

export type ToastCardProps = {
  tone: Tone
  title: React.ReactNode
  description?: React.ReactNode
  action?: { label: React.ReactNode; onClick?: () => void }
  onDismiss?: () => void
  className?: string
}

export function ToastCard({ tone, title, description, action, onDismiss, className }: ToastCardProps) {
  const t = toneStyles[tone]
  return (
    <div
      className={cn(
        "relative flex w-full items-start gap-3 rounded-md border border-line-strong bg-panel p-4 text-paper shadow-overlay",
        className,
      )}
    >
      <span aria-hidden className={cn("absolute inset-y-3 start-0 w-0.5 rounded-full", t.bar)} />
      <span
        aria-hidden
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-sm border border-line bg-graphite bg-grid [&>svg]:size-5",
          t.iconColor,
        )}
      >
        {t.icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-body leading-6 font-semibold">{title}</p>
        {/* codes may break at their spaces here when text is very large (narrow toast) */}
        {description ? <p className="mt-1 text-caption text-steel [&_bdi]:whitespace-normal">{description}</p> : null}
        {action ? (
          <button
            type="button"
            onClick={action.onClick}
            className="mt-2 inline-flex h-8 items-center gap-1 rounded-sm px-2 -ms-2 text-caption font-semibold text-paper underline decoration-edge underline-offset-4 transition-colors duration-fast hover:decoration-plate"
          >
            {action.label}
          </button>
        ) : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="סגירת ההודעה"
          className="-me-2 -mt-2 grid size-8 shrink-0 place-items-center rounded-sm text-fog transition-colors duration-fast hover:bg-panel-2 hover:text-paper"
        >
          <X className="size-4" strokeWidth={1.75} />
        </button>
      ) : null}
    </div>
  )
}

/** Fire a SPARK toast. Same component as the static samples. */
export function notify(props: Omit<ToastCardProps, "onDismiss">, duration = 4000) {
  return toast.custom((id) => <ToastCard {...props} onDismiss={() => toast.dismiss(id)} />, { duration })
}
