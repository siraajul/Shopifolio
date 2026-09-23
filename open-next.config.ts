import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

export default defineCloudflareConfig({
  // ISR/SSG pages (`export const revalidate = ...`) are stored in R2.
  // Workers KV was not used here: its free tier allows 1,000 writes/day, while
  // revalidating these routes every 60s needs roughly 20k/day.
  incrementalCache: r2IncrementalCache,

  // The tag cache and queue are what make on-demand revalidation
  // (revalidatePath/revalidateTag) work, which the Sanity webhook depends on.
  // Both run on free-tier resources: D1, and a SQLite-backed Durable Object.
  tagCache: d1NextTagCache,
  queue: doQueue,
});
