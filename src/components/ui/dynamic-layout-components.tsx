"use client";

import dynamic from "next/dynamic";

const CookieBanner = dynamic(() => import("@/components/ui/cookie-banner").then(mod => mod.CookieBanner), { ssr: false });
const WhatsAppWidget = dynamic(() => import("@/components/ui/whatsapp-widget").then(mod => mod.WhatsAppWidget), { ssr: false });

export function DynamicLayoutComponents() {
  return (
    <>
      <CookieBanner />
      <WhatsAppWidget />
    </>
  );
}
