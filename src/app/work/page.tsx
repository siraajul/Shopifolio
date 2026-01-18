import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";
import IndustryShowcase from "@/components/sections/industry-showcase";
import { Footer } from "@/components/sections/footer-section";
import HomeNavigation from "@/components/home-navigation";

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
