import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { plotSchema } from "@/lib/adminSchemas";
import { addPlotToEstate } from "@/lib/db/estates";
import { parseJsonBody } from "@/lib/validate";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: Params) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const parsed = await parseJsonBody(request, plotSchema);
  if (parsed.error) return parsed.error;

  const result = await addPlotToEstate(id, parsed.data);
  if (!result) return NextResponse.json({ error: "Estate not found" }, { status: 404 });
  if ("error" in result) {
    return NextResponse.json({ error: "A plot with that number already exists on this estate" }, { status: 409 });
  }
  return NextResponse.json(result, { status: 201 });
}
