"use client";

import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { LimelightNav } from "@/components/ui/limelight-nav"
import { Briefcase, Zap, Star, DollarSign, CircleHelp, Mail } from "lucide-react"
import { NAV_ITEMS } from "@/config/site"
import { ReactNode } from "react"

export default function HomeNavigation() {
  const ids = NAV_ITEMS.map(item => item.id)
  const { activeId, scrollToSection } = useScrollSpy(ids)

  // Map icons to config items since functions/components shouldn't be in config
  const iconMap: Record<string, ReactNode> = {
    work: <Briefcase fill="currentColor" />,
    services: <Zap fill="currentColor" />,
    testimonials: <Star fill="currentColor" />,
    pricing: <DollarSign />,
    faq: <CircleHelp />,
    contact: <Mail />,
  }

  const navItems = NAV_ITEMS.map(item => ({
    ...item,
    icon: iconMap[item.id],
    onClick: () => scrollToSection(item.id)
  }))

  const activeIndex = NAV_ITEMS.findIndex(item => item.id === activeId)

  return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <LimelightNav items={navItems} activeIndex={activeIndex === -1 ? 0 : activeIndex} />
      </div>
  )
}
