import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MagneticButton } from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="border-b border-line bg-ink py-28 sm:py-36">
      <Container className="max-w-xl text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">404</p>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl">
          This page wandered off set.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-paper/70">
          The page you're looking for doesn't exist or may have moved. Head back to the
          homepage, or explore the work and services below.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/">Go home</MagneticButton>
          <MagneticButton href="/work" variant="outline">
            View work
          </MagneticButton>
        </div>
      </Container>
    </section>
  );
}
