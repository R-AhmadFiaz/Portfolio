import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import type { ContactFormValues } from "@/lib/validations/contact";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendContactEmail(data: Omit<ContactFormValues, "company">) {
  const { name, email, subject, message } = data;

  if (!resend) {
    console.info("[contact] RESEND_API_KEY not set — skipping send.", {
      name,
      email,
      subject,
    });
    return { skipped: true };
  }

  const result = await resend.emails.send({
    from: `Portfolio Contact <onboarding@resend.dev>`,
    to: siteConfig.email,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      </div>
    `,
  });

  if (result.error) {
    console.error("[contact] Resend rejected the owner notification email:", result.error);
  }

  return result;
}

export async function sendContactConfirmationEmail(data: Omit<ContactFormValues, "company">) {
  const { name, email, subject, message } = data;
  const firstName = name.trim().split(" ")[0] || name;

  if (!resend) {
    console.info("[contact] RESEND_API_KEY not set — skipping confirmation email.", {
      email,
    });
    return { skipped: true };
  }

  const result = await resend.emails.send({
    from: `${siteConfig.name} <onboarding@resend.dev>`,
    to: email,
    replyTo: siteConfig.email,
    subject: `Thanks for reaching out, ${firstName}!`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <p>Hi ${escapeHtml(firstName)},</p>
        <p>Thanks for getting in touch — I've received your message and will get back to you within a day.</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Your message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        <p>Talk soon,<br />${siteConfig.name}</p>
      </div>
    `,
  });

  if (result.error) {
    console.error("[contact] Resend rejected the visitor confirmation email:", result.error);
  }

  return result;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
