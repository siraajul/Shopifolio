import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'process',
    title: 'Workflow',
    type: 'document',
    fields: [
        defineField({
            name: 'stepNumber',
            title: 'Step Number',
            type: 'string', // e.g. "01"
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
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'darkColor',
            title: 'Dark Mode Color',
            type: 'string',
            description: 'Hex code for dark mode card background (e.g. #0a0a0a)'
        })
    ],
})
