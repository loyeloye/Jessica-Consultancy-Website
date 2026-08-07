import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { HoverChromaTile } from "@/components/HoverChromaTile";
import { MagneticButton } from "@/components/MagneticButton";
import { campaigns, highlights, sectors, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Work — ${siteConfig.name}`,
  description: siteConfig.metaDescription,
};

export default function WorkPage() {
  return (
    <>
      <section className="grain border-b border-line bg-ink py-20 sm:py-28">
        <Container className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">Work</p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">
            Campaigns coordinated, cast, and directed.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-paper/75 sm:text-lg">
            Across {sectors.join(", ").toLowerCase()}, Jessica has supported 25+
            commercial shoots and sourced 75+ talent for brands operating across the
            Middle East, Asia, and internationally.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-ink-soft py-20 sm:py-28">
        <Container className="space-y-20">
          {campaigns.map((c, i) => (
            <article
              key={c.slug}
              id={c.slug}
              className="scroll-mt-24 border-b border-line pb-20 last:border-b-0 last:pb-0"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
                <HoverChromaTile
                  src={c.image.src}
                  alt={c.image.alt}
                  aspect="aspect-[4/3] lg:aspect-[4/5]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={i === 0}
                />
                <div>
                  <p className="text-xs uppercase tracking-wider text-accent">{c.category}</p>
                  <h2 className="font-display mt-2 text-2xl sm:text-3xl">{c.client}</h2>
                  <p className="mt-2 text-sm uppercase tracking-wider text-paper/50">
                    Role: {c.role}
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-paper/75">{c.summary}</p>

                  {c.facts && (
                    <dl className="mt-6 grid grid-cols-3 gap-4 rounded-sm border border-line p-4">
                      {c.facts.map((f) => (
                        <div key={f.label}>
                          <dt className="text-xs uppercase tracking-wider text-paper/50">
                            {f.label}
                          </dt>
                          <dd className="font-display mt-1 text-lg text-accent">{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-paper/50">Scope</h3>
                      <ul className="mt-3 space-y-2 text-sm text-paper/75">
                        {c.scope.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wider text-paper/50">
                        Deliverables
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-paper/75">
                        {c.deliverables.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xs uppercase tracking-wider text-paper/50">
                      Stakeholders managed
                    </h3>
                    <p className="mt-2 text-sm text-paper/75">{c.stakeholders.join(" · ")}</p>
                  </div>

                  {c.objectives && (
                    <div className="mt-6">
                      <h3 className="text-xs uppercase tracking-wider text-paper/50">
                        Creative objectives
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-paper/75">
                        {c.objectives.map((o) => (
                          <li key={o} className="flex gap-2">
                            <span
                              aria-hidden
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                            />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 rounded-sm border border-accent/30 bg-accent/5 p-4">
                    <h3 className="text-xs uppercase tracking-wider text-accent">Outcome</h3>
                    <p className="mt-2 text-sm leading-relaxed text-paper/80">{c.outcome}</p>
                  </div>
                </div>
              </div>

              {c.gallery.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {c.gallery.map((img) => (
                    <HoverChromaTile
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      aspect="aspect-[4/5]"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  ))}
                </div>
              )}
            </article>
          ))}
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Highlights"
            title="More from the archive."
            description="Selected frames from commercial, fashion, beauty, and lifestyle productions."
          />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {highlights.map((img) => (
              <HoverChromaTile
                key={img.src}
                src={img.src}
                alt={img.alt}
                aspect="aspect-square"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink-soft py-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl">Have a shoot in the works?</h2>
          <MagneticButton href="/book">Book a Production</MagneticButton>
        </Container>
      </section>
    </>
  );
}
