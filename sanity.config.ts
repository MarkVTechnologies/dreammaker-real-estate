import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";

// Embedded Studio, served at /studio (PRD §11.1 — CMS for non-technical
// content editors). Guides, Insights and Location pages are authored here;
// Estate/Plot inventory and transactional state live in Postgres (server/),
// exposed to the client at build/request time via the server API.
export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
