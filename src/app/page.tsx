import Link from "next/link";
import { EstateCard } from "@/components/estate/EstateCard";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import type { EstateSummary } from "@/lib/types";

export const metadata = {
  title: "Real Estate Company in Lagos | Land & Homes, Lekki–Epe Corridor",
  description:
    "DreamMaker Real Estate Ltd develops and builds on the Lekki–Epe corridor. Verified titles, documented allocations, payment plans from 30% down.",
};

// Sample shape only — wire to CMS/Prisma before this ships. Do not launch
// with fabricated figures (PRD §10.2, §15 "Scarcity/availability data faked").
const featuredEstates: EstateSummary[] = [];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — PRD §8.1 module 1 */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Land and homes on the Lekki–Epe corridor
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-100">
            {/* TODO: one-line proposition, numbers over adjectives — Appendix A */}
            We develop and build across Lakowe, Awoyaya and Epe — with verified
            titles, documented allocations, and payment plans from 30% down.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/estates"
              className="rounded-md bg-gold-500 px-6 py-3 font-semibold text-navy-950 hover:bg-gold-600"
            >
              Explore Estates
            </Link>
            <Link
              href="/book-inspection"
              className="rounded-md border border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Book Inspection
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Trust strip — PRD §8.1 module 2. Text, not images, per spec. */}
      <section className="border-b border-navy-100 bg-navy-50">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-3 px-4 py-6 text-sm font-medium text-navy-800 sm:px-6 lg:px-8">
          <span>RC: TODO</span>
          <span>CAC Registered</span>
          <span>Verified Titles</span>
          <span>Physical Offices — Lakowe &amp; Awoyaya</span>
          <span>Years Active: TODO</span>
        </div>
      </section>

      {/* 3. Featured estates — PRD §8.1 module 3 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-900">Featured estates</h2>
        {featuredEstates.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredEstates.map((estate) => (
              <EstateCard key={estate.slug} estate={estate} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-ink-600">
            {/* TODO: replace with live CMS/Prisma query once inventory is loaded */}
            No estates loaded yet — connect the CMS/estate data source.
          </p>
        )}
      </section>

      {/* 4. Search / filter entry — PRD §8.1 module 4 */}
      <section className="border-y border-navy-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-navy-900">Find your plot</h2>
          {/* TODO: location / budget / plot size / title type filter form routing to /estates?query */}
          <form action="/estates" className="mt-4 flex flex-wrap gap-3">
            <input
              name="location"
              placeholder="Location"
              className="rounded-md border border-ink-300 px-3 py-2 text-sm"
            />
            <input
              name="budget"
              placeholder="Budget"
              className="rounded-md border border-ink-300 px-3 py-2 text-sm"
            />
            <button className="rounded-md bg-navy-900 px-5 py-2 text-sm font-semibold text-white">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* 5. Proof numbers — PRD §8.1 module 5. Real, auditable figures only. */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {[
            ["Plots allocated", "TODO"],
            ["Families housed", "TODO"],
            ["Estates delivered", "TODO"],
            ["Years active", "TODO"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-sm text-ink-600">{label}</dt>
              <dd className="mt-1 font-display text-3xl font-bold text-navy-900">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 6. Why DreamMaker — PRD §6.1 three pillars */}
      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-900">Why DreamMaker</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {[
              { pillar: "Verified", href: "/estates", copy: "Every title documented and shown." },
              { pillar: "Built", href: "/projects", copy: "We develop and construct, not just market." },
              { pillar: "Accountable", href: "/about/leadership", copy: "Named leadership, physical offices, press record." },
            ].map((item) => (
              <Link
                key={item.pillar}
                href={item.href}
                className="rounded-lg border border-navy-100 bg-white p-6 hover:shadow-md"
              >
                <h3 className="font-display text-xl font-semibold text-navy-900">{item.pillar}</h3>
                <p className="mt-2 text-sm text-ink-600">{item.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Allocation gallery — PRD §8.1 module 7, highest-trust module */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-900">Updates &amp; Activities</h2>
        <p className="mt-2 text-sm text-ink-600">
          {/* TODO: live, dated allocation-day photo/video feed */}
          Dated photographic proof of recent allocation days — wire to CMS.
        </p>
      </section>

      {/* 8. Investment products — PRD §8.1 module 8 */}
      <section className="border-y border-navy-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-900">Investment products</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { label: "Land banking", href: "/invest/land-banking" },
              { label: "Off-plan", href: "/invest/off-plan" },
              { label: "Buy-back", href: "/invest/buy-back" },
            ].map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="rounded-lg border border-navy-100 p-6 font-semibold text-navy-900 hover:shadow-md"
              >
                {product.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Founder block — PRD §8.1 module 9, E-E-A-T */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-900">From the Managing Director</h2>
        <p className="mt-4 max-w-2xl text-ink-600">
          {/* TODO: MD Ejieh Paradise one-paragraph statement + Guardian feature link (PRD §3.2, §9.2 Person schema) */}
          One-paragraph statement pending — link to the Guardian feature once copy is approved.
        </p>
        <Link href="/about/leadership" className="mt-4 inline-block text-navy-700 underline">
          Read more about our leadership
        </Link>
      </section>

      {/* 10. Testimonials — PRD §8.1 module 10 */}
      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-900">What our clients say</h2>
          {/* TODO: video-first, named testimonials incl. diaspora client */}
        </div>
      </section>

      {/* 11. Insights teaser — PRD §8.1 module 11 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-navy-900">Latest insights</h2>
        <Link href="/insights" className="mt-4 inline-block text-navy-700 underline">
          View all insights
        </Link>
      </section>

      {/* 12. Lead magnet — PRD §8.1 module 12 */}
      <section className="border-y border-navy-100 bg-navy-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold">
            Download the 2026 Lekki–Epe Land Price Guide
          </h2>
          {/* TODO: email-gated download, triggers brochure_download GA4 event (PRD §12) */}
          <form className="mx-auto mt-6 flex max-w-md gap-3">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 rounded-md px-4 py-2 text-navy-900"
            />
            <button className="rounded-md bg-gold-500 px-5 py-2 font-semibold text-navy-950">
              Download
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
        <WhatsAppLink
          message="Hi DreamMaker, I'm interested in your estates."
          className="text-sm font-semibold text-whatsapp underline"
        >
          Chat with us on WhatsApp
        </WhatsAppLink>
      </div>
    </>
  );
}
