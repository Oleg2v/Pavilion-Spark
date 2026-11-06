/**
 * Demo hygiene: visible on every page, part of the document flow (never
 * covers content), announced to screen readers as a note.
 */
export function DemoStrip() {
  return (
    <aside
      aria-label="הבהרה"
      className="relative z-50 border-b border-line bg-panel"
    >
      <p className="mx-auto flex max-w-[1360px] items-center justify-center gap-2 px-4 py-1 text-center text-caption text-steel sm:justify-start sm:px-6 lg:px-10">
        <span aria-hidden className="size-2 shrink-0 rounded-full bg-plate" />
        <span>
          קונספט של <bdi>Kikkey</bdi> — לא האתר הרשמי של ביתן ספרק
          <span className="hidden sm:inline"> · מחירי דמו בלבד · אין נתוני לקוחות אמיתיים</span>
        </span>
      </p>
    </aside>
  )
}
