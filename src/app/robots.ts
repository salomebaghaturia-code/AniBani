import type { MetadataRoute } from "next";

// Next.js App Router automatically serves this from /robots.txt
const BASE = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://anibani.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/api", "/api/"]
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE
  };
}
