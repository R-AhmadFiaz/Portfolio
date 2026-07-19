import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactEmail, sendContactConfirmationEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

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
    const { name, email, subject, message } = result.data;
    await prisma.contact.create({ data: { name, email, subject, message } });
    await sendContactEmail(result.data);
    await sendContactConfirmationEmail(result.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] failed to send email:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
