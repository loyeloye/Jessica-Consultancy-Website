"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Fades + lifts its children into place the first time they scroll into
 * view. Reduced-motion users (and anything rendered server-side before
 * hydration) just get the content, no animation.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: reduced ? undefined : `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
