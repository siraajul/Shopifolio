"use client"

import { useState, useEffect } from "react"
import { motion, LayoutGroup } from "motion/react"
import { TextRotate } from "@/components/ui/text-rotate"
import { AvatarCircles } from "@/components/ui/avatar-circles"
import { SevenFigureIcon, ProvenIcon, ConvertingIcon, PremiumIcon, ScalableIcon } from "@/components/ui/animated-icons"
import { ArrowRight } from "lucide-react"
import { HyperText } from "@/components/ui/hyper-text"
import dynamic from "next/dynamic"

const PopupModal = dynamic(
  () => import("react-calendly").then((mod) => mod.PopupModal),
  { ssr: false }
)

interface HeroProps {
  heroData?: {
    title: string;
    rotatingWords: string[];
    subtext: string;
  };
}

export default function HeroSection({ heroData }: HeroProps) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
       setRootElement(document.getElementById("home") || document.body);
    }
  }, []);

  const scrollToWork = () => {
    const element = document.getElementById("work");
    if (element) {
        const yOffset = -20; 
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center p-4">
        {/* Cosmic Glow Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px] -translate-y-1/2 mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full text-center flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-4">
               {/* Trust Badge */}
               <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-white/10 bg-neutral-100/50 dark:bg-white/5 backdrop-blur-md mb-4 min-h-[52px]">
                  <AvatarCircles 
                    numPeople={99} 
                    avatarUrls={[
                      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop", 
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
                    ]}
                    className="mr-2"
                    onMoreClick={() => {
                        const element = document.getElementById("testimonials");
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Trusted by 50+ Brands</span>
               </div>

              <div className="text-4xl max-[375px]:text-3xl sm:text-6xl md:text-8xl flex flex-col sm:flex-row flex-wrap items-center justify-center text-center font-bold font-sans bg-transparent text-foreground overflow-hidden">
                <LayoutGroup>
                  <motion.div className="flex whitespace-pre" layout>
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

              <div className="text-4xl max-[375px]:text-3xl sm:text-6xl md:text-8xl font-bold font-display text-foreground mt-2">
                 Shopify Ecosystems
              </div>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6 font-medium">
                Stop settling for templates. We build high-performance, custom Shopify experiences that crush benchmarks.<br />
                <span className="text-foreground font-semibold"> We don&apos;t just build. We dominate.</span>
              </p>

              {/* Stats Sub-heading */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-400 font-medium mt-4">
                  <div className="flex items-center gap-1">
                    <HyperText className="text-foreground font-bold" text="$30M+" />
                    <span>Revenue Generated</span>
                  </div>
                  <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <div className="flex items-center gap-1">
                    <HyperText className="text-foreground font-bold" text="45%" />
                    <span>Avg. Conv. Uplift</span>
                  </div>
                  <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <div className="flex items-center gap-1">
                    <HyperText className="text-foreground font-bold" text="0.4s" />
                    <span>Load Times</span>
                  </div>
              </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <button 
              onClick={() => setIsCalendlyOpen(true)}
              className="group relative px-8 py-4 bg-primary text-black rounded-full font-bold text-lg hover:shadow-[0_0_40px_-5px_hsl(var(--primary)/0.6)] transition-all duration-300 flex items-center gap-2"
            >
              Audit My Brand <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={scrollToWork} 
              className="px-8 py- font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              View Proof
            </button>
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

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
