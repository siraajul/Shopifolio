"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Check if we've already shown the preloader this session
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Counter animation
    const interval = setInterval(() => {
      setCounter((prev) => {
        const next = prev + Math.floor(Math.random() * 5) + 1;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 30);

    // Finish loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasLoaded", "true");
    }, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[999999] flex h-screen w-screen items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="flex flex-col items-center gap-4">
             {/* Large Counter */}
            <motion.div 
               className="text-[12rem] md:text-[20rem] font-bold text-white leading-none tracking-tighter"
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
            >
              {counter}%
            </motion.div>
            
            <motion.div 
              className="text-xl text-neutral-500 font-mono uppercase tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              System Initializing...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
