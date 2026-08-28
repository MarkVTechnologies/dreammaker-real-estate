import type { MetadataRoute } from "next";
import { categories, categorySlug, insightPosts } from "@/lib/insights";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dreammaker.com.ng";

// Static top-level routes. Estate/location/guide/insight detail routes should
// be appended here from the CMS/DB once content exists — PRD §9.1 calls for
// a segmented XML index (pages, estates, locations, guides, insights) that
// auto-regenerates on publish; start as one sitemap and split when it grows.
const staticRoutes = [
  "/",
  "/invest/land-banking",
  "/invest/off-plan",
  "/invest/buy-back",
  "/invest/roi-calculator",
  "/services",
  "/services/property-development",
  "/services/construction-management",
  "/services/project-management",
  "/services/property-management",
  "/services/title-perfection",
  "/projects",
  "/about",
  "/about/leadership",
  "/about/offices/lakowe",
  "/media",
  "/realtors",
  "/guides",
  "/insights",
  "/book-inspection",
  "/virtual-inspection",
  "/contact",
  "/faq",
  "/legal/terms",
  "/legal/privacy",
  "/legal/refund-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const insightRoutes = [
    ...insightPosts.map((post) => `/insights/${post.slug}`),
    ...categories.map((category) => `/insights/category/${categorySlug(category)}`),
  ];

  return [...staticRoutes, ...insightRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
