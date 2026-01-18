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
            name: 'description', // Main heading
            title: 'Main Heading',
            type: 'text',
            description: 'The main hook. Example: "Crafting digital experiences that convert." (Avoid "We craft...")',
            initialValue: "Crafting digital experiences that convert.",
        }),
        defineField({
            name: 'bio1',
            title: 'Bio Paragraph 1',
            type: 'text',
            description: 'First paragraph. focus on expertise. Example: "Expert developers specializing in..."',
            initialValue: "Expert developers and designers specializing in Shopify high-performance builds.",
        }),
        defineField({
            name: 'bio2',
            title: 'Bio Paragraph 2',
            type: 'text',
            description: 'Second paragraph. focus on outcome. Example: "Helping brands scale..."',
            initialValue: "Helping brands scale with custom solutions and data-driven optimization.",
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA Button Text',
            type: 'string',
            initialValue: "LET'S COLLABORATE",
        }),
        defineField({
            name: 'tickerText',
            title: 'Ticker Text',
            type: 'string',
            description: 'The rotating text next to the asterisk (e.g., SHOPIFY ARCHITECTS)',
            initialValue: 'SHOPIFY ARCHITECTS',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'object',
            fields: [
                defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
                defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
                defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
                defineField({ name: 'github', title: 'Github URL', type: 'url' }),
            ],
            initialValue: {
                facebook: 'https://www.facebook.com/',
                instagram: 'https://www.instagram.com/',
                linkedin: 'https://www.linkedin.com/in/riajul-islam-shopify-expert/',
                github: 'https://github.com/',
            }
        }),
        defineField({
            name: 'revenueCard',
            title: 'Revenue Card Stats',
            type: 'object',
            fields: [
                defineField({ name: 'totalRevenue', title: 'Total Revenue', type: 'string', initialValue: '$10,240,500' }),
                defineField({ name: 'growth', title: 'Growth Percentage', type: 'string', initialValue: '+24%' }),
            ]
        }),
        defineField({
            name: 'stats',
            title: 'Stats Grid (4 Items)',
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
            description: 'The 4 stats displayed below the profile image.',
            initialValue: [
                { value: '5+', label: 'Years Experience' },
                { value: '$10M+', label: 'Client Sales' },
                { value: '50+', label: 'Stores Built' },
                { value: 'TOP', label: 'Optimization Experts' },
            ]
        }),
    ],
})
