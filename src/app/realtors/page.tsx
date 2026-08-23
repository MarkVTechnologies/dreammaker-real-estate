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
        intro="Public value proposition + signup (PRD §8.4). Kemchuta has 500+ realtors in its network (PRD §5 P3) — this is the page that competes for that same audience."
        prdRef="PRD §8.4"
        todo="Commission structure and payout terms are blocked on client input (PRD §16 open question 4)."
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
