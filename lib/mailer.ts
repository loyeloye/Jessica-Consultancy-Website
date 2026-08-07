import nodemailer from "nodemailer";
import { siteConfig } from "@/content/site";

/**
 * Email notifications are opt-in via env vars (see .env.example).
 * If SMTP isn't configured, submissions are still saved to disk — the
 * notification email is just skipped, and a note is logged so nothing
 * fails silently in an unexpected way.
 */
export async function sendNotification(subject: string, text: string, html?: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn(
      "[mailer] SMTP env vars not set — skipping email notification. See .env.example."
    );
    return { sent: false };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"${siteConfig.name} Website" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL || siteConfig.email,
    subject,
    text,
    html,
  });

  return { sent: true };
}
