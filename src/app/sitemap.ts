import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.shift2dynamic.com";

    // Fetch all industry slugs
    const industries = await client.fetch(`*[_type == "industry" && defined(slug.current)]{ "slug": slug.current }`);

    const industryUrls = industries.map((ind: { slug: string }) => ({
        url: `${baseUrl}/industries/${ind.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/work`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/planner`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9, // High priority for conversion page
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        },
        ...industryUrls,
    ];
}
