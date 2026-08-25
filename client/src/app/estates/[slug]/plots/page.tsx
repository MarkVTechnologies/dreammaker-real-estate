import type { Metadata } from "next";
import { PageStub } from "@/components/ui/PageStub";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Available Plots — ${slug}`,
    description: `Live plot inventory for ${slug}: size, price and availability status.`,
  };
}

export default async function EstatePlotsPage({ params }: Props) {
  const { slug } = await params;
  return (
    <PageStub
      title={`${slug} — Plots`}
      intro="Live plot-by-plot inventory (PRD §11.2 Plot entity)."
      prdRef="PRD §7"
      todo="Fetch plots for this estate from the server API; status must reflect real availability, never fabricated scarcity (PRD §10.2, §15)."
    />
  );
}
