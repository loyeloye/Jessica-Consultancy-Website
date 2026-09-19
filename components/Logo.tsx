/**
 * A small sun mark for Summer Et Al — one circle, eight rays, drawn in the
 * same thin single-weight line style as ServiceIcon so it reads as part of
 * the same system rather than a bolted-on logo.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2.75v2.75M12 18.5v2.75M2.75 12h2.75M18.5 12h2.75" />
      <path d="M5.64 5.64l1.95 1.95M16.41 16.41l1.95 1.95M18.36 5.64l-1.95 1.95M7.59 16.41l-1.95 1.95" />
    </svg>
  );
}
