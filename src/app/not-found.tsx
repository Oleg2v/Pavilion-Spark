import type { Metadata } from "next"
import { LicensePlate } from "@/components/spark/plate/license-plate"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "העמוד לא נמצא",
}

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="grid min-h-[calc(100dvh-29px)] place-items-center bg-grid px-4 py-16 outline-none">
      <div className="grid w-full max-w-[560px] justify-items-center gap-8 text-center">
        <LicensePlate value="4040404" decorative className="w-full max-w-[360px] drop-shadow-[0_24px_48px_rgb(0_0_0/0.55)]" />
        <div className="grid gap-4">
          <p className="label-mono text-cyan">
            <bdi lang="en">ERROR 404 · NOT FOUND</bdi>
          </p>
          <h1 className="font-display text-headline font-bold text-paper">העמוד לא נמצא</h1>
          <p className="text-lead text-steel">הכתובת שגויה, או שהעמוד עבר מקום. מכאן ממשיכים לסטייל טייל.</p>
        </div>
        {/* plain <a>, not next/link: a full navigation keeps Back correct after the
            skip link's #main fragment, and the 404 ships no client JS */}
        <a href="/style-tile" className={buttonVariants({ size: "lg" })}>
          לסטייל טייל
          {/* inline arrow: lucide icons are client components and would add a chunk to every page */}
          <svg data-nudge viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </a>
      </div>
    </main>
  )
}
