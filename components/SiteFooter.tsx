import Link from "next/link";
import { siteConfig } from "@/content/site";
import type { SiteSettings } from "@/lib/content";

export function SiteFooter({
  settings,
  showBlog,
}: {
  settings: SiteSettings;
  showBlog: boolean;
}) {
  const explore = [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    ...(showBlog ? [{ href: "/blog", label: "Journal" }] : []),
    { href: "/book", label: `Book ${settings.name}` },
    { href: "/talent", label: "Register (Talent / Creative)" },
  ];

  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl text-paper">{settings.name}</p>
            <p className="mt-2 max-w-xs text-sm text-paper/60">{settings.tagline}</p>
          </div>

          <div className="text-sm">
            <p className="mb-3 uppercase tracking-wider text-paper/40">Contact</p>
            <ul className="space-y-2 text-paper/80">
              <li>
                <a href={`mailto:${settings.email}`} className="focus-ring hover:text-accent">
                  {settings.email}
                </a>
              </li>
              <li>
                <a href={`tel:${settings.phoneHref}`} className="focus-ring hover:text-accent">
                  {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-paper/50">{settings.location}</li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="mb-3 uppercase tracking-wider text-paper/40">Explore</p>
            <ul className="space-y-2 text-paper/80">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="focus-ring hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
          </p>
          <p>{settings.location}</p>
        </div>
      </div>
    </footer>
  );
}
