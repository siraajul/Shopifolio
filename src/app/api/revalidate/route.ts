import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand revalidation for Sanity content.
 *
 * Without this, an edit takes up to `revalidate` seconds to appear (60s on most
 * pages, 3600s on the pSEO routes) plus one stale-while-revalidate response.
 * Sanity POSTs here on publish so the affected pages are purged immediately.
 *
 * Configure the webhook at https://www.sanity.io/manage -> API -> Webhooks:
 *   URL:     https://<host>/api/revalidate
 *   Trigger: Create, Update, Delete
 *   Secret:  must match SANITY_REVALIDATE_SECRET
 *   Payload: { "_type": _type, "slug": slug.current }
 */

// The signature covers the raw body, so this must not be pre-parsed or cached.
export const dynamic = "force-dynamic";

/** Which paths to purge for a given document type. */
function pathsToRevalidate(type: string, slug?: string): string[] {
  switch (type) {
    case "job":
      return slug ? ["/careers", `/careers/${slug}`] : ["/careers"];
    case "industry":
      return slug ? ["/", "/work", `/industries/${slug}`] : ["/", "/work"];
    case "caseStudy":
      return slug ? ["/", "/case-studies", `/case-studies/${slug}`] : ["/", "/case-studies"];
    case "pseo_page":
      return slug ? [slug.startsWith("/") ? slug : `/${slug}`] : [];
    case "showcaseProject":
      return ["/", "/work"];
    // hero, about, gallery, impact, pricing, faq, footer, team, marquee,
    // service, workflow, testimonial and project all feed the home page.
    default:
      return ["/", "/work"];
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    // Fail closed: without a secret the endpoint cannot be authenticated, and
    // an open revalidation endpoint is a denial-of-service vector.
    console.error("SANITY_REVALIDATE_SECRET is not set");
    return NextResponse.json({ message: "Server misconfigured" }, { status: 500 });
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);

  if (!signature) {
    return NextResponse.json({ message: "Missing signature" }, { status: 401 });
  }

  // Read the raw body: re-encoding the parsed JSON can change the bytes and
  // break signature verification.
  const body = await request.text();

  if (!(await isValidSignature(body, signature, secret))) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  let payload: { _type?: string; slug?: string };

  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ message: "Malformed body" }, { status: 400 });
  }

  if (!payload._type) {
    return NextResponse.json({ message: "Missing _type in payload" }, { status: 400 });
  }

  const paths = pathsToRevalidate(payload._type, payload.slug);
  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({ revalidated: true, type: payload._type, paths });
}
