import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/site";
import { equipmentSlug } from "@/lib/slug";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const equipment = await prisma.equipment.findMany({
    where: { status: { not: "sold" } },
    select: { id: true, year: true, make: true, model: true, trim: true, updatedAt: true },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/inventory`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/financing`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/trade-in`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const equipmentRoutes: MetadataRoute.Sitemap = equipment.map((e) => ({
    url: `${siteUrl}/inventory/${equipmentSlug(e)}`,
    lastModified: e.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...equipmentRoutes];
}
