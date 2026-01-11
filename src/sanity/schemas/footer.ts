import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        defineField({
            name: 'companyName',
            title: 'Company Name',
            type: 'string',
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'text',
        }),
        defineField({
            name: 'email',
            title: 'Contact Email',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'LinkedIn', value: 'linkedin' },
                                    { title: 'Twitter', value: 'twitter' },
                                    { title: 'GitHub', value: 'github' },
                                    { title: 'Website', value: 'website' },
                                    { title: 'Instagram', value: 'instagram' },
                                ],
                            },
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                        }),
                    ],
                },
            ],
        }),
        defineField({
            name: 'footerLinks',
            title: 'Footer Link Sections',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Section',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'links',
                            title: 'Links',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    fields: [
                                        defineField({ name: 'label', title: 'Label', type: 'string' }),
                                        defineField({ name: 'href', title: 'Link (URL or #id)', type: 'string' }),
                                    ],
                                },
                            ],
                        }),
                    ],
                },
            ],
        }),
    ],
})
