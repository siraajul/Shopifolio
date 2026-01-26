import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { MarqueeAnimation } from "@/components/ui/marquee-effect";
import { SiShopify, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs } from "react-icons/si";
import { LazyLoad } from "@/components/ui/lazy-load";

// Components
import HeroSection from "@/components/sections/hero-section";
import dynamic from "next/dynamic";
import HomeNavigation from "@/components/home-navigation";

// Dynamically import heavy sections
// By default, dynamic imports are SSR'd which is good for SEO
const GallerySection = dynamic(() => import("@/components/sections/gallery-section").then(mod => mod.GallerySection));
const ImpactSection = dynamic(() => import("@/components/sections/impact-section"));
const IndustriesSection = dynamic(() => import("@/components/sections/industries"));
const IndustryShowcase = dynamic(() => import("@/components/sections/industry-showcase"));
const AboutSection3 = dynamic(() => import("@/components/sections/about-section"));
const ServicesSection = dynamic(() => import("@/components/sections/services"));
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials"));
const ProcessSection = dynamic(() => import("@/components/sections/process-section"));
const PricingSection = dynamic(() => import("@/components/sections/pricing-section"));
const FAQSection = dynamic(() => import("@/components/sections/faq-section"));
const Footer = dynamic(() => import("@/components/sections/footer-section").then(mod => mod.Footer));
const TeamSection = dynamic(() => import("@/components/sections/team-section"));

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let data;
  try {
    data = await client.fetch(HOME_QUERY);
  } catch {
    console.warn("Sanity fetch failed (likely missing project ID). Using fallback data.");
    data = {};
  }
  
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <HeroSection heroData={data?.hero} />

      <div id="work">
        <LazyLoad>
          <GallerySection data={data?.gallery} />
        </LazyLoad>
      </div>
      
      <LazyLoad>
        <ImpactSection data={data?.impact} />
      </LazyLoad>

      <LazyLoad>
        <IndustriesSection data={data?.industries} />
      </LazyLoad>

      <Suspense fallback={<div className="h-96 w-full flex items-center justify-center">Loading...</div>}>
         {/* Already has internal suspense/lazy logic usually, or just keep as suspense */}
        <IndustryShowcase limit={9} />
      </Suspense>

      {/* Keep About Section Eager for better flow after Hero, user might scroll fast */}
      <AboutSection3 data={data?.about} />
      
      <LazyLoad>
        <TeamSection />
      </LazyLoad>
      
      <section className="py-8 bg-transparent text-foreground flex items-center overflow-hidden">
        <LazyLoad rootMargin="200px">
          <MarqueeAnimation
            direction="left"
            baseVelocity={-0.5}
            className="bg-transparent text-foreground py-4 font-mono text-2xl sm:text-4xl md:text-6xl flex items-center"
          >
            <div className="flex items-center gap-8 sm:gap-16 px-4">
               <span className="text-2xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
                 SHOPIFY ARCHITECTS
               </span>
               <SiShopify className="text-[#96bf48] drop-shadow-[0_0_10px_rgba(150,191,72,0.8)]" />

               <span className="text-2xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                 E-COMMERCE SCALING
               </span>
               <SiReact className="text-[#61dafb]" />
               
               <span className="text-2xl md:text-6xl font-black text-foreground">
                 SCALABLE
               </span>
               <SiNextdotjs className="text-foreground" />
               
               <span className="text-2xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                 ROI FOCUSED
               </span>
               <SiReact className="text-[#61dafb]" />
               
               <span className="text-2xl md:text-6xl font-black text-foreground">
                 MOBILE FAST
               </span>
               <SiTailwindcss className="text-[#06b6d4]" />
               
               <span className="text-2xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                 90+ SPEED
               </span>
               <SiNodedotjs className="text-[#339933]" />
            </div>
          </MarqueeAnimation>
        </LazyLoad>
      </section>

      <div id="services">
        <LazyLoad>
          <ServicesSection data={data?.services} />
        </LazyLoad>
      </div>
      <div id="testimonials">
        <LazyLoad>
          <TestimonialsSection data={data?.testimonials} />
        </LazyLoad>
      </div>
      <div id="process">
        <LazyLoad>
          <ProcessSection data={data?.workflow} />
        </LazyLoad>
      </div>
      <div id="pricing">
        <LazyLoad>
          <PricingSection data={data?.pricing} />
        </LazyLoad>
      </div>
      <div id="faq">
        <LazyLoad>
          <FAQSection data={data?.faq} />
        </LazyLoad>
      </div>
      <div id="contact">
        <LazyLoad>
          <Footer data={data?.footer} />
        </LazyLoad>
      </div>

      <HomeNavigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Shift2Dynamic",
            "alternativeHeadline": "Shopify Architects & E-commerce Scaling Experts",
            "description": "Shift2Dynamic is a leading agency of Shopify Architects focused on E-commerce scaling and high-performance web design.",
            "url": "https://www.shift2dynamic.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.shift2dynamic.com/services?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </main>
  );
}
