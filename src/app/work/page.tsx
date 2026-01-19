import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import IndustryShowcase from "@/components/sections/industry-showcase";
import { Footer } from "@/components/sections/footer-section";
import HomeNavigation from "@/components/home-navigation";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

export const revalidate = 60;

export const metadata = {
  title: "Our Work | Shift2Dynamic - Premium Shopify Experiences",
  description: "Explore our portfolio of high-converting Shopify stores, custom headless eCommerce, and brand redesigns.",
  openGraph: {
    title: "Our Work | Shift2Dynamic",
    description: "Explore our portfolio of high-converting Shopify stores and custom web experiences.",
    url: 'https://www.shift2dynamic.com/work',
    siteName: 'Shift2Dynamic',
    locale: 'en_US',
    type: 'website',
  },
};

export default async function WorkPage() {
  let data;
  try {
    data = await client.fetch(HOME_QUERY);
  } catch (error) {
    console.warn("Sanity fetch failed. Using fallback data.");
    data = {};
  }
  
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
        aria-label="Back to Home"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back
      </Link>
      <div className="pt-20">
        <Suspense fallback={<div className="h-96 w-full flex items-center justify-center">Loading...</div>}>
          <IndustryShowcase title="All Projects" />
        </Suspense>
      </div>
      
      <div id="contact">
        <Footer data={data?.footer} />
      </div>

      <HomeNavigation />
    </main>
  );
}
