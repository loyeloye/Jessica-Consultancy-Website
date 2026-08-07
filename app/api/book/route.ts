import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mailer";
import { storeFile, storeSubmission, type StoredFile } from "@/lib/submissions";
import { ALLOWED_BRIEF_TYPES } from "@/lib/uploads";
import { asString, isNonEmpty, isValidEmail } from "@/lib/validate";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = asString(formData.get("name"));
    const email = asString(formData.get("email"));
    const phone = asString(formData.get("phone"));
    const company = asString(formData.get("company"));
    const projectType = asString(formData.get("projectType"));
    const projectDate = asString(formData.get("projectDate"));
    const budgetRange = asString(formData.get("budgetRange"));
    const message = asString(formData.get("message"));
    const brief = formData.get("brief");

    const errors: Record<string, string> = {};
    if (!isNonEmpty(formData.get("name"))) errors.name = "Name is required.";
    if (!isValidEmail(email)) errors.email = "A valid email is required.";
    if (!isNonEmpty(formData.get("projectType")))
      errors.projectType = "Please choose a project type.";
    if (!isNonEmpty(formData.get("message")))
      errors.message = "Please add a short brief or message.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const files: StoredFile[] = [];
    if (brief instanceof File && brief.size > 0) {
      try {
        files.push(await storeFile(brief, ALLOWED_BRIEF_TYPES));
      } catch (err) {
        return NextResponse.json(
          { ok: false, errors: { brief: err instanceof Error ? err.message : "Upload failed." } },
          { status: 400 }
        );
      }
    }

    await storeSubmission({
      kind: "booking",
      name,
      email,
      data: { phone, company, projectType, projectDate, budgetRange, message },
      files,
    });

    await sendNotification(
      `New booking inquiry — ${projectType} (${name})`,
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        `Company: ${company || "—"}`,
        `Project type: ${projectType}`,
        `Project date(s): ${projectDate || "—"}`,
        `Budget range: ${budgetRange || "—"}`,
        `Brief attached: ${files.length ? files[0].name : "no"}`,
        "",
        "Message:",
        message,
      ].join("\n")
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/book] error", err);
    return NextResponse.json(
      { ok: false, errors: { form: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
