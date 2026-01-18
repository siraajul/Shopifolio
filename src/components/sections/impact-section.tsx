"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { TrendingUp, Users, Zap, ArrowUpRight } from "lucide-react";
import { BlurTextEffect } from "@/components/ui/blur-text-effect";
import RuixenStats from "@/components/ui/ruixen-stats";

export default function ImpactSection({ data }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Use Sanity data or fallback
  const stats = data?.stats || [
    { value: "$30M+", label: "Revenue Generated", percentage: "+120% YoY" },
    { value: "45%", label: "Avg. Conversion Uplift", percentage: "vs Industry Avg" },
    { value: "0.4s", label: "Page Load Speed", percentage: "Google Core Vitals" },
    { value: "50+", label: "Brands Scaled", percentage: "Global Clients" },
  ];
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section 
      ref={containerRef} 
      className="relative py-24 md:py-32 overflow-hidden bg-background text-foreground"
    >
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px] -translate-y-1/2 mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[100px] mix-blend-screen" />
        </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
        {/* Unified Ruixen Stats Section */}
        <div className="w-full">
           <RuixenStats />
        </div>
      </div>
    </section>
  );
}
