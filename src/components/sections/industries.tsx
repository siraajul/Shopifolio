"use client"

import InteractiveSelector from "@/components/ui/interactive-selector"
import { Shirt, Smartphone, Armchair, Sparkles, Utensils, Gem, Baby, Dumbbell, PawPrint, BookOpen, Package } from "lucide-react"

const industryOptions = [
  {
    title: "SINGLE PRODUCT",
    description: "High-conversion landing pages for flagship products.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    icon: <Package size={24} />
  },
  {
    title: "FASHION & APPAREL",
    description: "Lookbooks, sizing guides, and style-focused UX.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    icon: <Shirt size={24} />
  },
  {
    title: "BEAUTY & WELLNESS",
    description: "Cosmetics, hair care, and wellness subscription models.",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80",
    icon: <Sparkles size={24} />
  },
  {
    title: "JEWELRY & LUXURY",
    description: "Elegant showcases for high-ticket items.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    icon: <Gem size={24} />
  },
  {
    title: "FOOD & GROCERY",
    description: "Fresh delivery logistics and appetite-appeal designs.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    icon: <Utensils size={24} />
  },
  {
    title: "ELECTRONICS",
    description: "Tech specs, comparisons, and gadget showcases.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    icon: <Smartphone size={24} />
  },
  {
    title: "KIDS & BABY",
    description: "Playful, safe, and family-oriented store designs.",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
    icon: <Baby size={24} />
  },
  {
    title: "HOME & DECOR",
    description: "Interior visualization and lifestyle aesthetics.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&w=800&q=80",
    icon: <Armchair size={24} />
  },
  {
    title: "FITNESS & SPORTS",
    description: "Energy, performance, and gear-focused layouts.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    icon: <Dumbbell size={24} />
  },
  {
    title: "PET SUPPLIES",
    description: "Caring, fun, and trust-building pet brand stores.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
    icon: <PawPrint size={24} />
  },
];

export default function IndustriesSection() {
  return (
    <div className="bg-transparent w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <InteractiveSelector 
          options={industryOptions} 
          title="Industries We Scale"
          description="From single-product launches to enterprise catalogs, we specialize in your niche."
        />
      </div>
    </div>
  )
}
