import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { estateSchema } from "@/lib/adminSchemas";
import { deleteEstateDoc, updateEstateDoc } from "@/lib/db/estates";
import { parseJsonBody } from "@/lib/validate";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const parsed = await parseJsonBody(request, estateSchema.partial());
  if (parsed.error) return parsed.error;

  const estate = await updateEstateDoc(id, parsed.data);
  if (!estate) return NextResponse.json({ error: "Estate not found" }, { status: 404 });
  return NextResponse.json(estate);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  await deleteEstateDoc(id);
  return new NextResponse(null, { status: 204 });
}
