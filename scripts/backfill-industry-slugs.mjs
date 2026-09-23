/**
 * Backfill missing `slug` values on `industry` documents.
 *
 * Several industry documents were created without a slug, so their
 * /industries/<slug> landing pages 404 and they are excluded from the sitemap
 * (which filters on `defined(slug.current)`).
 *
 * Slugs are derived from the document's `name`. Documents that already have a
 * slug are never touched, so the script is safe to re-run.
 *
 * Usage:
 *   node --env-file=.env.local scripts/backfill-industry-slugs.mjs          # dry run
 *   node --env-file=.env.local scripts/backfill-industry-slugs.mjs --apply  # write
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor or higher) in the environment.
 * Create one at https://sanity.io/manage -> project nl13gjir -> API -> Tokens.
 */
import { createClient } from '@sanity/client'

const apply = process.argv.includes('--apply')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET.')
  process.exit(1)
}

if (apply && !token) {
  console.error('--apply needs SANITY_API_WRITE_TOKEN (Editor or higher). Aborting.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

/**
 * Slugs that should not follow from the document name verbatim, keyed by the
 * name as stored in the Content Lake.
 */
const SLUG_OVERRIDES = {
  'HOME & DECORE': 'home-decor', // "DECORE" is a typo, and "and" bloats the URL
}

/** "SINGLE PRODUCT" -> "single-product" */
const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Drafts are excluded: a draft is the same document as its published version,
// so counting its slug as "taken" would push the published doc to a suffixed
// slug (kids -> kids-2). Patching a published doc leaves its draft untouched.
const docs = await client.fetch(
  `*[_type == "industry" && !(_id in path("drafts.**"))]{
     _id, name, "slug": slug.current
   } | order(name asc)`
)

const taken = new Set(docs.map((doc) => doc.slug).filter(Boolean))
const missing = docs.filter((doc) => !doc.slug)

if (!missing.length) {
  console.log(`All ${docs.length} industry documents already have a slug. Nothing to do.`)
  process.exit(0)
}

const planned = []

for (const doc of missing) {
  if (!doc.name) {
    console.warn(`  SKIP  ${doc._id} - no name to derive a slug from`)
    continue
  }

  const base = SLUG_OVERRIDES[doc.name] ?? slugify(doc.name)
  let slug = base
  // Collision guard: two documents named the same would otherwise collide.
  for (let i = 2; taken.has(slug); i++) slug = `${base}-${i}`
  taken.add(slug)

  planned.push({ ...doc, slug })
}

console.log(`${docs.length} industry documents, ${planned.length} need a slug:\n`)
for (const doc of planned) {
  console.log(`  ${doc.name.padEnd(20)} -> /industries/${doc.slug}`)
}

if (!apply) {
  console.log('\nDry run. Re-run with --apply to write these to the Content Lake.')
  process.exit(0)
}

const transaction = planned.reduce(
  (tx, doc) => tx.patch(doc._id, { set: { slug: { _type: 'slug', current: doc.slug } } }),
  client.transaction()
)

await transaction.commit()
console.log(`\nPatched ${planned.length} documents.`)
