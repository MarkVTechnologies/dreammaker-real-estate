import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const tiles = [
  { src: "/images/insights/general-site-updates/01.jpg", span: "row-span-2" },
  { src: "/images/insights/general-site-updates/06.jpg", span: "" },
  { src: "/images/insights/general-site-updates/03.jpg", span: "" },
  { src: "/images/insights/general-site-updates/12.jpg", span: "row-span-2" },
  { src: "/images/insights/general-site-updates/05.jpg", span: "" },
  { src: "/images/insights/general-site-updates/19.jpg", span: "" },
];

/**
 * Masonry gallery, restyled after kemchutahomesltd.com's "Updates &
 * Activities" grid (PRD §3.1: "the highest-trust module on the site").
 * Real photos from the "General Site Updates" post — Add Cocoa Farm Estate
 * and MetaLand site visits, signage installs and land clearing.
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
            Real photos from recent site visits and estate activity across our developments.
          </p>
        </div>
        <Link
          href="/insights/general-site-updates"
          className="inline-flex items-center gap-1 font-medium text-navy-700 hover:text-navy-900"
        >
          View all updates
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>

      <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:[grid-auto-rows:9rem]">
        {tiles.map((tile, i) => (
          <RevealItem key={i} className={tile.span}>
            <Link
              href="/insights/general-site-updates"
              className="relative block h-full min-h-32 w-full overflow-hidden rounded-xl bg-navy-100"
            >
              <Image
                src={tile.src}
                alt="DreamMaker site update"
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
