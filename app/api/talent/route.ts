import { NextResponse } from "next/server";
import { sendNotification } from "@/lib/mailer";
import { storeFile, storeSubmission, type StoredFile } from "@/lib/submissions";
import { asString, isNonEmpty, isValidEmail } from "@/lib/validate";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = asString(formData.get("fullName"));
    const email = asString(formData.get("email"));
    const phone = asString(formData.get("phone"));
    const city = asString(formData.get("city"));
    const portfolioUrl = asString(formData.get("portfolioUrl"));
    const height = asString(formData.get("height"));
    const bust = asString(formData.get("bust"));
    const waist = asString(formData.get("waist"));
    const hips = asString(formData.get("hips"));
    const shoeSize = asString(formData.get("shoeSize"));
    const notes = asString(formData.get("notes"));
    const consent = asString(formData.get("consent"));

    const headshot = formData.get("headshot");
    const additionalPhotos = formData
      .getAll("additionalPhotos")
      .filter((f): f is File => f instanceof File && f.size > 0);

    const errors: Record<string, string> = {};
    if (!isNonEmpty(formData.get("fullName"))) errors.fullName = "Full name is required.";
    if (!isValidEmail(email)) errors.email = "A valid email is required.";
    if (!isNonEmpty(formData.get("phone"))) errors.phone = "Phone number is required.";
    if (!isNonEmpty(formData.get("city"))) errors.city = "City / base is required.";
    if (!isNonEmpty(formData.get("portfolioUrl")))
      errors.portfolioUrl = "An Instagram or portfolio link is required.";
    if (!(headshot instanceof File) || headshot.size === 0)
      errors.headshot = "A headshot photo is required.";
    if (consent !== "on" && consent !== "true")
      errors.consent = "Please confirm you consent to Jessica storing your info.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const files: StoredFile[] = [];
    try {
      files.push(await storeFile(headshot as File));
    } catch (err) {
      return NextResponse.json(
        {
          ok: false,
          errors: { headshot: err instanceof Error ? err.message : "Upload failed." },
        },
        { status: 400 }
      );
    }

    for (const file of additionalPhotos.slice(0, 4)) {
      try {
        files.push(await storeFile(file));
      } catch {
        // Skip an additional photo that fails validation; the required
        // headshot already succeeded, so don't fail the whole registration.
      }
    }

    await storeSubmission({
      kind: "talent",
      name: fullName,
      email,
      data: {
        phone,
        city,
        portfolioUrl,
        notes,
        stats: { height, bust, waist, hips, shoeSize },
      },
      files,
    });

    await sendNotification(
      `New talent registration — ${fullName}`,
      [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `City / base: ${city}`,
        `Portfolio / Instagram: ${portfolioUrl}`,
        `Photos submitted: ${files.length}`,
        `Height: ${height || "—"}, Bust: ${bust || "—"}, Waist: ${waist || "—"}, Hips: ${hips || "—"}, Shoe: ${shoeSize || "—"}`,
        "",
        "Notes:",
        notes || "—",
      ].join("\n")
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/talent] error", err);
    return NextResponse.json(
      { ok: false, errors: { form: "Something went wrong. Please try again." } },
      { status: 500 }
    );
  }
}
