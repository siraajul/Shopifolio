"use client";


import { CreativePricing } from "@/components/sections/creative-pricing";
import { PricingTier } from "@/types";
import { Zap, Rocket, Crown, Package, Globe, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const brandTiers: PricingTier[] = [
    {
        name: "Starter",
        icon: <Zap className="w-6 h-6" />,
        price: 299,
        description: "Essential launchpad for dropshipping & new stores.",
        color: "amber",
        features: [
            "Upload 5 Winning Products",
            "5 Essential Pages Setup",
            "3 App Integrations",
            "Premium Theme Installation",
            "Basic SEO Optimization",
            "Social Media Integration"
        ],
    },
    {
        name: "Professional",
        icon: <Rocket className="w-6 h-6" />,
        price: 599,
        description: "Advanced setup for growing brands ready to scale.",
        color: "blue",
        features: [
            "Upload 15 Winning Products",
            "7 Professional Pages Setup",
            "6 App Integrations",
            "Advanced Theme Customization",
            "Complete SEO Service",
            "Speed Optimization (90+)"
        ],
        popular: true,
    },
    {
        name: "Authority",
        icon: <Crown className="w-6 h-6" />,
        price: 999,
        description: "Premium ecosystem for market dominance.",
        color: "purple",
        features: [
            "Upload 30+ Winning Products",
            "10 Custom Pages Design",
            "10+ Advanced Integrations",
            "CRO & Sales Funnel Setup",
            "Comprehensive SEO Suite",
            "30 Days Dedicated Support"
        ],
    },
];



export default function PricingSection({ data }: { data?: any[] }) {
    // Helper to map icons based on tier name (loose matching)
    const getIcon = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes("growth") || n.includes("validation") || n.includes("starter")) return <Zap className="w-6 h-6" />; // or Package
        if (n.includes("scale") || n.includes("expansion") || n.includes("professional")) return <Rocket className="w-6 h-6" />; // or Globe
        if (n.includes("enterprise") || n.includes("dominance") || n.includes("authority")) return <Crown className="w-6 h-6" />; // or TrendingUp
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
