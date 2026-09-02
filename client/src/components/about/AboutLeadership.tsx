import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { executiveTeam } from "@/lib/team";

export function AboutLeadership() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Real people, named leadership
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            The team behind DreamMaker
          </h2>
        </div>
        <Link
          href="/about/leadership"
          className="inline-flex items-center gap-1 font-medium text-navy-700 hover:text-navy-900"
        >
          Full leadership profiles
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-3">
        {executiveTeam.map((leader) => (
          <RevealItem key={leader.slug}>
            <Link
              href={`/about/leadership#${leader.slug}`}
              className="group block overflow-hidden rounded-2xl border border-navy-100 bg-white transition-shadow duration-300 hover:shadow-lg hover:shadow-navy-950/5"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-navy-100">
                <Image
                  src={leader.photo}
                  alt={leader.name}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="font-display text-lg font-semibold text-navy-900">{leader.name}</p>
                <p className="mt-0.5 text-sm text-ink-600">{leader.role}</p>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
