import React from 'react';
// import HeroSection from '@/components/sections/hero-section';
// We will need to create or import other sections. 
// For this MVP, we map the generic schema types to existing components where possible,
// or use placeholders.

// Placeholder components for sections that might not exist yet in the exact shape we defined
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DefaultHero = ({ title, subtitle, bg_image: _bg_image }: any) => (
  <section className="py-20 px-4 bg-muted text-center">
    <h1 className="text-4xl font-bold mb-4">{title}</h1>
    <p className="text-xl text-muted-foreground">{subtitle}</p>
  </section>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContentSection = ({ heading, body }: any) => (
  <section className="py-16 px-4 max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-6">{heading}</h2>
    {/* Needs PortableText renderer for 'body' if it is portable text, 
        but our simple generic implementation treats it as simple text for now or needs proper implementation */}
    <div className="prose dark:prose-invert">
      {/* Simplify for now */}
      {JSON.stringify(body)}
    </div>
  </section>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FAQSection = ({ title, faqs }: any) => (
  <section className="py-16 px-4 max-w-4xl mx-auto">
     <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
     <div className="space-y-4">
       {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
       {faqs?.map((faq: any, i: number) => (
         <div key={i} className="p-4 border rounded-lg">
           <h3 className="font-semibold">{faq.question}</h3>
           <p className="mt-2 text-muted-foreground">{faq.answer}</p>
         </div>
       ))}
     </div>
  </section>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  'hero_section': DefaultHero, // Or map to real HeroSection if props align
  'content_section': ContentSection,
  'faq_section': FAQSection,
  // Add mappings for real components
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PageBuilder({ sections }: { sections: any[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => {
        const Component = COMPONENT_MAP[section._type];
        if (!Component) {
          console.warn(`No component found for type: ${section._type}`);
          return null;
        }
        return <Component key={section._key || index} {...section} />;
      })}
    </>
  );
}
