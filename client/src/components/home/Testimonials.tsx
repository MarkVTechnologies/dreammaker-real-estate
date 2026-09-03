import Image from "next/image";
import { Quote } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const testimonials = [
  {
    quote:
      "In 2015, Dream Makers helped me build a three storey building with nine flats in Asaba, Delta State. In 2018 I traveled to Germany and handed the property over to Dream Makers Investments and ever since then they have managed it very well — I have no complaints from my tenants and I constantly receive the rent money over here without stress. They are the best in construction and property management in the whole of Nigeria!!",
    name: "Esther Ojibade",
    title: "Interior Designer",
    photo: "/images/testimonials/esther-ojibade.jpg",
  },
  {
    quote:
      "In 2015, Dream Makers helped me build a three storey building with nine flats in Asaba, Delta State. In 2018 I traveled to Germany and handed the property over to Dream Makers Investments and ever since then they have managed it very well — I have no complaints from my tenants and I constantly receive the rent money over here without stress. They are the best in construction and property management in the whole of Nigeria!!",
    name: "Barr. John Onome",
    title: "Lawyer",
    photo: "/images/testimonials/john-onome.jpg",
  },
];

/** Real client testimonials (PRD §9.2/§15: only genuine, verifiable quotes — no fabricated star ratings). */
export function Testimonials() {
  return (
    <section className="bg-navy-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Client testimonials
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            What our clients say
          </h2>
        </Reveal>

        <RevealGroup className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <RevealItem key={t.name}>
              <div className="relative flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6">
                <Quote className="absolute right-5 top-5 h-6 w-6 text-navy-100" aria-hidden="true" />
                <p className="flex-1 text-sm leading-relaxed text-ink-600">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-navy-100 pt-4">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-navy-100">
                    <Image src={t.photo} alt={t.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                    <p className="text-xs text-ink-600">{t.title}</p>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
