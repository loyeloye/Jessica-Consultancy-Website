import Link from "next/link";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl text-paper">{siteConfig.name}</p>
            <p className="mt-2 max-w-xs text-sm text-paper/60">{siteConfig.tagline}</p>
          </div>

          <div className="text-sm">
            <p className="mb-3 uppercase tracking-wider text-paper/40">Contact</p>
            <ul className="space-y-2 text-paper/80">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="focus-ring hover:text-accent">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneHref}`} className="focus-ring hover:text-accent">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
              <li className="text-paper/50">{siteConfig.location}</li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="mb-3 uppercase tracking-wider text-paper/40">Explore</p>
            <ul className="space-y-2 text-paper/80">
              <li>
                <Link href="/services" className="focus-ring hover:text-accent">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="focus-ring hover:text-accent">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/book" className="focus-ring hover:text-accent">
                  Book Jessica
                </Link>
              </li>
              <li>
                <Link href="/talent" className="focus-ring hover:text-accent">
                  Register as Talent
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</p>
          <p>Dubai, UAE</p>
        </div>
      </div>
    </footer>
  );
}
