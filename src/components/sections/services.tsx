"use client";
import React from 'react';
import { ServiceGrid, type Service } from "@/components/ui/services-card";
import { Palette, Code, Search, Rocket } from "lucide-react";
import { StackingCards } from "@/components/ui/stacking-cards";

// Helper to map icon names (if stored as string in Sanity) or just cycle through default icons
const getIcon = (index: number) => {
    const icons = [Rocket, Palette, Code, Search];
    return icons[index % icons.length];
};

// Main component for the Services Section
const ServicesSection = ({ data }: { data?: any[] }) => {
  // Data for the service cards
  const services: Service[] = data?.length ? data.map((item, index) => ({
      number: `0${index + 1}`,
      title: item.title,
      description: item.description,
      icon: getIcon(index),
      gradient: index === 0 ? "from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50" :
                index === 1 ? "from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50" :
                index === 2 ? "from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50" :
                "from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50"
  })) : [
    {
      number: "01",
      title: "Enterprise Migration Systems",
      description:
        "Zero-downtime re-platforming to Shopify. We preserve your SEO and data while upgrading your infrastructure for scale.",
      icon: Rocket,
      gradient: "from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50",
    },
    {
      number: "02",
      title: "High-Performance Design",
      description:
        "Bespoke, lightweight interfaces designed for speed and conversion. No bloat, just pure brand dominance.",
      icon: Palette,
      gradient: "from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50",
    },
    {
      number: "03",
      title: "Custom Functionality Engines",
      description:
        "Proprietary features built on Remix & Node. We engineer logic that standard apps can't handle.",
      icon: Code,
      gradient: "from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50",
    },
    {
        number: "04",
        title: "Revenue Optimization Architecture",
        description:
          "A scientific approach to increasing AOV and LTV. We turn traffic into repeatable revenue.",
        icon: Search,
        gradient: "from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50",
    },
  ];

  return (
    <section className="bg-transparent w-full flex items-center justify-center font-sans relative overflow-x-clip">
        {/* Ambient Green Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[100px] mix-blend-screen" />
        </div>
      <div className="py-16 px-4 sm:px-6 w-full">
        <div className="max-w-7xl mx-auto">
          {/* Desktop/Tablet View - Grid */}
          <div className="hidden md:block">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 tracking-tight">
                How Can We Help?
              </h2>
              <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-light">
                Let's turn your vision into something amazing.
              </p>
            </div>

            {/* Services Grid */}
            <ServiceGrid services={services} />
          </div>

          {/* Mobile View - Stacking Cards */}
          <div className="block md:hidden -mt-20">
            <StackingCards 
              title="How Can We Help?"
              description="Let's turn your vision into something amazing."
              cards={[
                {
                  id: 1,
                  title: "Enterprise Migration Systems",
                  description: "Zero-downtime re-platforming to Shopify. We preserve your SEO and data while upgrading your infrastructure for scale.",
                  icon: Rocket,
                  color: "#e9d5ff",
                  darkColor: "#581c87"
                },
                {
                  id: 2,
                  title: "High-Performance Design",
                  description: "Bespoke, lightweight interfaces designed for speed and conversion. No bloat, just pure brand dominance.",
                  icon: Palette,
                  color: "#bbf7d0",
                  darkColor: "#14532d"
                },
                {
                  id: 3,
                  title: "Custom Functionality Engines",
                  description: "Proprietary features built on Remix & Node. We engineer logic that standard apps can't handle.",
                  icon: Code,
                  color: "#fecaca",
                  darkColor: "#7f1d1d" 
                },
                {
                  id: 4,
                  title: "Revenue Optimization Architecture",
                  description: "A scientific approach to increasing AOV and LTV. We turn traffic into repeatable revenue.",
                  icon: Search,
                  color: "#bfdbfe",
                  darkColor: "#1e3a8a"
                }
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
