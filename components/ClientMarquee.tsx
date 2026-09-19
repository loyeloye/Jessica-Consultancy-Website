/**
 * Static row of client names. Was an auto-scrolling marquee, but with
 * only a handful of clients the loop looked unbalanced — a centered,
 * evenly-spaced row reads cleaner until there are enough names to
 * justify motion again (bring back .animate-marquee from globals.css
 * on the wrapper below when that day comes).
 */
export function ClientMarquee({ clients }: { clients: string[] }) {
  return (
    <div className="border-b border-line bg-ink-soft py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-5 sm:px-8">
        {clients.map((name) => (
          <span key={name} className="font-display text-xl tracking-wide text-accent sm:text-2xl">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
