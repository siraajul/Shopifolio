"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="bg-background text-foreground min-h-screen w-full flex flex-col items-center justify-center p-6 text-center">
      <div className="relative">
        <h1 className="text-[8rem] md:text-[12rem] font-black opacity-5 select-none leading-none">
          OOPS
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground max-w-md text-lg mb-8">
            An unexpected error occurred. Don't worry, it's not you - it's us.
          </p>
          <div className="flex gap-4">
             <Button
                size="lg"
                onClick={reset}
                className="rounded-full px-8"
              >
                Try again
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = "/"}
                className="rounded-full px-8"
              >
                Go Home
              </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
