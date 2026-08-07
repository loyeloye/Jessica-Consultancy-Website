import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { TalentForm } from "@/components/forms/TalentForm";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Talent Registration — ${siteConfig.name}`,
  description: siteConfig.metaDescription,
};

export default function TalentPage() {
  return (
    <section className="border-b border-line bg-ink py-20 sm:py-28">
      <Container className="max-w-2xl">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">Talent Registration</p>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl">
          Join Jessica&apos;s talent roster.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-paper/70">
          Models, actors, presenters, and lifestyle talent — register below for
          consideration on upcoming commercial, fashion, and editorial bookings across
          the Middle East, Asia, and internationally.
        </p>

        <div className="mt-12">
          <TalentForm />
        </div>
      </Container>
    </section>
  );
}
