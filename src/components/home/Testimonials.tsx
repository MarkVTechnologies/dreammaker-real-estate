import { Quote, Star, Users } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Star-rated testimonial cards, restyled after kemchutahomesltd.com's
 * "What Investors Are Saying" carousel (PRD §3.1 baseline). PRD §9.2/§15:
 * only genuine, verifiable reviews may ever be marked up here — fabricated
 * review/rating markup is a manual-action risk, so every card renders an
 * honest pending state instead of an invented quote, name or star count.
 */
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
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-dashed border-ink-300 bg-white px-4 py-1.5 text-sm text-ink-600">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 text-ink-300" aria-hidden="true" />
              ))}
            </span>
            Rating pending verified reviews
          </div>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <RevealItem key={i}>
              <div className="relative flex h-full flex-col rounded-2xl border border-dashed border-ink-300 bg-white p-6">
                <Quote className="absolute right-5 top-5 h-6 w-6 text-navy-100" aria-hidden="true" />
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 text-ink-300" aria-hidden="true" />
                  ))}
                </span>
                {/* TODO: video-first, named testimonials incl. diaspora client. Only genuine, verifiable reviews (PRD §9.2). */}
                <p className="mt-4 flex-1 text-sm text-ink-600">
                  Testimonial pending release approval.
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-ink-300/60 pt-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-100 text-navy-400">
                    <Users className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">Client name — pending</p>
                    <p className="text-xs text-ink-600">Location — pending</p>
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
