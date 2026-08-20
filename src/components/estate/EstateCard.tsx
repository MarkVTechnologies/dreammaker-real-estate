import Image from "next/image";
import Link from "next/link";
import { EstateSummary, formatNgn, titleTypeLabel } from "@/lib/types";

/**
 * Decision data on the card face (PRD §3.1, §8.1 module 3): title status,
 * from-price, deposit %, plot size, location, live availability — never
 * fabricated scarcity (PRD §10.2).
 */
export function EstateCard({ estate }: { estate: EstateSummary }) {
  return (
    <Link
      href={`/estates/${estate.slug}`}
      className="group block overflow-hidden rounded-lg border border-navy-100 bg-white transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full bg-navy-100">
        <Image
          src={estate.coverImageUrl}
          alt={`${estate.name}, ${estate.locality}`}
          fill
          sizes="(min-width: 1024px) 320px, 100vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-navy-950/90 px-3 py-1 text-xs font-medium text-white">
          {titleTypeLabel[estate.titleType]}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-navy-900">{estate.name}</h3>
        <p className="text-sm text-ink-600">
          {estate.locality}, {estate.lga}
        </p>

        <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-ink-600">From</dt>
            <dd className="tabular-nums font-semibold text-navy-900">
              {formatNgn(estate.startingPriceNgn)}
            </dd>
          </div>
          <div>
            <dt className="text-ink-600">Deposit</dt>
            <dd className="tabular-nums font-semibold text-navy-900">{estate.depositPercent}%</dd>
          </div>
          <div>
            <dt className="text-ink-600">Plot sizes</dt>
            <dd className="tabular-nums text-navy-900">
              {estate.plotSizesSqm.join(", ")} sqm
            </dd>
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
  );
}
