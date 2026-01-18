import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.shift2dynamic.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/private/', '/studio/'],
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
