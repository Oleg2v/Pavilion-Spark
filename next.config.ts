import type { NextConfig } from "next"

/** Same hygiene headers as custom-worker.ts, so `next start` matches production. */
const HYGIENE = [
  // Demo hygiene: never index the pitch demo.
  { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "no-referrer" },
]

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  experimental: {
    // `radix-ui` is a barrel package: import only the primitives we use.
    optimizePackageImports: ["radix-ui"],
  },
  async headers() {
    return [{ source: "/:path*", headers: HYGIENE }]
  },
}

export default nextConfig
