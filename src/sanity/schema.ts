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
import footer from './schemas/footer'
import gallery from './schemas/gallery'
import showcaseProject from './schemas/showcase-project'
import impact from './schemas/impact'
import seoShared from './schemas/seo-shared'
import pseoTemplate from './schemas/pseo-template'
import pseoPage from './schemas/pseo-page'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [hero, about, marquee, service, process, industry, pricing, project, testimonial, faq, footer, gallery, showcaseProject, impact, seoShared, pseoTemplate, pseoPage],
}
