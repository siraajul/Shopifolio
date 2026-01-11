"use client";
import React from "react";
import {
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Instagram,
  LucideIcon
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  platform: string;
  url: string;
}

export interface FooterProps {
  data?: {
    companyName?: string;
    tagline?: string;
    email?: string;
    location?: string;
    socialLinks?: SocialLink[];
    footerLinks?: FooterSection[];
  };
}

export function Footer({ data }: FooterProps) {
  const {
    companyName = "Shopifolio",
    tagline = "Transforming Shopify stores into high-performance digital powerhouses.",
    email = "hello@shopifolio.com",
    location = "Global Remote",
    socialLinks = [],
    footerLinks = [],
  } = data || {};

  // Helper to map platform string to icon
  const getSocialIcon = (platform: string): LucideIcon => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return Linkedin;
      case 'twitter': return Twitter;
      case 'github': return Github;
      case 'instagram': return Instagram;
      default: return Globe;
    }
  };

  return (
    <footer className="bg-secondary/20 dark:bg-[#0F0F11]/30 relative h-fit w-full overflow-hidden border-t border-border pb-28">
      {/* Text hover effect */}
      <div className="lg:flex hidden h-[20rem] items-center justify-center w-full pointer-events-none xl:pointer-events-auto mt-10">
        <TextHoverEffect text={companyName.toUpperCase()} className="z-50" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10 md:p-14 z-40 relative">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 lg:gap-16 pb-8 md:pb-12">
          {/* Brand section */}
          <div className="col-span-2 md:col-span-1 flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-primary text-3xl font-extrabold">
                ⚡
              </span>
              <span className="text-foreground text-3xl font-bold">{companyName}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {tagline}
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h4 className="text-foreground text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-foreground text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail size={18} className="text-primary" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-primary transition-colors"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <MapPin size={18} className="text-primary" />
                <span>{location}</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-t border-border my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-muted-foreground">
            {socialLinks.map(({ platform, url }) => {
              const Icon = getSocialIcon(platform);
              return (
                <a
                  key={platform}
                  href={url}
                  aria-label={platform}
                  className="hover:text-primary transition-colors"
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left text-muted-foreground">
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
        </div>
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
