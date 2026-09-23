import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE_URL = "https://www.shift2dynamic.com";

/**
 * Served at /sitemap.xml, which is what robots.txt advertises.
 *
 * This previously used generateSitemaps(), which moves the output to the
 * sharded /sitemap/<id>.xml route. robots.txt still pointed at /sitemap.xml,
 * so crawlers were handed a page that did not exist and never discovered the
 * real one. The sharding exists for datasets above 40,000 URLs; there are
 * currently fewer than thirty, so the plain single sitemap is correct here.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${BASE_URL}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
        { url: `${BASE_URL}/planner`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    ];

    try {
        const [industries, jobs, pseoPages] = await Promise.all([
            client.fetch<{ slug: string; _updatedAt: string }[]>(
                `*[_type == "industry" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
            ),
            client.fetch<{ slug: string; _updatedAt: string }[]>(
                `*[_type == "job" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
            ),
            client.fetch<{ slug: string; _updatedAt: string }[]>(
                `*[_type == "pseo_page" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
            ),
        ]);

        return [
            ...staticRoutes,
            ...industries.map((i) => ({
                url: `${BASE_URL}/industries/${i.slug}`,
                lastModified: i._updatedAt ? new Date(i._updatedAt) : now,
                changeFrequency: "weekly" as const,
                priority: 0.7,
            })),
            ...jobs.map((j) => ({
                url: `${BASE_URL}/careers/${j.slug}`,
                lastModified: j._updatedAt ? new Date(j._updatedAt) : now,
                changeFrequency: "weekly" as const,
                priority: 0.5,
            })),
            ...pseoPages.map((p) => {
                const path = p.slug.startsWith("/") ? p.slug : `/${p.slug}`;
                return {
                url: `${BASE_URL}${path}`,
                lastModified: p._updatedAt ? new Date(p._updatedAt) : now,
                changeFrequency: "weekly" as const,
                priority: 0.8,
                };
            }),
        ];
    } catch (error) {
        // Never fail the sitemap entirely: a CMS outage should still leave the
        // static routes discoverable.
        console.error("Sitemap: CMS fetch failed, serving static routes only", error);
        return staticRoutes;
    }
}
