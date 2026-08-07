import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { MagneticButton } from "@/components/MagneticButton";
import { getPostBySlug, getPublishedPosts, getSettings } from "@/lib/content";
import { excerptFrom, renderMarkdown } from "@/lib/markdown";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSettings()]);
  if (!post) return { title: "Not found" };

  const description = post.excerpt || excerptFrom(post.body);
  return {
    title: `${post.title} — ${settings.name}`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.body);
  const published = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <article>
        <section className="grain border-b border-line bg-ink py-20 sm:py-28">
          <Container className="max-w-3xl">
            <Link
              href="/blog"
              className="focus-ring text-xs uppercase tracking-[0.25em] text-accent hover:underline"
            >
              ← Journal
            </Link>
            <h1 className="font-display mt-5 text-4xl leading-tight sm:text-5xl">
              {post.title}
            </h1>
            {published && (
              <p className="mt-5 text-sm uppercase tracking-wider text-paper/45">{published}</p>
            )}
          </Container>
        </section>

        {post.coverImage && (
          <div className="bg-ink-soft">
            <Container className="max-w-4xl py-10">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-ink">
                <Image
                  src={post.coverImage}
                  alt={post.coverAlt || ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  className="object-cover"
                  unoptimized
                />
              </div>
            </Container>
          </div>
        )}

        <section className="bg-ink-soft pb-20 pt-6 sm:pb-28">
          <Container className="max-w-2xl">
            <div className="prose-post" dangerouslySetInnerHTML={{ __html: html }} />
          </Container>
        </section>
      </article>

      <section className="border-t border-line bg-ink py-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl">Have a shoot in the works?</h2>
          <MagneticButton href="/book">Book a Production</MagneticButton>
        </Container>
      </section>
    </>
  );
}
