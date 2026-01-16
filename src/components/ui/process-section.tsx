"use client"

import { StackingCards } from "@/components/ui/stacking-cards"

const cards = [
  {
    id: 1,
    title: "Discovery & Strategy",
    description: "We inspect your current setup, understand your goals, and create a roadmap for success. We determine the best tech stack for your needs.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    color: "#e9d5ff", // Light purple
    darkColor: "#581c87" // Purple 900
  },
  {
    id: 2,
    title: "Development & Build",
    description: "Custom theme development, app integrations, and performance optimization. We build pixel-perfect interfaces with clean code.",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
    color: "#bbf7d0", // Light green
    darkColor: "#14532d" // Green 900
  },
  {
    id: 3,
    title: "Launch & Scale",
    description: "Rigorous testing, SEO setup, and post-launch strategies to grow your revenue. We ensure your store is ready for high traffic.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    color: "#fecaca", // Light red
    darkColor: "#7f1d1d" // Red 900
  },
  {
    id: 4,
    title: "Optimization & Growth",
    description: "Continuous data analysis and A/B testing to improve conversion rates. We help you scale your business to the next level.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    color: "#bfdbfe", // Light blue
    darkColor: "#1e3a8a" // Blue 900
  }
];

export default function ProcessSection() {
  return (
    <div className="bg-transparent w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <StackingCards 
          cards={cards}
          title="Our Workflow"
          description="A proven process to build high-converting Shopify stores."
        />
      </div>
    </div>
  )
}
