
import { WithContext, Article, FAQPage, Service, Product } from 'schema-dts';

type JsonLdProps = {
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; // The page data (title, desc, sections, etc)
  url: string;
};

export function JsonLd({ type = 'Article', data, url }: JsonLdProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let schema: WithContext<any> = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'FAQPage':
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const faqSection = data.sections?.find((s: any) => s._type === 'faq_section');
      if (faqSection && faqSection.faqs) {
        schema = {
          ...schema,
          '@type': 'FAQPage',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mainEntity: faqSection.faqs.map((f: any) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        } as WithContext<FAQPage>;
      }
      break;

    case 'Service':
      schema = {
        ...schema,
        '@type': 'Service',
        name: data.seo?.meta_title || data.title,
        description: data.seo?.meta_description || data.description,
        provider: {
            '@type': 'Organization',
            name: 'Shift2Dynamic',
            url: 'https://www.shift2dynamic.com'
        },
        url: url,
        // Add serviceType, areaServed, etc. if available in variables
      } as WithContext<Service>;
      break;
    
    case 'Product':
         schema = {
            ...schema,
            '@type': 'Product',
            name: data.seo?.meta_title || data.title,
            description: data.seo?.meta_description || data.description,
            // Placeholder for product data
        } as WithContext<Product>;
        break;

    case 'Article':
    default:
      schema = {
        ...schema,
        '@type': 'Article',
        headline: data.seo?.meta_title || data.title,
        description: data.seo?.meta_description || data.description,
        image: data.seo?.og_image ? [data.seo.og_image] : undefined,
        author: {
           '@type': 'Organization',
           name: 'Shift2Dynamic'
        },
        publisher: {
             '@type': 'Organization',
             name: 'Shift2Dynamic',
             logo: {
                 '@type': 'ImageObject',
                 url: 'https://www.shift2dynamic.com/logo.png' // Replace with actual logo
             }
        },
        datePublished: new Date().toISOString(), // This should ideally come from the page data
      } as WithContext<Article>;
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
