"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { TrendingUp, Users, Zap, ArrowUpRight } from "lucide-react";
import { BlurTextEffect } from "@/components/ui/blur-text-effect";
import dynamic from "next/dynamic";

// Charts are below the fold and carry no SEO value, so keep recharts out of the
// server bundle entirely.
const RuixenStats = dynamic(() => import("@/components/ui/ruixen-stats"), { ssr: false });
import { SanityImpactStat } from "@/types";

export default function ImpactSection({ data }: { data?: { stats?: SanityImpactStat[] } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // This section renders RuixenStats only; it has no stat list of its own. The
  // array that used to sit here was never read, and it disagreed with the
  // figures the page actually shows ($30M+ and 50+ against $10M+ in the hero
  // and about sections), so it was a contradiction waiting to surface.
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
