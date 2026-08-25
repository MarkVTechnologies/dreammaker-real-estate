import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * PRD §8.1 module 11 — kept as its own light band (Kemchuta has no direct
 * equivalent; this is DreamMaker's differentiator per PRD §3.1 "no visible
 * blog or content layer — this is where DreamMaker overtakes them").
 */
export function InsightsTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Insights</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Latest insights
          </h2>
        </div>
        <Link
          href="/insights"
          className="inline-flex items-center gap-1 font-medium text-navy-700 hover:text-navy-900"
        >
          View all insights
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>

      <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <RevealItem key={i}>
            <div className="flex h-full flex-col rounded-xl border border-dashed border-ink-300 bg-navy-50 p-6">
              <FileText className="h-6 w-6 text-navy-400" aria-hidden="true" strokeWidth={1.5} />
              {/* TODO: 10 pillar guides + ongoing posts (PRD §8.5, §9.6) */}
              <p className="mt-4 text-sm text-ink-600">Guide publishing soon.</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
