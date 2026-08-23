import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// /portal is the authenticated realtor dashboard (PRD §8.4); login/signup stay public.
const isProtectedPortalRoute = createRouteMatcher(["/portal((?!/login|/signup).*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedPortalRoute(req)) {
    await auth.protect();
  }
});

// Scoped to /portal only — Clerk has no other consumer in this app (the API
// lives in server/, not src/app/api). The previous sitewide matcher ran
// clerkMiddleware's dev-browser handshake on every public marketing route,
// which redirects to an error page whenever the Clerk key is a placeholder
// (see .env.local.example) instead of a real provisioned app.
export const config = {
  matcher: ["/portal/:path*"],
};
