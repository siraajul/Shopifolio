"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface TrustBadgeProps {
    className?: string;
}

export function TrustBadge({ className }: TrustBadgeProps) {
    return (
        <div className={cn("flex flex-wrap items-center justify-center p-1 px-2 rounded-full bg-background border border-border text-xs sm:text-sm shadow-sm", className)}>
            <div className="flex items-center -space-x-2 rtl:space-x-reverse">
                <div className="relative w-[30px] h-[30px] rounded-full border-2 border-background overflow-hidden">
                    <Image 
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100" 
                        alt="User 1"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative w-[30px] h-[30px] rounded-full border-2 border-background overflow-hidden">
                    <Image 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" 
                        alt="User 2"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative w-[30px] h-[30px] rounded-full border-2 border-background overflow-hidden">
                    <Image 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100" 
                        alt="User 3"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <p className="ml-2 font-medium text-muted-foreground">Trusted by 250+ Businesses</p>
        </div>
    );
}
