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
      title: "Store Setup & Migration",
      description:
        "Seamless migration to Shopify or setting up a brand new store with best practices.",
      icon: Rocket,
      gradient: "from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50",
    },
    {
      number: "02",
      title: "Custom Theme Dev",
      description:
        "Bespoke Liquid themes tailored to your brand's unique identity and requirements.",
      icon: Palette,
      gradient: "from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50",
    },
    {
      number: "03",
      title: "App Development",
      description:
        "Custom Shopify apps using Remix & Node to extend your store's functionality.",
      icon: Code,
      gradient: "from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50",
    },
    {
        number: "04",
        title: "Conversion Optimization",
        description:
          "Data-driven strategies and performance tuning to maximize your sales.",
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
                  title: "Store Setup & Migration",
                  description: "Seamless migration to Shopify or setting up a brand new store with best practices.",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                  color: "#e9d5ff",
                  darkColor: "#581c87"
                },
                {
                  id: 2,
                  title: "Custom Theme Dev",
                  description: "Bespoke Liquid themes tailored to your brand's unique identity and requirements.",
                  image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
                  color: "#bbf7d0",
                  darkColor: "#14532d"
                },
                {
                  id: 3,
                  title: "App Development",
                  description: "Custom Shopify apps using Remix & Node to extend your store's functionality.",
                  image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
                  color: "#fecaca",
                  darkColor: "#7f1d1d" 
                },
                {
                  id: 4,
                  title: "Conversion Optimization",
                  description: "Data-driven strategies and performance tuning to maximize your sales.",
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
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
