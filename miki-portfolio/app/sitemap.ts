import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mike1-portfolio.vercel.app",
      lastModified: new Date(),
    },
  ];
}