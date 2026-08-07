import Image from "next/image";
import { getServerSupabase } from "@/lib/supabase/server";
import { deleteMedia, updateMediaAlt } from "@/app/admin/actions";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { CopyButton } from "@/components/admin/CopyButton";
import { AdminHeading, Card, EmptyState, btnDanger, btnGhost, fieldClass } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

type Row = { id: string; url: string; alt: string | null; created_at: string };

export default async function AdminMediaPage() {
  const supabase = await getServerSupabase();
  if (!supabase) return null;

  const { data } = await supabase
    .from("media")
    .select("id, url, alt, created_at")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as Row[];

  return (
    <>
      <AdminHeading
        title="Media"
        description="Upload photography here, then copy an image's URL into a blog post, campaign, or the highlights grid."
      />

      <Card className="mb-10">
        <MediaUploader />
      </Card>

      {rows.length === 0 ? (
        <EmptyState>No images yet. Upload one above to get started.</EmptyState>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((m) => (
            <div key={m.id} className="rounded-sm border border-line bg-ink-soft">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-sm bg-ink">
                <Image
                  src={m.url}
                  alt={m.alt || ""}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-3 p-4">
                <form action={updateMediaAlt} className="flex gap-2">
                  <input type="hidden" name="id" value={m.id} />
                  <input
                    name="alt"
                    defaultValue={m.alt ?? ""}
                    aria-label="Alt text"
                    placeholder="Alt text"
                    className={`${fieldClass} py-2 text-xs`}
                  />
                  <button type="submit" className={btnGhost}>
                    Save
                  </button>
                </form>
                <div className="flex items-center gap-2">
                  <CopyButton value={m.url} />
                  <form action={deleteMedia} className="ml-auto">
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className={btnDanger}>
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
