import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'industry',
    title: 'Industries',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Industry Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'seo_shared',
        }),
    ],
})
