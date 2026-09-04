import Link from "next/link";
import { ArrowRight, BadgeCheck, HelpCircle } from "lucide-react";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { services, type Service } from "@/lib/services";

/**
 * Shared template for the five /services/[slug] pages — one layout, driven
 * entirely by the service's own data in lib/services.ts, so each page stays
 * consistent without five copies of the same markup.
 */
export function ServiceDetailPage({ service }: { service: Service }) {
  const related = services.filter((s) => s.slug !== service.slug);

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pb-20 pt-28 text-white">
        <div className="bg-grid-navy pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div
          className="animate-glow-drift pointer-events-none absolute -top-40 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-gold-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-200 hover:text-white"
            >
              ← All services
            </Link>
            <div className="mt-6 flex justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/30 bg-white/5 text-gold-500">
                <service.icon className="h-7 w-7" aria-hidden="true" strokeWidth={1.5} />
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-gold-500">
              Service {service.n}
            </p>
            <h1 className="mx-auto mt-2 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
              {service.label}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-navy-100">{service.description}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-600"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <WhatsAppLink
              message={`Hi DreamMaker, I'd like to know more about ${service.label.toLowerCase()}.`}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Chat on WhatsApp
            </WhatsAppLink>
          </Reveal>
        </div>
      </section>

      {/* What's included */}
      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">What&apos;s included</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Everything this service covers
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2">
          {service.included.map((item) => (
            <RevealItem key={item}>
              <div className="flex items-start gap-3 rounded-xl border border-navy-100 bg-white p-5">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                <span className="text-ink-700">{item}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Process */}
      <section className="bg-navy-50 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">How it works</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Our process
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <RevealItem key={step.title}>
                <div className="relative pl-4">
                  <span className="font-display text-4xl font-bold text-navy-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Questions</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Frequently asked
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 space-y-4">
            {service.faqs.map((faq) => (
              <RevealItem key={faq.q}>
                <div className="rounded-xl border border-navy-100 bg-white p-6">
                  <p className="flex items-start gap-2.5 font-semibold text-navy-900">
                    <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden="true" />
                    {faq.q}
                  </p>
                  <p className="mt-2 pl-7 text-sm leading-relaxed text-ink-600">{faq.a}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* Related services */}
      <section className="bg-navy-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
                Other services
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
                Works alongside {service.label.toLowerCase()}
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 font-medium text-navy-700 hover:text-navy-900"
            >
              View all services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((s) => (
              <RevealItem key={s.slug}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-navy-950/5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                    <s.icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-navy-900 group-hover:text-navy-700">
                    {s.label}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm text-ink-600">{s.copy}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy-950 py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to get started?</h2>
            <p className="mt-4 text-navy-100">
              Tell us what you need and we&apos;ll respond within 2 hours, 8am–8pm WAT.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-600"
              >
                Talk to our team
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <WhatsAppLink
                message={`Hi DreamMaker, I'd like to know more about ${service.label.toLowerCase()}.`}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Chat on WhatsApp
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
