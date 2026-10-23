import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/profile";
import { projects } from "@/data/projects";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, priority: 1 },
    ...projects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
