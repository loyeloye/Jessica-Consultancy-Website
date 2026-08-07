import Link from "next/link";

export function AdminHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-sm text-paper/60">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-sm border border-line bg-ink-soft p-6 ${className}`}>{children}</div>
  );
}

export function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string | number;
  href?: string;
}) {
  const body = (
    <>
      <p className="font-display text-3xl text-accent">{value}</p>
      <p className="mt-1 text-sm text-paper/60">{label}</p>
    </>
  );
  return href ? (
    <Link
      href={href}
      className="focus-ring block rounded-sm border border-line bg-ink-soft p-6 transition-colors hover:border-accent/50"
    >
      {body}
    </Link>
  ) : (
    <Card>{body}</Card>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-dashed border-line p-10 text-center text-sm text-paper/50">
      {children}
    </div>
  );
}

export function Pill({ tone, children }: { tone: "on" | "off"; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs ${
        tone === "on" ? "bg-accent/15 text-accent" : "bg-paper/10 text-paper/60"
      }`}
    >
      {children}
    </span>
  );
}

export const btnPrimary =
  "focus-ring inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60";

export const btnGhost =
  "focus-ring inline-flex items-center rounded-full border border-line px-4 py-2 text-sm text-paper/80 transition-colors hover:border-accent hover:text-accent";

export const btnDanger =
  "focus-ring inline-flex items-center rounded-full border border-red-600/40 px-4 py-2 text-sm text-red-700 transition-colors hover:bg-red-600/10";

export const labelClass = "mb-2 block text-sm font-medium text-paper/85";

export const fieldClass =
  "focus-ring w-full rounded-sm border border-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-paper/35 transition-colors focus:border-accent";
