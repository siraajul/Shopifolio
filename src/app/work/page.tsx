import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import IndustryShowcase from "@/components/sections/industry-showcase";
import { Footer } from "@/components/sections/footer-section";
import HomeNavigation from "@/components/home-navigation";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

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
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>
      <div className="pt-20">
        <IndustryShowcase title="All Projects" />
      </div>
      
      <div id="contact">
        <Footer data={data?.footer} />
      </div>

      <HomeNavigation />
    </main>
  );
}
