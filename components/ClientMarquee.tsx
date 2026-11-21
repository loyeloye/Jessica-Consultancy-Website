import Image from "next/image";

export type MarqueeClient = { name: string; logo?: { src: string; width: number; height: number } };

/**
 * Static row of client names/logos. Was an auto-scrolling marquee, but with
 * only a handful of clients the loop looked unbalanced — a centered,
 * evenly-spaced row reads cleaner until there are enough entries to
 * justify motion again (bring back .animate-marquee from globals.css
 * on the wrapper below when that day comes).
 *
 * A client renders as its logo once one is supplied; until then it falls
 * back to a typographic wordmark so the row never has to wait on assets.
 */
export function ClientMarquee({ clients }: { clients: MarqueeClient[] }) {
  return (
    <div className="border-b border-line bg-ink-soft py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-5 sm:px-8">
        {clients.map((client) =>
          client.logo ? (
            <Image
              key={client.name}
              src={client.logo.src}
              alt={client.name}
              width={client.logo.width}
              height={client.logo.height}
              className="h-7 w-auto object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-8"
            />
          ) : (
            <span
              key={client.name}
              className="font-display text-xl tracking-wide text-accent sm:text-2xl"
            >
              {client.name}
            </span>
          )
        )}
      </div>
    </div>
  );
}
