"use client";

import { motion } from "framer-motion";

export function NoiseOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pointer-events-none fixed inset-0 z-[9999] h-screen w-screen overflow-hidden"
    >
      <div
        className="absolute inset-0 h-[200%] w-[200%] opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: "url('/noise.svg')",
          backgroundSize: "200px 200px", // Size of the noise pattern
          animation: "noise 8s steps(10) infinite",
          transform: "translate(-50%, -50%)",
        }}
      />
      
      <style jsx global>{`
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
      `}</style>
    </motion.div>
  );
}
