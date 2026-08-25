import { defineField, defineType } from "sanity";

/**
 * Pillar guide (PRD §8.5). `directAnswer` is the 40-60 word answer-first
 * block every H2 must open with (PRD §9.5 point 1) — required, not optional.
 */
export const guide = defineType({
  name: "guide",
  title: "Guide",
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
    defineField({
      name: "directAnswer",
      title: "Direct answer (40-60 words)",
      type: "text",
      validation: (r) => r.required().max(400),
    }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "relatedEstateSlugs",
      title: "Related estate slugs (Prisma)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "relatedGuides",
      type: "array",
      of: [{ type: "reference", to: [{ type: "guide" }] }],
    }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "seoTitle", type: "string" }),
    defineField({ name: "seoDescription", type: "text" }),
  ],
});
