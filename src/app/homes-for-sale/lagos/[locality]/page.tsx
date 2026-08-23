import type { Metadata } from "next";
import { PageStub } from "@/components/ui/PageStub";

interface Props {
  params: Promise<{ locality: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locality } = await params;
  return {
    title: `Homes for Sale in ${locality} — Built Units`,
    description: `Finished and off-plan homes for sale in ${locality}, Lagos — pricing, floor size and rooms.`,
  };
}

export default async function HomesForSaleLocalityPage({ params }: Props) {
  const { locality } = await params;
  return (
    <PageStub
      title={`Homes for sale in ${locality}`}
      intro="Same programmatic pattern as /land-for-sale, applied to built units (PRD §7)."
      prdRef="PRD §7, §9.2 Residence/Accommodation schema"
      todo="Same 400+ unique-word content rule applies (PRD §8.3)."
    />
  );
}
