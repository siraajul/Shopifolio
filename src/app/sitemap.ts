import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE_URL = "https://www.shift2dynamic.com";
const CHUNK_SIZE = 40000; // Safe limit below 50k

export async function generateSitemaps() {
    // Fetch total count of pSEO pages
    const count = await client.fetch(`count(*[_type == "pseo_page" && defined(slug.current)])`);

    const chunks = Math.ceil(count / CHUNK_SIZE);
    // If count is 0 or small, return at least 1 sitemap
    if (chunks <= 1) return [{ id: 0 }];

    return Array.from({ length: chunks }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
    const start = id * CHUNK_SIZE;

    // Fetch pSEO pages for this chunk
    // Note: 'start' is the offset
    const pseoPages = await client.fetch(
        `*[_type == "pseo_page" && defined(slug.current)] | order(slug.current asc) [$start...$end] { 
            "slug": slug.current, 
            _updatedAt 
        }`,
        { start, end: start + CHUNK_SIZE }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pseoUrls = pseoPages.map((page: any) => ({
        url: `${BASE_URL}${page.slug.startsWith('/') ? page.slug : `/${page.slug}`}`,
        lastModified: page._updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // If it's the first sitemap, include static pages and industries
    if (id === 0) {
        // Fetch industries (assuming < 10k of these)
        const industries = await client.fetch(`*[_type == "industry" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const industryUrls = industries.map((ind: any) => ({
            url: `${BASE_URL}/industries/${ind.slug}`,
            lastModified: ind._updatedAt || new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }));

        return [
            {
                url: BASE_URL,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 1,
            },
            {
                url: `${BASE_URL}/work`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.8,
            },
            {
                url: `${BASE_URL}/planner`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: 0.9,
            },
            {
                url: `${BASE_URL}/privacy`,
                lastModified: new Date(),
                changeFrequency: "yearly",
                priority: 0.5,
            },
            ...industryUrls,
            ...pseoUrls
        ];
    }

    // Secondary sitemaps only contain pSEO pages
    return pseoUrls;
}
