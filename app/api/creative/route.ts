import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mailer";
import { storeSubmission } from "@/lib/submissions";
import { asString, isNonEmpty, isValidEmail } from "@/lib/validate";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = asString(formData.get("fullName"));
    const email = asString(formData.get("email"));
    const phone = asString(formData.get("phone"));
    const city = asString(formData.get("city"));
    const portfolioUrl = asString(formData.get("portfolioUrl"));
    const roles = formData.getAll("roles").map((v) => asString(v)).filter(Boolean);
    const notes = asString(formData.get("notes"));
    const consent = asString(formData.get("consent"));

    const errors: Record<string, string> = {};
    if (!isNonEmpty(formData.get("fullName"))) errors.fullName = "Full name is required.";
    if (!isValidEmail(email)) errors.email = "A valid email is required.";
    if (!isNonEmpty(formData.get("phone"))) errors.phone = "Phone number is required.";
    if (!isNonEmpty(formData.get("city"))) errors.city = "City / base is required.";
    if (!isNonEmpty(formData.get("portfolioUrl")))
      errors.portfolioUrl = "A portfolio or website link is required.";
    if (roles.length === 0) errors.roles = "Select at least one role.";
    if (consent !== "on" && consent !== "true")
      errors.consent = "Please confirm you consent to Summer Et Al storing your info.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    await storeSubmission({
      kind: "creative",
      name: fullName,
      email,
      data: {
        phone,
        city,
        portfolioUrl,
        roles,
        notes,
      },
      files: [],
    });

    await sendNotification(
      `New creative registration — ${fullName}`,
      [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `City / base: ${city}`,
        `Portfolio / website: ${portfolioUrl}`,
        `Roles: ${roles.join(", ")}`,
        "",
        "Notes:",
        notes || "—",
      ].join("\n")
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/creative] error", err);
    return NextResponse.json(
      { ok: false, errors: { form: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
