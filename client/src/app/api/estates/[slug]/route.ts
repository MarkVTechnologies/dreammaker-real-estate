import { NextResponse } from "next/server";
import { getEstateDetailBySlug } from "@/lib/db/estates";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const estate = await getEstateDetailBySlug(slug);
  if (!estate) return NextResponse.json({ error: "Estate not found" }, { status: 404 });
  return NextResponse.json(estate);
}
