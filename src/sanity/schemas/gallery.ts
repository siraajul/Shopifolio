import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'gallery',
    title: '3D Gallery',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Main Gallery',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'images',
            title: 'Gallery Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            validation: (Rule) => Rule.required().min(12),
            description: 'Upload at least 12 images for the 3-column layout.',
        }),
    ],
})
