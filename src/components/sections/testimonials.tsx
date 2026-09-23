"use client";
import { TestimonialsColumn } from "@/components/sections/testimonials-columns";
import { motion } from "motion/react";


export default function TestimonialsSection({ data }: { data?: { quote: string; name: string; role: string; company?: string }[] }) {
  // Renders only real, attributable testimonials from the CMS. There is no
  // placeholder fallback on purpose: inventing endorsements attributed to named
  // people is prohibited by the FTC rule on consumer reviews and testimonials
  // (16 CFR Part 465), quite apart from what it does to trust signals.
  if (!data?.length) return null;

  const testimonialsData = data.map(t => ({
      text: t.quote,
      name: t.name,
      role: `${t.role}${t.company ? `, ${t.company}` : ''}`,
  }));

  const firstColumn = testimonialsData.slice(0, 3);
  const secondColumn = testimonialsData.slice(3, 6);
  const thirdColumn = testimonialsData.slice(6, 9);

  return (
    <section className="bg-transparent py-10 md:py-16 relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[800px] mx-auto mb-8 md:mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-medium border rounded-full border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
            Client Success Stories
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center text-gray-900 dark:text-white mb-6">
            Trusted by Growing Brands
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            Real results for real businesses. Here&apos;s what founders and CTOs are saying about our collaboration.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[800px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={40} className="w-full md:w-1/2 lg:w-1/3" />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block w-1/2 lg:w-1/3" duration={50} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block w-1/3" duration={35} />
        </div>
      </div>
    </section>
  );
}
