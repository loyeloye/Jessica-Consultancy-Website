"use client";

import { useActionState } from "react";
import { saveSettings, type ActionResult } from "@/app/admin/actions";
import { btnPrimary, fieldClass, labelClass } from "@/components/admin/ui";
import type { SiteSettings } from "@/lib/content";

function Text({
  id,
  label,
  defaultValue,
  hint,
}: {
  id: keyof SiteSettings | string;
  label: string;
  defaultValue?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={String(id)} className={labelClass}>
        {label}
      </label>
      <input id={String(id)} name={String(id)} defaultValue={defaultValue} className={fieldClass} />
      {hint && <p className="mt-1.5 text-xs text-paper/40">{hint}</p>}
    </div>
  );
}

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    saveSettings,
    null
  );

  return (
    <form action={formAction} className="space-y-10">
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

      <section>
        <h2 className="font-display mb-5 text-xl">Identity</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Text
            id="name"
            label="Brand name"
            defaultValue={settings.name}
            hint="Shown in the header, footer, and page titles."
          />
          <Text id="tagline" label="Tagline" defaultValue={settings.tagline} />
        </div>
        <div className="mt-5">
          <label htmlFor="metaDescription" className={labelClass}>
            Search description
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            rows={2}
            defaultValue={settings.metaDescription}
            className={fieldClass}
          />
        </div>
      </section>

      <section>
        <h2 className="font-display mb-5 text-xl">Homepage</h2>
        <div className="space-y-5">
          <div>
            <label htmlFor="heroHeadline" className={labelClass}>
              Hero headline
            </label>
            <textarea
              id="heroHeadline"
              name="heroHeadline"
              rows={2}
              defaultValue={settings.heroHeadline}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="heroSubhead" className={labelClass}>
              Hero paragraph
            </label>
            <textarea
              id="heroSubhead"
              name="heroSubhead"
              rows={3}
              defaultValue={settings.heroSubhead}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="credibilityLine" className={labelClass}>
              Pull quote
            </label>
            <textarea
              id="credibilityLine"
              name="credibilityLine"
              rows={3}
              defaultValue={settings.credibilityLine}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="stat_values" className={labelClass}>
              Stat figures
            </label>
            <textarea
              id="stat_values"
              name="stat_values"
              rows={4}
              defaultValue={settings.stats.map((s) => s.value).join("\n")}
              className={`${fieldClass} font-mono text-[13px]`}
            />
            <p className="mt-1.5 text-xs text-paper/40">One per line, e.g. &ldquo;75+&rdquo;.</p>
          </div>
          <div>
            <label htmlFor="stat_labels" className={labelClass}>
              Stat labels
            </label>
            <textarea
              id="stat_labels"
              name="stat_labels"
              rows={4}
              defaultValue={settings.stats.map((s) => s.label).join("\n")}
              className={`${fieldClass} font-mono text-[13px]`}
            />
            <p className="mt-1.5 text-xs text-paper/40">
              One per line, matching the figures on the left.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display mb-5 text-xl">Contact</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Text id="email" label="Email" defaultValue={settings.email} />
          <Text id="phone" label="Phone (displayed)" defaultValue={settings.phone} />
          <Text
            id="phoneHref"
            label="Phone (dial format)"
            defaultValue={settings.phoneHref}
            hint="Digits and + only, e.g. +971588979350."
          />
          <Text id="linkedin" label="LinkedIn URL" defaultValue={settings.linkedin} />
          <Text id="location" label="Location" defaultValue={settings.location} />
        </div>
      </section>

      <button type="submit" disabled={pending} className={btnPrimary}>
        {pending ? "Saving..." : "Save settings"}
      </button>
    </form>
  );
}
