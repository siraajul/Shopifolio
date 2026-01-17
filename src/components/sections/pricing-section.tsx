"use client";

import { useState } from "react";
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

const dropshippingTiers: PricingTier[] = [
    {
        name: "Validation",
        icon: <Package className="w-6 h-6" />,
        price: 2499,
        description: "Rapid high-fidelity testing launchpad.",
        color: "emerald",
        features: [
            "High-Converting One Product Store",
            "Ad Creative Strategy",
            "Supplier Sourcing",
            "Conversion Copywriting",
            "Speed Optimization",
        ],
    },
    {
        name: "Expansion",
        icon: <Globe className="w-6 h-6" />,
        price: 4999,
        description: "Scaling winners to established brands.",
        color: "cyan",
        features: [
            "Niche Store Authority Build",
            "Custom Branding & Packaging",
            "UGC Content Strategy",
            "Influencer Outreach Scripts",
            "Automated Fulfillment System",
        ],
        popular: true,
    },
    {
        name: "Dominance",
        icon: <TrendingUp className="w-6 h-6" />,
        price: 9999,
        description: "Full brand acquisition model.",
        color: "violet",
        features: [
            "Private Label Manufacturing",
            "3PL Logistics Setup",
            "Omnichannel Expansion",
            "Exit Strategy Planning",
            "Dedicated Growth Team",
        ],
    },
];

export default function PricingSection() {
    const [activeTab, setActiveTab] = useState<'brand' | 'dropshipping'>('brand');

    return (
        <section className="bg-transparent w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Toggle Switch */}
                <div className="flex justify-center mb-8">
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-full inline-flex relative shadow-inner">
                         {/* Sliding Background */}
                        <motion.div
                            className="absolute top-1.5 bottom-1.5 rounded-full bg-white dark:bg-zinc-700 shadow-md z-0"
                            initial={false}
                            animate={{
                                left: activeTab === 'brand' ? '6px' : '50%',
                                x: activeTab === 'brand' ? 0 : 0, 
                                width: 'calc(50% - 6px)' 
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        
                        <button
                            onClick={() => setActiveTab('brand')}
                            className={cn(
                                "relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-200",
                                activeTab === 'brand' 
                                    ? "text-zinc-900 dark:text-white" 
                                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                            )}
                        >
                            Shopify Brand Store
                        </button>
                        <button
                            onClick={() => setActiveTab('dropshipping')}
                            className={cn(
                                "relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-200",
                                activeTab === 'dropshipping' 
                                    ? "text-zinc-900 dark:text-white" 
                                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                            )}
                        >
                            Dropshipping Store
                        </button>
                    </div>
                </div>

                <CreativePricing 
                    tiers={activeTab === 'brand' ? brandTiers : dropshippingTiers} 
                    title={activeTab === 'brand' ? "Brand Store Packages" : "Dropshipping Packages"}
                    tag={activeTab === 'brand' ? "Long Term Growth" : "Rapid Launch"}
                    description={
                        activeTab === 'brand' 
                        ? "Custom engineered stores for established businesses and scaling brands." 
                        : "Turnkey dropshipping businesses built for speed and sales."
                    }
                />
            </div>
        </section>
    )
}
