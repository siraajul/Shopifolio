import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const allCaseStudies = [
    {
        id: "dummy-1",
        title: "Scaling NeonGrade to $10M ARR",
        description: "How a headless Shopify build reduced load times by 3s and boosted mobile conversion by 45%.",
        href: "/case-studies/dummy-1",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["E-commerce", "Next.js", "Shopify"]
    },
    {
        id: "dummy-2", 
        title: "FlowState: From Confusing to Iconic",
        description: "Redesigning a Fintech dashboard to reduce churn by 20% and secure Series A funding.",
        href: "/case-studies/dummy-2",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["Fintech", "UX Design", "React"]
    },
    {
        id: "dummy-3",
        title: "The Viral 3D Portfolio",
        description: "An interactive WebGL experience that won Awwwards SOTD and generated 5 FAANG offers.",
        href: "/case-studies/dummy-3",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["WebGL", "Three.js", "Creative"]
    },
    {
        id: "dummy-4",
        title: "LuxeInterior: AR Shopping Experience",
        description: "Integrating Augmented Reality into a furniture store, increasing average order value by 30%.",
        href: "/case-studies/dummy-4",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["AR/VR", "E-commerce", "Mobile"]
    },
    {
        id: "dummy-5",
        title: "HealthSync: Telemedicine Reimagined",
        description: "A secure, HIPAA-compliant patient portal that reduced appointment no-shows by 60%.",
        href: "/case-studies/dummy-5",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["Healthcare", "Security", "App"]
    },
    {
        id: "dummy-6",
        title: "FitTrack: AI Personal Trainer",
        description: "Using computer vision to warn users about bad posture in real-time during workouts.",
        href: "/case-studies/dummy-6",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["AI", "Fitness", "Computer Vision"]
    },
    {
        id: "dummy-7",
        title: "GourmetGo: Hyper-local Delivery",
        description: "Optimizing last-mile delivery algorithms to ensure hot food arrival, every time.",
        href: "/case-studies/dummy-7",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["Logistics", "Mobile App", "Algorithm"]
    },
    {
        id: "dummy-8",
        title: "CryptoDash: Pro Trading Terminal",
        description: "Handling millions of WebSocket messages per second for a real-time crypto trading deck.",
        href: "/case-studies/dummy-8",
        image: "https://images.unsplash.com/photo-1621504450168-b8c4375361aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["Crypto", "Real-time", "Performance"]
    },
    {
        id: "dummy-9",
        title: "EduLearn: Gamified Education",
        description: "Making learning addictive with RPG mechanics, increasing daily active users by 200%.",
        href: "/case-studies/dummy-9",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["EdTech", "Gamification", "Platform"]
    },
    {
        id: "dummy-10",
        title: "EcoMarket: Sustainable Choices",
        description: "An e-commerce platform that calculates the carbon footprint of every purchase cart.",
        href: "/case-studies/dummy-10",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        tags: ["Sustainability", "Marketplace", "Tech"]
    }
];

export default function CaseStudiesIndexPage() {
  return (
    <div className="relative min-h-screen py-12 md:py-32 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 md:mb-24 text-center max-w-3xl mx-auto">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>
          <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight text-foreground mb-6">
            Our Case Studies
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A diverse collection of digital products, platforms, and experiences we have crafted for ambitious brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allCaseStudies.map((study) => (
            <Link key={study.id} href={study.href} className="group flex flex-col h-full">
               <div className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)] hover:-translate-y-1 h-full">
                    <div className="relative aspect-[16/10] w-full overflow-hidden flex-shrink-0">
                        <Image
                            src={study.image}
                            alt={study.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                         <div className="absolute top-4 right-4 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                                 <ArrowUpRight className="h-5 w-5" />
                             </div>
                         </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                         <div className="flex flex-wrap gap-2 mb-4">
                            {study.tags && study.tags.map((tag, i) => (
                                <span key={i} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-muted-foreground border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-2xl font-bold text-white font-display mb-3 group-hover:text-primary transition-colors">
                            {study.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                            {study.description}
                        </p>
                        <div className="text-sm font-medium text-primary mt-auto pt-4 border-t border-white/5">
                            Read Case Study
                        </div>
                    </div>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
