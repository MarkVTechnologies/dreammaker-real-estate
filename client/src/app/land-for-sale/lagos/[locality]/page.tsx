import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageStub } from "@/components/ui/PageStub";

// PRD §7 IA + §9.3 keyword map — one page per locality on the corridor.
const localities = ["ibeju-lekki", "awoyaya", "lakowe", "bogije", "eleranigbe", "epe", "sangotedo"] as const;
type Locality = (typeof localities)[number];

const localityLabel: Record<Locality, string> = {
  "ibeju-lekki": "Ibeju-Lekki",
  awoyaya: "Awoyaya",
  lakowe: "Lakowe",
  bogije: "Bogije",
  eleranigbe: "Eleranigbe",
  epe: "Epe",
  sangotedo: "Sangotedo",
};

interface Props {
  params: Promise<{ locality: string }>;
}

export function generateStaticParams() {
  return localities.map((locality) => ({ locality }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locality } = await params;
  if (!isLocality(locality)) return {};
  const label = localityLabel[locality];
  return {
    title: `Land for Sale in ${label} — Prices & Available Plots`,
    description: `Current price band, DreamMaker inventory, title landscape and FAQ for land in ${label}, Lagos.`,
  };
}

function isLocality(value: string): value is Locality {
  return (localities as readonly string[]).includes(value);
}

export default async function LandForSaleLocalityPage({ params }: Props) {
  const { locality } = await params;
  if (!isLocality(locality)) notFound();
  const label = localityLabel[locality];

  return (
    <PageStub
      title={`Land for sale in ${label}`}
      intro={`Land for sale in ${label} — current pricing, available plots and title information are being finalized for this page.`}
    />
  );
}
