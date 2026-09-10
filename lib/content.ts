import { getPublicSupabase } from "@/lib/supabase/public";
import {
  campaigns as staticCampaigns,
  highlights as staticHighlights,
  heroCredibilityLine as staticCredibility,
  siteConfig as staticSiteConfig,
  stats as staticStats,
  type Campaign,
  type SiteImage,
} from "@/content/site";

export type { Campaign, SiteImage };

export type Stat = { value: string; label: string };

export type SiteSettings = {
  name: string;
  tagline: string;
  metaDescription: string;
  email: string;
  phone: string;
  phoneHref: string;
  linkedin: string;
  location: string;
  heroHeadline: string;
  heroSubhead: string;
  credibilityLine: string;
  stats: Stat[];
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  coverImage: string | null;
  coverAlt: string | null;
  status: "draft" | "published";
  publishedAt: string | null;
  updatedAt: string | null;
};

export const DEFAULT_HERO_HEADLINE =
  "Coordinating the shoots behind the campaigns you remember.";
export const DEFAULT_HERO_SUBHEAD =
  "Summer Et Al plans and runs commercial, fashion, and editorial shoots from first call sheet to final delivery — and books the right talent to bring them to life.";

export const defaultSettings: SiteSettings = {
  name: staticSiteConfig.name,
  tagline: staticSiteConfig.tagline,
  metaDescription: staticSiteConfig.metaDescription,
  email: staticSiteConfig.email,
  phone: staticSiteConfig.phone,
  phoneHref: staticSiteConfig.phoneHref,
  linkedin: staticSiteConfig.linkedin,
  location: staticSiteConfig.location,
  heroHeadline: DEFAULT_HERO_HEADLINE,
  heroSubhead: DEFAULT_HERO_SUBHEAD,
  credibilityLine: staticCredibility,
  stats: staticStats,
};

/** Site copy: DB values layered over the static defaults. */
export async function getSettings(): Promise<SiteSettings> {
  const supabase = getPublicSupabase();
  if (!supabase) return defaultSettings;

  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "site")
    .maybeSingle();

  if (error || !data?.value) return defaultSettings;
  return { ...defaultSettings, ...(data.value as Partial<SiteSettings>) };
}

type CampaignRow = {
  slug: string;
  client: string;
  category: string | null;
  role: string | null;
  summary: string | null;
  hero_image: string | null;
  hero_alt: string | null;
  scope: string[] | null;
  deliverables: string[] | null;
  stakeholders: string[] | null;
  objectives: string[] | null;
  facts: { label: string; value: string }[] | null;
  gallery: SiteImage[] | null;
  outcome: string | null;
};

export async function getCampaigns(): Promise<Campaign[]> {
  const supabase = getPublicSupabase();
  if (!supabase) return staticCampaigns;

  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) return staticCampaigns;

  return (data as CampaignRow[]).map((r) => ({
    slug: r.slug,
    client: r.client,
    category: r.category ?? "",
    role: r.role ?? "",
    summary: r.summary ?? "",
    image: { src: r.hero_image ?? "", alt: r.hero_alt ?? r.client },
    gallery: r.gallery ?? [],
    scope: r.scope ?? [],
    deliverables: r.deliverables ?? [],
    stakeholders: r.stakeholders ?? [],
    objectives: r.objectives?.length ? r.objectives : undefined,
    facts: r.facts?.length ? r.facts : undefined,
    outcome: r.outcome ?? "",
  }));
}

export async function getHighlights(): Promise<SiteImage[]> {
  const supabase = getPublicSupabase();
  if (!supabase) return staticHighlights;

  const { data, error } = await supabase
    .from("highlights")
    .select("src, alt")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) return staticHighlights;
  return data.map((r) => ({ src: r.src, alt: r.alt ?? "" }));
}

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  cover_image: string | null;
  cover_alt: string | null;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string | null;
};

function toPost(r: PostRow): Post {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    body: r.body ?? "",
    coverImage: r.cover_image,
    coverAlt: r.cover_alt,
    status: r.status,
    publishedAt: r.published_at,
    updatedAt: r.updated_at,
  };
}

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = getPublicSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error || !data) return [];
  return (data as PostRow[]).map(toPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = getPublicSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return toPost(data as PostRow);
}

/** True when the blog has at least one published post (drives nav visibility). */
export async function hasPublishedPosts(): Promise<boolean> {
  const supabase = getPublicSupabase();
  if (!supabase) return false;

  const { count, error } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("status", "published");

  return !error && (count ?? 0) > 0;
}
