import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full flex flex-col items-center justify-center p-6 text-center">
      <div className="relative">
        <h1 className="text-[12rem] md:text-[16rem] font-black opacity-5 select-none leading-none">
          404
        </h1>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-md text-lg mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
           <Link
            href="/"
            className="group relative px-8 py-4 bg-primary text-black rounded-full font-bold text-lg hover:shadow-[0_0_40px_-5px_hsl(var(--primary)/0.6)] transition-all duration-300 flex items-center gap-2"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
