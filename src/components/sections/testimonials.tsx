"use client";
import { TestimonialsColumn } from "@/components/sections/testimonials-columns";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "The team transformed our sluggish store into a high-speed sales machine. Conversion rates jumped by 40% in just two weeks.",
    name: "Antoine Dubois",
    role: "Founder, Maison Dubois 🇫🇷",
  },
  {
    text: "The custom theme dev was flawless. They understood our brand aesthetic perfectly and delivered a pixel-perfect site.",
    name: "Klaus Weber",
    role: "Head of Digital, Weber Stahl 🇩🇪",
  },
  {
    text: "We needed a complex migration from Magento to Shopify Plus. Shift2Dynamic handled the data transfer without a single hiccup.",
    name: "Amir Al-Fayed",
    role: "COO, Oasis Ventures 🇦🇪",
  },
  {
    text: "Best technical partners we've worked with. They solved a Liquid cart issue that three other developers couldn't fix.",
    name: "Lachlan O'Connor",
    role: "Director, Bond Creek 🇦🇺",
  },
  {
    text: "The private app they built saved our warehouse team 20 hours a week. Incredible ROI.",
    name: "Elena Sokolov",
    role: "Founder, Kinetik Labs 🇷🇺",
  },
  {
    text: "Professional, communicative, and extremely skilled. The site speed optimization brought our load time under 2 seconds.",
    name: "Camila Rodriguez",
    role: "Marketing Lead, Sol & Luna 🇲🇽",
  },
  {
    text: "Our AOV increased significantly after they implemented the custom upsell features. Highly recommended.",
    name: "Hiroshi Tanaka",
    role: "Owner, Zen Living 🇯🇵",
  },
  {
    text: "Not just developers, but Shopify architects. They structured our entire headless build for scalability.",
    name: "Sofia Rossi",
    role: "CTO, Milano Mode 🇮🇹",
  },
  {
    text: "Reliable and fast. Whenever we have a launch day emergency, Shift2Dynamic is the first team we call.",
    name: "Magnus Jensen",
    role: "Brand Manager, Nord 🇩🇰",
  },
];

export default function TestimonialsSection({ data }: { data?: any[] }) {
  // Use Sanity data if available, otherwise fallback to static list
  const testimonialsData = data?.length ? data.map(t => ({
      text: t.quote,
      name: t.name,
      role: `${t.role}${t.company ? `, ${t.company}` : ''}`, // formatting role
  })) : testimonials;

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
            Real results for real businesses. Here's what founders and CTOs are saying about our collaboration.
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
