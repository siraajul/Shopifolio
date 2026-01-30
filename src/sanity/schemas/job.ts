
const job = {
    name: 'job',
    title: 'Job Posting',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Job Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'department',
            title: 'Department',
            type: 'string',
            options: {
                list: [
                    { title: 'Engineering', value: 'Engineering' },
                    { title: 'Design', value: 'Design' },
                    { title: 'Marketing', value: 'Marketing' },
                    { title: 'Product', value: 'Product' },
                    { title: 'Customer Success', value: 'Customer Success' },
                    { title: 'Sales', value: 'Sales' },
                    { title: 'HR', value: 'HR' },
                    { title: 'Finance', value: 'Finance' },
                    { title: 'Operations', value: 'Operations' },
                    { title: 'Other', value: 'Other' },
                ],
            },
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            initialValue: 'Remote',
        },
        {
            name: 'type',
            title: 'Job Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Full-time', value: 'Full-time' },
                    { title: 'Part-time', value: 'Part-time' },
                    { title: 'Contract', value: 'Contract' },
                    { title: 'Internship', value: 'Internship' },
                ],
            },
        },
        {
            name: 'description',
            title: 'Job Description',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'requirements',
            title: 'Requirements',
            type: 'array',
            of: [{ type: 'block' }],
        },
        {
            name: 'lastDate',
            title: 'Last Date to Apply',
            type: 'datetime',
        },
        {
            name: 'salary',
            title: 'Salary Range',
            type: 'string', // e.g. "$50k - $70k", "Competitive"
        },
        {
            name: 'workingHours',
            title: 'Working Hours',
            type: 'string', // e.g. "9 AM - 5 PM EST"
        },
        {
            name: 'probationPeriod',
            title: 'Probation Period',
            type: 'string', // e.g. "3 months"
        },
        {
            name: 'benefits',
            title: 'Benefits',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'softSkills',
            title: 'Soft Skills Web',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }
    ],
}

export default job
