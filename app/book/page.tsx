import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { BookForm } from "@/components/forms/BookForm";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Book ${siteConfig.name}`,
  description: siteConfig.metaDescription,
};

export default function BookPage() {
  return (
    <section className="border-b border-line bg-ink py-20 sm:py-28">
      <Container className="max-w-2xl">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">Book Jessica</p>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl">
          Tell Jessica about your project.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-paper/70">
          Whether it&apos;s full production coordination, a talent booking, creative
          direction, or a strategic consulting conversation — share the details below
          and Jessica will follow up directly.
        </p>

        <div className="mt-12">
          <Suspense fallback={null}>
            <BookForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
