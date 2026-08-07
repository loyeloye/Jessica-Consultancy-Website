import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

/**
 * Renders post markdown to HTML.
 *
 * Only the authenticated admin can author posts, but the output is still
 * sanitised against an allowlist — a stored-XSS bug here would run on every
 * visitor's browser, and the cost of defending against it is near zero.
 */
export function renderMarkdown(md: string): string {
  const raw = marked.parse(md ?? "", { async: false }) as string;

  return sanitizeHtml(raw, {
    allowedTags: [
      "h2", "h3", "h4", "p", "a", "ul", "ol", "li", "blockquote",
      "strong", "em", "code", "pre", "img", "hr", "br", "figure", "figcaption",
      "table", "thead", "tbody", "tr", "th", "td",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "loading"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      // External links open safely.
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const external = /^https?:\/\//i.test(href);
        return {
          tagName,
          attribs: external
            ? { ...attribs, target: "_blank", rel: "noopener noreferrer" }
            : attribs,
        };
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: "lazy" },
      }),
    },
  });
}

/** First ~160 characters of body text, for meta descriptions and cards. */
export function excerptFrom(md: string, limit = 160): string {
  const text = (md ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length <= limit ? text : text.slice(0, limit).trimEnd() + "…";
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}
