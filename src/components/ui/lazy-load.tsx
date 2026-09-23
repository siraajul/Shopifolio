"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface LazyLoadProps {
  children: ReactNode;
  /** Kept for call-site compatibility; `whileInView` uses `margin` instead. */
  threshold?: number;
  /** How far outside the viewport to start the reveal, e.g. "200px". */
  rootMargin?: string;
}

/**
 * Scroll-reveal wrapper.
 *
 * This previously gated `children` behind `useState(false)` flipped by an
 * IntersectionObserver inside `useEffect`. Neither runs during SSR, so every
 * wrapped section rendered as an empty div in the server HTML: services,
 * pricing, testimonials, process, FAQ and industries were all absent, along
 * with the FAQPage JSON-LD emitted inside the FAQ section. Crawlers that do
 * not execute JavaScript saw roughly 365 words of a 113KB page.
 *
 * `whileInView` gives the same reveal while leaving the children in the
 * server-rendered markup, so the content is present for crawlers and for
 * anyone whose JavaScript fails.
 */
export function LazyLoad({
  children,
  rootMargin = "100px",
}: LazyLoadProps) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: rootMargin }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
