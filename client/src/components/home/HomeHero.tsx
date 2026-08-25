"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ChevronDown, MapPin } from "lucide-react";
import { useCountUp } from "@/lib/useCountUp";

interface HeroStat {
  label: string;
  value: number | null;
  suffix?: string;
}

const heroStats: HeroStat[] = [
  { label: "Active realtors", value: null },
  { label: "Deals closed", value: null },
  { label: "Estates available", value: null },
  { label: "Families housed", value: null },
];

function HeroStatItem({ label, value, suffix = "" }: HeroStat) {
  const ref = useCountUp<HTMLParagraphElement>(value, suffix);
  return (
    <div className="px-5 py-1 first:pl-0 sm:px-7">
      {value !== null ? (
        <p ref={ref} className="tabular-nums font-display text-2xl font-bold text-white sm:text-3xl">
          {`0${suffix}`}
        </p>
      ) : (
        <p className="font-display text-2xl font-bold text-white/25 sm:text-3xl">—</p>
      )}
      <p className="mt-1 text-xs uppercase tracking-wide text-navy-200">{label}</p>
    </div>
  );
}

/**
 * Hero + inline stat row in one dark panel — mirrors kemchutahomesltd.com's
 * "Building futures, one estate at a time" pacing (PRD §3.1 names this site
 * as the structural baseline). No stock imagery (PRD §6.4): the surface is
 * an abstract navy/gold treatment until real drone footage is commissioned.
 */
export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden="true"
        className="animate-glow-drift pointer-events-none absolute -left-24 top-[-10%] h-96 w-96 rounded-full bg-navy-700/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-glow-drift pointer-events-none absolute -right-16 bottom-[-15%] h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-3xl [animation-delay:-7s]"
      />
      <div className="bg-grid-navy pointer-events-none absolute inset-0 opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-navy-100"
        >
          <MapPin className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
          Lekki–Epe Corridor, Lagos
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl"
        >
          Building on the Lekki–Epe corridor,{" "}
          <span className="text-gold-500">one estate at a time</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-lg text-navy-100"
        >
          {/* TODO: one-line proposition, numbers over adjectives — Appendix A */}
          We develop and build across Lakowe, Awoyaya and Epe — with verified
          titles, documented allocations, and payment plans from 30% down.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Link
            href="/estates"
            className="group inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-600"
          >
            Explore Estates
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/book-inspection"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Book Inspection
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-wrap divide-x divide-white/15 border-t border-white/10 pt-8"
        >
          {heroStats.map((stat) => (
            <HeroStatItem key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 0.8, duration: 0.5 }, y: { delay: 1, duration: 1.8, repeat: Infinity } }}
        className="relative hidden justify-center pb-6 sm:flex"
      >
        <ChevronDown className="h-5 w-5 text-navy-300" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
