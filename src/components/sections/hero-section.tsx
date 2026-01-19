"use client"

import { useState, useEffect } from "react"
import { motion, LayoutGroup } from "motion/react"
import Image from "next/image"
import { TextRotate } from "@/components/ui/text-rotate"
import { AvatarCircles } from "@/components/ui/avatar-circles"
import { SparklesText } from "@/components/ui/sparkles-text"
import { TrustBadge } from "@/components/ui/trust-badge"
import { SevenFigureIcon, ProvenIcon, ConvertingIcon, PremiumIcon, ScalableIcon } from "@/components/ui/animated-icons"
import { ArrowRight } from "lucide-react"

import { HyperText } from "@/components/ui/hyper-text"
import Link from "next/link";

interface HeroProps {
  heroData?: {
    title: string;
    rotatingWords: string[];
    subtext: string;
  };
}

import ProceduralGroundBackground from "@/components/ui/procedural-ground-background";

export default function HeroSection({ heroData }: HeroProps) {

  const scrollToWork = () => {
    const element = document.getElementById("work");
    if (element) {
        const yOffset = -20; 
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 pt-10 pb-20 overflow-hidden">
        <ProceduralGroundBackground className="hidden md:block" />


        {/* Main Content */}
        <div className="relative z-10 w-full text-center flex flex-col items-center justify-center gap-4 sm:gap-8">
          <div className="flex flex-col items-center gap-4">
{/* Logo */}
              <div 
                className="relative w-60 h-20 mb-2 sm:w-80 sm:h-24 cursor-pointer"
                onClick={() => window.location.reload()}
              >
                <Image
                  src="/shift2dynamic_bg_remove_logo.png"
                  alt="Shift2Dynamic"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

               {/* Trust Badge */}
                <TrustBadge className="mb-4" />

              <div className="text-3xl max-[375px]:text-3xl sm:text-6xl md:text-8xl flex flex-col sm:flex-row flex-wrap items-center justify-center text-center font-bold font-sans bg-transparent text-foreground overflow-hidden">
                <LayoutGroup>
                  <motion.div className="flex flex-wrap justify-center whitespace-pre-wrap" layout>
                    <motion.span
                      className="pt-0.5 sm:pt-1 md:pt-3 text-foreground font-display"
                      layout
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    >
                      {heroData?.title || "We Engineer"}{" "}
                    </motion.span>
                    <TextRotate
                      texts={
                        heroData?.rotatingWords?.map((word, i) => (
                          <span key={i} className="font-bold font-display">{word}</span>
                        )) || [
                          <SevenFigureIcon key="7figure" />,
                          <ProvenIcon key="proven" />,
                          <ConvertingIcon key="converting" />,
                          <PremiumIcon key="premium" />,
                          <ScalableIcon key="scalable" />,
                        ]}mainClassName="text-white dark:text-black px-3 sm:px-3 md:px-5 bg-primary overflow-hidden py-0.5 sm:py-1 md:py-3 justify-center rounded-xl whitespace-nowrap"
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={2500}
                    />
                  </motion.div>
                </LayoutGroup>
              </div>

              <div className="text-3xl max-[375px]:text-3xl sm:text-6xl md:text-8xl font-bold font-display text-foreground mt-2">
                 Shopify Ecosystems
              </div>

              <div className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mt-4 sm:mt-6 font-medium">
                <span className="hidden sm:inline">Stop settling for templates. Build high-performance, custom Shopify experiences that crush benchmarks.</span>
                <div className="mt-2">
                  <SparklesText 
                    text="Don't just build. Dominate." 
                    className="text-foreground font-semibold text-lg md:text-xl inline-block" 
                    colors={{ first: '#10b981', second: '#14b8a6' }}
                  />
                </div>
              </div>

              {/* Stats Sub-heading */}
              <div className="flex flex-nowrap items-center justify-center gap-2 md:gap-8 text-[10px] sm:text-xs md:text-base text-gray-400 font-medium mt-2 sm:mt-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <HyperText className="text-foreground font-bold" text="$10M+" />
                    <span>Revenue</span>
                  </div>
                  <div className="block w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <div className="flex items-center gap-1">
                    <HyperText className="text-foreground font-bold" text="45%" />
                    <span>Uplift</span>
                  </div>
                  <div className="block w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <div className="flex items-center gap-1">
                    <HyperText className="text-foreground font-bold" text="0.4s" />
                    <span>Speed</span>
                  </div>
              </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link 
              href="/planner"
              className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-primary text-black rounded-full font-bold text-lg hover:shadow-[0_0_40px_-5px_hsl(var(--primary)/0.6)] transition-all duration-300 flex items-center gap-2"
            >
              Audit My Brand <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={scrollToWork} 
              className="px-6 py-3 sm:px-8 sm:py-4 font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              View Proof
            </button>
          </div>
        </div>

        <motion.div
           className="mt-12 hidden md:flex flex-col items-center gap-2"
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-900 dark:text-gray-100"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
