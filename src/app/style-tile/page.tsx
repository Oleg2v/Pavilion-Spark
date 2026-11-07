import type { Metadata } from "next"
import { ComponentsSheet } from "./_components/components-sheet"
import { Decisions } from "./_components/decisions"
import { Hero } from "./_components/hero"
import { Motif } from "./_components/motif"
import { Motion } from "./_components/motion"
import { Palette } from "./_components/palette"
import { Sheet } from "./_components/sheet"
import { FormElevation, Space } from "./_components/space-form"
import { TileHeader } from "./_components/tile-header"
import { Typography } from "./_components/typography"
import { En } from "@/components/spark/text"

export const metadata: Metadata = {
  title: "Style Tile",
  description: "כיוון אמנותי לפורטל ההזמנות — צבע, טיפוגרפיה, מרווחים, תנועה ורכיבים.",
}

export default function StyleTilePage() {
  return (
    <>
      <TileHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <div className="mx-auto max-w-[1360px]">
          <Sheet id="palette" lede="שמונה צבעים מהבריף, חמישה נגזרים שעוברים בדיקת ניגודיות, וארבעה ״דיו״ למסמכי נייר. כל יחס מחושב בזמן אמת מהערכים עצמם.">
            <Palette />
          </Sheet>
          <Sheet id="type" lede="שלוש משפחות, תפקיד אחד לכל אחת. סקאלה של 9 צעדים שזורמת בין 390 ל-1440 פיקסלים — בלי נקודות שבירה.">
            <Typography />
          </Sheet>
          <Sheet id="space" lede="רשת של 4 פיקסלים לכל דבר: מרווח, גובה, רוחב. מטרות מגע של 48 פיקסלים לפעולות ראשיות בטלפון.">
            <Space />
          </Sheet>
          <Sheet id="form" lede="רדיוסים קטנים בכוונה — דיוק של כלי עבודה. על גרפיט, עומק נוצר מקווים ולא מטשטוש.">
            <FormElevation />
          </Sheet>
          <Sheet id="motion" lede="מהיר וחד: 180–260 אלפיות לממשק. שני רגעי חתימה בלבד מקבלים יותר זמן — והם מתחלפים בגרסה סטטית בתנועה מופחתת.">
            <Motion />
          </Sheet>
          <Sheet id="components" lede="שישה רכיבי shadcn/ui שנצבעו מחדש לגמרי. מצבי ריחוף, פוקוס, לחיצה, טעינה והשבתה — מקלדת קודם, עכבר אחר כך.">
            <ComponentsSheet />
          </Sheet>
          <Sheet id="motif" lede="שרטוט טכני כשפה: קווי ציאן דקים, קווים מובילים עם נתונים חיים, ונייר משבצות ב-4%.">
            <Motif />
          </Sheet>
          <Sheet id="decisions" lede="מה אנחנו מתחייבים לעשות — ומה לא נעשה, גם אם יבקשו.">
            <Decisions />
          </Sheet>
        </div>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-2 px-4 py-8 text-caption text-steel sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>
            <En className="font-mono">SPARK</En> · קונספט של <En>Kikkey</En> לביתן ספרק · לא האתר הרשמי · מחירי דמו בלבד
          </p>
          <p className="flex flex-wrap gap-x-2">
            <En className="font-mono">REV A · 06.11.2026</En>
            <span aria-hidden>·</span>
            <En className="font-mono">WCAG 2.0 AA</En>
            <span aria-hidden>·</span>
            <span>ת״י 5568</span>
          </p>
        </div>
      </footer>
    </>
  )
}
