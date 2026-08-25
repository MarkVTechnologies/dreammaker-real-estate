import { defineField, defineType } from "sanity";

/** Person schema backing (PRD §9.2) — real bio and credentials, no anonymous authorship. */
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "jobTitle", title: "Job title", type: "string" }),
    defineField({ name: "bio", type: "text" }),
    defineField({ name: "photoUrl", title: "Photo (Cloudinary URL)", type: "url" }),
    defineField({
      name: "sameAs",
      title: "Same-as profiles (press, LinkedIn, etc.)",
      type: "array",
      of: [{ type: "url" }],
    }),
  ],
});
