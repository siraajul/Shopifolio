import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'about',
    title: 'About Section',
    type: 'document',
    fields: [
        defineField({
            name: 'experienceDate',
            title: 'Experience Start Date',
            type: 'date',
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'stats',
            title: 'Stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'value', title: 'Value', type: 'string' }),
                        defineField({ name: 'label', title: 'Label', type: 'string' }),
                    ]
                }
            ],
        }),
    ],
})
