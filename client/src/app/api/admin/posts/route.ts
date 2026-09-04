import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { postSchema } from "@/lib/adminSchemas";
import { createPostDoc, listAdminPosts } from "@/lib/db/posts";
import { parseJsonBody } from "@/lib/validate";

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const posts = await listAdminPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const parsed = await parseJsonBody(request, postSchema);
  if (parsed.error) return parsed.error;

  const result = await createPostDoc(parsed.data);
  if ("error" in result) {
    return NextResponse.json({ error: "A post with that slug already exists" }, { status: 409 });
  }
  return NextResponse.json(result, { status: 201 });
}
