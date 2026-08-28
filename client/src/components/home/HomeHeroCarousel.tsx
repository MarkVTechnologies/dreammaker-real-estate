"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import type { EstateSummary } from "@/lib/types";
import { formatNgn, titleTypeLabel } from "@/lib/types";
import { estateSubscribeMessage, whatsappLink } from "@/lib/whatsapp";

const SLIDE_DURATION_MS = 6000;

interface HomeHeroCarouselProps {
  estates: EstateSummary[];
}

/**
 * Hero as an auto-advancing slideshow of live projects — each slide offers
 * "Subscribe" (a WhatsApp DM opt-in) and "Learn more" (the project page).
 * Falls back to a static brand hero when no estates exist yet.
 */
export function HomeHeroCarousel({ estates }: HomeHeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setIndex((i) => (estates.length ? (i + 1) % estates.length : 0));
  }, [estates.length]);

  useEffect(() => {
    if (paused || estates.length <= 1) return;
    const timer = setInterval(advance, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [advance, paused, estates.length]);

  if (estates.length === 0) {
    return (
      <section className="relative isolate overflow-hidden bg-navy-950 py-28 text-center text-white">
        <div className="bg-grid-navy pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative mx-auto max-w-2xl px-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-navy-100">
            <MapPin className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
            Lekki–Epe Corridor, Lagos
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold sm:text-5xl">
            Building on the Lekki–Epe corridor, <span className="text-gold-500">one estate at a time</span>
          </h1>
          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-600"
          >
            Explore projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    );
  }

  const estate = estates[index];

  return (
    <section
      className="relative isolate h-[560px] overflow-hidden bg-navy-950 text-white sm:h-[640px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={estate.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {estate.coverImageUrl ? (
            <Image
              src={estate.coverImageUrl}
              alt={estate.name}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/20" />
        </motion.div>
      </AnimatePresence>

      <div className="relative flex h-full flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={estate.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-500 backdrop-blur-sm">
                {titleTypeLabel[estate.titleType]}
              </span>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.08] sm:text-5xl">
                {estate.name}
              </h1>
              <p className="mt-3 flex items-center gap-1.5 text-lg text-navy-100">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {estate.locality}, {estate.lga}
                <span className="mx-2 text-navy-400">·</span>
                From {formatNgn(estate.startingPriceNgn)}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={whatsappLink(estateSubscribeMessage(estate.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-event="whatsapp_click"
                  className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-semibold text-white transition-colors hover:bg-whatsapp/90"
                >
                  <Bell className="h-4 w-4" aria-hidden="true" />
                  Subscribe
                </a>
                <Link
                  href={`/projects/${estate.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Learn more
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {estates.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + estates.length) % estates.length)}
            aria-label="Previous project"
            className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={advance}
            aria-label="Next project"
            className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {estates.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-gold-500" : "w-1.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
