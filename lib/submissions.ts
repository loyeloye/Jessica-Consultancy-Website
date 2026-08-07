import { getServiceSupabase } from "@/lib/supabase/server";
import { UPLOADS_BUCKET } from "@/lib/supabase/config";
import { appendRecord } from "@/lib/storage";
import { saveUpload, type UploadResult, ALLOWED_IMAGE_TYPES } from "@/lib/uploads";

export type SubmissionKind = "booking" | "talent" | "contact";

export type StoredFile = {
  path?: string;
  url?: string;
  name: string;
  size: number;
};

const FILE_TABLE: Record<SubmissionKind, "bookings.json" | "talent.json" | "contact.json"> = {
  booking: "bookings.json",
  talent: "talent.json",
  contact: "contact.json",
};

/**
 * Persists an uploaded file.
 *
 * With Supabase configured it goes to the private `uploads` bucket, which is
 * the only path that works on serverless hosts. Otherwise it falls back to
 * the local `/uploads` folder so `npm run dev` keeps working unconfigured.
 */
export async function storeFile(
  file: File,
  allowedTypes: string[] = ALLOWED_IMAGE_TYPES
): Promise<StoredFile> {
  const supabase = getServiceSupabase();

  if (!supabase) {
    const local: UploadResult = await saveUpload(file, allowedTypes);
    return { name: local.originalName, size: local.size, url: `/uploads/${local.fileName}` };
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Unsupported file type.");
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("File is too large. Please keep uploads under 8MB.");
  }

  const ext = file.name.includes(".") ? file.name.split(".").pop()!.toLowerCase() : "bin";
  const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const { error } = await supabase.storage
    .from(UPLOADS_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw new Error(error.message);

  // No public URL by design — this bucket holds personal data. The admin
  // views these through short-lived signed URLs.
  return { path, name: file.name, size: file.size };
}

/** Records a submission, preferring Supabase and falling back to local JSON. */
export async function storeSubmission(input: {
  kind: SubmissionKind;
  name: string;
  email: string;
  data: Record<string, unknown>;
  files: StoredFile[];
}): Promise<void> {
  const supabase = getServiceSupabase();

  if (supabase) {
    const { error } = await supabase.from("submissions").insert({
      kind: input.kind,
      name: input.name || null,
      email: input.email || null,
      data: input.data,
      files: input.files,
    });
    if (error) throw new Error(error.message);
    return;
  }

  await appendRecord(FILE_TABLE[input.kind], {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    name: input.name,
    email: input.email,
    ...input.data,
    files: input.files,
  });
}
