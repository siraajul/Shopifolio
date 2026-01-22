
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";
import { Metadata } from "next";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// --- Types ---
interface Project {
  _id: string;
  title: string;
  description: string;
  image: SanityImageSource;
  link: string;
  tags: string[];
}

interface IndustryData {
  name: string;
  description: string;
  image: SanityImageSource;
  projects: Project[];
}

// --- Data Fetching ---
async function getIndustryData(slug: string): Promise<IndustryData | null> {
  const query = `*[_type == "industry" && slug.current == $slug][0]{
    name,
    description,
    image,
    "projects": *[_type == "project" && references(^._id)] {
      _id,
      title,
      description,
      image,
      link,
      tags
    }
  }`;

  return await client.fetch(query, { slug });
}

// --- Metadata ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getIndustryData(params.slug);
  if (!data) return {};

  return {
    title: `Best Shopify Sites for ${data.name} | Shift2Dynamic`,
    description: data.description || `Explore our curated selection of e-commerce projects for the ${data.name} industry.`,
     openGraph: {
      title: `Best Shopify Sites for ${data.name}`,
      description: data.description || `Explore our curated selection of e-commerce projects for the ${data.name} industry.`,
      images: data.image ? [urlFor(data.image).width(1200).height(630).url()] : [],
    },
  };
}

export const revalidate = 60; // ISR: Revalidate every 60 seconds

// --- Page Component ---
export default async function IndustryPage({ params }: { params: { slug: string } }) {
  const data = await getIndustryData(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Link 
        href="/work" 
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
        aria-label="Back to Work"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Work
      </Link>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
            {/* Industry Icon/Image (Optional) */}
             {data.image && (
                <div className="relative w-20 h-20 mx-auto mb-8 rounded-2xl overflow-hidden shadow-lg border border-border/50">
                     <Image
                        src={urlFor(data.image).width(200).url()}
                        alt={data.name}
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            {data.name} <span className="text-primary">Projects</span>
          </h1>
          {data.description && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        {data.projects && data.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project) => (
              <a
                key={project._id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block"
              >
                {/* Image */}
                 {project.image && (
                    <Image
                    src={urlFor(project.image).width(800).height(600).url()}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                 )}
               

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-primary mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    <span className="font-semibold text-sm">View Live Site</span>
                    <ExternalLink size={14} />
                  </div>
                   {/* Tags */}
                  {project.tags && (
                      <div className="flex flex-wrap gap-2 mt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                          {project.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-xs text-white/80 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
                                  {tag}
                              </span>
                          ))}
                      </div>
                  )}
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100">
                  <ArrowRight size={18} className="-rotate-45" />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border rounded-3xl bg-neutral-50 dark:bg-neutral-900/50">
            <p className="text-xl text-muted-foreground">Coming Soon</p>
            <p className="text-sm text-muted-foreground mt-2">
              We are currently curating the best projects for this industry.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
