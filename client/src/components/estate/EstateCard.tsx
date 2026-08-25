"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Camera, LandPlot, MapPin, ShieldCheck, Wallet } from "lucide-react";
import { EstateSummary, formatNgn, titleTypeLabel } from "@/lib/types";

/**
 * Decision data on the card face (PRD §3.1, §8.1 module 3): title status,
 * from-price, deposit %, plot size, location, live availability — never
 * fabricated scarcity (PRD §10.2).
 */
export function EstateCard({ estate }: { estate: EstateSummary }) {
  const scarce = estate.plotsTotal > 0 && estate.plotsAvailable / estate.plotsTotal <= 0.2;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group h-full"
    >
      <Link
        href={`/estates/${estate.slug}`}
        className="block h-full overflow-hidden rounded-xl border border-navy-100 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-950/10"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-100">
          {estate.coverImageUrl ? (
            <Image
              src={estate.coverImageUrl}
              alt={`${estate.name}, ${estate.locality}`}
              fill
              sizes="(min-width: 1024px) 320px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-navy-100 via-navy-50 to-navy-100 text-navy-400">
              <Camera className="h-7 w-7" aria-hidden="true" strokeWidth={1.5} />
              <span className="text-xs font-medium">Photography pending</span>
            </div>
          )}
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-navy-950/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
            {titleTypeLabel[estate.titleType]}
          </span>
          {scarce && (
            <span className="absolute right-3 top-3 rounded-full bg-warning px-3 py-1 text-xs font-semibold text-white">
              Limited availability
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-display text-lg font-semibold text-navy-900">{estate.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-ink-600">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {estate.locality}, {estate.lga}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-navy-100 pt-4 text-sm">
            <div>
              <dt className="text-ink-600">From</dt>
              <dd className="tabular-nums font-semibold text-navy-900">
                {formatNgn(estate.startingPriceNgn)}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1 text-ink-600">
                <Wallet className="h-3.5 w-3.5" aria-hidden="true" />
                Deposit
              </dt>
              <dd className="tabular-nums font-semibold text-navy-900">{estate.depositPercent}%</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1 text-ink-600">
                <LandPlot className="h-3.5 w-3.5" aria-hidden="true" />
                Plot sizes
              </dt>
              <dd className="tabular-nums text-navy-900">{estate.plotSizesSqm.join(", ")} sqm</dd>
            </div>
            <div>
              <dt className="text-ink-600">Availability</dt>
              <dd className="tabular-nums text-navy-900">
                {estate.plotsAvailable} of {estate.plotsTotal} plots
              </dd>
            </div>
          </dl>
        </div>
      </Link>
    </motion.div>
  );
}
