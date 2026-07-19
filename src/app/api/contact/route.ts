import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Invalid submission" },
      { status: 400 }
    );
  }

  if (result.data.company) {
    return NextResponse.json({ success: true });
  }

  try {
    await sendContactEmail(result.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] failed to send email:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
