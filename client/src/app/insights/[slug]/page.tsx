import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from "lucide-react";
import { InsightCard } from "@/components/insights/InsightCard";
import { WhatsAppLink } from "@/components/layout/WhatsAppLink";
import { Reveal } from "@/components/ui/Reveal";
import { getPostBySlug, getRelatedPosts } from "@/lib/db/posts";
import { categorySlug, formatPostDate } from "@/lib/insights";

// Never cached: posts are edited live via /admin.
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} — DreamMaker Insights`,
    description: post.excerpt,
  };
}

export default async function InsightPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);

  return (
    <div className="relative overflow-hidden">
      <div className="bg-grid-navy pointer-events-none absolute inset-x-0 top-0 h-72 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <article className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            href={`/insights/category/${categorySlug(post.category)}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700 hover:bg-navy-200"
          >
            {post.category}
          </Link>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-600">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" aria-hidden="true" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {formatPostDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readMinutes} min read
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-navy-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink-700">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {post.gallery && post.gallery.length > 0 && (
          <Reveal delay={0.12}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {post.gallery.map((src) => (
                <div key={src} className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy-100">
                  <Image src={src} alt={post.title} fill sizes="(min-width: 640px) 380px, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-navy-100 bg-navy-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-navy-900">Have a question about buying land?</p>
              <p className="mt-1 text-sm text-ink-600">We respond within 2 hours, 8am–8pm WAT.</p>
            </div>
            <WhatsAppLink
              message={`Hi DreamMaker, I read "${post.title}" and had a question.`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90"
            >
              Chat on WhatsApp
            </WhatsAppLink>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            href="/insights"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-navy-700 hover:text-navy-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to insights
          </Link>
        </Reveal>
      </article>

      {related.length > 0 && (
        <section className="border-t border-navy-100 bg-navy-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                More in {post.category}
              </h2>
              <Link
                href={`/insights/category/${categorySlug(post.category)}`}
                className="inline-flex items-center gap-1 font-medium text-navy-700 hover:text-navy-900"
              >
                View all
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <InsightCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
