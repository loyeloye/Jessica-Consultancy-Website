import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import { deletePost } from "@/app/admin/actions";
import {
  AdminHeading,
  Card,
  EmptyState,
  Pill,
  btnDanger,
  btnGhost,
  btnPrimary,
} from "@/components/admin/ui";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string | null;
};

export default async function AdminPostsPage() {
  const supabase = await getServerSupabase();
  if (!supabase) return null;

  const { data } = await supabase
    .from("posts")
    .select("id, slug, title, status, published_at, updated_at")
    .order("updated_at", { ascending: false });

  const rows = (data ?? []) as Row[];

  return (
    <>
      <AdminHeading
        title="Blog"
        description="Write and publish posts. Drafts stay private until you set them to published."
        action={
          <Link href="/admin/posts/new" className={btnPrimary}>
            New post
          </Link>
        }
      />

      {rows.length === 0 ? (
        <EmptyState>
          No posts yet.{" "}
          <Link href="/admin/posts/new" className="text-accent underline underline-offset-2">
            Write your first one
          </Link>
          .
        </EmptyState>
      ) : (
        <Card className="p-0">
          <ul className="divide-y divide-[color:var(--raw-line)]">
            {rows.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-paper">{p.title}</p>
                  <p className="mt-1 text-xs text-paper/40">
                    /blog/{p.slug}
                    {p.published_at &&
                      ` · published ${new Date(p.published_at).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}`}
                  </p>
                </div>
                <Pill tone={p.status === "published" ? "on" : "off"}>
                  {p.status === "published" ? "Published" : "Draft"}
                </Pill>
                {p.status === "published" && (
                  <Link href={`/blog/${p.slug}`} className={btnGhost}>
                    View
                  </Link>
                )}
                <Link href={`/admin/posts/${p.id}`} className={btnGhost}>
                  Edit
                </Link>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={p.id} />
                  <button type="submit" className={btnDanger}>
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
