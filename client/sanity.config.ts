import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";

// Sanity Studio config (PRD §11.1 — CMS for non-technical content editors).
// Run locally with `npm run studio:dev` (separate Vite dev server, port 3333)
// and publish with `npm run studio:deploy` to <project>.sanity.studio.
// Not embedded in the Next.js app: Sanity Studio v3 + React 19 + Turbopack
// currently conflict when bundled into a Next.js route (createContext error
// during server-component collection) — this is a known ecosystem-lag issue,
// not a config bug. Revisit embedding once Sanity ships React 19 support.
// Guides, Insights and Location pages are authored here; Estate/Plot
// inventory and transactional state live in Postgres (server/), exposed to
// the client via the server API.
export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
