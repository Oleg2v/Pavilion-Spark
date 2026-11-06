/**
 * Documentation mirror of the CSS tokens in globals.css — consumed by
 * /style-tile. `scripts/check-tokens.mjs` verifies the two never drift.
 */

export type Swatch = {
  token: string
  hex: string
  he: string
  en: string
  role: string
  /** Which surface this colour is judged against for contrast. */
  on?: "graphite" | "panel" | "paper"
  /** Background swatches show Paper-on-it instead. */
  surface?: boolean
  core?: boolean
}

export const CORE: Swatch[] = [
  { token: "graphite", hex: "#111315", he: "גרפיט", en: "Graphite", role: "קנבס. 70% מהפיקסלים.", surface: true, core: true },
  { token: "panel", hex: "#1A1D21", he: "פאנל", en: "Panel", role: "משטחים: כרטיסים, שדות, תפריטים.", surface: true, core: true },
  { token: "line", hex: "#2A2F35", he: "קו", en: "Line", role: "מבנה בלבד — מפרידים ומתאר כרטיס.", surface: true, core: true },
  { token: "paper", hex: "#F4F5F6", he: "נייר", en: "Paper", role: "טקסט ראשי. משטח מסמכים (חשבונית, מחירון).", on: "graphite", core: true },
  { token: "plate", hex: "#F7D117", he: "צהוב לוחית", en: "Plate Yellow", role: "פעולה ראשית, פוקוס, הלוחית. לא קישוט — לעולם.", on: "graphite", core: true },
  { token: "cyan", hex: "#3CC8FF", he: "ציאן ספרק", en: "Spark Cyan", role: "קווי שרטוט, הדגשת נתונים, בחירה.", on: "graphite", core: true },
  { token: "stock", hex: "#22C55E", he: "במלאי", en: "In-stock", role: "סטטוס מלאי בלבד.", on: "panel", core: true },
  { token: "low", hex: "#F59E0B", he: "מלאי נמוך", en: "Low-stock", role: "סטטוס מלאי בלבד — ״אחרונים״.", on: "panel", core: true },
]

export const DERIVED: Swatch[] = [
  { token: "panel-2", hex: "#22262B", he: "פאנל 2", en: "Panel Raised", role: "ריחוף ומשטח מוגבה.", surface: true },
  { token: "edge", hex: "#666E78", he: "קצה", en: "Edge", role: "גבול רכיב אינטראקטיבי — ≥3:1.", on: "graphite" },
  { token: "steel", hex: "#A3AAB2", he: "פלדה", en: "Steel", role: "טקסט משני.", on: "panel" },
  { token: "fog", hex: "#8C949D", he: "ערפל", en: "Fog", role: "טקסט שלישוני, placeholder.", on: "panel" },
  { token: "fault", hex: "#FF6B5E", he: "תקלה", en: "Fault", role: "שגיאה / אזל בלבד. תוספת סמנטית.", on: "panel" },
]

export const INKS: Swatch[] = [
  { token: "cyan-ink", hex: "#0A6A94", he: "ציאן דיו", en: "Cyan Ink", role: "ציאן על נייר.", on: "paper" },
  { token: "stock-ink", hex: "#15803D", he: "ירוק דיו", en: "Stock Ink", role: "במלאי על נייר.", on: "paper" },
  { token: "low-ink", hex: "#B45309", he: "ענבר דיו", en: "Low Ink", role: "מלאי נמוך על נייר.", on: "paper" },
  { token: "fault-ink", hex: "#C2341F", he: "אדום דיו", en: "Fault Ink", role: "שגיאה על נייר.", on: "paper" },
]

export const SURFACE_HEX = { graphite: "#111315", panel: "#1A1D21", paper: "#F4F5F6" } as const

/** Share of pixels on a typical screen — yellow is rationed. */
export const PROPORTION = [
  { token: "graphite", pct: 66 },
  { token: "panel", pct: 20 },
  { token: "line", pct: 6 },
  { token: "paper", pct: 5 },
  { token: "cyan", pct: 1.5 },
  { token: "plate", pct: 1.5 },
] as const

export type TypeStep = {
  step: number
  token: string
  min: number
  max: number
  clamp: string
  family: "sans" | "display" | "mono"
  weight: number
  leading: string
  use: string
  sample: string
}

export const TYPE_SCALE: TypeStep[] = [
  { step: 1, token: "micro", min: 11, max: 12, clamp: "clamp(0.6875rem, 0.6643rem + 0.0952vw, 0.75rem)", family: "mono", weight: 500, leading: "1.45", use: "תוויות טכניות לטיניות: SHEET, OE, מידות", sample: "OE 81130-02B60 · SHEET 02/08" },
  { step: 2, token: "caption", min: 13, max: 14, clamp: "clamp(0.8125rem, 0.7893rem + 0.0952vw, 0.875rem)", family: "sans", weight: 500, leading: "1.45", use: "תוויות, צ׳יפים, טקסט עזר, טבלאות", sample: "נזהה את הדגם מהמאגר הממשלתי" },
  { step: 3, token: "body", min: 16, max: 17, clamp: "clamp(1rem, 0.9768rem + 0.0952vw, 1.0625rem)", family: "sans", weight: 400, leading: "1.6", use: "גוף, שדות קלט (16px — בלי זום ב-iOS)", sample: "פנס ראשי ימני, LED, עם מנוע כיוונון חשמלי" },
  { step: 4, token: "lead", min: 18, max: 20, clamp: "clamp(1.125rem, 1.0786rem + 0.1905vw, 1.25rem)", family: "sans", weight: 600, leading: "1.5", use: "כותרת כרטיס, פתיח", sample: "פנס ראשי ימני — טויוטה קורולה" },
  { step: 5, token: "title", min: 20, max: 24, clamp: "clamp(1.25rem, 1.1571rem + 0.381vw, 1.5rem)", family: "sans", weight: 600, leading: "1.3", use: "כותרות משנה", sample: "הזמנה חוזרת" },
  { step: 6, token: "heading", min: 24, max: 32, clamp: "clamp(1.5rem, 1.3143rem + 0.7619vw, 2rem)", family: "sans", weight: 600, leading: "1.2", use: "כותרות מסך", sample: "סל ההזמנה שלך" },
  { step: 7, token: "headline", min: 40, max: 64, clamp: "clamp(2.5rem, 1.9429rem + 2.2857vw, 4rem)", family: "display", weight: 700, leading: "0.95", use: "כותרות ראשיות (Karantina)", sample: "מחירון 2026" },
  { step: 8, token: "display", min: 56, max: 112, clamp: "clamp(3.5rem, 2.2rem + 5.3333vw, 7rem)", family: "display", weight: 700, leading: "0.9", use: "זיהוי הרכב, מסך פתיחה", sample: "טויוטה · קורולה" },
  { step: 9, token: "mega", min: 80, max: 176, clamp: "clamp(5rem, 2.7714rem + 9.1429vw, 11rem)", family: "display", weight: 700, leading: "0.85", use: "מספרי ענק: מחיר, מלאי, מס׳ הזמנה", sample: "₪389" },
]

export const SPACING = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32] as const

export const RADII = [
  { token: "xs", px: 2, use: "צ׳יפים, תגיות, תוויות הערה" },
  { token: "sm", px: 4, use: "כפתורים, שדות, סטפרים" },
  { token: "md", px: 8, use: "כרטיסים, תפריטים, טוסטים" },
  { token: "lg", px: 12, use: "גיליונות, דיאלוגים, הלוחית" },
] as const

export const SHADOWS = [
  { token: "line", name: "Line", use: "ברירת מחדל: קו במקום צל", css: "0 0 0 1px #2A2F35" },
  { token: "raised", name: "Raised", use: "כרטיס מורם, מקש", css: "inset 0 1px 0 0 rgb(255 255 255 / .04), 0 1px 2px 0 rgb(0 0 0 / .5)" },
  { token: "overlay", name: "Overlay", use: "תפריט, טוסט, פופובר", css: "0 0 0 1px #3A4149, 0 12px 32px -8px rgb(0 0 0 / .7), 0 2px 6px 0 rgb(0 0 0 / .4)" },
  { token: "modal", name: "Modal", use: "דיאלוג, גיליון תחתון", css: "0 0 0 1px #3A4149, 0 32px 80px -16px rgb(0 0 0 / .8)" },
] as const

export type MotionToken = { token: string; ms: number; ease: string; easeToken: string; use: string }

export const DURATIONS: MotionToken[] = [
  { token: "press", ms: 80, ease: "cubic-bezier(0.16, 1, 0.3, 1)", easeToken: "snap", use: "לחיצה — תזוזה של 1px" },
  { token: "fast", ms: 180, ease: "cubic-bezier(0.16, 1, 0.3, 1)", easeToken: "snap", use: "ריחוף, צבע, צ׳יפים" },
  { token: "base", ms: 220, ease: "cubic-bezier(0.16, 1, 0.3, 1)", easeToken: "snap", use: "תפריטים, טוסטים, פופוברים" },
  { token: "slow", ms: 260, ease: "cubic-bezier(0.65, 0, 0.35, 1)", easeToken: "move", use: "מעברי מסך — View Transitions" },
  { token: "spark", ms: 400, ease: "cubic-bezier(0.9, 0, 0.1, 1)", easeToken: "zap", use: "ניצוץ ״הוסף לסל״ — חתימה" },
  { token: "draw", ms: 900, ease: "cubic-bezier(0.45, 0.05, 0.25, 1)", easeToken: "draw", use: "שרטוט קו המתאר של הרכב — חתימה" },
]

export const EASINGS = [
  { token: "snap", bezier: [0.16, 1, 0.3, 1], use: "כניסה. מהיר ונוחת רך." },
  { token: "exit", bezier: [0.55, 0, 1, 0.45], use: "יציאה. מאיץ החוצה, קצר ב-30%." },
  { token: "move", bezier: [0.65, 0, 0.35, 1], use: "שינוי מיקום ומעברי מסך." },
  { token: "draw", bezier: [0.45, 0.05, 0.25, 1], use: "משיכת קו — עט טכני." },
  { token: "zap", bezier: [0.9, 0, 0.1, 1], use: "הניצוץ: מחזיק, ואז פורק." },
] as const
