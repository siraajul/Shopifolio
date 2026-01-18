"use client"

import { useState, useEffect, useRef } from "react"
import { LimelightNav } from "@/components/ui/limelight-nav"
import { Briefcase, Lightning, Star, CurrencyDollar, Question, Envelope } from "@phosphor-icons/react"

export default function HomeNavigation() {
  const [activeTab, setActiveTab] = useState(0)
  const isManualScroll = useRef(false);

  const scrollToSection = (id: string, index: number) => {
    setActiveTab(index);
    isManualScroll.current = true;
    
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -20; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      // Re-enable observer after scroll animation (approx 1000ms)
      setTimeout(() => {
        isManualScroll.current = false;
      }, 1000);
    }
  }

  const navItems = [
    { id: "work", icon: <Briefcase weight="fill" />, label: "Work", href: "#work", onClick: () => scrollToSection("work", 0) },
    { id: "services", icon: <Lightning weight="fill" />, label: "Services", href: "#services", onClick: () => scrollToSection("services", 1) },
    { id: "testimonials", icon: <Star weight="fill" />, label: "Reviews", href: "#testimonials", onClick: () => scrollToSection("testimonials", 2) },
    { id: "pricing", icon: <CurrencyDollar weight="fill" />, label: "Pricing", href: "#pricing", onClick: () => scrollToSection("pricing", 3) },
    { id: "faq", icon: <Question weight="fill" />, label: "FAQ", href: "#faq", onClick: () => scrollToSection("faq", 4) },
    { id: "contact", icon: <Envelope weight="fill" />, label: "Contact", href: "#contact", onClick: () => scrollToSection("contact", 5) },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // specific check for manual scroll
        if (isManualScroll.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = navItems.findIndex((item) => item.id === entry.target.id)
            if (index !== -1) {
              setActiveTab(index)
            }
          }
        })
      },
      { rootMargin: "-20% 0px -35% 0px", threshold: 0 } 
    )

    navItems.forEach((item) => {
      const element = document.getElementById(item.id as string)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <LimelightNav items={navItems} activeIndex={activeTab} />
      </div>
  )
}
