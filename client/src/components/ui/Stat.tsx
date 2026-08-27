"use client";

import type { ReactNode } from "react";
import { useCountUp } from "@/lib/useCountUp";

interface StatProps {
  /** Pass a rendered icon element (e.g. `<Building2 className="h-5 w-5" />`), not the component
   * reference — this component is a client boundary, and bare function references from a server
   * parent aren't serializable across it. */
  icon: ReactNode;
  label: string;
  /** Pass a real, auditable figure. Leave null until the client confirms it —
   * PRD §10.2/§15 forbid fabricated numbers, so an unconfirmed stat renders
   * a "pending" state instead of a fake count. */
  value: number | null;
  suffix?: string;
}

/** Counts up once in view. Renders an honest pending chip when value is unconfirmed. */
export function Stat({ icon, label, value, suffix = "" }: StatProps) {
  const ref = useCountUp<HTMLDListElement>(value, suffix);

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-100 text-navy-700">
        {icon}
      </span>
      <dt className="text-sm text-ink-600">{label}</dt>
      {value !== null ? (
        <dd ref={ref} className="tabular-nums font-display text-3xl font-bold text-navy-900">
          {`0${suffix}`}
        </dd>
      ) : (
        <dd className="mt-0.5 rounded-full border border-dashed border-ink-300 px-3 py-1 text-xs font-medium text-ink-600">
          Confirm at Week 0
        </dd>
      )}
    </div>
  );
}
