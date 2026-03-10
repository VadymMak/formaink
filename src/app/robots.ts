import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/static/", "/_next/image/", "/_vercel/"],
    },
    sitemap: "https://formaink.com/sitemap.xml",
  };
}
