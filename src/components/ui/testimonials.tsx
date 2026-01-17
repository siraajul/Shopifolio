"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Riajul transformed our sluggish store into a high-speed sales machine. Conversion rates jumped by 40% in just two weeks.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    name: "Sarah Jenkins",
    role: "Founder, Glow Organic",
  },
  {
    text: "The custom theme dev was flawless. He understood our brand aesthetic perfectly and delivered a pixel-perfect site.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    name: "Michael Chen",
    role: "CTO, Urban Gear",
  },
  {
    text: "We needed a complex migration from Magento to Shopify Plus. Riajul handled the data transfer without a single hiccup.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    name: "Emily Davis",
    role: "Ops Manager, Luxe Living",
  },
  {
    text: "Best technical consultant we've worked with. He solved a Liquid cart issue that three other developers couldn't fix.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    name: "David Ross",
    role: "E-commerce Director",
  },
  {
    text: "The private app he built saved our warehouse team 20 hours a week. Incredible ROI.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    name: "Sophie Miller",
    role: "CEO, Miller & Co.",
  },
  {
    text: "Professional, communicative, and extremely skilled. The site speed optimization brought our load time under 2 seconds.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    name: "James Wilson",
    role: "Marketing Lead",
  },
  {
    text: "Our AOV increased significantly after he implemented the custom upsell features. Highly recommended.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    name: "Linda Park",
    role: "Owner, K-Beauty Box",
  },
  {
    text: "He's not just a developer, he's a Shopify architect. He structured our entire headless build for scalability.",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=150&q=80",
    name: "Robert Fox",
    role: "Tech Lead, Future Wear",
  },
  {
    text: "Reliable and fast. Whenever we have a launch day emergency, Riajul is the first person we call.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    name: "Anita Roy",
    role: "Brand Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsSection() {
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
