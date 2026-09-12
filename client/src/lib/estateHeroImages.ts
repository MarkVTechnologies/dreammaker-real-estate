import type { EstateSummary } from "@/lib/types";

/**
 * Hero-only image overrides, keyed by slug — a wide crop suited to banner
 * placements (home hero carousel, project/estate card covers), distinct
 * from each estate's full gallery used elsewhere (e.g. the detail page).
 */
export const HERO_BANNER_OVERRIDES: Record<string, string> = {
  "add-cocoa-farm-estate": "/images/estates/add-cocoa-farm/hero-banner.jpg",
  "metaland-estate": "/images/estates/metaland-estate/hero-banner.jpg",
  "epe-club-estate": "/images/estates/epe-club-estate/hero-banner.jpg",
};

export function withHeroBannerCovers(estates: EstateSummary[]): EstateSummary[] {
  return estates.map((estate) => ({
    ...estate,
    coverImageUrl: HERO_BANNER_OVERRIDES[estate.slug] ?? estate.coverImageUrl,
  }));
}
