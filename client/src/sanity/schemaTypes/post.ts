import { defineField, defineType } from "sanity";

/** Blog / news article (PRD §8.5, §9.6 — 4 posts/month min. 1,200 words). */
export const post = defineType({
  name: "post",
  title: "Insights Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "updatedAt", type: "datetime" }),
    defineField({ name: "seoTitle", type: "string" }),
    defineField({ name: "seoDescription", type: "text" }),
  ],
});
