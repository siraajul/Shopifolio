import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'marquee',
    title: 'Marquee Items',
    type: 'document',
    fields: [
        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'text', title: 'Text', type: 'string' }),
                        defineField({ name: 'isHighlighted', title: 'Is Highlighted?', type: 'boolean' }),
                        defineField({ name: 'gradientColor', title: 'Gradient Color CSS', type: 'string', description: 'e.g. from-blue-400 to-blue-600' }),
                    ]
                }
            ],
        }),
    ],
})
