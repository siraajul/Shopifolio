/**
 * Seeds the Sanity dataset from the copy that currently lives hardcoded in the
 * components, so the site is editable in the Studio instead of in the codebase.
 *
 * Only migrates text that already exists in the repo. It deliberately does NOT
 * create `caseStudy` or `testimonial` documents: inventing client work or
 * endorsements attributed to named people is what the FTC rule on consumer
 * reviews and testimonials (16 CFR Part 465) prohibits, and those were removed
 * from this codebase for that reason. Add them by hand, with real clients.
 *
 * Idempotent: a document type that already has documents is skipped entirely,
 * so re-running never duplicates or overwrites.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-sanity.mjs          # dry run
 *   node --env-file=.env.local scripts/seed-sanity.mjs --apply  # write
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor or higher).
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const apply = process.argv.includes("--apply");
const token = process.env.SANITY_API_WRITE_TOKEN;

if (apply && !token) {
  console.error("--apply needs SANITY_API_WRITE_TOKEN. Aborting.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nl13gjir",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(here, "seed-data.json"), "utf8"));

/** Singleton documents get fixed ids so they cannot be duplicated. */
const documents = [
  {
    _id: "hero",
    _type: "hero",
    title: "We Engineer",
    // rotatingWords is deliberately omitted. Supplying it swaps the animated
    // icon components in the hero for plain text. That would fix the malformed
    // H1 ("7-Figure7-FigureShopify Ecosystems", caused by the icons' sr-only
    // duplicates) but it is a visual change, so it belongs in its own decision.
    subtext:
      "We build high-converting Shopify storefronts for brands that have outgrown a template.",
  },
  {
    _id: "about",
    _type: "about",
    name: "SHIFT2DYNAMIC",
    role: "Shopify Experts",
    title: "Crafting digital experiences that convert.",
    description: "Crafting digital experiences that convert.",
    bio1: "Expert developers and designers specializing in Shopify high-performance builds.",
    bio2: "Helping brands scale with custom solutions and data-driven optimization.",
    ctaText: "LET'S COLLABORATE",
    stats: [
      { value: "4+", label: "Years Experience" },
      { value: "$10M+", label: "Client Sales" },
      { value: "270+", label: "Stores Built" },
      { value: "TOP", label: "Optimization Experts" },
    ],
  },
  {
    _id: "footer",
    _type: "footer",
    companyName: "Shift2Dynamic",
    tagline:
      "Transforming Shopify stores into high-performance digital powerhouses.",
    email: "hello@shift2dynamic.com",
    location: "Global Remote",
    socialLinks: [
      { _key: "li", platform: "LinkedIn", url: "https://www.linkedin.com/company/shift2dynamic/" },
      { _key: "ig", platform: "Instagram", url: "https://www.instagram.com/shift2dynamic" },
      { _key: "fb", platform: "Facebook", url: "https://www.facebook.com/shift2dynamic" },
    ],
    footerLinks: [
      {
        _key: "company",
        title: "Company",
        links: [
          { _key: "work", label: "Work", href: "/work" },
          { _key: "careers", label: "Careers", href: "/careers" },
          { _key: "privacy", label: "Privacy Policy", href: "/privacy" },
        ],
      },
      {
        _key: "services",
        title: "Services",
        links: [
          { _key: "planner", label: "Start a Project", href: "/planner" },
          { _key: "cases", label: "Case Studies", href: "/case-studies" },
        ],
      },
    ],
  },
  {
    _id: "impact",
    _type: "impact",
    title: "Impact",
    description: "Outcomes we have delivered for the brands we work with.",
    stats: data.impact.map((s, i) => ({ _key: `stat${i}`, ...s })),
  },
  {
    _id: "marquee",
    _type: "marquee",
    items: [
      { _key: "m1", text: "SHOPIFY ARCHITECTS", isHighlighted: true },
      { _key: "m2", text: "E-COMMERCE SCALING", isHighlighted: false },
      { _key: "m3", text: "SCALABLE", isHighlighted: false },
      { _key: "m4", text: "ROI FOCUSED", isHighlighted: false },
      { _key: "m5", text: "MOBILE FAST", isHighlighted: false },
    ],
  },
  ...data.service.map((s, i) => ({ _id: `service-${i + 1}`, _type: "service", ...s })),
  ...data.pricing.map((p, i) => ({
    _id: `pricing-${p.name.toLowerCase()}`,
    _type: "pricing",
    category: "brand",
    ...p,
  })),
  ...data.faq.map((f, i) => ({ _id: `faq-${i + 1}`, _type: "faq", ...f })),
  ...data.process.map((p, i) => ({
    _id: `process-${i + 1}`,
    _type: "process",
    stepNumber: String(i + 1),
    ...p,
  })),
];

const existing = await client.fetch(
  `{${[...new Set(documents.map((d) => d._type))]
    .map((t) => `"${t}": count(*[_type=="${t}"])`)
    .join(",")}}`
);

const skip = new Set(Object.entries(existing).filter(([, n]) => n > 0).map(([t]) => t));
const toCreate = documents.filter((d) => !skip.has(d._type));

console.log("Sanity seed\n");
for (const [type, count] of Object.entries(existing)) {
  const n = documents.filter((d) => d._type === type).length;
  console.log(
    `  ${type.padEnd(10)} ${count > 0 ? `SKIP (already has ${count})` : `create ${n}`}`
  );
}
console.log(`\nNot seeded on purpose: caseStudy, testimonial (real content only).`);

if (!toCreate.length) {
  console.log("\nNothing to do.");
  process.exit(0);
}

if (!apply) {
  console.log(`\nDry run. ${toCreate.length} documents would be created. Re-run with --apply.`);
  process.exit(0);
}

const tx = toCreate.reduce((t, doc) => t.createIfNotExists(doc), client.transaction());
await tx.commit();
console.log(`\nCreated ${toCreate.length} documents.`);
