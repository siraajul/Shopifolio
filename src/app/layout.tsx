import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import SmoothScroll from "@/components/ui/smooth-scroll";

import { Preloader } from "@/components/ui/preloader";
import { Analytics } from "@vercel/analytics/next";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.shift2dynamic.com'),
  title: {
    default: "Shift2Dynamic | Shopify Developer & Web Designer",
    template: "%s | Shift2Dynamic"
  },
  description: "Expert Shopify development and web design services. We build high-converting, beautiful e-commerce experiences and custom websites.",
  keywords: [
    "Shopify Developer", "Web Designer", "E-commerce Expert", "React Developer", "Next.js", 
    "Agency", "Shift2Dynamic", "UI/UX", "Frontend Developer"
  ],
  authors: [{ name: "Shift2Dynamic", url: "https://www.shift2dynamic.com" }],
  creator: "Shift2Dynamic",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Shift2Dynamic | Shopify Developer & Web Designer",
    description: "Expert Shopify development and web design services. Building standard-setting e-commerce experiences.",
    siteName: "Shift2Dynamic",
    images: [
      {
        url: "/og-image.jpg", // Ensure you have an og-image.jpg in your public folder
        width: 1200,
        height: 630,
        alt: "Shift2Dynamic Agency Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shift2Dynamic | Premium Shopify & Web Solutions",
    description: "Expert Shopify development and web design services.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
};



// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${manrope.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Shift2Dynamic",
              "url": "https://www.shift2dynamic.com",
              "logo": "https://www.shift2dynamic.com/og-image.jpg",
              "description": "Expert Shopify development and web design services.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://linkedin.com/company/shift2dynamic",
                "https://twitter.com/shift2dynamic",
                "https://github.com/shift2dynamic"
              ]
            })
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>

            <Preloader />
            {children}
          </SmoothScroll>
          <ThemeToggle />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
