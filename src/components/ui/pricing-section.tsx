"use client";

import { useState } from "react";
import { CreativePricing, PricingTier } from "@/components/ui/creative-pricing";
import { Zap, Rocket, Crown, Package, Globe, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const brandTiers: PricingTier[] = [
    {
        name: "Startup",
        icon: <Zap className="w-6 h-6" />,
        price: 299,
        description: "Essential launch package for new brands.",
        color: "amber",
        features: [
            "Premium Theme Installation",
            "10 Products Upload",
            "Payment Gateway Setup",
            "Domain & SSL Connection",
            "Standard Legal Pages",
        ],
    },
    {
        name: "Professional",
        icon: <Rocket className="w-6 h-6" />,
        price: 599,
        description: "Conversion-focused setup for growing brands.",
        color: "blue",
        features: [
            "25 Products Upload",
            "Essential Apps (Reviews, Bundles)",
            "FB Pixel & GA4 Setup",
            "On-Page SEO Optimization",
            "Email Pop-up Automation",
        ],
        popular: true,
    },
    {
        name: "Advanced",
        icon: <Crown className="w-6 h-6" />,
        price: 999,
        description: "Complete scale-ready solution with advanced features.",
        color: "purple",
        features: [
            "50+ Products Migration",
            "Klaviyo Email Flows Setup",
            "Advanced Collection Filtering",
            "Google Shopping Feed Setup",
            "Priority Technical Support",
        ],
    },
];

const dropshippingTiers: PricingTier[] = [
    {
        name: "Launch Pad",
        icon: <Package className="w-6 h-6" />,
        price: 299,
        description: "Total store setup to test your niche.",
        color: "emerald",
        features: [
            "15 Products Setup",
            "AliExpress Product Import",
            "Free Professional Theme",
            "Order Automation Setup",
            "Trust Badges & Sales Pops",
        ],
    },
    {
        name: "Brand Builder",
        icon: <Globe className="w-6 h-6" />,
        price: 599,
        description: "High-trust store designed for higher conversions.",
        color: "cyan",
        features: [
            "30 Products Setup",
            "Premium Theme Customization",
            "AliExpress/CJ Dropshipping Setup",
            "FB Pixel & TikTok Pixel Setup",
            "Niche Competitor Analysis",
        ],
        popular: true,
    },
    {
        name: "Empire Ready",
        icon: <TrendingUp className="w-6 h-6" />,
        price: 999,
        description: "Full-scale automated business with marketing assets.",
        color: "violet",
        features: [
            "50 Products Setup",
            "Private Supplier Introduction",
            "Klaviyo Marketing Flows",
            "Influencer Marketing Guide",
            "Google Merchant Center Setup",
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
