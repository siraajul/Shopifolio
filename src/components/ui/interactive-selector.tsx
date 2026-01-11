"use client";

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

export interface Option {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

interface InteractiveSelectorProps {
  options: Option[];
  title?: string;
  description?: string;
}

const InteractiveSelector = ({ 
  options, 
  title = "Industries", 
  description = "My expertise across various sectors." 
}: InteractiveSelectorProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [options.length]);

  return (
    <div className="relative flex flex-col items-center justify-center bg-transparent font-sans text-foreground py-16 snap-start"> 
      {/* Header Section */}
      <div className="w-full max-w-2xl px-6 mb-8 text-center text-gray-900 dark:text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight drop-shadow-lg animate-fadeInTop delay-300">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium max-w-xl mx-auto animate-fadeInTop delay-600">
          {description}
        </p>
      </div>

      <div className="h-8"></div>

      {/* Options Container */}
      <div className="options flex w-full max-w-[1000px] min-w-[300px] h-[500px] mx-auto items-stretch overflow-hidden relative px-4">
        {options.map((option, index) => (
          <div
            key={index}
            className={cn(
              "option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out cursor-pointer",
              activeIndex === index ? 'active' : ''
            )}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
              backgroundPosition: 'center',
              flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
              margin: '0 2px',
              borderRadius: '20px',
              minWidth: '60px',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Shadow overlay */}
            <div 
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                background: activeIndex === index 
                  ? `linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 100%)` 
                  : `rgba(0,0,0,0.6)`,
                opacity: 1 // Always visible to act as mask
              }}
            />
            
            {/* Vertical text for collapsed state */}
            <div 
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                activeIndex === index ? "opacity-0 pointer-events-none" : "opacity-100 delay-300"
              )}
            >
              <span className="text-white font-bold tracking-widest text-lg uppercase [writing-mode:vertical-rl] rotate-180 whitespace-nowrap drop-shadow-md">
                {option.title}
              </span>
            </div>

            {/* Label with icon and info */}
            <div className={`absolute bottom-5 left-4 right-4 flex items-center gap-3 transition-all duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
              <div className={cn(
                "min-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-all duration-300",
                activeIndex === index ? "bg-white/30 scale-110" : ""
              )}>
                {option.icon}
              </div>
              
              <div className={cn(
                "overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out",
                 activeIndex === index ? "max-w-[500px] opacity-100 translate-x-0" : "max-w-0 opacity-0 translate-x-10"
              )}>
                <div className="font-bold text-xl text-white mb-1">
                  {option.title}
                </div>
                <div className="text-sm text-gray-200">
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default InteractiveSelector;
