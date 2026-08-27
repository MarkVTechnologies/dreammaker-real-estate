import { Eye, Handshake, ShieldCheck, Target } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const values = [
  {
    icon: ShieldCheck,
    title: "Verified titles, always",
    description:
      "Every estate we sell carries a documented, verifiable title — C of O, Governor's Consent, or registered survey — checked before it ever reaches a listing page.",
  },
  {
    icon: Eye,
    title: "Radical transparency",
    description:
      "Pricing, payment plans, and allocation status are published up front. No hidden charges after deposit, no scarcity we can't back up.",
  },
  {
    icon: Handshake,
    title: "Delivery over promises",
    description:
      "We measure ourselves on physical handovers and infrastructure delivered, not on how the brochure reads. If it's not built, we say so.",
  },
  {
    icon: Target,
    title: "Long-term relationships",
    description:
      "Most of our new buyers arrive through referrals from existing ones. We build estates — and a reputation — meant to outlast a single sale.",
  },
];

export function AboutValues() {
  return (
    <section className="bg-navy-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            What we stand for
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Our mission and values
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Four principles that shape every estate we develop and every conversation our team
            has with a buyer.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <RevealItem key={value.title}>
              <div className="h-full rounded-2xl border border-navy-100 bg-white p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-navy-950/5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                  <value.icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{value.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
