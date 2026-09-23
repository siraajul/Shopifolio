import { SITE_CONFIG } from "@/config/site";

export interface Crumb {
  /** Label shown in the search result trail. */
  name: string;
  /** Path relative to the site root, e.g. "/careers". Omit on the last crumb. */
  path?: string;
}

/**
 * Emits BreadcrumbList JSON-LD so search results show a path
 * (shift2dynamic.com > Careers > Senior SEO Expert) instead of a bare URL.
 *
 * Google requires the trail to match what is actually on the page, so render
 * this alongside visible breadcrumb navigation or a clear back link.
 *
 * The final crumb is the current page and carries no `item`, per Google's
 * guidance that the last element may omit it.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const itemListElement = [
    { name: "Home", path: "/" },
    ...crumbs,
  ].map((crumb, index, all) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    name: crumb.name,
    ...(index < all.length - 1 && crumb.path
      ? { item: `${SITE_CONFIG.url}${crumb.path === "/" ? "" : crumb.path}` }
      : {}),
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement,
        }),
      }}
    />
  );
}
