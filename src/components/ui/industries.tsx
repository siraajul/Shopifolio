"use client"

import InteractiveSelector from "@/components/ui/interactive-selector"
import { Shirt, Cpu, Armchair, Sparkles, Utensils } from "lucide-react"

const industryOptions = [
  {
    title: "Fashion & Apparel",
    description: "High-end fashion stores with sizing guides and lookbooks.",
    image: "https://images.unsplash.com/photo-1529139574466-a302d27f6054?auto=format&fit=crop&w=800&q=80",
    icon: <Shirt size={24} />
  },
  {
    title: "Electronics & Tech",
    description: "Complex catalogs with technical specs and comparisons.",
    image: "https://images.unsplash.com/photo-1616469832301-ffaeadc68cf3?auto=format&fit=crop&w=800&q=80",
    icon: <Cpu size={24} />
  },
  {
    title: "Home & Decor",
    description: "Visual-heavy stores allowing customers to envision their space.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    icon: <Armchair size={24} />
  },
  {
    title: "Beauty & Cosmetics",
    description: "Subscription models, ingredients transparency, and shade finders.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    icon: <Sparkles size={24} />
  },
  {
    title: "Food & Beverage",
    description: "Perishable logistics, bundling, and fresh design.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
    icon: <Utensils size={24} />
  }
];

export default function IndustriesSection() {
  return (
    <div className="bg-transparent w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <InteractiveSelector 
          options={industryOptions} 
          title="Industries I Serve"
          description="Specialized experience in key e-commerce sectors."
        />
      </div>
    </div>
  )
}
