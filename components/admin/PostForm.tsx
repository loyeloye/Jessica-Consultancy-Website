"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { savePost, type ActionResult } from "@/app/admin/actions";
import { btnGhost, btnPrimary, fieldClass, labelClass } from "@/components/admin/ui";
import type { Post } from "@/lib/content";
import { slugify } from "@/lib/markdown";

export function PostForm({ post }: { post?: Post }) {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    savePost,
    null
  );
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));

  const effectiveSlug = slugTouched ? slug : slugify(title);

  return (
    <form action={formAction} className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr]">
      {post?.id && <input type="hidden" name="id" value={post.id} />}
      {post?.publishedAt && (
        <input type="hidden" name="published_at" value={post.publishedAt} />
      )}

      <div className="space-y-5">
        {state?.message && (
          <div
            role="alert"
            className={`rounded-sm border p-4 text-sm ${
              state.ok
                ? "border-accent/40 bg-accent/10 text-paper"
                : "border-red-600/40 bg-red-600/10 text-red-700"
            }`}
          >
            {state.message}
          </div>
        )}

        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>
            URL
          </label>
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-sm text-paper/40">/blog/</span>
            <input
              id="slug"
              name="slug"
              value={effectiveSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              className={fieldClass}
            />
          </div>
          <p className="mt-1.5 text-xs text-paper/40">
            Filled in from the title. Changing it after publishing breaks existing links.
          </p>
        </div>

        <div>
          <label htmlFor="excerpt" className={labelClass}>
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            defaultValue={post?.excerpt ?? ""}
            placeholder="One or two lines shown on the blog index. Left blank, it's taken from the body."
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="body" className={labelClass}>
            Body
          </label>
          <textarea
            id="body"
            name="body"
            rows={22}
            defaultValue={post?.body ?? ""}
            placeholder={"Write in Markdown.\n\n## A heading\n\nA paragraph with **bold** and a [link](https://example.com).\n\n- A list item"}
            className={`${fieldClass} font-mono text-[13px] leading-relaxed`}
          />
          <p className="mt-1.5 text-xs text-paper/40">
            Markdown: <code>##</code> heading, <code>**bold**</code>, <code>*italic*</code>,{" "}
            <code>- list</code>, <code>[text](url)</code>.
          </p>
        </div>
      </div>

      <aside className="space-y-5">
        <div className="rounded-sm border border-line p-5">
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={post?.status ?? "draft"}
            className={fieldClass}
          >
            <option value="draft">Draft — only you can see it</option>
            <option value="published">Published — live on the site</option>
          </select>

          <div className="mt-5 flex flex-wrap gap-3">
            <button type="submit" disabled={pending} className={btnPrimary}>
              {pending ? "Saving..." : "Save"}
            </button>
            <Link href="/admin/posts" className={btnGhost}>
              Cancel
            </Link>
          </div>
        </div>

        <div className="rounded-sm border border-line p-5">
          <p className="mb-4 text-xs uppercase tracking-wider text-accent">Cover image</p>
          <label htmlFor="cover_image" className={labelClass}>
            Image URL
          </label>
          <input
            id="cover_image"
            name="cover_image"
            defaultValue={post?.coverImage ?? ""}
            placeholder="Paste from Media"
            className={fieldClass}
          />
          <label htmlFor="cover_alt" className={`${labelClass} mt-4`}>
            Alt text
          </label>
          <input
            id="cover_alt"
            name="cover_alt"
            defaultValue={post?.coverAlt ?? ""}
            placeholder="Describe the image"
            className={fieldClass}
          />
          <p className="mt-3 text-xs text-paper/40">
            Upload images under{" "}
            <Link href="/admin/media" className="text-accent underline underline-offset-2">
              Media
            </Link>
            , then copy the URL here.
          </p>
        </div>
      </aside>
    </form>
  );
}
