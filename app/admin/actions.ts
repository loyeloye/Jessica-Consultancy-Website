"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";
import { MEDIA_BUCKET } from "@/lib/supabase/config";
import { slugify } from "@/lib/markdown";
import { ALLOWED_IMAGE_TYPES, MAX_UPLOAD_BYTES } from "@/lib/uploads";

export type ActionResult = { ok: boolean; message?: string };

/**
 * Every action re-checks the session server-side. Middleware already guards
 * the /admin routes, but server actions are independently addressable POST
 * endpoints — they must not rely on the middleware having run.
 */
async function requireAdmin() {
  const supabase = await getServerSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

function str(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}

function lines(v: FormDataEntryValue | null) {
  return str(v)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ------------------------------------------------------------------ posts */

export async function savePost(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await requireAdmin();

  const id = str(formData.get("id"));
  const title = str(formData.get("title"));
  if (!title) return { ok: false, message: "A title is required." };

  const slug = slugify(str(formData.get("slug")) || title);
  if (!slug) return { ok: false, message: "Could not build a URL slug from that title." };

  const status = str(formData.get("status")) === "published" ? "published" : "draft";

  const payload: Record<string, unknown> = {
    title,
    slug,
    excerpt: str(formData.get("excerpt")) || null,
    body: str(formData.get("body")),
    cover_image: str(formData.get("cover_image")) || null,
    cover_alt: str(formData.get("cover_alt")) || null,
    status,
  };

  // Stamp the publish date the first time it goes live; keep it stable after.
  if (status === "published") {
    const existingPublishedAt = str(formData.get("published_at"));
    payload.published_at = existingPublishedAt || new Date().toISOString();
  }

  const query = id
    ? supabase.from("posts").update(payload).eq("id", id)
    : supabase.from("posts").insert(payload);

  const { error } = await query;

  if (error) {
    if (error.code === "23505") {
      return { ok: false, message: `The URL "/blog/${slug}" is already taken.` };
    }
    return { ok: false, message: error.message };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/posts");
  // Publishing/unpublishing can flip whether "Journal" shows in the nav,
  // which is computed in the (site) layout shared by every public page —
  // revalidating just /blog leaves that stale everywhere else.
  revalidatePath("/", "layout");
  redirect("/admin/posts");
}

export async function deletePost(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return;

  const { data } = await supabase.from("posts").select("slug").eq("id", id).maybeSingle();
  await supabase.from("posts").delete().eq("id", id);

  if (data?.slug) revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  revalidatePath("/", "layout");
}

/* ------------------------------------------------------------------ media */

export async function uploadMedia(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Choose an image to upload." };
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { ok: false, message: "Images must be JPG, PNG, or WebP." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, message: "Images must be under 8MB." };
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (uploadError) return { ok: false, message: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);

  const { error: insertError } = await supabase.from("media").insert({
    path,
    url: publicUrl,
    alt: str(formData.get("alt")),
    size_bytes: file.size,
  });

  if (insertError) return { ok: false, message: insertError.message };

  revalidatePath("/admin/media");
  return { ok: true, message: "Image uploaded." };
}

export async function updateMediaAlt(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return;
  await supabase.from("media").update({ alt: str(formData.get("alt")) }).eq("id", id);
  revalidatePath("/admin/media");
}

export async function deleteMedia(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return;

  const { data } = await supabase.from("media").select("path").eq("id", id).maybeSingle();
  if (data?.path) await supabase.storage.from(MEDIA_BUCKET).remove([data.path]);
  await supabase.from("media").delete().eq("id", id);

  revalidatePath("/admin/media");
}

/* -------------------------------------------------------------- campaigns */

export async function saveCampaign(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await requireAdmin();

  const id = str(formData.get("id"));
  const client = str(formData.get("client"));
  if (!client) return { ok: false, message: "A client name is required." };

  const slug = slugify(str(formData.get("slug")) || client);

  // Gallery arrives as parallel "gallery_src" / "gallery_alt" lines so the
  // whole grid can be edited as plain text without a drag-and-drop UI.
  const gallerySrc = lines(formData.get("gallery_src"));
  const galleryAlt = lines(formData.get("gallery_alt"));
  const gallery = gallerySrc.map((src, i) => ({ src, alt: galleryAlt[i] ?? "" }));

  const factLabels = lines(formData.get("fact_labels"));
  const factValues = lines(formData.get("fact_values"));
  const facts = factLabels.map((label, i) => ({ label, value: factValues[i] ?? "" }));

  const payload = {
    slug,
    client,
    category: str(formData.get("category")) || null,
    role: str(formData.get("role")) || null,
    summary: str(formData.get("summary")) || null,
    hero_image: str(formData.get("hero_image")) || null,
    hero_alt: str(formData.get("hero_alt")) || null,
    scope: lines(formData.get("scope")),
    deliverables: lines(formData.get("deliverables")),
    stakeholders: lines(formData.get("stakeholders")),
    objectives: lines(formData.get("objectives")),
    facts,
    gallery,
    outcome: str(formData.get("outcome")) || null,
    sort_order: Number(str(formData.get("sort_order"))) || 0,
    published: str(formData.get("published")) === "on",
  };

  const query = id
    ? supabase.from("campaigns").update(payload).eq("id", id)
    : supabase.from("campaigns").insert(payload);

  const { error } = await query;
  if (error) {
    if (error.code === "23505") {
      return { ok: false, message: `The slug "${slug}" is already in use.` };
    }
    return { ok: false, message: error.message };
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/campaigns");
  redirect("/admin/campaigns");
}

export async function deleteCampaign(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return;
  await supabase.from("campaigns").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/campaigns");
}

export async function saveHighlights(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await requireAdmin();

  const srcs = lines(formData.get("highlight_src"));
  const alts = lines(formData.get("highlight_alt"));

  // Replace the grid wholesale — it is a short, ordered list, so a rewrite is
  // simpler and less error-prone than diffing rows.
  const { error: clearError } = await supabase
    .from("highlights")
    .delete()
    .not("id", "is", null);
  if (clearError) return { ok: false, message: clearError.message };

  if (srcs.length) {
    const rows = srcs.map((src, i) => ({ src, alt: alts[i] ?? "", sort_order: i }));
    const { error } = await supabase.from("highlights").insert(rows);
    if (error) return { ok: false, message: error.message };
  }

  revalidatePath("/work");
  revalidatePath("/admin/campaigns");
  return { ok: true, message: "Highlights grid updated." };
}

/* --------------------------------------------------------------- settings */

export async function saveSettings(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await requireAdmin();

  const statValues = lines(formData.get("stat_values"));
  const statLabels = lines(formData.get("stat_labels"));
  const stats = statValues.map((value, i) => ({ value, label: statLabels[i] ?? "" }));

  const value = {
    name: str(formData.get("name")),
    tagline: str(formData.get("tagline")),
    metaDescription: str(formData.get("metaDescription")),
    email: str(formData.get("email")),
    phone: str(formData.get("phone")),
    phoneHref: str(formData.get("phoneHref")),
    linkedin: str(formData.get("linkedin")),
    location: str(formData.get("location")),
    heroHeadline: str(formData.get("heroHeadline")),
    heroSubhead: str(formData.get("heroSubhead")),
    credibilityLine: str(formData.get("credibilityLine")),
    stats,
  };

  const { error } = await supabase
    .from("settings")
    .upsert({ key: "site", value }, { onConflict: "key" });

  if (error) return { ok: false, message: error.message };

  revalidatePath("/", "layout");
  return { ok: true, message: "Site settings saved." };
}

/* ------------------------------------------------------------ submissions */

export async function markSubmissionRead(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return;
  const read = str(formData.get("read")) === "true";
  await supabase
    .from("submissions")
    .update({ read_at: read ? new Date().toISOString() : null })
    .eq("id", id);
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}

export async function deleteSubmission(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const id = str(formData.get("id"));
  if (!id) return;
  await supabase.from("submissions").delete().eq("id", id);
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}

/* ----------------------------------------------------------------- signout */

export async function signOut(): Promise<void> {
  const supabase = await getServerSupabase();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}
