import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'pseo_page',
    title: 'pSEO Page',
    type: 'document',
    fields: [
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'The URL path for this page (e.g., /best-shopify-sites-for-fashion)',
            validation: (rule) => rule.required(),
            options: {
                source: 'seo.meta_title',
            }
        }),
        defineField({
            name: 'template',
            title: 'Template',
            type: 'reference',
            to: [{ type: 'pseo_template' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'variables',
            title: 'Variables (JSON)',
            type: 'text',
            description: 'JSON object containing key-value pairs for variable injection (e.g. {"industry": "Fashion", "city": "NYC"}).',
            validation: (Rule) => Rule.custom((jsonString) => {
                if (!jsonString) return true
                try {
                    JSON.parse(jsonString as string)
                    return true
                } catch {
                    return 'Invalid JSON format'
                }
            }),
        }),
        defineField({
            name: 'seo',
            title: 'SEO Overrides',
            type: 'seo_shared',
            description: 'Specific SEO settings for this page. If empty, falls back to template defaults.',
        }),
    ],
    preview: {
        select: {
            title: 'slug.current',
            subtitle: 'template.name',
        },
    },
})
