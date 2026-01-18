import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { MarqueeAnimation } from "@/components/ui/marquee-effect";
import { SiShopify, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs } from "react-icons/si";

// Components
import HeroSection from "@/components/sections/hero-section";
import { GallerySection } from "@/components/sections/gallery-section";
import ImpactSection from "@/components/sections/impact-section";
import IndustriesSection from "@/components/sections/industries";
import IndustryShowcase from "@/components/sections/industry-showcase";
import AboutSection3 from "@/components/sections/about-section";
import ServicesSection from "@/components/sections/services";
import TestimonialsSection from "@/components/sections/testimonials";
import ProcessSection from "@/components/sections/process-section";
import PricingSection from "@/components/sections/pricing-section";
import FAQSection from "@/components/sections/faq-section";
import { Footer } from "@/components/sections/footer-section";
import HomeNavigation from "@/components/home-navigation";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let data;
  try {
    data = await client.fetch(HOME_QUERY);
  } catch (error) {
    console.warn("Sanity fetch failed (likely missing project ID). Using fallback data.");
    data = {};
  }
  
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <HeroSection heroData={data?.hero} />

      <div id="work">
        <GallerySection data={data?.gallery} />
      </div>
      
      <ImpactSection data={data?.impact} />

      <IndustriesSection data={data?.industries} />

      <IndustryShowcase />

      <AboutSection3 data={data?.about} />
      
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

      <div id="services">
        <ServicesSection data={data?.services} />
      </div>
      <div id="testimonials">
        <TestimonialsSection data={data?.testimonials} />
      </div>
      <div id="process">
        <ProcessSection data={data?.workflow} />
      </div>
      <div id="pricing">
        <PricingSection data={data?.pricing} />
      </div>
      <div id="faq">
        <FAQSection data={data?.faq} />
      </div>
      <div id="contact">
        <Footer data={data?.footer} />
      </div>

      <HomeNavigation />
    </main>
  );
}
