"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Small always-visible booking CTA for mobile, where the header's CTA is
 * tucked inside the hamburger menu once scrolled. Hidden on /book itself —
 * no point pointing at the page you're already on.
 */
export function StickyMobileCTA({ name }: { name: string }) {
  const pathname = usePathname();
  if (pathname === "/book") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 px-5 py-3 backdrop-blur md:hidden">
      <Link
        href="/book"
        className="focus-ring flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
      >
        Book {name}
      </Link>
    </div>
  );
}
