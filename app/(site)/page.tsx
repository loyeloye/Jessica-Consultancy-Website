import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { HoverChromaTile } from "@/components/HoverChromaTile";
import { MagneticButton } from "@/components/MagneticButton";
import { getCampaigns, getSettings } from "@/lib/content";
import { services } from "@/content/site";

export default async function Home() {
  const [settings, campaigns] = await Promise.all([getSettings(), getCampaigns()]);

  return (
    <>
      <Hero
        eyebrow={`${settings.location} · ${settings.tagline}`}
        headline={settings.heroHeadline}
        subhead={settings.heroSubhead}
      />

      <section className="border-b border-line bg-ink-soft">
        <Container className="grid grid-cols-1 gap-8 py-14 sm:grid-cols-3">
          {settings.stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-display text-4xl text-accent">{stat.value}</p>
              <p className="mt-2 text-sm text-paper/70">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Selected Work"
            title="Campaigns coordinated, styled, and cast."
            description="A sample of the commercial, fashion, and lifestyle campaigns Jessica has helped bring to set and to screen."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {campaigns.map((c) => (
              <Link
                key={c.slug}
                href={`/work#${c.slug}`}
                className="focus-ring group block"
                aria-label={`${c.client} — ${c.category}`}
              >
                <HoverChromaTile
                  src={c.image.src}
                  alt={c.image.alt}
                  label={c.client}
                  sublabel={c.category}
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <MagneticButton href="/work" variant="outline">
              View all work
            </MagneticButton>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink-soft py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="How Jessica Can Help"
            title="Production, talent, direction, and strategy."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className="focus-ring group flex flex-col justify-between rounded-sm border border-line bg-ink p-6 transition-colors hover:border-accent/50"
              >
                <div>
                  <h3 className="font-display text-lg text-paper">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-paper/60">{service.short}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-accent">
                  Learn more
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 sm:py-28">
        <Container className="max-w-3xl text-center">
          <p className="font-display text-2xl leading-relaxed text-paper sm:text-3xl">
            &ldquo;{settings.credibilityLine}&rdquo;
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/book">Book a Production</MagneticButton>
            <MagneticButton href="/talent" variant="outline">
              Register as Talent
            </MagneticButton>
          </div>
          <p className="mt-6 text-xs uppercase tracking-wider text-paper/40">
            {settings.location} — available across the Middle East, Asia, and internationally
          </p>
        </Container>
      </section>
    </>
  );
}
