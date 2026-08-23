export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-01-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Falls back to a placeholder so `next build`/`next dev` work before a real
// Sanity project exists. Content queries return empty results against the
// placeholder — set NEXT_PUBLIC_SANITY_PROJECT_ID once the project is created.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";

if (projectId === "placeholder" && process.env.NODE_ENV !== "test") {
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — Guides/Insights/Locations content will not load. See client/.env.local.example."
  );
}
