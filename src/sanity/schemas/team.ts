import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'team',
    title: 'Team Section',
    type: 'document',
    fields: [
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
            name: 'members',
            title: 'Team Members',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                        }),
                        defineField({
                            name: 'role',
                            title: 'Role',
                            type: 'string',
                        }),
                        defineField({
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: {
                                hotspot: true,
                            },
                        }),
                        defineField({
                            name: 'linkedin',
                            title: 'LinkedIn URL',
                            type: 'url',
                        }),
                        defineField({
                            name: 'twitter',
                            title: 'Twitter URL',
                            type: 'url',
                        }),
                    ],
                },
            ],
        }),
    ],
})
