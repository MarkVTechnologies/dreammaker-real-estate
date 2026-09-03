import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { estateSchema } from "@/lib/adminSchemas";
import { createEstateDoc, listAdminEstates } from "@/lib/db/estates";
import { parseJsonBody } from "@/lib/validate";

/** Admin estate list — full records (not the public summary shape), used to populate the dashboard table. */
export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const estates = await listAdminEstates();
  return NextResponse.json(estates);
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const parsed = await parseJsonBody(request, estateSchema);
  if (parsed.error) return parsed.error;

  const result = await createEstateDoc(parsed.data);
  if ("error" in result) {
    return NextResponse.json({ error: "An estate with that slug already exists" }, { status: 409 });
  }
  return NextResponse.json(result, { status: 201 });
}
