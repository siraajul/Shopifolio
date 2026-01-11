"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Service Card & Section ---
export interface Service {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

// Sub-component for individual cards
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "relative flex h-[400px] w-full flex-col justify-between overflow-hidden rounded-3xl p-8 bg-gradient-to-r transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
        service.gradient
      )}
    >
      {/* Card Content */}
      <div className="z-10 flex flex-col items-start text-left">
        <span className="mb-8 text-sm font-mono text-foreground/50">
          ( {service.number} )
        </span>
        <service.icon className="mb-auto h-12 w-12 text-foreground" />
      </div>
      <div className="z-10">
        <h3 className="mb-2 text-lg font-semibold uppercase tracking-wider">
          {service.title}
        </h3>
        <p className="text-sm text-foreground/70 leading-relaxed">{service.description}</p>
      </div>

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
    </motion.div>
  );
};

// Main exportable component
export const ServiceGrid = ({ services }: { services: Service[] }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto px-4">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </motion.div>
    </div>
  );
};
