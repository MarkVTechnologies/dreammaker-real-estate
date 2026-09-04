import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { InsightCard } from "@/components/insights/InsightCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getPostsByCategory } from "@/lib/db/posts";
import { categories, categorySlug } from "@/lib/insights";

// Never cached: posts are edited live via /admin.
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ category: string }>;
}

function findCategory(slug: string): string | undefined {
  return categories.find((c) => categorySlug(c) === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = findCategory(category);
  if (!label) return { title: "Category not found" };

  return {
    title: `${label} — DreamMaker Insights`,
    description: `DreamMaker insights posts in the ${label} category.`,
  };
}

export default async function InsightsCategoryPage({ params }: Props) {
  const { category } = await params;
  const label = findCategory(category);
  if (!label) notFound();

  const posts = await getPostsByCategory(label);

  return (
    <div className="relative overflow-hidden">
      <div className="bg-grid-navy pointer-events-none absolute inset-x-0 top-0 h-72 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <Link href="/insights" className="text-sm font-medium text-navy-700 hover:text-navy-900">
            ← All insights
          </Link>
          <h1 className="mt-4 font-display text-4xl font-bold text-navy-900 sm:text-5xl">{label}</h1>
        </Reveal>

        {posts.length > 0 ? (
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <RevealItem key={post.slug}>
                <InsightCard post={post} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-ink-300 bg-navy-50 px-6 py-16 text-center">
              <FileText className="h-8 w-8 text-navy-400" aria-hidden="true" strokeWidth={1.5} />
              <p className="text-sm text-ink-600">No posts in this category yet — check back soon.</p>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
