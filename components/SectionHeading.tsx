export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className={`mb-3 text-xs uppercase tracking-[0.2em] ${light ? "text-ink/50" : "text-accent"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl ${light ? "text-ink" : "text-paper"}`}>{title}</h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-ink/70" : "text-paper/70"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
