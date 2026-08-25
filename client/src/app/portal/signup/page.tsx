import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Realtor Signup",
  robots: { index: false, follow: false },
};

// PRD §8.4: after Clerk signup, the client must call POST /realtors/signup on
// the server API to create the Realtor row (referral code, PENDING status).
// Wire that call from a Clerk afterSignUp webhook or a client-side effect.
export default function PortalSignupPage() {
  return (
    <div className="flex justify-center px-4 py-16">
      <SignUp path="/portal/signup" signInUrl="/portal/login" forceRedirectUrl="/portal" />
    </div>
  );
}
