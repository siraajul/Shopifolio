"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic"

const PopupModal = dynamic(
  () => import("react-calendly").then((mod) => mod.PopupModal),
  { ssr: false }
)
import { StarButton } from "@/components/ui/star-button";
import { 
  Package, 
  Shirt, 
  Sparkles, 
  Gem, 
  Utensils, 
  Smartphone, 
  Baby, 
  Armchair, 
  Dumbbell, 
  PawPrint,
  ExternalLink,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";


// --- Data: Industry Categories & Projects ---

// Industry Keys
type IndustryKey = 
  | "single" 
  | "fashion" 
  | "beauty" 
  | "jewelry" 
  | "food" 
  | "tech" 
  | "kids" 
  | "home" 
  | "fitness" 
  | "pet";

interface IndustryConfig {
  id: IndustryKey;
  label: string; // Used for tooltip/aria, but hidden in UI (Icon only)
  icon: React.ReactNode;
}

const INDUSTRIES: IndustryConfig[] = [
  { id: "fashion", label: "Fashion", icon: <Shirt size={20} /> },
  { id: "beauty", label: "Beauty", icon: <Sparkles size={20} /> },
  { id: "jewelry", label: "Jewelry", icon: <Gem size={20} /> },
  { id: "food", label: "Food", icon: <Utensils size={20} /> },
  { id: "tech", label: "Electronics", icon: <Smartphone size={20} /> },
  { id: "home", label: "Home", icon: <Armchair size={20} /> },
  { id: "kids", label: "Kids", icon: <Baby size={20} /> },
  { id: "fitness", label: "Fitness", icon: <Dumbbell size={20} /> },
  { id: "pet", label: "Pet", icon: <PawPrint size={20} /> },
  { id: "single", label: "Single Product", icon: <Package size={20} /> },
];

// Project Interface
interface Project {
  id: string;
  image: string;
  title: string;
  link: string;
  industry: IndustryKey;
}

export default function IndustryShowcase({ limit, title }: { limit?: number | null; title?: string }) {
  const [activeTab, setActiveTab] = useState<IndustryKey>("fashion");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Calendly State
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
       setRootElement(document.getElementById("home") || document.body);
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "showcaseProject"]{
          _id,
          title,
          industry,
          image,
          link
        }`;
        const data = await client.fetch(query);
        
        // Map Sanity data to our Project interface
        const mappedProjects = data.map((item: any) => ({
          id: item._id,
          title: item.title,
          industry: item.industry,
          link: item.link,
          image: urlFor(item.image).width(800).url()
        }));

        setProjects(mappedProjects);
      } catch (error) {
        console.error("Error fetching showcase projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects by active tab
  const activeProjects = projects.filter(p => p.industry === activeTab);
  
  // Apply limit if provided
  const displayedProjects = limit ? activeProjects.slice(0, limit) : activeProjects;
  const showViewMore = limit && activeProjects.length > limit;

  // Fallback for empty states (optional: keep placeholders if no data?)
  // For now, if no data, we might show a message or just empty grid.
  // Actually, let's keep the user's "no sugar coating" vibe and show empty if empty.
  // BUT to avoid broken UI during dev before they add content, let's add a robust check.

  return (
    <section className="relative w-full py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title || "Curated Work"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our portfolio by industry. Real live stores, real results.
          </p>
        </div>

        {/* Icon Toggle Bar */}
        <div className="flex justify-center mb-12">
            <div className="inline-flex flex-wrap justify-center gap-2 p-2 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-border/50">
                {INDUSTRIES.map((industry) => (
                    <button
                        key={industry.id}
                        onClick={() => setActiveTab(industry.id)}
                        className={cn(
                            "relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300",
                            activeTab === industry.id 
                                ? "bg-primary text-primary-foreground shadow-lg scale-110 z-10" 
                                : "text-muted-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-foreground"
                        )}
                        title={industry.label} // Tooltip for accessibility/hover
                    >
                         {industry.icon}
                         {activeTab === industry.id && (
                             <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 rounded-full bg-primary -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                             />
                         )}
                    </button>
                ))}
            </div>
        </div>

        {/* Projects Grid */}
        <div className="min-h-[600px]">
             {loading ? (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                    Loading projects...
                </div>
             ) : (
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-12"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {/* Active Category Title (Optional context) */}
                      <div className="col-span-full mb-4 flex items-center gap-2 text-primary font-medium opacity-80">
                      {INDUSTRIES.find(i => i.id === activeTab)?.icon}
                      <span>{INDUSTRIES.find(i => i.id === activeTab)?.label} Projects</span>
                      </div>

                      {displayedProjects.length > 0 ? (
                          displayedProjects.map((project, index) => (
                              <motion.a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  key={project.id}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                              >
                                  <Image
                                      src={project.image}
                                      alt={project.title}
                                      fill
                                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                                  />
                                  
                                  {/* Overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                      <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                          {project.title}
                                      </h3>
                                      <div className="flex items-center gap-2 text-primary mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                          <span className="font-semibold text-sm">View Live Site</span>
                                          <ExternalLink size={14} />
                                      </div>
                                  </div>

                                  {/* Top Right Arrow Icon (always visible hint) */}
                                  <div className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100">
                                      <ArrowRight size={14} className="-rotate-45" />
                                  </div>
                              </motion.a>
                          ))
                      ) : (
                          <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-border rounded-xl">
                              No projects found for this category yet.
                          </div>
                      )}
                    </div>
                    
                    {/* View More Button */}
                    {showViewMore && (
                      <div className="flex justify-center mt-2">
                        <button 
                          onClick={() => window.location.href = '/work'}
                          className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                          <span className="font-medium">View All {INDUSTRIES.find(i => i.id === activeTab)?.label} Projects</span>
                          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </div>
                    )}
                </motion.div>
             )}
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-16 text-center flex flex-col items-center gap-4">
             <div onClick={() => setIsCalendlyOpen(true)} className="cursor-pointer">
                 <StarButton className="h-12 px-8 rounded-full text-base">
                     Want to build something like this?
                 </StarButton>
             </div>
        </div>

        {rootElement && (
            <PopupModal
                url="https://calendly.com/riajul"
                onModalClose={() => setIsCalendlyOpen(false)}
                open={isCalendlyOpen}
                rootElement={rootElement}
            />
        )}

      </div>
    </section>
  );
}
