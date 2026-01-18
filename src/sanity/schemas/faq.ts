import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'faq',
    title: 'FAQs',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'text',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'General', value: 'general' },
                    { title: 'Technical', value: 'technical' },
                    { title: 'Process', value: 'process' },
                    { title: 'Pricing', value: 'pricing' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
})
