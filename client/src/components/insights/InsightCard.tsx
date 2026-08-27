import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { formatPostDate, type InsightPost } from "@/lib/insights";

export function InsightCard({ post, delay = 0 }: { post: InsightPost; delay?: number }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-navy-100 bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-navy-950/10"
    >
      <MediaPlaceholder label="Cover image pending" className="aspect-[16/9] w-full" delay={delay} />
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit items-center rounded-full bg-navy-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
          {post.category}
        </span>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-navy-900 group-hover:text-navy-700">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-4 border-t border-navy-100 pt-4 text-xs text-ink-600">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {formatPostDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readMinutes} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
