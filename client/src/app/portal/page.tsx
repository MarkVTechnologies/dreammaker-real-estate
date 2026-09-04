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
      intro="Your realtor dashboard — referrals, pipeline, earnings, inventory sheets and marketing assets in one place."
    />
  );
}
