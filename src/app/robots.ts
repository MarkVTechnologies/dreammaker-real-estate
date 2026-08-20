import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dreammaker.com.ng";

/**
 * PRD §9.1: explicitly allow Googlebot, Bingbot, GPTBot, OAI-SearchBot,
 * ClaudeBot, PerplexityBot, Google-Extended. A crawler block was the #1
 * suspected issue with the legacy site (PRD §2.1, §15 top risk).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/portal", "/api"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
