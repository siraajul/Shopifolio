"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollSpy(ids: string[], offset: number = 0) {
    const [activeId, setActiveId] = useState<string>("");
    const isManualScroll = useRef(false);

    const scrollToSection = (id: string, customOffset: number = -20) => {
        setActiveId(id);
        isManualScroll.current = true;

        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY + customOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });

            // Re-enable observer after scroll animation (approx 1000ms)
            setTimeout(() => {
                isManualScroll.current = false;
            }, 1000);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (isManualScroll.current) return;

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -35% 0px", threshold: 0 }
        );

        ids.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [ids, offset]);

    return { activeId, scrollToSection };
}
