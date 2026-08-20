import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// /portal is the authenticated realtor dashboard (PRD §8.4); login/signup stay public.
const isProtectedPortalRoute = createRouteMatcher(["/portal((?!/login|/signup).*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedPortalRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
