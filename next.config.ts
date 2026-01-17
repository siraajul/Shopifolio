import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  poweredByHeader: false,
  reactCompiler: true,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@phosphor-icons/react',
      'react-icons',
      'framer-motion',
      'motion/react',
      'date-fns'
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pro-section.ui-layouts.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
