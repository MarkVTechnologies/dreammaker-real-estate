import { ArrowRight } from "lucide-react";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { listEstateSummaries } from "@/lib/db/estates";
import { FeaturedEstates } from "./FeaturedEstates";
import { HomeHeroCarousel } from "./HomeHeroCarousel";
import { InsightsTeaser } from "./InsightsTeaser";
import { InvestSection } from "./InvestSection";
import { LeadMagnet } from "./LeadMagnet";
import { OurServices } from "./OurServices";
import { OurStory } from "./OurStory";
import { Testimonials } from "./Testimonials";
import { TrustStrip } from "./TrustStrip";
import { UpdatesGallery } from "./UpdatesGallery";
import { WhyChooseUs } from "./WhyChooseUs";

/**
 * Module order restyled to match kemchutahomesltd.com's pacing and density
 * (PRD §3.1 names it the structural baseline to repeat): hero+stats → story
 * → services → estates → why-us → invest → gallery → testimonials → footer.
 * Every PRD §8.1 homepage module is still present; several are combined or
 * reordered for tighter narrative flow rather than dropped.
 */
/** Hero shows only these two estates, in this order — not the full live inventory. */
const HERO_SLUGS = ["add-cocoa-farm-estate", "metaland-estate"];

/**
 * Hero-only image overrides, keyed by slug — a wide crop suited to the hero's
 * banner aspect ratio, distinct from each estate's `coverImageUrl` (gallery[0])
 * which stays untouched for use on project cards elsewhere.
 */
const HERO_IMAGE_OVERRIDES: Record<string, string> = {
  "add-cocoa-farm-estate": "/images/estates/add-cocoa-farm/hero-banner.jpg",
};

export async function HomeView() {
  const estates = await listEstateSummaries();
  const heroEstates = [...estates]
    .filter((estate) => HERO_SLUGS.includes(estate.slug))
    .sort((a, b) => HERO_SLUGS.indexOf(a.slug) - HERO_SLUGS.indexOf(b.slug))
    .map((estate) => ({
      ...estate,
      coverImageUrl: HERO_IMAGE_OVERRIDES[estate.slug] ?? estate.coverImageUrl,
    }));

  return (
    <>
      <HomeHeroCarousel estates={heroEstates} />
      <TrustStrip />
      <OurStory />
      <OurServices />
      <FeaturedEstates />
      <WhyChooseUs />
      <InvestSection />
      <UpdatesGallery />
      <Testimonials />
      <InsightsTeaser />
      <LeadMagnet />

      <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <WhatsAppLink
          message="Hi DreamMakers, I'm interested in your estates."
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-whatsapp hover:underline"
        >
          Chat with us on WhatsApp
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </WhatsAppLink>
      </div>
    </>
  );
}
