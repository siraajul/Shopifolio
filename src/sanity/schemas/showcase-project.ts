import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'showcaseProject',
    title: 'Showcase Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Project Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'industry',
            title: 'Industry Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Fashion', value: 'fashion' },
                    { title: 'Beauty', value: 'beauty' },
                    { title: 'Jewelry', value: 'jewelry' },
                    { title: 'Food', value: 'food' },
                    { title: 'Electronics', value: 'tech' },
                    { title: 'Home', value: 'home' },
                    { title: 'Kids', value: 'kids' },
                    { title: 'Fitness', value: 'fitness' },
                    { title: 'Pet', value: 'pet' },
                    { title: 'Single Product', value: 'single' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Project Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Live Site URL',
            type: 'url',
            validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'industry',
            media: 'image',
        },
    },
})
