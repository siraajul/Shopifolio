import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  // ISR/SSG pages (`export const revalidate = ...`) are stored in R2.
  // Workers KV was not used here: its free tier allows 1,000 writes/day, while
  // revalidating these routes every 60s needs roughly 20k/day.
  incrementalCache: r2IncrementalCache,
});
