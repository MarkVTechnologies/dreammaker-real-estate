import { TrendingUp } from "lucide-react";
import { RoiCalculator } from "@/components/estate/RoiCalculator";

export const metadata = {
  title: "ROI Calculator — Land Investment on the Lekki–Epe Corridor",
  description:
    "Estimate the projected value of a land or property investment on the Lekki–Epe corridor with DreamMaker's ROI calculator.",
};

export default function RoiCalculatorPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-grid-navy pointer-events-none absolute inset-x-0 top-0 h-72 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
          Invest
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold text-navy-900 sm:text-5xl">
          ROI calculator
        </h1>
        <p className="mt-4 max-w-xl text-ink-600">
          Estimate the projected value of a land investment on the Lekki–Epe corridor. Enter your
          numbers below to get a quick projection.
        </p>
        <div className="mt-8">
          <RoiCalculator />
        </div>
      </div>
    </div>
  );
}
