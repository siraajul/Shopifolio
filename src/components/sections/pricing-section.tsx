"use client";


import { CreativePricing, PricingTier } from "@/components/sections/creative-pricing";
import { Zap, Rocket, Crown, Package, Globe, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const brandTiers: PricingTier[] = [
    {
        name: "Growth",
        icon: <Zap className="w-6 h-6" />,
        price: 4999,
        description: "Professional store setup & migration for new brands.",
        color: "amber",
        features: [
            "Custom Theme Development",
            "Data Migration (Magento/Woo)",
            "Conversion Rate Optimization",
            "Email Marketing Setup",
            "30 Days Support",
        ],
    },
    {
        name: "Scale",
        icon: <Rocket className="w-6 h-6" />,
        price: 9999,
        description: "High-performance ecosystem for scaling brands.",
        color: "blue",
        features: [
            "Headless or Hydrogen Build",
            "Custom App Development",
            "Advanced Analytics & Tracking",
            "A/B Testing Framework",
            "Dedicated Project Manager",
        ],
        popular: true,
    },
    {
        name: "Enterprise",
        icon: <Crown className="w-6 h-6" />,
        price: 19999,
        description: "Full-service digital dominance partner.",
        color: "purple",
        features: [
            "Global Internationalization",
            "Custom ERP/CRM Integration",
            "AI-Powered Personalization",
            "24/7 Priority SLA Support",
            "Quarterly Strategy Audits",
        ],
    },
];



export default function PricingSection({ data }: { data?: any[] }) {
    // Helper to map icons based on tier name (loose matching)
    const getIcon = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes("growth") || n.includes("validation")) return <Zap className="w-6 h-6" />; // or Package
        if (n.includes("scale") || n.includes("expansion")) return <Rocket className="w-6 h-6" />; // or Globe
        if (n.includes("enterprise") || n.includes("dominance")) return <Crown className="w-6 h-6" />; // or TrendingUp
        return <Zap className="w-6 h-6" />;
    };

    const dynamicBrandTiers: PricingTier[] = data?.filter(i => i.category === 'brand').map(item => ({
        name: item.name,
        icon: getIcon(item.name),
        price: item.price,
        description: item.description,
        color: item.color || "amber",
        features: item.features || [],
        popular: item.popular
    })) || [];

    const finalBrandTiers = dynamicBrandTiers.length > 0 ? dynamicBrandTiers : brandTiers;

    return (
        <section className="bg-transparent w-full overflow-hidden relative">
            {/* Ambient Green Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                 <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[100px] mix-blend-screen" />
                 <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[100px] mix-blend-screen" />
            </div>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <CreativePricing 
                    tiers={finalBrandTiers} 
                    title="Partnership Models" // Renamed from "Brand Store Packages"
                    tag="Long Term Growth"
                    description="Custom engineered stores for established businesses and scaling brands."
                />
            </div>
        </section>
    )
}
