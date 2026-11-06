import type { MetadataRoute } from "next"

/** Unlisted pitch demo: disallow everything. */
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] }
}
