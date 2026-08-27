import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AboutOffices } from "@/components/about/AboutOffices";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { AboutValues } from "@/components/about/AboutValues";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "About DreamMaker Real Estate Ltd",
  description:
    "DreamMaker Real Estate Ltd — a Lagos developer on the Lekki–Epe corridor with two physical offices, real construction delivery and named leadership.",
};

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutTimeline />
      <AboutLeadership />
      <AboutOffices />

      <section className="bg-navy-950 py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Ready to see it for yourself?
            </h2>
            <p className="mt-4 text-navy-100">
              Book a physical inspection or chat with our team on WhatsApp — no pressure, just a
              straight answer about titles, pricing and availability.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/book-inspection"
                className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-600"
              >
                Book an inspection
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <WhatsAppLink
                message="Hi DreamMaker, I'd like to know more about the company."
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Chat on WhatsApp
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
