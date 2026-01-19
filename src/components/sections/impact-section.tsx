"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { TrendingUp, Users, Zap, ArrowUpRight } from "lucide-react";
import { BlurTextEffect } from "@/components/ui/blur-text-effect";
import RuixenStats from "@/components/ui/ruixen-stats";
import { SanityImpactStat } from "@/types";

export default function ImpactSection({ data }: { data?: { stats?: SanityImpactStat[] } }) {
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
      className="relative py-24 md:py-32 overflow-hidden text-foreground"
    >


      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
        {/* Unified Ruixen Stats Section */}
        <div className="w-full">
           <RuixenStats />
        </div>
      </div>
    </section>
  );
}
