"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

export const WhatsAppWidget = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay appearance slightly for better UX
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Replace with actual number
  const phoneNumber = "8801318402075"; 
  const message = encodeURIComponent("Hi, I'm interested in your Shopifolio services!");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-24 right-6 md:bottom-6 z-50"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-green-500/30 transition-shadow duration-300"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:animate-none"></span>
        
        <FaWhatsapp className="w-8 h-8 text-white relative z-10" />

        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100 dark:border-gray-800">
          Chat with us
          <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-white dark:bg-zinc-900 transform -translate-y-1/2 rotate-45 border-t border-r border-gray-100 dark:border-gray-800"></div>
        </span>
      </a>
    </motion.div>
  );
};
