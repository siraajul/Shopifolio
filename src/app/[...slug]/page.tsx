
import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/page-builder";
import { getProgrammaticPage } from "@/lib/sanity-pseo"; // You will typically need to import this from where you defined it
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { JsonLd } from "@/components/seo/json-ld";

// ISR: Revalidate every hour
export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string[] }>;
};



export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: slugs } = await params;
  const slug = `/${slugs.join("/")}`;
  const pageData = await getProgrammaticPage(slug);

  if (!pageData) {
    return {
        title: "Page Not Found"
    };
  }

  const { seo } = pageData;

  return {
    title: seo?.meta_title || pageData.title,
    description: seo?.meta_description,
    openGraph: {
        images: seo?.og_image ? [seo.og_image] : undefined,
    },
    alternates: {
        canonical: seo?.canonical_url,
    },
    robots: seo?.noindex ? { index: false } : undefined,
  };
}

export default async function ProgrammaticPage({ params }: Props) {
  const { slug: slugs } = await params;
  const slug = `/${slugs.join("/")}`;
  const pageData = await getProgrammaticPage(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* 
        Inject JSON-LD Schema
      */}
      <JsonLd 
        type={pageData.seo?.schema_type || 'Article'} 
        data={pageData} 
        url={`https://www.shift2dynamic.com${slug}`} 
      />
      <PageBuilder sections={pageData.sections} />
    </main>
  );
}


// Generate static params for a subset of pages (optional, for build performance)
export async function generateStaticParams() {
   // Fetch first 50 pSEO pages to prerender
   const paths = await client.fetch<string[]>(
     `*[_type == "pseo_page"][0...50].slug.current`
   );

   return paths.map((path) => ({
     slug: path.split('/').filter(Boolean),
   }));
}
