import { CalendarCheck } from "lucide-react";
import { InspectionForm } from "@/components/estate/InspectionForm";

export const metadata = {
  title: "Book an Inspection",
  description: "Book a physical inspection of any DreamMaker estate — we respond within 2 hours, 8am–8pm WAT.",
};

export default function BookInspectionPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-grid-navy pointer-events-none absolute inset-x-0 top-0 h-72 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-md px-4 py-20 sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
          <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
          PRD §7, §10.1
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
          Book an inspection
        </h1>
        <p className="mt-2 text-ink-600">Primary conversion path — physical inspection.</p>
        <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
          <InspectionForm variant="INSPECTION" />
        </div>
      </div>
    </div>
  );
}
