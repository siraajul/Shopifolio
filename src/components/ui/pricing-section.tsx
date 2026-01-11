"use client";

import { CreativePricing, PricingTier } from "@/components/ui/creative-pricing";
import { Zap, Rocket, Crown } from "lucide-react";

const shopifyTiers: PricingTier[] = [
    {
        name: "Starter",
        icon: <Zap className="w-6 h-6" />,
        price: "$2,500+",
        description: "Perfect for brands needing a high-performance launch.",
        color: "amber",
        features: [
            "Custom Shopify Setup",
            "Core Speed Optimization",
            "Mobile Responsive Design",
            "Basic SEO Setup",
            "Testing & Launch Support",
        ],
    },
    {
        name: "Growth",
        icon: <Rocket className="w-6 h-6" />,
        price: "$5,000+",
        description: "For scaling brands that need conversion-focused features.",
        color: "blue",
        features: [
            "Advanced Theme Development",
            "Conversion Rate Optimization (CRO)",
            "Custom App Integrations",
            "Advanced Analytics Setup",
            "Priority Post-Launch Support",
        ],
        popular: true,
    },
    {
        name: "Enterprise",
        icon: <Crown className="w-6 h-6" />,
        price: "Custom",
        description: "Full-scale digital partnership for market leaders.",
        color: "purple",
        features: [
            "Headless Commerce Architecture",
            "Internationalization (Multi-Currency)",
            "Dedicated Development Team",
            "24/7 SLA Support",
            "Quarterly Strategy Roadmaps",
        ],
    },
];

export default function PricingSection() {
    return (
        <section className="bg-transparent w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <CreativePricing 
                    tiers={shopifyTiers} 
                    title="Simple Investment Plans"
                    tag="Clear Pricing"
                    description="Choose the package that fits your goals. No hidden fees, just results."
                />
            </div>
        </section>
    )
}
