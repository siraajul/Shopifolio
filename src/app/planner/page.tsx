import OnboardingForm from "@/components/ui/multistep-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OG_IMAGE } from "@/config/site";

export const metadata = {
  title: "Start Your Project | Shift2Dynamic",
  description: "Tell us about your vision. We build high-performance Shopify stores that scale.",
  openGraph: {
    title: "Start Your Project | Shift2Dynamic",
    description: "Tell us about your vision. We build high-performance Shopify stores that scale.",
    url: 'https://www.shift2dynamic.com/planner',
    siteName: 'Shift2Dynamic',
    locale: 'en_US',
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default function PlannerPage() {
  return (
    <main className="min-h-screen w-full bg-background relative overflow-hidden">
        {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

       <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-display">
                Start Your Project
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                Tell us about your vision, goals, and requirements. We&apos;ll craft a strategy tailored just for you.
            </p>
        </div>

        <OnboardingForm />
      </div>
    </main>
  );
}
