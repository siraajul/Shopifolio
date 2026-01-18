import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Shift2Dynamic",
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full px-6 py-24 md:py-32">
       <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2026</p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Shift2Dynamic ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains how we collect, use, and share your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Fill out a contact form or project planner.</li>
              <li>Subscribe to our newsletter.</li>
              <li>Communicate with us via email, WhatsApp, or other channels.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              This information may include your name, email address, phone number, company name, and project details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the collected information for legitimate business purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
              <li>Providing and delivering our services.</li>
              <li>Responding to your inquiries and support requests.</li>
              <li>Sending administrative information, such as updates or changes to our terms.</li>
              <li>Improving our website and user experience through analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Cookies and Analytics</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies (like Vercel Analytics) to access or store information. 
              These tools help us understand how users interact with our website, identify popular pages, and improve performance. 
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal identification information to others. 
              We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners for the purposes outlined above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
               <p className="text-foreground font-medium">Shift2Dynamic</p>
               <a href="mailto:hello@shift2dynamic.com" className="text-primary hover:underline mt-1 block">hello@shift2dynamic.com</a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
