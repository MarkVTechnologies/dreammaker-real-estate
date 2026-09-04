import "server-only";
import { ObjectId } from "mongodb";
import type { z } from "zod";
import { getDb } from "./mongodb";
import type { PostDoc } from "./types";
import type { InsightPost } from "@/lib/insights";
import type { postSchema } from "@/lib/adminSchemas";

type PostInput = z.infer<typeof postSchema>;

function estimateReadMinutes(body: string[]): number {
  const words = body.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function posts() {
  const db = await getDb();
  return db.collection<PostDoc>("posts");
}

function toInsightPost(doc: PostDoc): InsightPost {
  return {
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    excerpt: doc.excerpt,
    body: doc.body,
    coverImage: doc.coverImage,
    gallery: doc.gallery,
    author: doc.author,
    publishedAt: doc.publishedAt.toISOString().slice(0, 10),
    readMinutes: estimateReadMinutes(doc.body),
    featured: doc.featured,
  };
}

export async function getAllPosts(): Promise<InsightPost[]> {
  const col = await posts();
  const docs = await col.find({}, { sort: { publishedAt: -1 } }).toArray();
  return docs.map(toInsightPost);
}

export async function getFeaturedPost(): Promise<InsightPost | null> {
  const all = await getAllPosts();
  return all.find((p) => p.featured) ?? all[0] ?? null;
}

export async function getPostBySlug(slug: string): Promise<InsightPost | null> {
  const col = await posts();
  const doc = await col.findOne({ slug });
  return doc ? toInsightPost(doc) : null;
}

export async function getPostsByCategory(category: string): Promise<InsightPost[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getRelatedPosts(post: InsightPost, limit = 3): Promise<InsightPost[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, limit);
}

// --- Admin CRUD ---

export interface AdminPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
  coverImage: string;
  gallery: string[] | null;
  author: string;
  publishedAt: string;
  featured: boolean;
}

function toAdminPost(doc: PostDoc): AdminPost {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    excerpt: doc.excerpt,
    body: doc.body,
    coverImage: doc.coverImage,
    gallery: doc.gallery,
    author: doc.author,
    publishedAt: doc.publishedAt.toISOString().slice(0, 10),
    featured: doc.featured,
  };
}

export async function listAdminPosts(): Promise<AdminPost[]> {
  const col = await posts();
  const docs = await col.find({}, { sort: { publishedAt: -1 } }).toArray();
  return docs.map(toAdminPost);
}

export async function createPostDoc(data: PostInput): Promise<AdminPost | { error: "duplicate_slug" }> {
  const col = await posts();
  const existing = await col.findOne({ slug: data.slug });
  if (existing) return { error: "duplicate_slug" };

  const now = new Date();
  const doc: PostDoc = {
    _id: new ObjectId(),
    slug: data.slug,
    title: data.title,
    category: data.category,
    excerpt: data.excerpt,
    body: data.body,
    coverImage: data.coverImage,
    gallery: data.gallery ?? null,
    author: data.author,
    publishedAt: new Date(data.publishedAt),
    featured: data.featured ?? false,
    createdAt: now,
    updatedAt: now,
  };
  await col.insertOne(doc);
  return toAdminPost(doc);
}

export async function updatePostDoc(id: string, data: Partial<PostInput>): Promise<AdminPost | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await posts();
  const { publishedAt, ...rest } = data;
  const setFields: Record<string, unknown> = { ...rest, updatedAt: new Date() };
  if (publishedAt) setFields.publishedAt = new Date(publishedAt);

  const result = await col.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: setFields },
    { returnDocument: "after" }
  );
  return result ? toAdminPost(result) : null;
}

export async function deletePostDoc(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await posts();
  await col.deleteOne({ _id: new ObjectId(id) });
}
