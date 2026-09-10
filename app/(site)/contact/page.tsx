import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: `Contact — ${settings.name}`,
    description: settings.metaDescription,
  };
}

export default async function ContactPage() {
  const siteConfig = await getSettings();

  return (
    <section className="border-b border-line bg-ink py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-14 min-[700px]:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">Contact</p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">Get in touch.</h1>
          <p className="mt-6 text-base leading-relaxed text-paper/70">
            For bookings and talent registration, use the dedicated forms — for
            everything else, reach out directly or send a general message.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="uppercase tracking-wider text-paper/40">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${siteConfig.email}`} className="focus-ring text-lg text-paper hover:text-accent">
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider text-paper/40">Phone / WhatsApp</dt>
              <dd className="mt-1">
                <a href={`tel:${siteConfig.phoneHref}`} className="focus-ring text-lg text-paper hover:text-accent">
                  {siteConfig.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider text-paper/40">LinkedIn</dt>
              <dd className="mt-1">
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring text-lg text-paper hover:text-accent"
                >
                  jessica-chukwu
                </a>
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider text-paper/40">Based in</dt>
              <dd className="mt-1 text-lg text-paper">{siteConfig.location}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-sm border border-line bg-ink-soft p-6 sm:p-8">
          <h2 className="font-display text-xl">General inquiry</h2>
          <p className="mt-2 text-sm text-paper/60">
            Not a booking or a talent submission? Send a general message here.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
