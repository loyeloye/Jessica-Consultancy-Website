import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${siteConfig.name}`,
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <section className="border-b border-line bg-ink py-20 sm:py-24 lg:py-28">
      <Container className="max-w-2xl">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">Privacy Policy</p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-paper/50">Last updated: {new Date().getFullYear()}</p>
        </Reveal>

        <div className="prose-post mt-10">
          <p>
            {siteConfig.name} ("we", "us", "our") is a Dubai-based production coordination,
            talent booking, creative direction, and consulting studio. This page explains what
            information we collect through {siteConfig.name} and how it&apos;s used.
          </p>

          <h2>Information we collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>
              Contact details (name, email, phone) submitted through the booking, contact, and
              registration forms.
            </li>
            <li>
              Project details you share when requesting a production, talent booking, or
              consulting inquiry.
            </li>
            <li>
              For talent and creative registrations: measurements, portfolio links, and
              photographs you choose to submit.
            </li>
          </ul>

          <h2>How we use it</h2>
          <p>We use the information you provide to:</p>
          <ul>
            <li>Respond to inquiries and follow up on bookings and registrations.</li>
            <li>Consider talent and creatives for relevant production opportunities.</li>
            <li>Improve our services and this website.</li>
          </ul>
          <p>We don&apos;t sell your personal information to third parties.</p>

          <h2>Where it&apos;s stored</h2>
          <p>
            Submissions are stored securely with Supabase, our database and file storage
            provider, and are only accessible to {siteConfig.name}. This website is hosted on
            Vercel, and page-visit analytics are collected through Vercel Analytics, which does
            not use cookies or track you across other sites.
          </p>

          <h2>Your rights</h2>
          <p>
            You can request access to, correction of, or deletion of the information you&apos;ve
            submitted to us at any time by emailing{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
