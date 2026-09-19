import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-ink px-5 py-28 text-center text-paper">
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">404</p>
      <h1 className="font-display text-4xl leading-tight sm:text-5xl">
        This page wandered off set.
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-paper/70">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="focus-ring mt-10 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
      >
        Go home
      </Link>
    </div>
  );
}
