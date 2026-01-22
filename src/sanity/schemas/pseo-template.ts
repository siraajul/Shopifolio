import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'pseo_template',
    title: 'pSEO Template',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Template Name',
            type: 'string',
            description: 'e.g., "Industry Landing Page"',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Internal note about what this template is for.',
        }),
        defineField({
            name: 'sections',
            title: 'Page Sections',
            type: 'array',
            description: 'Define the layout of the page. Supports variable injection in text fields.',
            of: [
                // We will define reusable section blocks here.
                // For now, we define generic blocks.
                {
                    type: 'object',
                    name: 'hero_section',
                    title: 'Hero Section',
                    fields: [
                        defineField({ name: 'title', type: 'string', title: 'Title' }),
                        defineField({ name: 'subtitle', type: 'text', title: 'Subtitle' }),
                        defineField({ name: 'bg_image', type: 'image', title: 'Background Image' }),
                    ]
                },
                {
                    type: 'object',
                    name: 'content_section',
                    title: 'Content Section',
                    fields: [
                        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
                        defineField({ name: 'body', type: 'array', of: [{ type: 'block' }], title: 'Body Content' }),
                    ]
                },
                {
                    type: 'object',
                    name: 'features_section',
                    title: 'Features Section',
                    fields: [
                        defineField({ name: 'title', type: 'string' }),
                        defineField({
                            name: 'features',
                            type: 'array',
                            of: [{
                                type: 'object',
                                fields: [
                                    defineField({ name: 'title', type: 'string' }),
                                    defineField({ name: 'description', type: 'text' })
                                ]
                            }]
                        })
                    ]
                },
                {
                    type: 'object',
                    name: 'faq_section',
                    title: 'FAQ Section',
                    fields: [
                        defineField({ name: 'title', type: 'string', title: 'Title' }),
                        defineField({
                            name: 'faqs',
                            type: 'array',
                            of: [{
                                type: 'reference',
                                to: [{ type: 'faq' }]
                            }]
                        }),
                    ]
                },
            ],
        }),
    ],
})
