import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mailer";
import { storeSubmission } from "@/lib/submissions";
import { asString, isNonEmpty, isValidEmail } from "@/lib/validate";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = asString(formData.get("name"));
    const email = asString(formData.get("email"));
    const message = asString(formData.get("message"));

    const errors: Record<string, string> = {};
    if (!isNonEmpty(formData.get("name"))) errors.name = "Name is required.";
    if (!isValidEmail(email)) errors.email = "A valid email is required.";
    if (!isNonEmpty(formData.get("message"))) errors.message = "Please add a message.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    await storeSubmission({
      kind: "contact",
      name,
      email,
      data: { message },
      files: [],
    });

    await sendNotification(
      `New general inquiry — ${name}`,
      [`Name: ${name}`, `Email: ${email}`, "", "Message:", message].join("\n")
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] error", err);
    return NextResponse.json(
      { ok: false, errors: { form: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
