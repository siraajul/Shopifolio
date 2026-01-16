"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {VerticalCutReveal} from "@/components/ui/vertical-cut-reveal";
import { ArrowRight } from "lucide-react";
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
}

export default function AboutSection3({ data }: AboutProps) {
  const heroRef = useRef<HTMLElement>(null);
  
  // Default values / Fallbacks
  const {
    name = "SHIFT2DYNAMIC",
    role = "Shopify Development Agency",
    description = "Crafting Digital Experiences.",
    bio1 = "We specialize in building scalable Shopify stores, custom themes, and high-quality apps. Our goal is to empower D2C brands with technology that drives growth.",
    bio2 = "From complex migrations to headless commerce solutions, we bring deep technical expertise to every project. Let's build a store that converts.",
    ctaText = "LET'S COLLABORATE",
    stats = [],
    profileImage
  } = data || {};

  const profileImageUrl = profileImage 
    ? urlFor(profileImage).width(1200).url() 
    : "https://images.unsplash.com/photo-1718601980986-0ce75101d52d?w=1200&auto=format&fit=crop";

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
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
    <section className="flex flex-col justify-center py-16 px-4 bg-transparent" ref={heroRef}>
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Header with social icons */}
          <div className="flex justify-between items-center mb-8 w-[85%] absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
            <div className="flex items-center gap-2  text-xl">
              <span className="text-red-500 animate-spin">✱</span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                SHOPIFY ARCHITECT
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
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-lg flex items-center justify-center  cursor-pointer"
              >
                <img src="https://pro-section.ui-layouts.com/facebook.svg" alt="fb" width={24} height={24} />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-lg flex items-center justify-center  cursor-pointer"
              >
                <img src="https://pro-section.ui-layouts.com/instagram.svg" alt="insta" width={24} height={24} />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.linkedin.com/naymur-rahman"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-lg flex items-center justify-center  cursor-pointer"
              >
                <img src="https://pro-section.ui-layouts.com/linkedin.svg" alt="linkedin" width={24} height={24} />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.youtube.com/naymurweb"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 rounded-lg flex items-center justify-center  cursor-pointer"
              >
                <img src="https://pro-section.ui-layouts.com/youtube.svg" alt="youtube" width={24} height={24} />
              </TimelineContent>
            </div>
          </div>

          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative group"
          >
            <svg
              className="w-full"
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100 40"
            >
              <defs>
                <clipPath
                  id="clip-inverted"
                  clipPathUnits={"objectBoundingBox"}
                >
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width={"100%"}
                height={"100%"}
                xlinkHref={profileImageUrl}
              ></image>
            </svg>
          </TimelineContent>

          {/* Stats */}
          <div className="flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex gap-4"
            >
              {stats.length > 0 ? (
                stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                    <BlurTextEffect className="text-red-500 font-bold">{stat.value}</BlurTextEffect>
                    <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
                    {idx < stats.length - 1 && <span className="text-gray-300 dark:text-gray-600">|</span>}
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                    <BlurTextEffect className="text-red-500 font-bold">5+</BlurTextEffect>
                    <span className="text-gray-600 dark:text-gray-400">years in e-commerce</span>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                    <BlurTextEffect className="text-red-500 font-bold">$10M+</BlurTextEffect>
                    <span className="text-gray-600 dark:text-gray-400">client sales</span>
                  </div>
                </>
              )}
            </TimelineContent>
            <div className="lg:absolute right-0 bottom-16 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex lg:text-4xl sm:text-3xl text-2xl items-center gap-2 mb-2"
              >
                <BlurTextEffect className="text-red-500 font-semibold">50+</BlurTextEffect>
                <span className="text-gray-600 dark:text-gray-400 uppercase">stores</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-2 mb-2 sm:text-base text-xs"
              >
                <BlurTextEffect className="text-red-500 font-bold">Top</BlurTextEffect>
                <span className="text-gray-600 dark:text-gray-400">optimization expert</span>
                <span className="text-gray-300 dark:text-gray-600 lg:hidden block">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-semibold text-gray-900 dark:text-gray-100 mb-8">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.1}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 0.5,
                }}
              >
                {description}
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid md:grid-cols-2 gap-8 text-gray-600 dark:text-gray-400"
            >
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify">
                  {bio1}
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify">
                  {bio2}
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-red-500 text-2xl font-bold mb-2"
              >
                {name.toUpperCase()}
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-gray-600 dark:text-gray-400 text-sm mb-8"
              >
                {role}
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={14}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="text-gray-900 dark:text-gray-200 font-medium mb-4">
                  Ready to transform your brand's message into results?
                </p>
              </TimelineContent>

              <TimelineContent
                as="a"
                href="#contact"
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="bg-neutral-900 dark:bg-white dark:text-black hover:bg-neutral-950 dark:hover:bg-gray-200 shadow-lg shadow-neutral-900/10 border border-neutral-700 dark:border-gray-200 flex w-fit ml-auto gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-5 py-3 rounded-lg cursor-pointer font-semibold"
              >
                {ctaText} <ArrowRight className="" />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
