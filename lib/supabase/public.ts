import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

/**
 * Cookie-free anon client for reading public content.
 *
 * Deliberately separate from the cookie-bound client in `server.ts`: calling
 * `cookies()` opts a page into dynamic rendering, and the public pages should
 * stay statically rendered. Freshness comes from `revalidatePath()` in the
 * admin actions instead.
 */
export function getPublicSupabase() {
  if (!isSupabaseConfigured()) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
