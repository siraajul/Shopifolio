import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'seo_shared',
    title: 'SEO Settings',
    type: 'object',
    fields: [
        defineField({
            name: 'meta_title',
            title: 'Meta Title',
            type: 'string',
            description: 'Overwrites the default page title. Supports variable injection like {city}.',
        }),
        defineField({
            name: 'meta_description',
            title: 'Meta Description',
            type: 'text',
            description: 'Overwrites the default meta description. Supports variable injection.',
        }),
        defineField({
            name: 'canonical_url',
            title: 'Canonical URL',
            type: 'url',
            description: 'Leave empty to use the default URL.',
        }),
        defineField({
            name: 'noindex',
            title: 'No Index',
            type: 'boolean',
            description: 'Hide this page from search engines.',
            initialValue: false,
        }),
        defineField({
            name: 'og_image',
            title: 'Open Graph Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'schema_type',
            title: 'Schema Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Article', value: 'Article' },
                    { title: 'Product', value: 'Product' },
                    { title: 'FAQ', value: 'FAQPage' },
                    { title: 'Service', value: 'Service' },
                ],
            },
            initialValue: 'Article',
        }),
    ],
})
