"use client"

import React from "react";
import InteractiveSelector from "@/components/ui/interactive-selector";
import { Shirt, Smartphone, Armchair, Sparkles, Utensils, Gem, Baby, Dumbbell, PawPrint, Package } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SanityIndustryItem } from "@/types";

// Helper to match icon by name
const getIndustryIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("fashion")) return <Shirt size={24} />;
    if (n.includes("beauty")) return <Sparkles size={24} />;
    if (n.includes("tech") || n.includes("electronics")) return <Smartphone size={24} />;
    if (n.includes("home")) return <Armchair size={24} />;
    if (n.includes("food")) return <Utensils size={24} />;
    if (n.includes("kids") || n.includes("baby")) return <Baby size={24} />;
    if (n.includes("fitness") || n.includes("sports")) return <Dumbbell size={24} />;
    if (n.includes("jewelry") || n.includes("luxury")) return <Gem size={24} />;
    if (n.includes("pet")) return <PawPrint size={24} />;
    if (n.includes("others") || n.includes("single")) return <Package size={24} />;
    return <Package size={24} />;
};

export default function IndustriesSection({ data }: { data?: SanityIndustryItem[] }) {
  
  const categories = data?.length ? data.map(item => ({
      title: item.name,
      description: item.description || "Comprehensive solutions.", // Fallback if description is missing in schema, or add it to schema
      image: item.image 
        ? (typeof item.image === 'object' && 'asset' in item.image ? urlFor(item.image).width(800).url() : item.image as string) 
        : "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
      icon: getIndustryIcon(item.name)
  })) : [
    { title: "Fashion", description: "Trendsetting digital storefronts.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800", icon: <Shirt size={24} /> },
    { title: "Beauty & Cosmetics", description: "Radiant designs for skincare.", image: "https://images.unsplash.com/photo-1596462502278-27bfdd403ea6?auto=format&fit=crop&q=80&w=800", icon: <Sparkles size={24} /> },
    { title: "Electronics", description: "High-spec tech showcases.", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800", icon: <Smartphone size={24} /> },
    { title: "Home & Decor", description: "Curated aesthetic spaces.", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800", icon: <Armchair size={24} /> },
    { title: "Food & Beverage", description: "Mouth-watering interfaces.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800", icon: <Utensils size={24} /> },
    { title: "Kids & Baby", description: "Playful, safe, and engaging.", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800", icon: <Baby size={24} /> },
    { title: "Fitness & Gym", description: "High-energy performance.", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800", icon: <Dumbbell size={24} /> },
    { title: "Jewelry", description: "Luxurious detail viewing.", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800", icon: <Gem size={24} /> },
    { title: "Pet Supplies", description: "For our furry friends.", image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800", icon: <PawPrint size={24} /> },
    { title: "Others", description: "Specialized niche stores.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", icon: <Package size={24} /> },
  ];
  
  return (
    <div className="bg-transparent w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <InteractiveSelector 
          options={categories} 
          title="Industries We Scale"
          description="From single-product launches to enterprise catalogs, we specialize in your niche."
        />
      </div>
    </div>
  )
}
