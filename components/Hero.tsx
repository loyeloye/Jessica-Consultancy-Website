"use client";

import { Fragment, useRef, useState } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Hero({
  eyebrow,
  headline,
  subhead,
}: {
  eyebrow: string;
  headline: string;
  subhead: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  const words = headline.split(" ");

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="grain relative overflow-hidden border-b border-line bg-ink"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-32 opacity-60 transition-transform duration-300 ease-out"
        style={{
          background: "radial-gradient(closest-side, rgba(47,143,138,0.20), transparent 70%)",
          transform: reduced ? undefined : `translate(${tilt.x * 60}px, ${tilt.y * 60}px)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-32 opacity-40 transition-transform duration-500 ease-out"
        style={{
          background: "radial-gradient(closest-side, rgba(58,42,28,0.10), transparent 65%)",
          transform: reduced ? undefined : `translate(${tilt.x * -40}px, ${tilt.y * -40}px)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
        <p className="mb-6 text-xs uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h1 className="animate-settle font-display max-w-4xl text-4xl leading-[1.08] sm:text-6xl">
          {words.map((word, i) => (
            // The space is a sibling text node, not part of the span's own
            // content — a trailing space inside an inline-block collapses
            // in most browsers, which is what was smushing words together.
            <Fragment key={i}>
              <span className="inline-block" style={{ animationDelay: `${i * 60}ms` }}>
                {word}
              </span>
              {i < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">
          {subhead}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton href="/book">Book a Production</MagneticButton>
          <MagneticButton href="/talent" variant="outline">
            Register — Talent / Creative
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
