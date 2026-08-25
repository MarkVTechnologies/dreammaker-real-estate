import { defineField, defineType } from "sanity";

/**
 * Programmatic location page content (PRD §8.3). Hard rule: no page ships
 * without 400+ words of genuinely locality-specific `description`.
 */
export const location = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "parentSlug", title: "Parent location slug", type: "string" }),
    defineField({
      name: "description",
      title: "Locality description (400+ words, required)",
      type: "text",
      validation: (r) => r.required().min(400),
    }),
    defineField({ name: "priceBandLowNgn", title: "Price band — low (NGN)", type: "number" }),
    defineField({ name: "priceBandHighNgn", title: "Price band — high (NGN)", type: "number" }),
    defineField({ name: "priceAsOf", title: "Price data as-of date", type: "date" }),
    defineField({ name: "drivers", title: "Infrastructure / development drivers", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "faqs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string" },
            { name: "answer", type: "text" },
          ],
        },
      ],
    }),
    defineField({ name: "seoTitle", type: "string" }),
    defineField({ name: "seoDescription", type: "text" }),
  ],
});
