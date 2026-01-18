import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <h1 className="text-[150px] font-black font-display leading-none text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20 select-none">
        404
      </h1>
      <h2 className="text-2xl md:text-4xl font-bold font-display mt-4 mb-6">
        Ghost Town.
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-8 px-4">
        You've wandered into the void. This page doesn't exist, just like a business without a website in 2026.
      </p>
      
      <Button asChild size="lg" className="rounded-full px-8 font-bold">
        <Link href="/">
          Return to Reality
        </Link>
      </Button>
    </div>
  );
}
