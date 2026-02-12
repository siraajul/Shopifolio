import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { MarqueeAnimation } from "@/components/ui/marquee-effect";
import { SiShopify, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs } from "react-icons/si";
import { LazyLoad } from "@/components/ui/lazy-load";
import { Gallery4 } from "@/components/blocks/gallery4";


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

     <div id="case-studies">
        <Gallery4
            title="Selected Works"
            description="Explore our latest case studies showcasing outcomes, not just outputs."
            viewAllHref="/case-studies"
            items={(data?.caseStudies && data.caseStudies.length > 0 ? data.caseStudies : [
                {
                    id: "dummy-1",
                    title: "Scaling NeonGrade to $10M ARR",
                    description: "How a headless Shopify build reduced load times by 3s and boosted mobile conversion by 45%.",
                    href: "/case-studies/dummy-1",
                    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "dummy-2", 
                    title: "FlowState: From Confusing to Iconic",
                    description: "Redesigning a Fintech dashboard to reduce churn by 20% and secure Series A funding.",
                    href: "/case-studies/dummy-2",
                    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "dummy-3",
                    title: "The Viral 3D Portfolio",
                    description: "An interactive WebGL experience that won Awwwards SOTD and generated 5 FAANG offers.",
                    href: "/case-studies/dummy-3",
                    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "dummy-4",
                    title: "LuxeInterior: AR Shopping Experience",
                    description: "Integrating Augmented Reality into a furniture store, increasing average order value by 30%.",
                    href: "/case-studies/dummy-4",
                    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "dummy-5",
                    title: "HealthSync: Telemedicine Reimagined",
                    description: "A secure, HIPAA-compliant patient portal that reduced appointment no-shows by 60%.",
                    href: "/case-studies/dummy-5",
                    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "dummy-6",
                    title: "FitTrack: AI Personal Trainer",
                    description: "Using computer vision to warn users about bad posture in real-time during workouts.",
                    href: "/case-studies/dummy-6",
                    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "dummy-7",
                    title: "GourmetGo: Hyper-local Delivery",
                    description: "Optimizing last-mile delivery algorithms to ensure hot food arrival, every time.",
                    href: "/case-studies/dummy-7",
                    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "dummy-8",
                    title: "CryptoDash: Pro Trading Terminal",
                    description: "Handling millions of WebSocket messages per second for a real-time crypto trading deck.",
                    href: "/case-studies/dummy-8",
                    image: "https://images.unsplash.com/photo-1621504450168-b8c4375361aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "dummy-9",
                    title: "EduLearn: Gamified Education",
                    description: "Making learning addictive with RPG mechanics, increasing daily active users by 200%.",
                    href: "/case-studies/dummy-9",
                    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                },
                {
                    id: "dummy-10",
                    title: "EcoMarket: Sustainable Choices",
                    description: "An e-commerce platform that calculates the carbon footprint of every purchase cart.",
                    href: "/case-studies/dummy-10",
                    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                }
            ]).map((study: any) => ({
                id: study._id || study.id,
                title: study.title,
                description: study.description,
                href: study.slug ? `/case-studies/${study.slug}` : study.href,
                image: study.image
            }))}
        />
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
      
      {/* 
      <LazyLoad>
        <TeamSection />
      </LazyLoad> 
      */}
      
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
