import { Reveal } from "@/components/ui/Reveal";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export function AboutStory() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">Our story</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Started with one plot and a promise to keep
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-600">
            <p>
              DreamMaker Real Estate Ltd was founded on a simple frustration shared by too many
              Nigerians: paying for land that never comes with a clean title, or an estate that
              stalls halfway through construction. We set out to build the opposite — every
              plot documented, every allocation traceable, every promise followed through to a
              physical handover.
            </p>
            <p>
              What started as a small team walking prospective buyers through bush plots on the
              Lekki–Epe corridor has grown into a company with permanent offices, an active
              realtor network, and a pipeline of estates in active development across Lagos and
              Ogun State — without ever losing the plot-by-plot accountability we started with.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <MediaPlaceholder label="Founding story photo pending" className="aspect-[4/3] w-full" />
        </Reveal>
      </div>
    </section>
  );
}
