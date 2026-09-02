import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { advisoryBoard, executiveTeam, type TeamMember } from "@/lib/team";

export const metadata = {
  title: "Leadership — Ejieh Paradise Godstime, Managing Director",
  description:
    "Meet DreamMaker's Managing Director Ejieh Paradise Godstime and the executive team and advisory board leading the company's estates across Lagos and Ogun State.",
};

function ExecutiveProfile({ leader, reverse = false }: { leader: TeamMember; reverse?: boolean }) {
  return (
    <Reveal id={leader.slug} className="scroll-mt-24">
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <div className={`lg:col-span-2 ${reverse ? "lg:order-2" : ""}`}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-navy-100">
            <Image
              src={leader.photo}
              alt={leader.name}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className={`lg:col-span-3 ${reverse ? "lg:order-1" : ""}`}>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">{leader.role}</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-navy-900 sm:text-3xl">{leader.name}</h2>
          <div className="mt-5 space-y-4 text-ink-600">
            {leader.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {leader.expertise && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-navy-900">Areas of expertise</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {leader.expertise.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full bg-navy-50 px-3 py-1 text-sm text-navy-700"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function LeadershipPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-grid-navy pointer-events-none absolute inset-x-0 top-0 h-72 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative mx-auto max-w-3xl px-4 pb-4 pt-20 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
            Leadership
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-navy-900 sm:text-5xl">
            The people behind DreamMaker
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-600">
            Named leadership, real credentials — the executive team and advisory board running
            DreamMaker's estates day to day.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto max-w-5xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        {executiveTeam.map((leader, i) => (
          <ExecutiveProfile key={leader.slug} leader={leader} reverse={i % 2 === 1} />
        ))}
      </div>

      <section className="bg-navy-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              Advisory board
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Outside expertise, on call
            </h2>
            <p className="mt-4 text-lg text-ink-600">
              Independent advisors who bring legal, marketing, and business expertise to
              DreamMaker's biggest decisions.
            </p>
          </Reveal>

          <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {advisoryBoard.map((member) => (
              <RevealItem key={member.slug}>
                <div id={member.slug} className="scroll-mt-24 overflow-hidden rounded-2xl border border-navy-100 bg-white">
                  <div className="relative aspect-square w-full overflow-hidden bg-navy-100">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-display text-lg font-semibold text-navy-900">{member.name}</p>
                    <p className="mt-0.5 text-sm text-gold-600">{member.role}</p>
                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-600">
                      {member.bio.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                    {member.expertise && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {member.expertise.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-full bg-navy-50 px-2.5 py-1 text-xs text-navy-700"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Want to talk to the team directly?
            </h2>
            <p className="mt-4 text-lg text-ink-600">
              Book a physical inspection or reach out on WhatsApp — no scripts, just straight
              answers from the people running the company.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/book-inspection"
                className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-semibold text-navy-950 transition-colors hover:bg-gold-600"
              >
                Book an inspection
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
