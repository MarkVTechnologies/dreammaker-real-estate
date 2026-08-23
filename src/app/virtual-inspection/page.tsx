import { Globe } from "lucide-react";
import { InspectionForm } from "@/components/estate/InspectionForm";

export const metadata = {
  title: "Book a Virtual Inspection — For Diaspora Buyers",
  description:
    "Book a virtual inspection with timezone selection — built for diaspora buyers who cannot inspect physically.",
};

export default function VirtualInspectionPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-grid-navy pointer-events-none absolute inset-x-0 top-0 h-72 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
          <Globe className="h-3.5 w-3.5" aria-hidden="true" />
          PRD §5 P1, §7
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
          Book a virtual inspection
        </h1>
        <p className="mt-2 text-ink-600">
          Diaspora conversion path with timezone handling — no physical visit required.
        </p>
        <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
          <InspectionForm variant="VIRTUAL_INSPECTION" />
        </div>
      </div>
    </div>
  );
}
