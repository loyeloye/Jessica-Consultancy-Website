/**
 * Supabase is optional. When the env vars are absent the site falls back to
 * the static content in `content/site.ts`, so the public pages keep working
 * (and the build keeps passing) before the database is provisioned.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const MEDIA_BUCKET = "media";
export const UPLOADS_BUCKET = "uploads";

/** True when the public (browser-safe) Supabase credentials are present. */
export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/** True when the server-only service-role key is also present. */
export function hasServiceRole() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_KEY);
}
