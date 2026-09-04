import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, FileText } from "lucide-react";
import { InsightCard } from "@/components/insights/InsightCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getAllPosts, getFeaturedPost } from "@/lib/db/posts";
import { categories, categorySlug, formatPostDate } from "@/lib/insights";

// Never cached: posts are edited live via /admin.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Insights — DreamMaker Real Estate Blog",
  description: "Market reports, estate progress updates, buying guides and location guides from DreamMaker Real Estate Ltd.",
};

export default async function InsightsIndexPage() {
  const featured = await getFeaturedPost();
  const allPosts = await getAllPosts();
  const rest = featured ? allPosts.filter((p) => p.slug !== featured.slug) : allPosts;

  return (
    <div className="relative overflow-hidden">
      <div className="bg-grid-navy pointer-events-none absolute inset-x-0 top-0 h-72 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <h1 className="font-display text-4xl font-bold text-navy-900 sm:text-5xl">Insights</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-600">
            Buying guides, location breakdowns, market reports and estate updates — written from
            what we actually see selling and building land in Lagos and Ogun State.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/insights/category/${categorySlug(category)}`}
              className="rounded-full border border-navy-200 px-4 py-1.5 text-sm font-medium text-navy-700 transition-colors hover:border-navy-700 hover:bg-navy-50"
            >
              {category}
            </Link>
          ))}
        </Reveal>

        {featured && (
          <Reveal delay={0.1}>
            <Link
              href={`/insights/${featured.slug}`}
              className="group mt-12 grid gap-0 overflow-hidden rounded-2xl border border-navy-100 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-950/10 lg:grid-cols-2"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-100 lg:aspect-auto">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8">
                <span className="inline-flex w-fit items-center rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
                  {featured.category}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-navy-900 group-hover:text-navy-700 sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-ink-600">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-sm text-ink-600">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    {formatPostDate(featured.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {featured.readMinutes} min read
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        {rest.length > 0 ? (
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <RevealItem key={post.slug}>
                <InsightCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : !featured ? (
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center gap-3 rounded-xl border border-dashed border-ink-300 bg-navy-50 px-6 py-16 text-center">
              <FileText className="h-8 w-8 text-navy-400" aria-hidden="true" strokeWidth={1.5} />
              <p className="text-sm text-ink-600">No posts yet — check back soon.</p>
            </div>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
