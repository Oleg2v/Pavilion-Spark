import { defineCloudflareConfig } from "@opennextjs/cloudflare"
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache"

/**
 * Every page is prerendered today, so prerendered HTML/RSC is read straight
 * from Workers static assets (no KV/R2 needed) and cache interception
 * answers before the Next server boots: minimal CPU per request.
 * Revisit when Stage 1 adds the data.gov.il route handler (24h cache).
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
})
