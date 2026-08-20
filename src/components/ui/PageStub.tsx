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
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-navy-900">{title}</h1>
      <p className="mt-4 text-ink-600">{intro}</p>
      <p className="mt-8 rounded-md border border-dashed border-ink-300 bg-navy-50 p-4 text-sm text-ink-600">
        <strong>Scaffold note ({prdRef}):</strong> {todo ?? "Content and data wiring pending."}
      </p>
    </div>
  );
}
