/**
 * Slow, seamless auto-scrolling strip of client names. The list is
 * rendered twice back-to-back and the whole track is animated exactly
 * -50% (one copy's width), so the loop point is invisible.
 */
export function ClientMarquee({ clients }: { clients: string[] }) {
  const track = [...clients, ...clients];

  return (
    <div className="overflow-hidden border-b border-line bg-ink-soft py-6" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-16">
        {track.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display shrink-0 text-lg text-paper/35 sm:text-xl"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
