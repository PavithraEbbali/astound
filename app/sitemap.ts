import type { MetadataRoute } from "next";
import { site, legalPages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const lastModified = new Date("2026-06-22");

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    ...legalPages.map((p) => ({
      url: `${base}${p.href}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
