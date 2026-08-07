import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Blog" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/campaigns", label: "Work" },
  { href: "/admin/submissions", label: "Inquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  // The login page renders inside this layout but has no session yet.
  if (!user) return <>{children}</>;

  return (
    <div className="min-h-full bg-ink">
      <div className="border-b border-line bg-ink-soft">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-display text-lg">Admin</span>
            <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring text-paper/70 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="focus-ring text-paper/60 hover:text-accent">
              View site ↗
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="focus-ring rounded-full border border-line px-4 py-2 text-xs text-paper/80 transition-colors hover:border-accent hover:text-accent"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">{children}</main>
    </div>
  );
}
