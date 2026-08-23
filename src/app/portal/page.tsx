import { auth } from "@clerk/nextjs/server";
import { PageStub } from "@/components/ui/PageStub";

export const metadata = {
  title: "Realtor Dashboard",
  robots: { index: false, follow: false },
};

// Protected by src/middleware.ts (clerkMiddleware + createRouteMatcher).
export default async function PortalDashboardPage() {
  await auth.protect();

  return (
    <PageStub
      title="Your dashboard"
      intro="Referrals, pipeline, earnings, inventory sheets, marketing asset library, referral links, commission statements (PRD §8.4)."
      prdRef="PRD §8.4"
      todo="Fetch GET /realtors/me from the server API (bearer token = Clerk session token) once the account exists."
    />
  );
}
