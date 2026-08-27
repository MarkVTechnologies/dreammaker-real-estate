import { BadgeCheck, Clock, FileCheck, MapPin, ShieldCheck } from "lucide-react";

const items = [
  { icon: FileCheck, label: "RC: TODO" },
  { icon: BadgeCheck, label: "CAC Registered" },
  { icon: ShieldCheck, label: "Verified Titles" },
  { icon: MapPin, label: "Physical Office — Lakowe" },
  { icon: Clock, label: "Years Active: TODO" },
];

/**
 * PRD §8.1 module 2 — text, not images. Kept as a plain icon+label row
 * (no checkmark) because two of the five items are literal unconfirmed
 * placeholders (§16); a checkmark would misrepresent them as verified.
 */
export function TrustStrip() {
  return (
    <section className="border-b border-navy-100 bg-navy-50">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-3 px-4 py-6 sm:px-6 lg:px-8">
        {items.map(({ icon: Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-2 text-sm font-medium text-navy-800">
            <Icon className="h-4 w-4 text-navy-700" aria-hidden="true" strokeWidth={1.75} />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
