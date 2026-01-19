"use client";

import React, { useState, useRef } from "react";
import NextImage from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";

interface Card {
  id: number;
  title: string;
  description: string;
  image?: string;
  icon?: any;
  color: string;
  darkColor?: string;
}

interface StackingCardsProps {
  cards: Card[];
  title?: string;
  description?: string;
}

const Card = ({
  i,
  title,
  description,
  src,
  icon: Icon,
  color,
  darkColor,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  description: string;
  src?: string;
  icon?: any;
  color: string;
  darkColor?: string;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          "--card-color": color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        } as any}
        className="flex flex-col-reverse md:flex-row relative -top-[5%] md:-top-[25%] min-h-[300px] h-fit md:h-[600px] w-[95vw] md:w-[1200px] rounded-2xl md:rounded-3xl p-3 md:p-10 origin-top border border-white/10 dark:border-white/10 shadow-2xl bg-zinc-900/40 backdrop-blur-xl overflow-hidden group hover:border-primary/30 transition-colors duration-500"
      >
        <BorderBeam size={250} duration={12} delay={9 + (i * 2)} />
        {/* Internal Glow Effect */}
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--card-color)]/20 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-60 mix-blend-screen" 
          aria-hidden="true"
        />
        <div className="flex flex-col-reverse md:flex-row h-full gap-3 md:gap-10 w-full">
          <div className={cn(
            "flex flex-col justify-between h-full pt-2 md:pt-0",
             src ? "w-full md:w-[40%]" : "w-full"
          )}>
            <div>
              <div className="flex flex-col items-start gap-2 md:gap-4 mb-2 md:mb-6">
                 {Icon && <Icon className="w-12 h-12 md:w-20 md:h-20 text-neutral-900 dark:text-neutral-100" />}
                 <h2 className="text-2xl md:text-4xl font-bold leading-tight">{title}</h2>
              </div>
              <p className="text-base md:text-xl text-neutral-600 dark:text-neutral-200 leading-relaxed">
                {description}
              </p>
            </div>
            <div className="text-base md:text-xl font-medium opacity-40 mt-2 md:mt-0">Step 0{i + 1}</div>
          </div>

          {src && (
            <div className="relative w-full md:w-[60%] h-[300px] md:h-full rounded-2xl overflow-hidden shrink-0">
              <motion.div
                style={{ scale: imageScale }}
                className="w-full h-full"
              >
                <NextImage
                  src={src}
                  alt={title || "Service demonstration"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export function StackingCards({
  cards,
  title = "My Process",
  description = "How we go from idea to launch.",
}: StackingCardsProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} className="relative py-12 md:py-24 px-4 w-full">
      <div className="max-w-7xl mx-auto mb-10 md:mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
          {title}
        </h2>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
      
      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.05;
        return (
          <Card
            key={i}
            i={i}
            {...card}
            src={card.image}
            icon={card.icon}
            color={card.color}
            darkColor={card.darkColor}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
}
