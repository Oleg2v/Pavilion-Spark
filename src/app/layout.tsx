import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans_Hebrew, Karantina } from "next/font/google"
import { DemoStrip } from "@/components/spark/demo-strip"
import { SkipLink } from "@/components/spark/skip-link"
import { Providers } from "@/components/spark/providers"
import "./globals.css"

const plex = IBM_Plex_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
})

const karantina = Karantina({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "700"],
  variable: "--font-karantina",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "SPARK · פורטל הזמנות B2B — קונספט לביתן ספרק",
    template: "%s · SPARK — קונספט לביתן ספרק",
  },
  description:
    "קונספט של Kikkey לפורטל הזמנות B2B לחלקי חילוף. לא האתר הרשמי של ביתן ספרק. מחירי דמו בלבד.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  referrer: "no-referrer",
}

export const viewport: Viewport = {
  themeColor: "#111315",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${plex.variable} ${karantina.variable} ${plexMono.variable}`}
    >
      <body>
        <SkipLink />
        <DemoStrip />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
