import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  poweredByHeader: false,
  reactCompiler: true,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  skipTrailingSlashRedirect: true,
  async redirects() {
    // www is canonical. The apex is a Worker Custom Domain, so Cloudflare
    // Redirect Rules never see these requests and the redirect has to happen
    // here instead.
    //
    // Two rules rather than one `/:path*`: that form leaves the parameter
    // unbound for the root path and emits a literal ":path*" in the Location
    // header. `missing` excludes www, because a bare host value also matches
    // www.shift2dynamic.com as a substring and that self-redirect loops.
    const apexOnly = {
      has: [{ type: 'host' as const, value: 'shift2dynamic\\.com' }],
      missing: [{ type: 'host' as const, value: 'www\\.shift2dynamic\\.com' }],
      permanent: true,
    };

    return [
      { source: '/', destination: 'https://www.shift2dynamic.com/', ...apexOnly },
      { source: '/:path+', destination: 'https://www.shift2dynamic.com/:path+', ...apexOnly },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
