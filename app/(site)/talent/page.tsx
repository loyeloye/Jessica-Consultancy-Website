import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { RegistrationTabs } from "@/components/forms/RegistrationTabs";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Talent & Creative Registration — ${siteConfig.name}`,
  description: siteConfig.metaDescription,
};

export default function TalentPage() {
  return (
    <section className="border-b border-line bg-ink py-20 sm:py-24 lg:py-28">
      <Container className="max-w-2xl">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">Registration</p>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl">
          Join Summer Et Al&apos;s network.
        </h1>

        <div className="mt-12">
          <RegistrationTabs />
        </div>
      </Container>
    </section>
  );
}
