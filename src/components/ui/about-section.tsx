"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {VerticalCutReveal} from "@/components/ui/vertical-cut-reveal";
import { ArrowRight, Github } from "lucide-react";
import NextImage from "next/image";
import { useRef } from "react";
import { urlFor } from "@/sanity/lib/image";
import { BlurTextEffect } from "@/components/ui/blur-text-effect";

interface AboutProps {
  data?: {
    experienceDate?: string;
    title?: string;
    description?: string; // Main heading
    name?: string;
    role?: string;
    bio1?: string;
    bio2?: string;
    ctaText?: string;
    profileImage?: any;
    stats?: { value: string; label: string }[];
  };
  onCollaborateClick?: () => void;
}

export default function AboutSection3({ data, onCollaborateClick }: AboutProps) {
  const heroRef = useRef<HTMLElement>(null);
  
  // Default values / Fallbacks
  const {
    name = "SHIFT2DYNAMIC",
    role = "Shopify Experts", 
    ctaText = "LET'S COLLABORATE",
    bio1 = "We are a team of expert developers and designers specializing in Shopify.",
    bio2 = "We help brands scale with high-performance stores and custom solutions.",
    description = "We craft digital experiences that convert.",
    profileImage
  } = data || {};

  const profileImageUrl = profileImage 
  ? urlFor(profileImage).url() 
  : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";

  const revealVariants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };
  return (
    <section className="flex flex-col justify-center py-6 md:py-16 px-4 bg-transparent" ref={heroRef}>
      <div className="max-w-7xl mx-auto w-full">
        {/* Header with social icons - Mobile optimized */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8 gap-4 md:gap-0">
          <div className="flex items-center gap-2 text-xl">
            <span className="text-red-500 animate-spin">✱</span>
            <TimelineContent
              as="span"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wider"
            >
              SHOPIFY ARCHITECTS
            </TimelineContent>
          </div>
          <div className="flex gap-4">
            <TimelineContent
              as="a"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-10 md:h-10 border border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            >
              <NextImage src="https://pro-section.ui-layouts.com/facebook.svg" alt="fb" width={24} height={24} className="w-5 h-5 md:w-6 md:h-6" />
            </TimelineContent>
            <TimelineContent
              as="a"
              animationNum={1}
              timelineRef={heroRef}
              customVariants={revealVariants}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-10 md:h-10 border border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            >
              <NextImage src="https://pro-section.ui-layouts.com/instagram.svg" alt="insta" width={24} height={24} className="w-5 h-5 md:w-6 md:h-6" />
            </TimelineContent>
            <TimelineContent
              as="a"
              animationNum={2}
              timelineRef={heroRef}
              customVariants={revealVariants}
              href="https://www.linkedin.com/in/riajul-islam-shopify-expert/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-10 md:h-10 border border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            >
              <NextImage src="https://pro-section.ui-layouts.com/linkedin.svg" alt="linkedin" width={24} height={24} className="w-5 h-5 md:w-6 md:h-6" />
            </TimelineContent>
            <TimelineContent
              as="a"
              animationNum={3}
              timelineRef={heroRef}
              customVariants={revealVariants}
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-10 md:h-10 border border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            >
              <Github className="w-5 h-5 md:w-6 md:h-6 text-black dark:text-white" />
            </TimelineContent>
          </div>
        </div>

        <div className="relative mb-6 md:mb-14">
          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative group w-full aspect-[3/1] md:aspect-[2.5/1] overflow-hidden rounded-2xl"
          >
            <NextImage
              src={profileImageUrl}
              alt="Profile"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
            
            {/* Overlay: Revenue Dashboard Card */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl flex flex-col gap-2 w-48 md:w-64">
               <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Total Revenue</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
               </div>
               <div className="text-2xl md:text-3xl font-bold text-white flex items-end gap-2">
                 $10,240,500 <span className="text-xs text-green-400 mb-1">+24%</span>
               </div>
               {/* Simple CSS Graph */}
               <div className="flex items-end gap-1 h-8 mt-1 opacity-80">
                  <div className="w-full bg-green-500/20 rounded-sm h-[40%]"></div>
                  <div className="w-full bg-green-500/30 rounded-sm h-[60%]"></div>
                  <div className="w-full bg-green-500/40 rounded-sm h-[30%]"></div>
                  <div className="w-full bg-green-500/50 rounded-sm h-[70%]"></div>
                  <div className="w-full bg-green-500/60 rounded-sm h-[50%]"></div>
                  <div className="w-full bg-green-500/80 rounded-sm h-[90%]"></div>
                  <div className="w-full bg-green-500 rounded-sm h-[100%] shadow-[0_0_10px_theme(colors.green.500)]"></div>
               </div>
            </div>
          </TimelineContent>

          {/* Stats - Responsive Grid */}
          <div className="grid grid-cols-2 md:flex md:justify-between w-full gap-4 md:gap-0 mt-6 md:mt-8 px-2 md:px-0">
            <TimelineContent
               as="div"
               animationNum={5}
               timelineRef={heroRef}
               customVariants={revealVariants}
               className="flex flex-col items-center md:items-start"
            >
               <BlurTextEffect className="text-red-500 font-bold text-2xl md:text-3xl">5+</BlurTextEffect>
               <span className="text-gray-600 dark:text-gray-400 text-sm md:text-base text-center md:text-left">Years Experience</span>
            </TimelineContent>
            
            <TimelineContent
               as="div"
               animationNum={6}
               timelineRef={heroRef}
               customVariants={revealVariants}
               className="flex flex-col items-center md:items-start"
            >
               <BlurTextEffect className="text-red-500 font-bold text-2xl md:text-3xl">$10M+</BlurTextEffect>
               <span className="text-gray-600 dark:text-gray-400 text-sm md:text-base text-center md:text-left">Client Sales</span>
            </TimelineContent>

            <TimelineContent
               as="div"
               animationNum={7}
               timelineRef={heroRef}
               customVariants={revealVariants}
               className="flex flex-col items-center md:items-start"
            >
               <BlurTextEffect className="text-red-500 font-bold text-2xl md:text-3xl">50+</BlurTextEffect>
               <span className="text-gray-600 dark:text-gray-400 text-sm md:text-base text-center md:text-left">Stores Built</span>
            </TimelineContent>

            <TimelineContent
               as="div"
               animationNum={8}
               timelineRef={heroRef}
               customVariants={revealVariants}
               className="flex flex-col items-center md:items-start"
            >
               <BlurTextEffect className="text-red-500 font-bold text-2xl md:text-3xl">TOP</BlurTextEffect>
               <span className="text-gray-600 dark:text-gray-400 text-sm md:text-base text-center md:text-left">Optimization Experts</span>
            </TimelineContent>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-3xl md:text-5xl !leading-[1.2] font-semibold text-gray-900 dark:text-gray-100 text-center md:text-left">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.05}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 0.2,
                }}
                containerClassName="justify-center md:justify-start"
              >
                {description}
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed text-center md:text-left"
            >
                <p>
                  {bio1} {bio2}
                </p>
            </TimelineContent>
          </div>

          <div className="md:col-span-1 flex flex-col items-center md:items-end text-center md:text-right space-y-4">
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-red-500 text-xl md:text-2xl font-bold"
              >
                {name.toUpperCase()}
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium"
              >
                {role}
              </TimelineContent>

              <TimelineContent
                as="button"
                onClick={onCollaborateClick}
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mt-4 group relative flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(var(--primary-rgb),0.5)] hover:shadow-[0_0_60px_-15px_rgba(var(--primary-rgb),0.7)] w-fit"
              >
                {ctaText} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </TimelineContent>
          </div>
        </div>
      </div>
    </section>
  );
}
