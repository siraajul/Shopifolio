"use client";
import React from "react";
import {
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Globe,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

export function Footer() {
  // Footer link data
  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "Shopify Audits", href: "#services" },
        { label: "Custom Themes", href: "#services" },
        { label: "Migrations", href: "#services" },
        { label: "Headless Commerce", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Process", href: "#process" },
        { label: "Selected Work", href: "#selected-work" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-primary" />,
      text: "hello@shopifolio.com",
      href: "mailto:hello@shopifolio.com",
    },
    {
      icon: <MapPin size={18} className="text-primary" />,
      text: "Global Remote",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Github size={20} />, label: "GitHub", href: "#" },
    { icon: <Globe size={20} />, label: "Website", href: "#" },
  ];

  return (
    <footer className="bg-secondary/20 dark:bg-[#0F0F11]/30 relative h-fit w-full overflow-hidden border-t border-border pb-28">
      {/* Text hover effect */}
      <div className="lg:flex hidden h-[20rem] items-center justify-center w-full pointer-events-none xl:pointer-events-auto mt-10">
        <TextHoverEffect text="SHOPIFOLIO" className="z-50" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10 md:p-14 z-40 relative">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 lg:gap-16 pb-8 md:pb-12">
          {/* Brand section */}
          <div className="col-span-2 md:col-span-1 flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-primary text-3xl font-extrabold">
                ⚡
              </span>
              <span className="text-foreground text-3xl font-bold">Shopifolio</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Transforming Shopify stores into high-performance digital powerhouses.
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
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-muted-foreground">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-primary transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-border my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-muted-foreground">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-primary transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left text-muted-foreground">
            &copy; {new Date().getFullYear()} Shopifolio. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}


      <FooterBackgroundGradient />
    </footer>
  );
}
