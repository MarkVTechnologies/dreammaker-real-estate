import Link from "next/link";
import { ArrowRight, Building2, ClipboardList, FileCheck, HardHat, KeyRound } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const services = [
  {
    n: "01",
    label: "Property development",
    href: "/services/property-development",
    icon: Building2,
    copy: "Land acquisition, planning and estate development across the Lekki–Epe corridor.",
  },
  {
    n: "02",
    label: "Construction management",
    href: "/services/construction-management",
    icon: HardHat,
    copy: "Oversight of build quality, timelines and budget on every DreamMaker site.",
  },
  {
    n: "03",
    label: "Project management",
    href: "/services/project-management",
    icon: ClipboardList,
    copy: "Coordinated delivery from groundbreaking to allocation, phase by phase.",
  },
  {
    n: "04",
    label: "Property management",
    href: "/services/property-management",
    icon: KeyRound,
    copy: "Ongoing upkeep and administration for delivered estates and occupied plots.",
  },
  {
    n: "05",
    label: "Title perfection",
    href: "/services/title-perfection",
    icon: FileCheck,
    copy: "Documentation and regularization of C of O, Excision, Gazette and Governor's Consent titles.",
  },
];

/**
 * New section, styled after kemchutahomesltd.com's numbered "Our Services"
 * grid (PRD §3.1 baseline) — the five service routes already scaffolded in
 * the IA (PRD §7) had no homepage entry point before this.
 */
export function OurServices() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">What we offer</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Our services
          </h2>
        </Reveal>
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.href}>
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-2xl bg-navy-900 p-7 text-white transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-navy-300">{service.n}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gold-500">
                    <service.icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{service.label}</h3>
                <p className="mt-2 flex-1 text-sm text-navy-200">{service.copy}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-gold-500">
                  Learn more
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
