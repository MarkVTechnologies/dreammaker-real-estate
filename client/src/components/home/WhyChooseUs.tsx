import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Camera, ShieldCheck } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const pillars = [
  {
    pillar: "Verified",
    icon: ShieldCheck,
    copy: "Every title documented and shown — a document viewer on each estate page, not a claim on a brochure.",
  },
  {
    pillar: "Built",
    icon: Building2,
    copy: "We develop and construct, not just market — a project portfolio and a construction progress log back every estate.",
  },
  {
    pillar: "Accountable",
    icon: BadgeCheck,
    copy: "Named leadership, a physical office, and a press record — all linked, not just asserted.",
  },
];

/**
 * Split photo + checklist, restyled from kemchutahomesltd.com's "Why Choose
 * Us" section (PRD §3.1 baseline) to carry the three brand pillars from
 * PRD §6.1 instead of a generic feature list.
 */
export function WhyChooseUs() {
  return (
    <section className="bg-navy-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-500">Our advantage</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Why choose DreamMaker
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-center">
          <Reveal delay={0.05} className="relative mx-auto w-full max-w-xs">
            <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-navy-800">
              <Camera className="h-8 w-8 text-navy-400" aria-hidden="true" strokeWidth={1.5} />
              <span className="text-xs font-medium text-navy-300">Leadership photo pending</span>
            </div>
            <div className="absolute -right-3 -top-3 rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold text-navy-950 shadow-lg">
              Est. TODO
            </div>
          </Reveal>

          <div>
            <RevealGroup className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {pillars.map((item) => (
                <RevealItem key={item.pillar}>
                  <div className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-800 text-gold-500">
                      <item.icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{item.pillar}</h3>
                      <p className="mt-1 text-sm text-navy-200">{item.copy}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <Link
                href="/estates"
                className="mt-8 inline-flex items-center gap-1.5 font-semibold text-gold-500 hover:text-gold-600"
              >
                Explore our estates
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
