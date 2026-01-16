"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Layers, Clock, Palette, TrendingUp, MousePointerClick } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";

interface Project {
  id: number;
  image: string;
  title: string;
  theme: string;
  apps: string[];
  timeline: string;
  link: string;
  metric?: string;
  metricLabel?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    title: "Vogue Kith",
    theme: "Prestige (Custom)",
    apps: ["Klaviyo", "Yotpo", "Gorgias"],
    timeline: "3 Weeks",
    link: "#",
    metric: "+25%",
    metricLabel: "Conversion Rate"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2101&auto=format&fit=crop",
    title: "TechNova",
    theme: "Impact",
    apps: ["Recharge", "Matrixify", "Klaviyo"],
    timeline: "4 Weeks",
    link: "#",
    metric: "1.2s",
    metricLabel: "Page Load Time"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2080&auto=format&fit=crop",
    title: "PureGlow",
    theme: "Sense",
    apps: ["Okendo", "Postscript", "Rebuy"],
    timeline: "2 Weeks",
    link: "#",
    metric: "+15%",
    metricLabel: "Avg. Order Value"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    title: "UrbanFit",
    theme: "Dawn (Custom)",
    apps: ["Tapcart", "Smile.io", "Judge.me"],
    timeline: "5 Weeks",
    link: "#",
    metric: "+40%",
    metricLabel: "Mobile Sales"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    title: "LuxeLiving",
    theme: "Warehouse",
    apps: ["PageFly", "Loox", "Bundler"],
    timeline: "6 Weeks",
    link: "#",
    metric: "98/100",
    metricLabel: "Performance Score"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    title: "EcoEats",
    theme: "Focal",
    apps: ["Bundler", "Judge.me", "Recharge"],
    timeline: "3 Weeks",
    link: "#",
    metric: "200%",
    metricLabel: "Subscriber Growth"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=1964&auto=format&fit=crop",
    title: "CyberDeck",
    theme: "Impulse",
    apps: ["Sanity", "Hydrogen"],
    timeline: "8 Weeks",
    link: "#",
    metric: "Headless",
    metricLabel: "Architecture"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    title: "Kicks & Co",
    theme: "Expanse",
    apps: ["Yotpo", "Nostra", "Klaviyo"],
    timeline: "4 Weeks",
    link: "#",
    metric: "Top 1%",
    metricLabel: "Shopify Store"
  }
];

const FlipCard = ({ project }: { project: Project }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-[75vw] sm:w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[30rem] perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-2xl border border-border">
          <NextImage
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 75vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          
          {/* Interaction Hint */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
             <div className="bg-black/80 backdrop-blur-md rounded-full p-4 mb-2 shadow-xl border border-white/10">
                <MousePointerClick className="w-8 h-8 text-white" />
             </div>
             <span className="px-4 py-2 bg-black/70 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/20 shadow-xl">
                Click to view details
             </span>
          </div>

          {/* Title on front for quick context */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            {project.metric && (
                <div className="flex items-center gap-2 mt-1">
                    <TrendingUp className="w-4 h-4 text-[#008060]" />
                    <span className="text-[#008060] font-bold text-sm">{project.metric} {project.metricLabel}</span>
                </div>
            )}
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-border p-6 flex flex-col items-start justify-center text-left"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-6">{project.title}</h3>
          
          {/* Featured Metric Badge */}
          {project.metric && (
             <div className="mb-6 w-full bg-[#008060]/10 border border-[#008060]/20 rounded-lg p-3 flex items-center gap-3">
                <div className="p-2 bg-[#008060]/20 rounded-full">
                    <TrendingUp className="w-5 h-5 text-[#008060]" />
                </div>
                <div>
                    <div className="text-2xl font-extrabold text-[#008060]">{project.metric}</div>
                    <div className="text-xs text-[#008060]/80 uppercase tracking-wider font-semibold">{project.metricLabel}</div>
                </div>
             </div>
          )}

          <div className="space-y-4 w-full">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Palette className="w-4 h-4 text-blue-500" />
              <span className="text-sm"><strong className="text-foreground">Theme:</strong> {project.theme}</span>
            </div>
            
            <div className="flex items-start gap-3 text-muted-foreground">
              <Layers className="w-4 h-4 text-purple-500 mt-1" />
              <span className="text-sm"><strong className="text-foreground">Apps:</strong> {project.apps.join(", ")}</span>
            </div>
            
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="text-sm"><strong className="text-foreground">Timeline:</strong> {project.timeline}</span>
            </div>
          </div>

          <div className="mt-8 w-full">
            <Link 
              href={project.link}
              className="flex items-center justify-center gap-2 w-full py-3 bg-foreground text-background font-bold rounded-lg hover:bg-muted-foreground transition-colors"
              onClick={(e) => e.stopPropagation()} // Prevent flip when clicking link
            >
              Visit Live Store <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
          
           <div className="absolute top-4 right-4">
             <button 
               className="text-muted-foreground hover:text-foreground text-xs uppercase font-bold tracking-widest"
               onClick={(e) => {
                 e.stopPropagation();
                 setIsFlipped(false);
               }}
             >
                Close
             </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ImageAutoSlider() {
  // Duplicate images for seamless loop
  const duplicatedProjects = [...PROJECTS, ...PROJECTS];

  return (
    <>
      <style key="slider-styles">{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 40s linear infinite;
        }

        .infinite-scroll:hover {
          animation-play-state: paused;
        }

        /* Utility classes for 3D flip */
        .perspective-1000 {
            perspective: 1000px;
        }
        .preserve-3d {
            transform-style: preserve-3d;
        }
        .backface-hidden {
            backface-visibility: hidden;
        }
      `}</style>
      
      <div className="w-full bg-transparent relative overflow-hidden flex flex-col items-center justify-center py-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent z-0" />

        {/* Header Content */}
        <div className="relative z-10 text-center mb-12 px-4">
             <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
                Selected Work
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Click on any project to see the tech stack, theme details, and <span className="text-[#008060] font-bold">results</span>.
            </p>
        </div>
        
        {/* Scrolling images container */}
        <div className="relative z-10 w-full flex items-center justify-center py-8">
          {/* Mask container */}
          <div className="w-full max-w-[95rem] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="infinite-scroll flex gap-8 w-fit">
              {duplicatedProjects.map((project, index) => (
                <FlipCard key={`${project.id}-${index}`} project={project} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
      </div>
    </>
  );
}
