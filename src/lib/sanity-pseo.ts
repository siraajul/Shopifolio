import { client } from "@/sanity/lib/client";
import { injectVariables } from "./pseo-utils";

export async function getProgrammaticPage(slug: string) {
  // Query to fetch the page, its template, and resolve references (like FAQs)
  const query = `*[_type == "pseo_page" && slug.current == $slug][0]{
    ...,
    template->{
      ...,
      sections[]{
        ...,
        _type == 'faq_section' => {
          ...,
          faqs[]->{
            question,
            answer
          }
        }
      }
    },
    // Hub & Spoke: Fetch children pages (pages that start with this slug)
    "children_pages": *[_type == "pseo_page" && slug.current match $slug + "/*"][0...10]{
      "title": seo.meta_title,
      "slug": slug.current
    },
    // Siblings: Fetch pages in the same directory (simplified approximation)
    "related_pages": *[_type == "pseo_page" && slug.current != $slug && count((slug.current match "/*")) == count(($slug match "/*"))][0...5]{
       "title": seo.meta_title,
       "slug": slug.current
    }
  }`;

  const pageData = await client.fetch(query, { slug });

  if (!pageData) return null;

  // Parse variables
  let variables = {};
  if (pageData.variables) {
    try {
      variables = JSON.parse(pageData.variables);
    } catch {
      console.error("Failed to parse variables for page:", slug);
    }
  }

  // Inject variables into the template sections
  // We prioritize page-specific overrides if they existed, but for now we mix template + variables
  const injectedSections = injectVariables(pageData.template.sections, variables);

  // Inject variables into SEO
  const injectedSeo = injectVariables({
    title: pageData.seo?.meta_title || pageData.template.name, // Fallback logic needs refinement
    description: pageData.seo?.meta_description || pageData.template.description,
    ...pageData.seo
  }, variables);

  return {
    ...pageData,
    sections: injectedSections,
    seo: injectedSeo
  };
}
