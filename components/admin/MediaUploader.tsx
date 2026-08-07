"use client";

import { useActionState, useRef } from "react";
import { uploadMedia, type ActionResult } from "@/app/admin/actions";
import { btnPrimary, fieldClass, labelClass } from "@/components/admin/ui";

export function MediaUploader() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    async (prev, fd) => {
      const result = await uploadMedia(prev, fd);
      if (result.ok) formRef.current?.reset();
      return result;
    },
    null
  );

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <div>
          <label htmlFor="file" className={labelClass}>
            Image
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            className={`${fieldClass} file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-xs file:font-medium file:text-ink`}
          />
        </div>
        <div>
          <label htmlFor="alt" className={labelClass}>
            Alt text
          </label>
          <input
            id="alt"
            name="alt"
            placeholder="Describe the image"
            className={fieldClass}
          />
        </div>
        <button type="submit" disabled={pending} className={btnPrimary}>
          {pending ? "Uploading..." : "Upload"}
        </button>
      </div>
      <p className="text-xs text-paper/40">JPG, PNG, or WebP — up to 8MB.</p>
    </form>
  );
}
