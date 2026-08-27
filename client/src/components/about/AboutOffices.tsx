import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { nap } from "@/lib/nav";

export function AboutOffices() {
  const office = nap.offices[0];

  return (
    <section className="bg-navy-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Come see us
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            A real office, open doors
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            No pop-up shops — walk in for a face-to-face conversation about any estate.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href={`/about/offices/${office.slug}`}
            className="group mx-auto mt-14 grid max-w-4xl overflow-hidden rounded-2xl border border-navy-100 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-950/10 sm:grid-cols-2"
          >
            <MediaPlaceholder label="Office photo pending" className="aspect-[16/9] w-full sm:aspect-auto" />
            <div className="flex flex-col justify-center p-8">
              <h3 className="font-display text-2xl font-semibold text-navy-900">{office.name}</h3>
              <p className="mt-3 flex items-start gap-1.5 text-ink-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {office.address}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-navy-700 group-hover:text-navy-900">
                Get directions
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
