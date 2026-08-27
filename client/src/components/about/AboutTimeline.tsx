import { Reveal } from "@/components/ui/Reveal";

const milestones = [
  {
    year: "2015",
    title: "DreamMaker is founded",
    description: "Started with a single plot on the Lekki–Epe corridor and a small sales team.",
  },
  {
    year: "2018",
    title: "First estate handed over",
    description: "Completed our first full estate delivery — survey, fencing, and allocation letters issued to every buyer.",
  },
  {
    year: "2021",
    title: "Expansion into Ogun State",
    description: "Opened new development sites along the Epe/Ijebu-Ode corridor as demand grew beyond Lagos.",
  },
  {
    year: "2024",
    title: "Realtor network launched",
    description: "Opened DreamMaker's referral program, giving independent realtors a transparent commission pipeline.",
  },
  {
    year: "2026",
    title: "Digital-first rebrand",
    description: "Relaunched with a rebuilt platform, live inventory, and an in-house payments and allocation system.",
  },
];

export function AboutTimeline() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Our journey</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
          Milestones along the way
        </h2>
      </Reveal>

      <ol className="relative mt-16 space-y-12 border-l border-navy-100 pl-8 sm:pl-10">
        {milestones.map((milestone, i) => (
          <Reveal key={milestone.year} delay={i * 0.05}>
            <li className="relative">
              <span className="absolute -left-8 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-gold-500 ring-4 ring-white sm:-left-10" />
              <p className="font-display text-2xl font-bold text-navy-900">{milestone.year}</p>
              <p className="mt-1 text-lg font-semibold text-navy-800">{milestone.title}</p>
              <p className="mt-1.5 text-ink-600">{milestone.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
