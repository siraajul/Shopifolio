import { defineQuery } from "next-sanity";

export const HOME_QUERY = defineQuery(`{
  "hero": *[_type == "hero"][0]{
    title,
    rotatingWords,
    subtext
  },
  "about": *[_type == "about"][0]{
    experienceDate,
    title,
    description,
    name,
    role,
    bio1,
    bio2,
    ctaText,
    profileImage,
    stats
  },
  "marquee": *[_type == "marquee"][0]{
    items
  },
  "services": *[_type == "service"]{
    title,
    description,
    icon
  },
  "workflow": *[_type == "process"]|order(stepNumber asc){
    stepNumber,
    title,
    description,
    image,
    darkColor
  },
  "industries": *[_type == "industry"]{
    name,
    image
  },
  "pricing": *[_type == "pricing"]{
    name,
    price,
    description,
    color,
    popular,
    features
  },
  "projects": *[_type == "project"]{
    title,
    description,
    image,
    link,
    tags
  },
  "testimonials": *[_type == "testimonial"]{
    name,
    role,
    company,
    quote,
    avatar
  },
  "faq": *[_type == "faq"]{
    question,
    answer
  },
  "footer": *[_type == "footer"][0]{
    companyName,
    tagline,
    email,
    location,
    socialLinks,
    footerLinks
  },
  "gallery": *[_type == "gallery"][0]{
    title,
    images
  }
}`);
