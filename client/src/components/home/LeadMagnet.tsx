import { Download } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/** PRD §8.1 module 12 — email-gated download, list-building. */
export function LeadMagnet() {
  return (
    <section className="relative overflow-hidden border-y border-navy-100 bg-navy-900 py-20 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />
      <Reveal className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <Download className="mx-auto h-8 w-8 text-gold-500" aria-hidden="true" strokeWidth={1.5} />
        <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
          Download the 2026 Lekki–Epe Land Price Guide
        </h2>
        <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 rounded-md px-4 py-3 text-navy-900 outline-none"
          />
          <button className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-5 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-600">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download
          </button>
        </form>
      </Reveal>
    </section>
  );
}
