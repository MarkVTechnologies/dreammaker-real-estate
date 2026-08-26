import Link from "next/link";
import { ArrowRight, Banknote, Building2, MapPin } from "lucide-react";
import { EstateCard } from "@/components/estate/EstateCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TrustChips } from "./TrustChips";
import { getEstates } from "@/lib/api";

// PRD §3.1 names this exact chip set as the row to keep from
// kemchutahomesltd.com's estate grid.
const estateTrustChips = [
  "CAC Registered",
  "Government Approved Titles",
  "Verified Titles",
  "Instant Allocation on Full Payment",
];

/**
 * Estate grid + filter entry (PRD §8.1 modules 3–4), restyled to match
 * kemchutahomesltd.com's "Fast Developing Estates" pacing: eyebrow + "View
 * all" link, then a trust chip row directly under the grid (PRD §3.1).
 */
export async function FeaturedEstates() {
  const featuredEstates = await getEstates();

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Live developments
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Fast developing estates
          </h2>
        </div>
        <Link
          href="/estates"
          className="inline-flex items-center gap-1 font-medium text-navy-700 hover:text-navy-900"
        >
          View all estates
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>

      {/* TODO: location / budget / plot size / title type filter form routing to /estates?query */}
      <Reveal delay={0.05}>
        <form
          action="/estates"
          className="mt-8 flex flex-wrap gap-3 rounded-xl border border-navy-100 bg-navy-50 p-3"
        >
          <label className="relative flex-1 basis-52">
            <MapPin
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600"
              aria-hidden="true"
            />
            <input
              name="location"
              placeholder="Location"
              className="w-full rounded-md border border-ink-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-navy-700"
            />
          </label>
          <label className="relative flex-1 basis-52">
            <Banknote
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600"
              aria-hidden="true"
            />
            <input
              name="budget"
              placeholder="Budget"
              className="w-full rounded-md border border-ink-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-navy-700"
            />
          </label>
          <button className="inline-flex items-center gap-2 rounded-md bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800">
            Search
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </Reveal>

      {featuredEstates.length > 0 ? (
        <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredEstates.map((estate) => (
            <RevealItem key={estate.slug}>
              <EstateCard estate={estate} />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-ink-300 bg-navy-50 px-6 py-16 text-center">
            <Building2 className="h-8 w-8 text-navy-400" aria-hidden="true" strokeWidth={1.5} />
            {/* TODO: replace with live CMS/Prisma query once inventory is loaded */}
            <p className="text-sm text-ink-600">
              No estates loaded yet — connect the CMS/estate data source.
            </p>
          </div>
        </Reveal>
      )}

      <div className="mt-10 border-t border-navy-100 pt-8">
        <TrustChips items={estateTrustChips} tone="light" />
      </div>
    </section>
  );
}
