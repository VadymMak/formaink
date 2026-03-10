import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Prevent trailing slash double-redirects (fixes GSC redirect errors)
  trailingSlash: false,

  images: {
    qualities: [75, 85],
  },
  experimental: {
    optimizePackageImports: ["next-intl"],
  },
  async redirects() {
    return [
      // FIX: was permanent: false (302) — Google doesn't pass SEO weight via 302
      { source: "/", destination: "/sk", permanent: true },
      { source: "/portfolio", destination: "/sk/portfolio", permanent: true },
      { source: "/blog", destination: "/sk/blog", permanent: true },
      { source: "/blog/:slug", destination: "/sk/blog/:slug", permanent: true },
      { source: "/contact", destination: "/sk/contact", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
