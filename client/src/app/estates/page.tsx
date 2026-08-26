import { Building2 } from "lucide-react";
import { EstateCard } from "@/components/estate/EstateCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getEstates } from "@/lib/api";

export const metadata = {
  title: "Estates for Sale in Lagos & Ogun — Gated Estates, Ibeju-Lekki",
  description:
    "Browse DreamMaker's estate inventory — title status, starting price, deposit and plot size on every card.",
};

export default async function EstatesIndexPage() {
  const estates = await getEstates();

  return (
    <div className="relative overflow-hidden">
      <div className="bg-grid-navy pointer-events-none absolute inset-x-0 top-0 h-72 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h1 className="font-display text-4xl font-bold text-navy-900 sm:text-5xl">All estates</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-600">
            Verified titles, documented allocations, and transparent pricing on every listing.
          </p>
        </Reveal>

        {estates.length > 0 ? (
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {estates.map((estate) => (
              <RevealItem key={estate.slug}>
                <EstateCard estate={estate} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-ink-300 bg-navy-50 px-6 py-16 text-center">
              <Building2 className="h-8 w-8 text-navy-400" aria-hidden="true" strokeWidth={1.5} />
              <p className="text-sm text-ink-600">No estates listed yet — check back soon.</p>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
