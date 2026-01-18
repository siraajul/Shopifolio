import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'impact',
    title: 'Impact Stats',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'Real Impact',
        }),
        defineField({
            name: 'description',
            title: 'Section Description',
            type: 'text',
            initialValue: 'Numbers that speak for themselves.',
        }),
        defineField({
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'value',
                            title: 'Value (e.g. $30M+)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'label',
                            title: 'Label (e.g. Revenue Generated)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'percentage',
                            title: 'Percentage/Growth (e.g. +45%)',
                            type: 'string',
                        }),
                    ],
                },
            ],
        }),
    ],
})
