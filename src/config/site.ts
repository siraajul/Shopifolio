/**
 * Default social preview image.
 *
 * Child routes that declare their own `openGraph` replace the parent object
 * wholesale rather than merging, so every one of them must spread this in or
 * it will ship no og:image at all.
 */
export const OG_IMAGE = {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Shift2Dynamic Agency Showcase",
} as const;

export const SITE_CONFIG = {
    name: "Shift2Dynamic",
    description: "E2E E-Commerce Service Agency. High-performance custom Shopify experiences.",
    url: "https://www.shift2dynamic.com",
    links: {
        twitter: "https://twitter.com/shift2dynamic",
        github: "https://github.com/shift2dynamic",
        linkedin: "https://linkedin.com/company/shift2dynamic",
        discord: "https://discord.gg/aMWJHNXcbv",
    },
    contact: {
        email: "hello@shift2dynamic.com",
    }
}

export const NAV_ITEMS = [
    { id: "work", label: "Work", href: "#work" },
    { id: "services", label: "Services", href: "#services" },
    { id: "testimonials", label: "Reviews", href: "#testimonials" },
    { id: "pricing", label: "Pricing", href: "#pricing" },
    { id: "faq", label: "FAQ", href: "#faq" },
    { id: "contact", label: "Contact", href: "#contact" },
];
