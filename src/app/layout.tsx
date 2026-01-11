import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Preloader } from "@/components/ui/preloader";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://shopifolio.vercel.app'),
  title: {
    default: "Shopifolio | Shopify & Web Development Agency",
    template: "%s | Shopifolio"
  },
  description: "Expert Shopify development and web design services. We build high-converting, beautiful e-commerce experiences and custom websites.",
  keywords: [
    "Shopify", "Web Development", "E-commerce", "React", "Next.js", 
    "Portfolio", "Agency", "Web Design", "UI/UX", "Frontend Developer"
  ],
  authors: [{ name: "Siruajul", url: "https://shopifolio.vercel.app" }],
  creator: "Siruajul",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Shopifolio | Premium Shopify & Web Solutions",
    description: "Expert Shopify development and web design services. Building standard-setting e-commerce experiences.",
    siteName: "Shopifolio",
    images: [
      {
        url: "/og-image.jpg", // Ensure you have an og-image.jpg in your public folder
        width: 1200,
        height: 630,
        alt: "Shopifolio Agency Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopifolio | Premium Shopify & Web Solutions",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Shopifolio",
              "url": "https://shopifolio.vercel.app",
              "logo": "https://shopifolio.vercel.app/logo.png",
              "description": "Expert Shopify development and web design services.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              }
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
            <CustomCursor />
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
