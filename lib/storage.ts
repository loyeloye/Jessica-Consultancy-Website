import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

/**
 * Prototype-grade storage: appends JSON records to a local file.
 * NOTE: this only works on a persistent filesystem. Most serverless hosts
 * (Vercel, etc.) run API routes on ephemeral/read-only storage, so this
 * should be swapped for a durable store (Airtable, Google Sheets, a
 * hosted database) before going to production. See README for details.
 */
export async function appendRecord<T extends Record<string, unknown>>(
  file: "bookings.json" | "talent.json" | "creative.json" | "contact.json",
  record: T
) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, file);

  let existing: T[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    existing = JSON.parse(raw);
  } catch {
    existing = [];
  }

  existing.push(record);
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");
}
