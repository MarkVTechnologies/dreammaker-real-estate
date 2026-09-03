import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { plotSchema } from "@/lib/adminSchemas";
import { deletePlotById, updatePlotById } from "@/lib/db/estates";
import { parseJsonBody } from "@/lib/validate";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const parsed = await parseJsonBody(request, plotSchema.partial());
  if (parsed.error) return parsed.error;

  const plot = await updatePlotById(id, parsed.data);
  if (!plot) return NextResponse.json({ error: "Plot not found" }, { status: 404 });
  return NextResponse.json(plot);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  await deletePlotById(id);
  return new NextResponse(null, { status: 204 });
}
