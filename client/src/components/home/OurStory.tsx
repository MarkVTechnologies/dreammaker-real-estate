import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Video-authority block, styled after kemchutahomesltd.com's "Watch Our
 * Story" section (PRD §3.1 baseline), paired with the Founder block PRD
 * §8.1 module 9 requires (MD Ejieh Paradise, E-E-A-T). No video exists yet
 * (PRD §6.4) — the player is an honest pending state, not a stand-in clip.
 */
export function OurStory() {
  return (
    <section className="bg-navy-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-500">Our story</p>
          <h2 className="mx-auto mt-2 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            See why the Lekki–Epe corridor trusts DreamMaker
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-100">
            Estate developments, allocation days and the people behind them —
            on camera, not just on paper.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="group relative mx-auto flex aspect-video max-w-3xl items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-navy-900">
            <div className="bg-grid-navy pointer-events-none absolute inset-0 opacity-[0.06]" />
            <div className="relative flex flex-col items-center gap-3 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 text-navy-950 transition-transform duration-300 group-hover:scale-105">
                <Play className="h-6 w-6" aria-hidden="true" fill="currentColor" />
              </span>
              <span className="text-sm font-medium text-navy-200">Estate walkthrough — video pending</span>
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mx-auto mt-12 flex max-w-3xl flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-7 sm:flex-row sm:items-center"
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-gold-500/40">
            <Image
              src="/images/team/ejieh-paradise-godstime.jpg"
              alt="Ejieh Paradise Godstime, Managing Director"
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold-500">
              From the Managing Director
            </p>
            <p className="mt-2 font-display text-lg text-white">
              &ldquo;We started DreamMaker because too many people paid for land in Lagos and Ogun
              they could never build on — no title, no allocation, and no one to call when it went
              wrong. Every estate we sell now starts with a documented title, not a promise, and
              it&apos;s backed by a team you can walk into our Lakowe office and meet. That
              standard isn&apos;t for marketing — it&apos;s the one I&apos;d want if I were the one
              buying.&rdquo;
            </p>
            <p className="mt-3 text-sm font-semibold text-white">Ejieh Paradise Godstime</p>
            <p className="text-sm text-navy-200">CEO &amp; Managing Director</p>
            <Link
              href="/about/leadership"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-navy-100 hover:text-white"
            >
              Read more about our leadership
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
