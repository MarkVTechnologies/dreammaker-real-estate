import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const partners = [
  { name: "Property Links Global Realty", logo: "/images/partners/property-links-global-realty.jpg" },
  { name: "Karis Realtors", logo: "/images/partners/karis-realtors.jpg" },
  { name: "Giant Eagles Team", logo: "/images/partners/giant-eagles-team.jpg" },
  { name: "SealDeal Realtors Network", logo: "/images/partners/sealdeal-realtors.jpg" },
  { name: "Trillionaire Realtors Group", logo: "/images/partners/trillionaire-realtors-group.jpg" },
  { name: "Real Estate Warriors", logo: "/images/partners/real-estate-warriors.jpg" },
  { name: "Andremeks Company", logo: "/images/partners/andremeks-company.jpg" },
  { name: "PW Craft Homes", logo: "/images/partners/pw-craft-homes.jpg" },
  { name: "Mafic Palazzo Ventures", logo: "/images/partners/mafic-palazzo-ventures.jpg" },
];

/** Site-wide partner strip — rendered once in the root layout, directly above the footer, on every route. */
export function PartnersSection() {
  return (
    <section className="border-t border-navy-100 bg-navy-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Our partners</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Built on strong partnerships
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            We work alongside respected realtor networks and real estate partners across Nigeria to
            get every estate delivered — and every buyer looked after.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((partner) => (
            <RevealItem key={partner.name}>
              <div className="flex h-28 items-center justify-center rounded-xl border border-navy-100 bg-white p-5 grayscale transition-all duration-300 hover:grayscale-0 hover:shadow-md hover:shadow-navy-950/5">
                <div className="relative h-full w-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(min-width: 1024px) 160px, 33vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
