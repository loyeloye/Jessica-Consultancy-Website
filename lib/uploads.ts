import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ALLOWED_BRIEF_TYPES = [...ALLOWED_IMAGE_TYPES, "application/pdf"];
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB

export type UploadResult = { fileName: string; originalName: string; size: number };

const EXT_BY_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "application/pdf": "pdf",
};

/**
 * Prototype-grade upload handling: saves the file to a local /uploads
 * folder (gitignored). NOTE: on serverless hosts this filesystem is
 * ephemeral — swap for S3/Cloudinary/etc. before going to production.
 */
export async function saveUpload(
  file: File,
  allowedTypes: string[] = ALLOWED_IMAGE_TYPES
): Promise<UploadResult> {
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Unsupported file type.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("File is too large. Please keep uploads under 8MB.");
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const ext = EXT_BY_TYPE[file.type] || "bin";
  const fileName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, fileName), buffer);

  return { fileName, originalName: file.name, size: file.size };
}
