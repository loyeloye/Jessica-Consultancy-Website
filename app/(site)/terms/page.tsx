import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Terms of Service — ${siteConfig.name}`,
  description: `The terms that apply to using the ${siteConfig.name} website and booking our services.`,
};

export default function TermsPage() {
  return (
    <section className="border-b border-line bg-ink py-20 sm:py-24 lg:py-28">
      <Container className="max-w-2xl">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">Terms of Service</p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-paper/50">Last updated: {new Date().getFullYear()}</p>
        </Reveal>

        <div className="prose-post mt-10">
          <p>
            These terms apply to your use of the {siteConfig.name} website and any booking,
            talent registration, or consulting inquiry you submit through it. By using this
            site, you agree to the terms below.
          </p>

          <h2>Bookings and inquiries</h2>
          <p>
            Submitting a booking, talent registration, or consulting inquiry does not itself
            create a contract. Project scope, deliverables, timelines, and fees are agreed
            separately once we&apos;ve discussed your requirements directly.
          </p>

          <h2>Talent and creative submissions</h2>
          <p>
            By registering as talent or a creative, you confirm that the details and photographs
            you submit are accurate and that you have the right to share them with us. Submitting
            a registration doesn&apos;t guarantee a booking — we&apos;ll reach out if there&apos;s
            a fit for an upcoming production.
          </p>

          <h2>Website content</h2>
          <p>
            All text, imagery, and campaign case studies on this site belong to {siteConfig.name}
            {" "}or the respective clients and photographers credited, and may not be reproduced
            without permission.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            This website and its content are provided as-is. While we take care to keep
            information accurate and up to date, {siteConfig.name} isn&apos;t liable for any
            loss arising from your use of this site.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the United Arab Emirates.</p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
