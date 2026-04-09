import type { MetadataRoute } from "next";

// Next.js App Router automatically serves this from /sitemap.xml
const BASE = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://anibani.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${BASE}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${BASE}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${BASE}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${BASE}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];
}
