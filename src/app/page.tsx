import HomeClient from "@/components/home-client";
import { client } from "@/sanity/lib/client";
import { HOME_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let data = {};
  try {
    data = await client.fetch(HOME_QUERY);
  } catch (error) {
    console.warn("Sanity fetch failed (likely missing project ID). Using fallback data.");
  }
  
  return <HomeClient data={data || {}} />;
}
