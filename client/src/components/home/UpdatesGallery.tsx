import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const tiles = [
  "row-span-2",
  "",
  "",
  "row-span-2",
  "",
  "",
];

/**
 * Masonry allocation-day gallery, restyled after kemchutahomesltd.com's
 * "Updates & Activities" grid (PRD §3.1: "the highest-trust module on the
 * site"). Tiles are honest placeholders, not stand-in photography — PRD
 * §6.4 rules out stock imagery, and no real allocation photos exist yet.
 */
export function UpdatesGallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">On the ground</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Updates &amp; Activities
          </h2>
          <p className="mt-2 max-w-md text-sm text-ink-600">
            Dated photographic proof of recent allocation days — wire to CMS.
          </p>
        </div>
        <Link
          href="/media"
          className="inline-flex items-center gap-1 font-medium text-navy-700 hover:text-navy-900"
        >
          View all developments
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:[grid-auto-rows:9rem]">
        {tiles.map((span, i) => (
          <RevealItem key={i} className={span}>
            <div className="flex h-full min-h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink-300 bg-navy-50 text-navy-400">
              <Camera className="h-6 w-6" aria-hidden="true" strokeWidth={1.5} />
              <span className="text-xs font-medium">Photo pending</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
