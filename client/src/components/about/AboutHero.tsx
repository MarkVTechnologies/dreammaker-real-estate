import Link from "next/link";
import { ArrowRight, Building2, MapPin, ShieldCheck, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";

/** Entity-authority hero (PRD §7, §9.2 Organization schema) — real numbers land once audited. */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-24 pt-28 text-white">
      <div className="bg-grid-navy pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div
        className="animate-glow-drift pointer-events-none absolute -top-40 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-gold-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-glow-drift pointer-events-none absolute -left-40 top-1/3 h-[24rem] w-[24rem] rounded-full bg-navy-600/30 blur-3xl"
        style={{ animationDelay: "-7s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold-500">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            About DreamMaker Real Estate Ltd
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Building trust, one titled acre at a time.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-100">
            DreamMaker Real Estate Ltd develops and delivers verified land and homes across
            Lagos and Ogun&apos;s fastest-growing corridors — with a real office, named
            leadership, and titles you can bank on.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book-inspection"
            className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-600"
          >
            Book an inspection
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/about/leadership"
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Meet our leadership
          </Link>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-white/95 p-8 shadow-2xl shadow-navy-950/30 backdrop-blur-sm">
            <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <Stat
                icon={<Building2 className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />}
                label="Estates delivered"
                value={null}
              />
              <Stat
                icon={<Users className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />}
                label="Families housed"
                value={null}
              />
              <Stat
                icon={<MapPin className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />}
                label="Physical office"
                value={1}
              />
              <Stat
                icon={<ShieldCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />}
                label="Years active"
                value={null}
              />
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
