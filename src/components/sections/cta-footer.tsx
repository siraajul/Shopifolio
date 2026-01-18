"use client";

import { ChevronRightIcon, InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function checkQuery() {
      const result = window.matchMedia(query);
      setValue(result.matches);
    }
    checkQuery();
    window.addEventListener("resize", checkQuery);
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", checkQuery);
    return () => {
      window.removeEventListener("resize", checkQuery);
      mediaQuery.removeEventListener("change", checkQuery);
    };
  }, [query]);

  return value;
}

const footerLinks = [
  {
    title: "Services",
    links: [
      { title: "Shopify Development", url: "#" },
      { title: "Store Audits", url: "#" },
      { title: "Custom Themes", url: "#" },
      { title: "Migration", url: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Blog", url: "#" },
      { title: "Case Studies", url: "#" },
      { title: "Shopify Guide", url: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { title: "Twitter", url: "https://twitter.com" },
      { title: "LinkedIn", url: "https://linkedin.com" },
      { title: "Instagram", url: "https://instagram.com" },
    ],
  },
];

export default function CTAFooter() {
  const tablet = useMediaQuery("(max-width: 1024px)");

  return (
    <footer id="footer" className="w-full pb-0 border-t border-gray-100 dark:border-gray-800">
      <div className="flex flex-col md:flex-row md:justify-between p-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-start justify-start gap-y-5 max-w-xs mx-0 mb-8 md:mb-0">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-emerald-500">
              Shift2Dynamic
            </span>
          </Link>
          <p className="tracking-tight text-gray-500 dark:text-gray-400 font-medium">
            Building high-performance Shopify stores that drive revenue and growth.
          </p>
          <div className="flex items-center gap-4 text-gray-500">
            <Link href="#" className="hover:text-[var(--primary)] transition-colors">
                <TwitterLogoIcon className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-[var(--primary)] transition-colors">
                <LinkedInLogoIcon className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-[var(--primary)] transition-colors">
                <InstagramLogoIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        <div className="pt-5 md:w-1/2">
          <div className="flex flex-col items-start justify-start md:flex-row md:items-start md:justify-between gap-y-10 lg:pl-10">
            {footerLinks.map((column, columnIndex) => (
              <ul key={columnIndex} className="flex flex-col gap-y-3">
                <li className="mb-2 text-sm font-semibold text-gray-900 dark:text-white tracking-wide uppercase">
                  {column.title}
                </li>
                {column.links.map((link, i) => (
                  <li
                    key={i}
                    className="group inline-flex cursor-pointer items-center justify-start gap-1 text-[15px]/snug text-gray-500 dark:text-gray-400 hover:text-[var(--primary)] transition-colors"
                  >
                    <Link href={link.url}>{link.title}</Link>
                    <div className="flex size-4 items-center justify-center translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100">
                      <ChevronRightIcon className="h-3 w-3" />
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      
      <Link 
        href="/planner"
        className="w-full h-64 md:h-80 relative mt-12 z-0 overflow-hidden cursor-pointer group block"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black dark:via-transparent dark:to-transparent z-10 h-full" />
        <div className="absolute inset-0">
          <FlickeringGrid
            text={tablet ? "Let's Build" : "Start Project"}
            fontSize={tablet ? 70 : 120}
            className="h-full w-full"
            squareSize={3}
            gridGap={4}
            color="#008060"
            maxOpacity={0.2}
            flickerChance={0.3}
          />
        </div>
      </Link>
    </footer>
  );
};
