import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Main Title',
            type: 'string',
            initialValue: 'Make Shopify',
        }),
        defineField({
            name: 'rotatingWords',
            title: 'Rotating Words',
            type: 'array',
            of: [{ type: 'string' }],
            initialValue: ['Global', 'Fast', 'Scalable'],
        }),
        defineField({
            name: 'subtext',
            title: 'Scroll Subtext',
            type: 'string',
            initialValue: 'Scroll',
        }),
    ],
})
