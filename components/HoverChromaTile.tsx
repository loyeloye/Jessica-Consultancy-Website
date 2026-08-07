"use client";

import Image from "next/image";

type Props = {
  label: string;
  sublabel?: string;
  src?: string;
  gradient?: string;
  className?: string;
  aspect?: string;
};

/**
 * Campaign / portfolio tile: grayscale at rest, full color + slight zoom on
 * hover/focus. Pass `src` once real campaign photography is available —
 * until then it renders a labeled gradient plate so the layout and
 * interaction are real, not decorative.
 */
export function HoverChromaTile({
  label,
  sublabel,
  src,
  gradient = "from-neutral-700 via-neutral-500 to-neutral-800",
  className = "",
  aspect = "aspect-[4/5]",
}: Props) {
  return (
    <div
      tabIndex={src ? undefined : 0}
      className={`focus-ring group relative ${aspect} w-full overflow-hidden rounded-sm bg-ink-soft ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-focus-visible:grayscale-0 group-hover:scale-[1.04]"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} grain opacity-70 saturate-0 transition-all duration-500 ease-out group-hover:saturate-100 group-hover:opacity-100 group-focus-visible:saturate-100 group-hover:scale-[1.04]`}
        />
      )}
      {/* Caption scrim is fixed dark-on-light regardless of site theme — it sits over
          photography/placeholder plates, which stay dark independent of the palette. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-display text-lg text-[#f7f1e6]">{label}</p>
        {sublabel && <p className="mt-1 text-xs uppercase tracking-wider text-[#f7f1e6]/60">{sublabel}</p>}
      </div>
    </div>
  );
}
