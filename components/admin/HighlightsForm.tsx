"use client";

import { useActionState } from "react";
import { saveHighlights, type ActionResult } from "@/app/admin/actions";
import { btnPrimary, fieldClass, labelClass } from "@/components/admin/ui";
import type { SiteImage } from "@/lib/content";

export function HighlightsForm({ highlights }: { highlights: SiteImage[] }) {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    saveHighlights,
    null
  );

  return (
    <form action={formAction} className="space-y-5">
      {state?.message && (
        <div
          role="status"
          className={`rounded-sm border p-4 text-sm ${
            state.ok
              ? "border-accent/40 bg-accent/10 text-paper"
              : "border-red-600/40 bg-red-600/10 text-red-700"
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="highlight_src" className={labelClass}>
            Image URLs
          </label>
          <textarea
            id="highlight_src"
            name="highlight_src"
            rows={10}
            defaultValue={highlights.map((h) => h.src).join("\n")}
            className={`${fieldClass} font-mono text-[13px]`}
          />
          <p className="mt-1.5 text-xs text-paper/40">
            One per line. The order here is the order on the page.
          </p>
        </div>
        <div>
          <label htmlFor="highlight_alt" className={labelClass}>
            Alt text
          </label>
          <textarea
            id="highlight_alt"
            name="highlight_alt"
            rows={10}
            defaultValue={highlights.map((h) => h.alt).join("\n")}
            className={`${fieldClass} font-mono text-[13px]`}
          />
          <p className="mt-1.5 text-xs text-paper/40">
            One per line, matching the URLs on the left.
          </p>
        </div>
      </div>

      <button type="submit" disabled={pending} className={btnPrimary}>
        {pending ? "Saving..." : "Save highlights grid"}
      </button>
    </form>
  );
}
