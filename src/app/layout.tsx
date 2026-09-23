import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CalendlyProvider } from "@/context/calendly-context";
import SmoothScroll from "@/components/ui/smooth-scroll";

import { Preloader } from "@/components/ui/preloader";
import { GlobalBackground } from "@/components/ui/global-background";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Clarity } from "@/components/analytics/clarity";
import { Contentsquare } from "@/components/analytics/contentsquare";
import { DynamicLayoutComponents } from "@/components/ui/dynamic-layout-components";
import { AdPixels } from "@/components/analytics/ad-pixels";


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
  description: "E2E E-Commerce Service Agency. Expert Shopify development and web design services. We build high-converting, beautiful e-commerce experiences and custom websites.",
  keywords: [
    "Shopify Developer", "Web Designer", "E-commerce Expert", "React Developer", "Next.js", 
    "Agency", "Shift2Dynamic", "shift2dynamic", "Shift 2 Dynamic", "S2D", "UI/UX", "Frontend Developer", "E2E E-Commerce", "Full Service Agency",
    "Shopify Architects", "E-commerce scaling"
  ],
  applicationName: "Shift2Dynamic",
  authors: [{ name: "Shift2Dynamic", url: "https://www.shift2dynamic.com" }],
  creator: "Shift2Dynamic",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Shift2Dynamic | High-Performance Shopify Agency",
    description: "E2E ECommerce Service Agency. We build Shopify giants. High-performance, pixel-perfect, and conversion-focused e-commerce experiences.",
    siteName: "Shift2Dynamic",
    images: [
      {
        url: "/og-image.jpg",
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
      <head>
        <link rel="preconnect" href="https://nl13gjir.apicdn.sanity.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             "__html": JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.shift2dynamic.com/#organization",
                  "name": "Shift2Dynamic",
                  "alternateName": ["shift2dynamic", "Shift 2 Dynamic", "S2D", "Shift2Dynamic Agency"],
                  "url": "https://www.shift2dynamic.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.shift2dynamic.com/og-image.jpg"
                  },
                  "description": "E2E E-Commerce Service Agency. Expert Shopify development and web design services.",
                  "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "US"
                  },
                  "sameAs": [
                    "https://www.linkedin.com/company/shift2dynamic",
                    "https://x.com/shift2dynamic",
                    "https://github.com/shift2dynamic",
                    "https://www.facebook.com/shift2dynamic",
                    "https://www.instagram.com/shift2dynamic",
                    "https://clutch.co/profile/shift2dynamic",
                    "https://experts.shopify.com/shift2dynamic"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "sales",
                    "contactOption": "TollFree",
                    "areaServed": "Global"
                  }
                },
                {
                  "@type": "Service",
                  "serviceType": "Shopify Development",
                  "provider": {
                    "@id": "https://www.shift2dynamic.com/#organization"
                  },
                  "areaServed": "Global",
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "E-commerce Services",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Custom Shopify Theme Development"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Headless Commerce Solutions"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "E-commerce Replatforming"
                        }
                      }
                    ]
                  }
                },
                {
                  "@type": "Service",
                  "serviceType": "Web Design",
                  "provider": {
                    "@id": "https://www.shift2dynamic.com/#organization"
                  },
                  "areaServed": "Global",
                  "description": "High-performance, pixel-perfect, and conversion-focused web design."
                }
              ]
            })
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${syne.variable} ${manrope.variable} antialiased bg-transparent`}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
              Skip to content
            </a>
            <CalendlyProvider>
                <SmoothScroll>
                  <Preloader />
                  <GlobalBackground />
                  {children}
                  <DynamicLayoutComponents />
                  <SpeedInsights />
                </SmoothScroll>
                <Analytics />
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
                <Clarity />
                <Contentsquare />
                <AdPixels />
              </CalendlyProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
