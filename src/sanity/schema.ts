import { type SchemaTypeDefinition } from 'sanity'

import hero from './schemas/hero'
import about from './schemas/about'
import marquee from './schemas/marquee'
import service from './schemas/service'
import process from './schemas/workflow'
import industry from './schemas/industry'
import pricing from './schemas/pricing'
import project from './schemas/project'
import testimonial from './schemas/testimonial'
import faq from './schemas/faq'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [hero, about, marquee, service, process, industry, pricing, project, testimonial, faq],
}
