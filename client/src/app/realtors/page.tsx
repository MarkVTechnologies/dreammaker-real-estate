import Link from "next/link";
import { PageStub } from "@/components/ui/PageStub";

export const metadata = {
  title: "Become a DreamMaker Realtor — Commission Structure & Signup",
  description:
    "Join DreamMaker's realtor network: commission structure, payout terms, marketing assets and referral tracking.",
};

export default function RealtorsPage() {
  return (
    <>
      <PageStub
        title="Realtors"
        intro="Join DreamMaker's realtor network for transparent commissions, marketing support and a steady pipeline of verified land and homes to sell."
      />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <Link
          href="/portal/signup"
          className="rounded-md bg-gold-500 px-6 py-3 font-semibold text-navy-950 hover:bg-gold-600"
        >
          Sign up as a realtor
        </Link>
      </div>
    </>
  );
}
