type IconName = "clapperboard" | "users" | "sparkles" | "trending-up" | "package" | "handshake";

const paths: Record<IconName, React.ReactNode> = {
  clapperboard: (
    <>
      <path d="M3 8.5 4.5 5h15L21 8.5" />
      <path d="m6 5 1.5 3.5" />
      <path d="m11 5 1.5 3.5" />
      <path d="m16 5 1.5 3.5" />
      <rect x="3" y="8.5" width="18" height="10.5" rx="1" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 14.2c2.4.4 4.5 2.6 4.5 5.8" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </>
  ),
  "trending-up": (
    <>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  package: (
    <>
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
      <path d="m3 8 9 5 9-5" />
      <path d="M12 13v8" />
    </>
  ),
  handshake: (
    <>
      <path d="M2 12.5 6 9l3.5 3-1.2 1.2a1.7 1.7 0 0 0 2.4 2.4L15 11.3 22 12.5" />
      <path d="M9.5 12 13 8.5a2 2 0 0 1 2.8 0L18 10.7" />
      <path d="m2 12.5 3 4.5 2-1" />
      <path d="m22 12.5-3 4.5-2.2-1.3" />
    </>
  ),
};

export function ServiceIcon({ name, className = "" }: { name: IconName; className?: string }) {
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
      {paths[name]}
    </svg>
  );
}
