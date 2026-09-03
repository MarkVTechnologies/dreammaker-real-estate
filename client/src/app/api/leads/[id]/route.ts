import { NextResponse } from "next/server";
import { getLeadDocById } from "@/lib/db/leads";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const lead = await getLeadDocById(id);
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ...lead, id: lead._id.toHexString(), _id: undefined });
}
