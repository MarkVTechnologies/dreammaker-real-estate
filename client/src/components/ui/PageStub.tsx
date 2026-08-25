import { Construction } from "lucide-react";
import { Reveal } from "./Reveal";

interface PageStubProps {
  title: string;
  intro: string;
  prdRef: string;
  todo?: string;
}

/**
 * Structural placeholder for routes not yet built out. Every route still
 * gets unique per-route metadata (title/description) even while the body
 * is a stub — duplicate metadata across routes was flagged as a mistake to
 * avoid (PRD §3.2). Replace the body before this route ships; per PRD §13
 * the launch gate requires zero placeholder copy anywhere in the build.
 */
export function PageStub({ title, intro, prdRef, todo }: PageStubProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-grid-navy pointer-events-none absolute inset-x-0 top-0 h-72 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
            {prdRef}
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-navy-900 sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-600">{intro}</p>

          <div className="mt-10 flex gap-4 rounded-xl border border-dashed border-ink-300 bg-navy-50 p-5">
            <Construction className="h-5 w-5 shrink-0 text-navy-700" aria-hidden="true" strokeWidth={1.75} />
            <div>
              <p className="text-sm font-semibold text-navy-900">In build</p>
              <p className="mt-1 text-sm text-ink-600">{todo ?? "Content and data wiring pending."}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
