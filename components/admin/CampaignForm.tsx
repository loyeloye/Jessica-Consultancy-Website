"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveCampaign, type ActionResult } from "@/app/admin/actions";
import { btnGhost, btnPrimary, fieldClass, labelClass } from "@/components/admin/ui";
import type { Campaign } from "@/lib/content";

type Props = { campaign?: Campaign & { id?: string; sortOrder?: number; published?: boolean } };

/** Parallel-line editor: one item per line, matched up by position. */
function LineField({
  id,
  name,
  label,
  hint,
  defaultValue,
  rows = 5,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className={`${fieldClass} font-mono text-[13px]`}
      />
      {hint && <p className="mt-1.5 text-xs text-paper/40">{hint}</p>}
    </div>
  );
}

export function CampaignForm({ campaign }: Props) {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    saveCampaign,
    null
  );

  const gallery = campaign?.gallery ?? [];
  const facts = campaign?.facts ?? [];

  return (
    <form action={formAction} className="space-y-8">
      {campaign?.id && <input type="hidden" name="id" value={campaign.id} />}

      {state?.message && (
        <div
          role="alert"
          className="rounded-sm border border-red-600/40 bg-red-600/10 p-4 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="client" className={labelClass}>
            Client
          </label>
          <input
            id="client"
            name="client"
            required
            defaultValue={campaign?.client}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={campaign?.slug}
            placeholder="Filled in from the client name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <input
            id="category"
            name="category"
            defaultValue={campaign?.category}
            placeholder="International Commercial Campaign"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="role" className={labelClass}>
            Role
          </label>
          <input
            id="role"
            name="role"
            defaultValue={campaign?.role}
            placeholder="Talent Booker"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className={labelClass}>
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={3}
          defaultValue={campaign?.summary}
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="hero_image" className={labelClass}>
            Hero image URL
          </label>
          <input
            id="hero_image"
            name="hero_image"
            defaultValue={campaign?.image?.src}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="hero_alt" className={labelClass}>
            Hero alt text
          </label>
          <input
            id="hero_alt"
            name="hero_alt"
            defaultValue={campaign?.image?.alt}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <LineField
          id="gallery_src"
          name="gallery_src"
          label="Gallery image URLs"
          hint="One URL per line."
          defaultValue={gallery.map((g) => g.src).join("\n")}
        />
        <LineField
          id="gallery_alt"
          name="gallery_alt"
          label="Gallery alt text"
          hint="One per line, matching the URLs on the left."
          defaultValue={gallery.map((g) => g.alt).join("\n")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <LineField
          id="scope"
          name="scope"
          label="Scope"
          hint="One item per line."
          defaultValue={campaign?.scope?.join("\n")}
        />
        <LineField
          id="deliverables"
          name="deliverables"
          label="Deliverables"
          hint="One item per line."
          defaultValue={campaign?.deliverables?.join("\n")}
        />
        <LineField
          id="stakeholders"
          name="stakeholders"
          label="Stakeholders"
          hint="One item per line."
          defaultValue={campaign?.stakeholders?.join("\n")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <LineField
          id="fact_labels"
          name="fact_labels"
          label="Fact labels"
          hint='e.g. "Talent managed"'
          rows={4}
          defaultValue={facts.map((f) => f.label).join("\n")}
        />
        <LineField
          id="fact_values"
          name="fact_values"
          label="Fact values"
          hint="One per line, matching the labels."
          rows={4}
          defaultValue={facts.map((f) => f.value).join("\n")}
        />
        <LineField
          id="objectives"
          name="objectives"
          label="Creative objectives"
          hint="Optional. One per line."
          rows={4}
          defaultValue={campaign?.objectives?.join("\n")}
        />
      </div>

      <div>
        <label htmlFor="outcome" className={labelClass}>
          Outcome
        </label>
        <textarea
          id="outcome"
          name="outcome"
          rows={4}
          defaultValue={campaign?.outcome}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-wrap items-end gap-6">
        <div>
          <label htmlFor="sort_order" className={labelClass}>
            Order
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={campaign?.sortOrder ?? 0}
            className={`${fieldClass} w-28`}
          />
        </div>
        <label className="flex items-center gap-3 pb-3 text-sm text-paper/80">
          <input
            type="checkbox"
            name="published"
            defaultChecked={campaign?.published ?? true}
            className="focus-ring h-4 w-4 rounded border-line bg-ink accent-[var(--color-accent)]"
          />
          Visible on the site
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={pending} className={btnPrimary}>
          {pending ? "Saving..." : "Save campaign"}
        </button>
        <Link href="/admin/campaigns" className={btnGhost}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
