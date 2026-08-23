import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

interface TrustChipsProps {
  items: readonly string[];
  tone?: "light" | "dark";
}

/**
 * Uppercase, tracked checkmark-chip row — the visual pattern
 * kemchutahomesltd.com uses under its hero and estate grid (PRD §3.1 names
 * this site as the structural baseline to repeat). Text only, never images,
 * per PRD §8.1 module 2.
 */
export function TrustChips({ items, tone = "light" }: TrustChipsProps) {
  const textClass = tone === "dark" ? "text-navy-100" : "text-navy-800";
  const iconClass = tone === "dark" ? "text-gold-500" : "text-navy-700";

  return (
    <Reveal>
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
        {items.map((label) => (
          <span
            key={label}
            className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${textClass}`}
          >
            <CheckCircle2 className={`h-4 w-4 ${iconClass}`} aria-hidden="true" strokeWidth={2} />
            {label}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
