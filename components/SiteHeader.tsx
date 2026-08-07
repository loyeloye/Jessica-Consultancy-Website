"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/content/site";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="focus-ring font-display text-xl tracking-tight text-paper">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`focus-ring text-sm tracking-wide transition-colors hover:text-gold ${
                pathname === link.href ? "text-gold" : "text-paper/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/talent"
            className="focus-ring text-sm tracking-wide text-paper/80 transition-colors hover:text-gold"
          >
            Register as Talent
          </Link>
          <Link
            href="/book"
            className="focus-ring rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-gold-soft"
          >
            Book Jessica
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="focus-ring flex h-9 w-9 items-center justify-center text-paper md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`absolute left-0 top-2 h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`absolute left-0 top-4 h-px w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            {[...navLinks, { href: "/talent", label: "Register as Talent" }].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="focus-ring block rounded px-2 py-3 text-base text-paper/90 hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/book"
                className="focus-ring block rounded-full bg-gold px-5 py-3 text-center text-sm font-medium text-ink"
              >
                Book Jessica
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
