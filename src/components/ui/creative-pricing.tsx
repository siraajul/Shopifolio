"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/magnetic-button";

export interface PricingTier {
    name: string;
    icon: React.ReactNode;
    price: string | number;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
}

export function CreativePricing({
    tag = "Simple Pricing",
    title = "Invest in Your Growth",
    description = "Transparent packages for every stage of your business.",
    tiers,
}: {
    tag?: string;
    title?: string;
    description?: string;
    tiers: PricingTier[];
}) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20 bg-transparent font-sans overflow-hidden md:overflow-visible">
            <div className="text-center space-y-6 mb-12 md:mb-16">
                <div className="font-handwritten text-lg md:text-xl text-primary font-bold rotate-[-1deg] font-custom script-font">
                    {tag}
                </div>
                <div className="relative inline-block px-4">
                    <h2 className="text-3xl md:text-5xl font-bold font-handwritten text-zinc-900 dark:text-white rotate-[-1deg] leading-tight">
                        {title}
                        <span className="hidden md:block absolute -right-12 top-0 text-primary rotate-12">
                            ✨
                        </span>
                        <span className="hidden md:block absolute -left-8 bottom-0 text-zinc-400 dark:text-zinc-600 -rotate-12">
                            ⭐️
                        </span>
                    </h2>
                    <span
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full h-3 bg-primary/20 rotate-[-1deg] rounded-full blur-sm mobile-underline"
                    />
                </div>
                <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 rotate-[-1deg] max-w-2xl mx-auto mt-6 px-4">
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-2 md:px-0">
                {tiers.map((tier, index) => (
                    <div
                        key={tier.name}
                        className={cn(
                            "relative group",
                            "transition-all duration-300",
                            index === 0 && "md:rotate-[-1deg]",
                            index === 1 && "md:rotate-[1deg]",
                            index === 2 && "md:rotate-[-2deg]"
                        )}
                    >
                        <div
                            className={cn(
                                "absolute inset-0 bg-white dark:bg-zinc-900",
                                "border-2 border-zinc-900 dark:border-white",
                                "rounded-lg shadow-[4px_4px_0px_0px] shadow-zinc-900 dark:shadow-white",
                                "transition-all duration-300",
                                "group-hover:shadow-[8px_8px_0px_0px]",
                                "group-hover:translate-x-[-4px]",
                                "group-hover:translate-y-[-4px]"
                            )}
                        />

                        <div className="relative p-6 flex flex-col h-full">
                            {tier.popular && (
                                <div
                                    className="absolute -top-4 -right-4 bg-primary text-white font-bold px-4 py-1 rounded-full rotate-12 text-sm border-2 border-zinc-900 shadow-sm"
                                >
                                    Most Popular!
                                </div>
                            )}

                            <div className="mb-6">
                                <div
                                    className={cn(
                                        "w-14 h-14 rounded-full mb-4",
                                        "flex items-center justify-center",
                                        "border-2 border-zinc-900 dark:border-white",
                                        "bg-neutral-100 dark:bg-neutral-800 text-primary"
                                    )}
                                >
                                    {tier.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                                    {tier.name}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                                    {tier.description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                                    {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
                                </span>
                                {typeof tier.price === 'number' && (
                                    <span className="text-zinc-600 dark:text-zinc-400">
                                        /project
                                    </span>
                                )}
                            </div>

                            <div className="space-y-4 mb-8 flex-grow">
                                {tier.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-start gap-3"
                                    >
                                        <div
                                            className="mt-0.5 min-w-5 h-5 rounded-full border-2 border-zinc-900 dark:border-white flex items-center justify-center bg-primary text-white"
                                        >
                                            <Check className="w-3 h-3 stroke-[3]" />
                                        </div>
                                        <span className="text-zinc-900 dark:text-white text-sm">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <MagneticButton className="w-full mt-auto">
                                <Button
                                    className={cn(
                                        "w-full h-12 text-lg font-bold relative",
                                        "border-2 border-zinc-900 dark:border-white",
                                        "transition-all duration-300",
                                        "shadow-[4px_4px_0px_0px] shadow-zinc-900 dark:shadow-white",
                                        "hover:shadow-[6px_6px_0px_0px]",
                                        "hover:translate-x-[-2px] hover:translate-y-[-2px]",
                                        tier.popular
                                            ? [
                                                  "bg-primary text-white",
                                                  "hover:bg-primary/90",
                                                  "active:bg-primary",
                                                  "dark:hover:bg-primary/90",
                                                  "dark:active:bg-primary",
                                              ]
                                            : [
                                                  "bg-zinc-50 dark:bg-zinc-800",
                                                  "text-zinc-900 dark:text-white",
                                                  "hover:bg-white dark:hover:bg-zinc-700",
                                                  "active:bg-zinc-50 dark:active:bg-zinc-800",
                                              ]
                                    )}
                                >
                                    Book Strategy Call
                                </Button>
                            </MagneticButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
