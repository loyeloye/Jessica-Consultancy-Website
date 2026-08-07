import { getServerSupabase } from "@/lib/supabase/server";
import { UPLOADS_BUCKET } from "@/lib/supabase/config";
import { deleteSubmission, markSubmissionRead } from "@/app/admin/actions";
import { AdminHeading, Card, EmptyState, Pill, btnDanger, btnGhost } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

type FileRef = { path?: string; url?: string; name?: string; size?: number };

type Row = {
  id: string;
  kind: "booking" | "talent" | "contact";
  name: string | null;
  email: string | null;
  data: Record<string, unknown>;
  files: FileRef[];
  read_at: string | null;
  created_at: string;
};

const KIND_LABEL: Record<Row["kind"], string> = {
  booking: "Booking inquiry",
  talent: "Talent registration",
  contact: "General inquiry",
};

const FIELD_LABEL: Record<string, string> = {
  company: "Company",
  phone: "Phone",
  projectType: "Project type",
  projectDate: "Project date(s)",
  budgetRange: "Budget",
  message: "Message",
  city: "City / base",
  portfolioUrl: "Portfolio",
  notes: "Notes",
  height: "Height",
  bust: "Bust / chest",
  waist: "Waist",
  hips: "Hips",
  shoeSize: "Shoe size",
};

function readable(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v)
      .map(([k, v]) => `${FIELD_LABEL[k] ?? k}: ${v}`)
      .join(" · ");
  }
  return String(value);
}

export default async function AdminSubmissionsPage({
  searchParams,
}: PageProps<"/admin/submissions">) {
  const supabase = await getServerSupabase();
  if (!supabase) return null;

  const sp = await searchParams;
  const filter = typeof sp.kind === "string" ? sp.kind : "";

  let query = supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (filter === "booking" || filter === "talent" || filter === "contact") {
    query = query.eq("kind", filter);
  }

  const { data } = await query;
  const rows = (data ?? []) as Row[];

  // Headshots and briefs live in a private bucket — mint short-lived signed
  // URLs so they're viewable in the admin without being public on the web.
  const paths = rows.flatMap((r) => (r.files ?? []).map((f) => f.path).filter(Boolean));
  const signed = new Map<string, string>();
  if (paths.length) {
    const { data: urls } = await supabase.storage
      .from(UPLOADS_BUCKET)
      .createSignedUrls(paths as string[], 60 * 60);
    urls?.forEach((u) => {
      if (u.path && u.signedUrl) signed.set(u.path, u.signedUrl);
    });
  }

  const tabs = [
    { key: "", label: "All" },
    { key: "booking", label: "Bookings" },
    { key: "talent", label: "Talent" },
    { key: "contact", label: "General" },
  ];

  return (
    <>
      <AdminHeading
        title="Inquiries"
        description="Everything submitted through the booking, talent registration, and contact forms."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <a
            key={t.key}
            href={t.key ? `/admin/submissions?kind=${t.key}` : "/admin/submissions"}
            className={`focus-ring rounded-full px-4 py-2 text-sm transition-colors ${
              filter === t.key
                ? "bg-accent text-ink"
                : "border border-line text-paper/70 hover:border-accent hover:text-accent"
            }`}
          >
            {t.label}
          </a>
        ))}
      </div>

      {rows.length === 0 ? (
        <EmptyState>Nothing here yet.</EmptyState>
      ) : (
        <div className="space-y-4">
          {rows.map((r) => {
            const entries = Object.entries(r.data ?? {}).filter(
              ([, v]) => v && readable(v).trim()
            );
            return (
              <Card key={r.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-lg">{r.name || "—"}</h2>
                      <Pill tone={r.read_at ? "off" : "on"}>{KIND_LABEL[r.kind]}</Pill>
                      {!r.read_at && <Pill tone="on">New</Pill>}
                    </div>
                    {r.email && (
                      <a
                        href={`mailto:${r.email}`}
                        className="focus-ring mt-1 inline-block text-sm text-accent underline underline-offset-2"
                      >
                        {r.email}
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-paper/40">
                    {new Date(r.created_at).toLocaleString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {entries.length > 0 && (
                  <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                    {entries.map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <dt className="shrink-0 text-paper/45">{FIELD_LABEL[k] ?? k}:</dt>
                        <dd className="min-w-0 whitespace-pre-wrap break-words text-paper/85">
                          {readable(v)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {(r.files ?? []).length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs uppercase tracking-wider text-paper/45">
                      Attachments
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {r.files.map((f, i) => {
                        const href = (f.path && signed.get(f.path)) || f.url;
                        return href ? (
                          <a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={btnGhost}
                          >
                            {f.name || `File ${i + 1}`} ↗
                          </a>
                        ) : (
                          <span key={i} className="text-xs text-paper/40">
                            {f.name || `File ${i + 1}`} (unavailable)
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <form action={markSubmissionRead}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="read" value={r.read_at ? "false" : "true"} />
                    <button type="submit" className={btnGhost}>
                      {r.read_at ? "Mark unread" : "Mark read"}
                    </button>
                  </form>
                  <form action={deleteSubmission}>
                    <input type="hidden" name="id" value={r.id} />
                    <button type="submit" className={btnDanger}>
                      Delete
                    </button>
                  </form>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
