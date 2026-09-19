"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HoverChromaTile } from "@/components/HoverChromaTile";
import { Reveal } from "@/components/Reveal";
import type { SiteImage } from "@/content/site";

export function ArchiveGallery({ images }: { images: SiteImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null;

  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, images.length]);

  return (
    <>
      <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4">
        {images.map((img, i) => (
          <Reveal key={img.src} delay={(i % 4) * 80} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="focus-ring block w-full"
              aria-label={`View ${img.alt || "archive photo"} larger`}
            >
              <HoverChromaTile src={img.src} alt={img.alt} fill={false} showCursorLabel />
            </button>
          </Reveal>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-soft/0 p-5"
          style={{ backgroundColor: "rgba(15, 11, 7, 0.92)" }}
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="focus-ring absolute right-5 top-5 text-3xl leading-none text-paper/70 hover:text-paper"
          >
            &times;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
            }}
            aria-label="Previous photo"
            className="focus-ring absolute left-3 top-1/2 -translate-y-1/2 p-3 text-3xl text-paper/70 hover:text-paper sm:left-6"
          >
            &larr;
          </button>
          <div
            className="relative max-h-[85vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              width={1400}
              height={1750}
              className="max-h-[85vh] w-auto rounded-sm object-contain"
              sizes="90vw"
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
            }}
            aria-label="Next photo"
            className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 p-3 text-3xl text-paper/70 hover:text-paper sm:right-6"
          >
            &rarr;
          </button>
        </div>
      )}
    </>
  );
}
