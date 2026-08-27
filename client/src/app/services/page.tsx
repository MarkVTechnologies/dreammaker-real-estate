import Link from "next/link";
import { ArrowRight, BadgeCheck, Banknote, CalendarCheck, FileSearch, ShieldCheck } from "lucide-react";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { services } from "@/lib/services";

export const metadata = {
  title: "Real Estate Services — Development, Construction & Project Management",
  description:
    "DreamMaker's services: property development, construction management, project management, property management and title perfection.",
};

const differentiators = [
  {
    icon: ShieldCheck,
    title: "In-house, not outsourced",
    description: "Development, construction and title work are handled by our own team — not handed off to a rotating cast of contractors.",
  },
  {
    icon: CalendarCheck,
    title: "Fixed timelines",
    description: "Every project runs against a published schedule, with delays communicated as they happen — not discovered after the fact.",
  },
  {
    icon: FileSearch,
    title: "Documented, not verbal",
    description: "Approvals, contracts and progress logs are on record. If it isn't written down, we don't consider it agreed.",
  },
  {
    icon: BadgeCheck,
    title: "Licensed & verified",
    description: "Every title we process and every site we build on is checked against government records before work begins.",
  },
];

const process = [
  {
    step: "01",
    title: "Consultation",
    description: "We scope what you need — a single service or full-cycle delivery — and give you a written estimate and timeline.",
  },
  {
    step: "02",
    title: "Scoping & approvals",
    description: "Land due diligence, layout planning and regulatory approvals are secured before any construction begins.",
  },
  {
    step: "03",
    title: "Delivery",
    description: "Construction and project management run in parallel, with milestone updates shared as work progresses.",
  },
  {
    step: "04",
    title: "Handover",
    description: "Documentation, keys and — where applicable — ongoing property management are handed over on completion.",
  },
];

export default function ServicesHubPage() {
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold-500">
              <Banknote className="h-3.5 w-3.5" aria-hidden="true" />
              What we offer
            </span>
            <h1 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
              Full-cycle real estate delivery, in-house
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-navy-100">
              From acquiring the land to handing over the keys, DreamMaker runs development,
              construction, project management, property management and title perfection as
              one team — not five separate vendors.
            </p>
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
              message="Hi DreamMaker, I'd like to know more about your services."
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Chat on WhatsApp
            </WhatsAppLink>
          </Reveal>
        </div>
      </section>

      {/* Capability list */}
      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Our capabilities
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Five services, one accountable team
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-navy-100 border-y border-navy-100">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.05}>
              <div className="flex flex-col gap-6 py-10 sm:flex-row sm:gap-10">
                <div className="flex shrink-0 items-start gap-4 sm:w-64">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                    <service.icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-ink-300">{service.n}</span>
                    <h3 className="font-display text-xl font-semibold text-navy-900">{service.label}</h3>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-ink-600">{service.description}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {service.included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-navy-700 hover:text-navy-900"
                  >
                    Learn more about {service.label.toLowerCase()}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-navy-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              Why work with us
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Accountability built into every service
            </h2>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item) => (
              <RevealItem key={item.title}>
                <div className="h-full rounded-2xl border border-navy-100 bg-white p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-navy-950/5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                    <item.icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">How we work</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            From consultation to handover
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <RevealItem key={item.step}>
              <div className="relative pl-4">
                <span className="font-display text-4xl font-bold text-navy-100">{item.step}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Closing CTA */}
      <section className="bg-navy-950 py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mt-4 text-navy-100">
              Whether it&apos;s a single service or full-cycle delivery, tell us what you need and
              we&apos;ll respond within 2 hours, 8am–8pm WAT.
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
                message="Hi DreamMaker, I have a project I'd like to discuss."
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
