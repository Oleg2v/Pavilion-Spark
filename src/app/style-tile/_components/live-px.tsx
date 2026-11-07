"use client"

import { useEffect, useRef, useState } from "react"

/** Reads the computed font-size of a sibling sample — proves clamp() live. */
export function LivePx({ targetId }: { targetId: string }) {
  const [px, setPx] = useState<string>("—")
  const raf = useRef(0)
  useEffect(() => {
    const el = document.getElementById(targetId)
    if (!el) return
    const read = () => setPx(parseFloat(getComputedStyle(el).fontSize).toFixed(1))
    read()
    const onResize = () => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(read)
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [targetId])
  return (
    <bdi lang="en" className="font-mono text-micro text-cyan">
      now {px}px
    </bdi>
  )
}
