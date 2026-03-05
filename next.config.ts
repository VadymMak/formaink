import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [85],
  },
  async redirects() {
    return [
      { source: "/", destination: "/sk", permanent: false },
      { source: "/portfolio", destination: "/sk/portfolio", permanent: true },
      { source: "/blog", destination: "/sk/blog", permanent: true },
      { source: "/blog/:slug", destination: "/sk/blog/:slug", permanent: true },
      { source: "/contact", destination: "/sk/contact", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
