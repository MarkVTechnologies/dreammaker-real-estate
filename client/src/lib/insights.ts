export interface InsightPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
  coverImage: string;
  gallery?: string[] | null;
  author: string;
  publishedAt: string;
  readMinutes: number;
  featured?: boolean;
}

/** Real categories used by DreamMaker's own News & Updates posts. */
export const categories = ["Press Release", "News", "Real Estate Tips & Articles"] as const;

export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" });
}
