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
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
})
