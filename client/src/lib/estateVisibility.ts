import type { EstateSummary } from "@/lib/types";

/**
 * Estates hidden from public listing surfaces (Projects, Fast Developing
 * Estates) without touching the underlying record — direct links, admin,
 * and the sitemap are unaffected.
 */
const PUBLIC_LISTING_EXCLUDED_SLUGS = ["oribanwa-plot"];

export function excludeFromPublicListings(estates: EstateSummary[]): EstateSummary[] {
  return estates.filter((estate) => !PUBLIC_LISTING_EXCLUDED_SLUGS.includes(estate.slug));
}
