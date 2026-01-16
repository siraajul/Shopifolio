"use client"

import { LayoutGroup, motion } from "motion/react"
import { TextRotate } from "@/components/ui/text-rotate"
import { GlobalIcon, FastIcon, StoresIcon, ThemesIcon, AppsIcon, SalesIcon, SevenFigureIcon, ProvenIcon, ConvertingIcon, PremiumIcon, ScalableIcon } from "@/components/ui/animated-icons"
import { Briefcase, Lightning, Star, CurrencyDollar, Question, Envelope } from "@phosphor-icons/react"
import { SiShopify, SiReact, SiNextdotjs, SiRemix, SiGraphql, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiMongodb, SiNodedotjs, SiExpress } from "react-icons/si"
import { TbApi } from "react-icons/tb"
import { Globe, ArrowRight } from "lucide-react";
import { LimelightNav } from "@/components/ui/limelight-nav"
import { useState, useEffect, useRef } from "react"
import { PopupModal } from "react-calendly"
import { HyperText } from "@/components/ui/hyper-text"
import Link from "next/link";

import AboutSection3 from "@/components/ui/about-section"
import { GallerySection } from "@/components/ui/gallery-section"
import ServicesSection from "@/components/ui/services"
import { MarqueeAnimation } from "@/components/ui/marquee-effect"
import ProcessSection from "@/components/ui/process-section"
import IndustriesSection from "@/components/ui/industries"
import TestimonialsSection from "@/components/ui/testimonials"
import PricingSection from "@/components/ui/pricing-section"
import ImageAutoSlider from "@/components/ui/image-auto-slider"
import FAQSection from "@/components/ui/faq-section"
import { Footer } from "@/components/ui/footer-section"

export interface HomeProps {
  hero?: {
    title: string;
    rotatingWords: string[];
    subtext: string;
  };
  footer?: any; // Replace 'any' with specific type if imported, but loose typing is fine for now
  // Add other sections as we go
  [key: string]: any; 
}

export default function HomeClient({ data }: { data: HomeProps }) {
  const [activeTab, setActiveTab] = useState(0)
  const isManualScroll = useRef(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Wait for mount to set root element, avoids SSR issues and type errors
    if (typeof document !== 'undefined') {
       setRootElement(document.getElementById("home") || document.body);
    }
  }, []);

  const scrollToSection = (id: string, index: number) => {
    setActiveTab(index);
    isManualScroll.current = true;
    
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -20; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Re-enable observer after scroll animation (approx 1000ms)
      setTimeout(() => {
        isManualScroll.current = false;
      }, 1000);
    }
  }

  const navItems = [
    { id: "work", icon: <Briefcase weight="fill" />, label: "Work", onClick: () => scrollToSection("work", 0) },
    { id: "services", icon: <Lightning weight="fill" />, label: "Services", onClick: () => scrollToSection("services", 1) },
    { id: "testimonials", icon: <Star weight="fill" />, label: "Reviews", onClick: () => scrollToSection("testimonials", 2) },
    { id: "pricing", icon: <CurrencyDollar weight="fill" />, label: "Pricing", onClick: () => scrollToSection("pricing", 3) },
    { id: "faq", icon: <Question weight="fill" />, label: "FAQ", onClick: () => scrollToSection("faq", 4) },
    { id: "contact", icon: <Envelope weight="fill" />, label: "Contact", onClick: () => scrollToSection("contact", 5) },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // specific check for manual scroll
        if (isManualScroll.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = navItems.findIndex((item) => item.id === entry.target.id)
            if (index !== -1) {
              setActiveTab(index)
            }
          }
        })
      },
      { rootMargin: "-20% 0px -35% 0px", threshold: 0 } 
    )

    navItems.forEach((item) => {
      const element = document.getElementById(item.id as string)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <section id="home" className="relative h-screen flex flex-col items-center justify-center p-4">
        {/* Cosmic Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

        {/* Main Content */}
        <div className="relative z-10 w-full text-center flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-4">
               {/* Trust Badge */}
               <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gray-600 border border-black" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-300 font-medium">Trusted by 50+ Brands</span>
               </div>

              <div className="text-4xl max-[375px]:text-3xl sm:text-6xl md:text-8xl flex flex-col sm:flex-row flex-wrap items-center justify-center text-center font-bold font-sans bg-transparent text-foreground overflow-hidden">
                <LayoutGroup>
                  <motion.div className="flex whitespace-pre" layout>
                    <motion.span
                      className="pt-0.5 sm:pt-1 md:pt-3 text-white"
                      layout
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    >
                      {data.hero?.title || "We Build"}{" "}
                    </motion.span>
                    <TextRotate
                      texts={
                        data.hero?.rotatingWords?.map((word, i) => (
                          <span key={i} className="font-bold">{word}</span>
                        )) || [
                          <SevenFigureIcon key="7figure" />,
                          <ProvenIcon key="proven" />,
                          <ConvertingIcon key="converting" />,
                          <PremiumIcon key="premium" />,
                          <ScalableIcon key="scalable" />,
                        ]}mainClassName="text-black px-3 sm:px-3 md:px-5 bg-primary overflow-hidden py-0.5 sm:py-1 md:py-3 justify-center rounded-xl whitespace-nowrap"
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

              <div className="text-4xl max-[375px]:text-3xl sm:text-6xl md:text-8xl font-bold font-sans text-white mt-2">
                 Shopify Systems
              </div>

              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mt-6">
                We build high-performance Shopify stores designed to scale. <br />
                <span className="text-white font-semibold"> Launch in weeks, not months.</span>
              </p>

              {/* Stats Sub-heading */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-400 font-medium mt-4">
                  <div className="flex items-center gap-1">
                    <HyperText className="text-white font-bold" text="$10M+" />
                    <span>Revenue</span>
                  </div>
                  <div className="hidden md:block w-1 h-1 rounded-full bg-gray-600" />
                  <div className="flex items-center gap-1">
                    <HyperText className="text-white font-bold" text="50+" />
                    <span>Stores</span>
                  </div>
                  <div className="hidden md:block w-1 h-1 rounded-full bg-gray-600" />
                  <div className="flex items-center gap-1">
                    <HyperText className="text-white font-bold" text="5+" />
                    <span>Years Exp</span>
                  </div>
                  <div className="hidden md:block w-1 h-1 rounded-full bg-gray-600" />
                  <div className="flex items-center gap-1">
                    <HyperText className="text-white font-bold" text="Top" />
                    <span>Experts</span>
                  </div>
              </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <button 
              onClick={() => setIsCalendlyOpen(true)}
              className="group relative px-8 py-4 bg-primary text-black rounded-full font-bold text-lg hover:shadow-[0_0_40px_-5px_hsl(var(--primary)/0.6)] transition-all duration-300 flex items-center gap-2"
            >
              Start Your Growth <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="#work" className="px-8 py-4 text-white hover:text-primary transition-colors font-semibold flex items-center gap-2">
              View Selected Work
            </Link>
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

      <GallerySection />
      
      <AboutSection3 data={data.about} onCollaborateClick={() => setIsCalendlyOpen(true)} />
      
      <section className="py-8 bg-transparent text-foreground flex items-center overflow-hidden">
        <MarqueeAnimation
          direction="left"
          baseVelocity={-1.5}
          className="bg-transparent text-foreground py-4 font-mono text-4xl sm:text-6xl md:text-8xl flex items-center"
        >
          <div className="flex items-center gap-12 sm:gap-24 px-4">
             <span className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
               HIGH CONVERSION
             </span>
             <SiShopify className="text-[#96bf48] drop-shadow-[0_0_10px_rgba(150,191,72,0.8)]" />

             <span className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
               ROI FOCUSED
             </span>
             <SiReact className="text-[#61dafb]" />
             
             <span className="text-4xl md:text-8xl font-black text-foreground">
               SCALABLE
             </span>
             <SiNextdotjs className="text-foreground" />
             
             <span className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
               ROI FOCUSED
             </span>
             <SiReact className="text-[#61dafb]" />
             
             <span className="text-4xl md:text-8xl font-black text-foreground">
               MOBILE FIRST
             </span>
             <SiTailwindcss className="text-[#06b6d4]" />
             
             <span className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
               90+ SPEED
             </span>
             <SiNodedotjs className="text-[#339933]" />
          </div>
        </MarqueeAnimation>
      </section>

      <div id="work">
        <ImageAutoSlider />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div id="process">
        <ProcessSection />
      </div>
      <IndustriesSection />
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <div id="contact">
        <Footer data={data.footer} />
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <LimelightNav items={navItems} activeIndex={activeTab} />
      </div>
    </main>
  )
}
