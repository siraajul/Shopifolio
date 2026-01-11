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
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Your name (e.g., Riajul)',
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            description: 'Your role/job title',
        }),
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'description', // Keeping for backward compatibility or main title description
            title: 'Main Heading',
            type: 'text',
        }),
        defineField({
            name: 'bio1',
            title: 'Bio Paragraph 1',
            type: 'text',
        }),
        defineField({
            name: 'bio2',
            title: 'Bio Paragraph 2',
            type: 'text',
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA Button Text',
            type: 'string',
            initialValue: "LET'S COLLABORATE",
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
