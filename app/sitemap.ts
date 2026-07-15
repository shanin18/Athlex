import type { MetadataRoute } from "next";

const ATHLETE_SLUGS = ["sana-ito", "maya-okonkwo"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const staticRoutes = ["", "/search", "/pricing", "/login", "/signup"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
  const athleteRoutes = ATHLETE_SLUGS.map((slug) => ({
    url: `${base}/athletes/${slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...athleteRoutes];
}
