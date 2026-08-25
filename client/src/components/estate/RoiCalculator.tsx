"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Banknote, Calendar, TriangleAlert, TrendingUp } from "lucide-react";
import { formatNgn } from "@/lib/types";

/**
 * Standalone link-magnet tool (PRD §7 /invest/roi-calculator, §10.2).
 * Purely illustrative arithmetic — annualPct must come from real, legally
 * reviewed figures before this ships (PRD §15 "Over-promising ROI figures").
 */
export function RoiCalculator() {
  const [principal, setPrincipal] = useState(5_000_000);
  const [years, setYears] = useState(3);
  const [annualPct, setAnnualPct] = useState(15);

  const projected = Math.round(principal * Math.pow(1 + annualPct / 100, years));

  const displayValue = useMotionValue(projected);
  const spring = useSpring(displayValue, { duration: 600, bounce: 0.15 });
  const [shownValue, setShownValue] = useState(projected);

  useEffect(() => {
    displayValue.set(projected);
  }, [projected, displayValue]);

  useEffect(() => spring.on("change", (latest) => setShownValue(Math.round(latest))), [spring]);

  const inputClass = "mt-1 w-full rounded-md border border-ink-300 py-2.5 pl-9 pr-3 tabular-nums outline-none focus:border-navy-700";
  const iconClass = "pointer-events-none absolute left-3 top-[calc(50%+4px)] h-4 w-4 -translate-y-1/2 text-ink-600";

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="relative block text-sm text-ink-600">
          Amount (NGN)
          <Banknote className={iconClass} aria-hidden="true" />
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className={inputClass}
          />
        </label>
        <label className="relative block text-sm text-ink-600">
          Years
          <Calendar className={iconClass} aria-hidden="true" />
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className={inputClass}
          />
        </label>
        <label className="relative block text-sm text-ink-600">
          Assumed annual appreciation (%)
          <TrendingUp className={iconClass} aria-hidden="true" />
          <input
            type="number"
            value={annualPct}
            onChange={(e) => setAnnualPct(Number(e.target.value))}
            className={inputClass}
          />
        </label>
      </div>

      <motion.div
        layout
        className="mt-8 rounded-xl bg-navy-50 p-6"
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm text-ink-600">Projected value</p>
        <p className="tabular-nums font-display text-4xl font-bold text-navy-900">
          {formatNgn(shownValue)}
        </p>
      </motion.div>

      <p className="mt-4 flex items-start gap-2 text-xs text-ink-600">
        <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" aria-hidden="true" />
        Illustrative only, not a guarantee — replace the default appreciation
        rate with a figure backed by real DreamMaker price history and cleared
        by legal review before launch (PRD §15).
      </p>
    </div>
  );
}
