"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

export function MagneticButton({ href, children, variant = "solid", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.25, y: y * 0.25 });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const base =
    "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-200 will-change-transform";
  const solid = "bg-accent text-ink hover:bg-accent-soft";
  const outline = "border border-paper/30 text-paper hover:border-accent hover:text-accent";

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: reduced ? undefined : "transform 0.15s ease-out",
      }}
      className={`${base} ${variant === "solid" ? solid : outline} ${className}`}
    >
      {children}
    </Link>
  );
}
