import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'pricing',
    title: 'Pricing Tiers',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Tier Name',
            type: 'string',
        }),
        defineField({
            name: 'price',
            title: 'Price Display',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'color',
            title: 'Color Theme',
            type: 'string',
            options: {
                list: [
                    { title: 'Amber', value: 'amber' },
                    { title: 'Blue', value: 'blue' },
                    { title: 'Purple', value: 'purple' },
                ],
            },
        }),
        defineField({
            name: 'popular',
            title: 'Most Popular?',
            type: 'boolean',
        }),
        defineField({
            name: 'features',
            title: 'Features List',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
})
