import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { postSchema } from "@/lib/adminSchemas";
import { deletePostDoc, updatePostDoc } from "@/lib/db/posts";
import { parseJsonBody } from "@/lib/validate";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const parsed = await parseJsonBody(request, postSchema.partial());
  if (parsed.error) return parsed.error;

  const post = await updatePostDoc(id, parsed.data);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  await deletePostDoc(id);
  return new NextResponse(null, { status: 204 });
}
