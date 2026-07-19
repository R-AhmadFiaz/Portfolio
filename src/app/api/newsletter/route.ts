import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/newsletter";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = newsletterSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Invalid email" },
      { status: 400 }
    );
  }

  console.info("[newsletter] subscription request:", result.data.email);

  return NextResponse.json({ success: true });
}
