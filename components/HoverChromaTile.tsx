import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  label?: string;
  sublabel?: string;
  className?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Campaign / portfolio tile: grayscale at rest, full colour + slight zoom on
 * hover. When the tile is wrapped in a link, put `group` on that link too so
 * the reveal also fires on keyboard focus — the tile itself is never made
 * focusable, since a focusable element with no action is an a11y trap.
 *
 * Touch devices (iPad, iPhone) never fire `:hover` at all, so the effect
 * would otherwise leave every image stuck in grayscale with no way to see
 * it in colour. `[@media(hover:none)]:grayscale-0` renders those devices
 * straight into the "revealed" end state instead.
 */
export function HoverChromaTile({
  src,
  alt,
  label,
  sublabel,
  className = "",
  aspect = "aspect-[4/5]",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
}: Props) {
  return (
    <div
      className={`group relative ${aspect} w-full overflow-hidden rounded-sm bg-ink-soft ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover grayscale transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:grayscale-0 group-focus-visible:grayscale-0 [@media(hover:none)]:grayscale-0"
        />
      ) : (
        // A campaign saved without a hero image yet — keep the layout intact
        // rather than crashing on an empty next/image src.
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-600 to-neutral-800"
        />
      )}
      {label && (
        <>
          {/* Scrim and caption sit over photography, so they stay light-on-dark
              regardless of the site palette. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-display text-lg text-[#f7f1e6]">{label}</p>
            {sublabel && (
              <p className="mt-1 text-xs uppercase tracking-wider text-[#f7f1e6]/70">{sublabel}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
