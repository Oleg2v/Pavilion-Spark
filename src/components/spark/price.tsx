import { cn } from "@/lib/utils"

/**
 * Price — always isolated in <bdi>, tabular numerals.
 * `display`: big Karantina prices set the ₪ small and raised in Plex Sans so
 * the sign never competes with the number. Inline prices keep ₪ near
 * full size on the baseline.
 */
export function Price({
  value,
  decimals = 0,
  display = false,
  className,
}: {
  value: number
  decimals?: 0 | 2
  display?: boolean
  className?: string
}) {
  const [int, dec] = value.toFixed(decimals).split(".")
  const intStr = Number(int).toLocaleString("en-US")
  return (
    <bdi
      className={cn("inline-flex whitespace-nowrap", display ? "items-start" : "items-baseline", className)}
    >
      <span
        className={cn(
          "font-sans font-medium",
          display ? "me-[0.08em] mt-[0.14em] text-[0.42em] leading-none" : "me-[0.06em] text-[0.86em]",
        )}
      >
        ₪
      </span>
      <span className={display ? "leading-none" : undefined}>
        {intStr}
        {dec ? <span className={display ? "text-[0.55em]" : undefined}>.{dec}</span> : null}
      </span>
    </bdi>
  )
}
