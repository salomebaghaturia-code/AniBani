import type { MetadataRoute } from "next";

// Next.js App Router automatically serves this from /sitemap.xml
const BASE = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://anibani.app";

const LANGS = ["ka", "en"] as const;
const PATHS: Array<{ path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LANGS.flatMap((lang) =>
    PATHS.map(({ path, changeFrequency, priority }) => ({
      url: `${BASE}/${lang}${path}`,
      lastModified,
      changeFrequency,
      priority
    }))
  );
}
