import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Realtor Portal Login",
  robots: { index: false, follow: false },
};

export default function PortalLoginPage() {
  return (
    <div className="flex justify-center px-4 py-16">
      <SignIn path="/portal/login" signUpUrl="/portal/signup" forceRedirectUrl="/portal" />
    </div>
  );
}
