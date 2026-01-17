"use client";

import { FAQ } from "@/components/ui/faq-tabs";

const categories = {
  "general": "General",
  "technical": "Technical",
  "process": "Process",
  "pricing": "Pricing"
};

const faqData = {
  "general": [
    {
      question: "Do you work with new stores or only established brands?",
      answer: "We work with both! Whether you're launching your first store or scaling an 8-figure brand, we have packages tailored to your growth stage."
    },
    {
      question: "Can you help with migration from WooCommerce/Magento?",
      answer: "Yes, we specialize in complex data migrations. We ensure all your products, customers, and order history are transferred safely to Shopify without losing SEO rankings."
    },
    {
      question: "Do you provide ongoing support after launch?",
      answer: "Absolutely. Our 'Growth Partner' retainer is designed exactly for this. We handle updates, new features, and optimization so you can focus on marketing."
    }
  ],
  "technical": [
    {
      question: "Do you use pre-made themes or build from scratch?",
      answer: "It depends on your needs. For speed and budget, we customize premium themes (like Dawn or Prestige). For unique brand experiences, we build custom themes from scratch using Liquid and Tailwind."
    },
    {
      question: "Can you build custom private apps?",
      answer: "Yes. If an existing app doesn't solve your problem, we build custom private apps using Node.js and React (Remix) to extend Shopify's functionality."
    },
    {
      question: "How do you handle site speed optimization?",
      answer: "We follow a strict performance checklist: lazy loading, image compression, code splitting, and minimizing third-party scripts. Our goal is always a sub-2-second load time."
    }
  ],
  "process": [
    {
      question: "How long does a typical project take?",
      answer: "A standard store setup takes 2-4 weeks. A fully custom theme build typically takes 6-10 weeks depending on complexity and design readiness."
    },
    {
      question: "What do you need from me to get started?",
      answer: "We'll need your branding assets (logo, fonts), product details, and access to your Shopify store. If you don't have a store yet, we can set up a development store for you."
    },
    {
      question: "Do you handle the design as well?",
      answer: "We are technical developers first. While we have a good eye for UI/UX, for major rebrands, we prefer to collaborate with dedicated designers. We can recommend some amazing ones if needed."
    }
  ],
  "pricing": [
    {
      question: "What is your hourly rate?",
      answer: "We primarily work on a project-based or retainer model, which provides more value and predictability than hourly billing. However, for small tweaks, we can discuss an hourly arrangement."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, for larger projects (Custom Builds), payment is typically split: 50% deposit to start, 25% at milestone, and 25% upon launch."
    },
    {
      question: "Is there a minimum project size?",
      answer: "Our minimum engagement for custom work starts at $1,000. For smaller tasks, we recommend grouping them into a 'day rate' sprint."
    }
  ]
};

export default function FAQSection() {
  return (
    <FAQ 
      title="Common Questions"
      subtitle="Objection Handling"
      categories={categories}
      faqData={faqData}
      className="bg-transparent"
    />
  )
}
