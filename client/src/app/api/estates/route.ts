import { NextResponse } from "next/server";
import { listEstateSummaries } from "@/lib/db/estates";

export async function GET() {
  const estates = await listEstateSummaries();
  return NextResponse.json(estates);
}
