import Link from "next/link";
import { ArrowRight, Banknote, Compass, LandPlot } from "lucide-react";
import { RoiCalculator } from "@/components/estate/RoiCalculator";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const investmentProducts = [
  { label: "Land banking", href: "/invest/land-banking", icon: LandPlot },
  { label: "Off-plan", href: "/invest/off-plan", icon: Compass },
  { label: "Buy-back", href: "/invest/buy-back", icon: Banknote },
];

/**
 * Investment showcase, restyled after kemchutahomesltd.com's prominent
 * ROI/"Buy2Sell" block (PRD §3.1 baseline) — but headlined without a
 * specific return figure. PRD §15 flags over-promising ROI as a legal risk;
 * the live calculator carries its own "illustrative only" disclaimer instead
 * of a headline claim.
 */
export function InvestSection() {
  return (
    <section className="border-y border-navy-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Invest</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Invest with DreamMaker
          </h2>
          <p className="mt-3 max-w-xl text-ink-600">
            Three ways to put capital into the Lekki–Epe corridor — see a
            projection for yourself below.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,18rem)_1fr]">
          <RevealGroup className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {investmentProducts.map((product) => (
              <RevealItem key={product.href}>
                <Link
                  href={product.href}
                  className="group flex h-full items-center gap-4 rounded-xl border border-navy-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/10"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700 transition-colors group-hover:bg-navy-900 group-hover:text-gold-500">
                    <product.icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <span className="font-semibold text-navy-900">{product.label}</span>
                  <ArrowRight
                    className="ml-auto h-4 w-4 text-navy-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-navy-700"
                    aria-hidden="true"
                  />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <RoiCalculator />
            <Link
              href="/invest/roi-calculator"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-navy-700 hover:text-navy-900"
            >
              Open the full ROI calculator
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
