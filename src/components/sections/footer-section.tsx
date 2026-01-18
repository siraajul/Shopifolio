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
import Link from "next/link";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/sections/hover-footer";
import { StarButton } from "@/components/ui/star-button";
import { useState, useEffect } from "react";

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
    companyName = "Shift2Dynamic",
    tagline = "Transforming Shopify stores into high-performance digital powerhouses.",
    email = "hello@shift2dynamic.com",
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
    <footer className="bg-secondary/20 dark:bg-[#0F0F11]/30 relative h-fit w-full overflow-hidden border-t border-border pb-10 md:pb-28">
      {/* ... text effect ... */}
      <div className="flex h-[6rem] sm:h-[15rem] lg:h-[20rem] items-center justify-center w-full pointer-events-none xl:pointer-events-auto mt-10">
        <TextHoverEffect text={companyName.toUpperCase()} className="z-50" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-6 md:p-14 z-40 relative">

        
        {/* Brand Call to Action Section (Full Width) */}
        <div className="mb-12 md:mb-20">
             <div className="flex flex-col items-center justify-center text-center p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h3 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4 relative z-10">
                    Ready to Dominate?
                  </h3>
                  <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto relative z-10">
                    Most agencies build stores. We build empires. Book your 30-minute strategy call and let's find your first $100k month.
                  </p>
                  {/* Call to Action */}
                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                     <Link href="/planner">
                       <StarButton 
                          className="h-14 px-8 rounded-full text-lg cursor-pointer"
                       >
                            Start Your Project
                       </StarButton>
                     </Link>
                  </div>
              </div>
        </div>

        {/* Main Footer Content (Flexbox with Space Between) */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 text-center md:text-left">
          
          {/* Logo & Tagline */}
          <div className="lg:max-w-xs flex flex-col space-y-4 items-center md:items-start text-center md:text-left">
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

          {/* Links Section (Centered/Flexible) */}
          <div className="flex flex-wrap justify-center md:justify-start gap-12 md:gap-24">
              {footerLinks.map((section) => (
                <div key={section.title} className="flex flex-col items-center md:items-start text-center md:text-left">
                  <h4 className="text-foreground text-lg font-semibold mb-6">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
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
          </div>

          {/* Contact Section (Pushed to Right) */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="text-foreground text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 flex flex-col items-center md:items-end">
              <li className="flex items-center space-x-3 text-muted-foreground justify-end">
                <a
                  href={`mailto:${email}`}
                  className="hover:text-primary transition-colors order-1 md:order-1"
                >
                  {email}
                </a>
                 <Mail size={18} className="text-primary order-2 md:order-2" />
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground justify-end">
                <span className="order-1 md:order-1">{location}</span>
                <MapPin size={18} className="text-primary order-2 md:order-2" />
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
            <span className="mx-2">|</span>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
