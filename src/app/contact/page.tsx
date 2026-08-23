import { nap } from "@/lib/nav";

export const metadata = {
  title: "Contact DreamMaker Real Estate",
  description: "Contact DreamMaker Real Estate Ltd — phone, WhatsApp, and both office addresses.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-navy-900">Contact</h1>
      <p className="mt-4 text-ink-600">{nap.legalName} · {nap.phoneDisplay}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {nap.offices.map((office) => (
          <div key={office.slug}>
            <h2 className="font-semibold text-navy-900">{office.name}</h2>
            <p className="text-sm text-ink-600">{office.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
