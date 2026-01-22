import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Selected Work',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Project Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Project Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'link',
            title: 'Project Link',
            type: 'url',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'industry',
            title: 'Industry',
            type: 'reference',
            to: [{ type: 'industry' }],
        }),
    ],
})
