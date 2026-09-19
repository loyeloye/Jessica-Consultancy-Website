import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { HoverChromaTile } from "@/components/HoverChromaTile";
import { MagneticButton } from "@/components/MagneticButton";
import { ClientMarquee } from "@/components/ClientMarquee";
import { Reveal } from "@/components/Reveal";
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
          {settings.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="text-center sm:text-left">
              <p className="font-display text-4xl text-accent">{stat.value}</p>
              <p className="mt-2 text-sm text-paper/70">{stat.label}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      <ClientMarquee clients={campaigns.map((c) => c.client)} />

      <section className="border-b border-line bg-ink py-20 sm:py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Selected Work"
              title="Campaigns coordinated, styled, and cast."
              description="A sample of the commercial, fashion, and lifestyle campaigns Summer Et Al has helped bring to set and to screen."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {campaigns.map((c, i) => (
              <Reveal key={c.slug} delay={i * 100}>
                <Link
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
                    showCursorLabel
                  />
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal
            delay={150}
            className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="w-full max-w-[280px] overflow-hidden rounded-sm border border-line sm:max-w-[240px]">
              <video
                className="aspect-[9/16] w-full bg-ink-soft object-cover"
                src="/videos/selected-work-reel.mp4"
                poster="/videos/selected-work-reel-poster.jpg"
                controls
                playsInline
                preload="none"
              >
                Your browser does not support embedded video.
              </video>
            </div>
            <div className="flex flex-1 flex-col items-center gap-4 text-center sm:items-start sm:text-left">
              <p className="max-w-sm text-sm leading-relaxed text-paper/70">
                A sample of shoots directed and managed by Summer Et Al.
              </p>
              <MagneticButton href="/work" variant="outline">
                View all work
              </MagneticButton>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line bg-ink-soft py-20 sm:py-24 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How Summer Et Al Can Help"
              title="Production, talent, direction, and strategy."
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 80}>
                <Link
                  href={`/services#${service.slug}`}
                  className="focus-ring group flex h-full flex-col justify-between rounded-sm border border-line bg-ink p-6 transition-colors hover:border-accent/50"
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
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-20 sm:py-24 lg:py-28">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="font-display text-2xl leading-relaxed text-paper sm:text-3xl">
              &ldquo;{settings.credibilityLine}&rdquo;
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/book">Book a Production</MagneticButton>
              <MagneticButton href="/talent" variant="outline">
                Register — Talent / Creative
              </MagneticButton>
            </div>
            <p className="mt-6 text-xs uppercase tracking-wider text-paper/40">
              {settings.location} — available across the Middle East, Asia, and internationally
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
