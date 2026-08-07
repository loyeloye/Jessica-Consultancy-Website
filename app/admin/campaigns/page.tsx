import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import { getHighlights } from "@/lib/content";
import { deleteCampaign } from "@/app/admin/actions";
import { HighlightsForm } from "@/components/admin/HighlightsForm";
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
  client: string;
  category: string | null;
  published: boolean;
  sort_order: number;
};

export default async function AdminCampaignsPage() {
  const supabase = await getServerSupabase();
  if (!supabase) return null;

  const [{ data }, highlights] = await Promise.all([
    supabase
      .from("campaigns")
      .select("id, slug, client, category, published, sort_order")
      .order("sort_order", { ascending: true }),
    getHighlights(),
  ]);

  const rows = (data ?? []) as Row[];

  return (
    <>
      <AdminHeading
        title="Work"
        description="Campaign case studies and the highlights grid on the Work page."
        action={
          <Link href="/admin/campaigns/new" className={btnPrimary}>
            New campaign
          </Link>
        }
      />

      {rows.length === 0 ? (
        <EmptyState>
          No campaigns in the database yet — the site is showing the built-in ones from{" "}
          <code>content/site.ts</code>. Adding one here takes over from those.
        </EmptyState>
      ) : (
        <Card className="p-0">
          <ul className="divide-y divide-[color:var(--raw-line)]">
            {rows.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-paper">{c.client}</p>
                  <p className="mt-1 text-xs text-paper/40">
                    {c.category} · /work#{c.slug}
                  </p>
                </div>
                <Pill tone={c.published ? "on" : "off"}>
                  {c.published ? "Visible" : "Hidden"}
                </Pill>
                <Link href={`/admin/campaigns/${c.id}`} className={btnGhost}>
                  Edit
                </Link>
                <form action={deleteCampaign}>
                  <input type="hidden" name="id" value={c.id} />
                  <button type="submit" className={btnDanger}>
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="mt-12">
        <h2 className="font-display text-xl">Highlights grid</h2>
        <p className="mb-5 mt-2 max-w-xl text-sm text-paper/60">
          The &ldquo;More from the archive&rdquo; images at the bottom of the Work page.
        </p>
        <Card>
          <HighlightsForm highlights={highlights} />
        </Card>
      </div>
    </>
  );
}
