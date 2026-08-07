import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { getPublishedPosts, getSettings } from "@/lib/content";
import { excerptFrom } from "@/lib/markdown";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `Journal — ${settings.name}`,
    description: `Notes on production, casting, and creative direction from ${settings.name}.`,
  };
}

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <section className="grain border-b border-line bg-ink py-20 sm:py-28">
        <Container className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">Journal</p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">
            Notes from set and beyond.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-paper/75 sm:text-lg">
            Thoughts on production, casting, creative direction, and building a brand in the
            Dubai market.
          </p>
        </Container>
      </section>

      <section className="bg-ink-soft py-20 sm:py-28">
        <Container>
          {posts.length === 0 ? (
            <p className="text-base text-paper/60">
              No posts published yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="focus-ring group block"
                    aria-label={post.title}
                  >
                    {post.coverImage && (
                      <div className="relative mb-5 aspect-[3/2] w-full overflow-hidden rounded-sm bg-ink">
                        <Image
                          src={post.coverImage}
                          alt={post.coverAlt || ""}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover grayscale transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-visible:grayscale-0 [@media(hover:none)]:grayscale-0"
                          unoptimized
                        />
                      </div>
                    )}
                    {post.publishedAt && (
                      <p className="text-xs uppercase tracking-wider text-paper/45">
                        {formatDate(post.publishedAt)}
                      </p>
                    )}
                    <h2 className="font-display mt-2 text-xl leading-snug text-paper transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-paper/70">
                      {post.excerpt || excerptFrom(post.body)}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-accent">
                      Read
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
