"use client";
import React from 'react';
import { ServiceGrid, type Service } from "@/components/ui/services-card";
import { Palette, Code, Search, Rocket } from "lucide-react";
import { StackingCards } from "@/components/ui/stacking-cards";

// Main component for the Services Section
const ServicesSection = () => {
  // Data for the service cards
  const services: Service[] = [
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
    <section className="bg-transparent w-full flex items-center justify-center font-sans">
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
