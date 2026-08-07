import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import { AdminHeading, Card, EmptyState, StatCard, btnGhost } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

type RecentRow = {
  id: string;
  kind: string;
  name: string | null;
  email: string | null;
  created_at: string;
  read_at: string | null;
};

const KIND_LABEL: Record<string, string> = {
  booking: "Booking inquiry",
  talent: "Talent registration",
  contact: "General inquiry",
};

export default async function AdminDashboard() {
  const supabase = await getServerSupabase();
  if (!supabase) return null;

  const [posts, unread, campaigns, recent] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase
      .from("submissions")
      .select("id", { count: "exact", head: true })
      .is("read_at", null),
    supabase.from("campaigns").select("id", { count: "exact", head: true }),
    supabase
      .from("submissions")
      .select("id, kind, name, email, created_at, read_at")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const rows = (recent.data ?? []) as RecentRow[];

  return (
    <>
      <AdminHeading
        title="Dashboard"
        description="Everything you can manage from here — write posts, upload photography, update your copy, and read incoming inquiries."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard label="Unread inquiries" value={unread.count ?? 0} href="/admin/submissions" />
        <StatCard label="Blog posts" value={posts.count ?? 0} href="/admin/posts" />
        <StatCard label="Campaigns" value={campaigns.count ?? 0} href="/admin/campaigns" />
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl">Recent inquiries</h2>
          <Link href="/admin/submissions" className={btnGhost}>
            View all
          </Link>
        </div>

        {rows.length === 0 ? (
          <EmptyState>
            No inquiries yet. Submissions from the booking, talent, and contact forms will
            appear here.
          </EmptyState>
        ) : (
          <Card className="p-0">
            <ul className="divide-y divide-[color:var(--raw-line)]">
              {rows.map((r) => (
                <li key={r.id} className="flex flex-wrap items-center gap-3 p-4 text-sm">
                  {!r.read_at && (
                    <span aria-label="Unread" className="h-2 w-2 rounded-full bg-accent" />
                  )}
                  <span className="font-medium text-paper">{r.name || "—"}</span>
                  <span className="text-paper/50">{KIND_LABEL[r.kind] ?? r.kind}</span>
                  <span className="ml-auto text-xs text-paper/40">
                    {new Date(r.created_at).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </>
  );
}
