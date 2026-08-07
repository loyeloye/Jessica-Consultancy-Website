import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { HoverChromaTile } from "@/components/HoverChromaTile";
import { MagneticButton } from "@/components/MagneticButton";
import { campaigns, sectors, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Work — ${siteConfig.name}`,
  description: siteConfig.metaDescription,
};

const gradients = [
  "from-neutral-800 via-neutral-600 to-neutral-900",
  "from-stone-700 via-stone-500 to-stone-800",
  "from-zinc-800 via-zinc-600 to-zinc-900",
  "from-neutral-700 via-neutral-500 to-neutral-900",
  "from-stone-800 via-stone-600 to-stone-900",
  "from-zinc-700 via-zinc-500 to-zinc-800",
];

export default function WorkPage() {
  return (
    <>
      <section className="grain border-b border-line bg-ink py-20 sm:py-28">
        <Container className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">Work</p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">
            Campaigns coordinated, cast, and directed.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-paper/75 sm:text-lg">
            Across {sectors.join(", ").toLowerCase()}, Jessica has supported 25+
            commercial shoots and sourced 75+ talent for brands operating in the
            UAE and internationally.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-ink-soft py-20 sm:py-28">
        <Container className="space-y-16">
          {campaigns.map((c) => (
            <article
              key={c.slug}
              id={c.slug}
              className="scroll-mt-24 grid grid-cols-1 gap-8 border-b border-line pb-16 last:border-b-0 last:pb-0 lg:grid-cols-[1fr_1.2fr]"
            >
              <HoverChromaTile
                label={c.client}
                sublabel={c.category}
                aspect="aspect-[4/3] lg:aspect-[4/5]"
                gradient={gradients[campaigns.indexOf(c) % gradients.length]}
              />
              <div>
                <p className="text-xs uppercase tracking-wider text-gold">{c.category}</p>
                <h2 className="font-display mt-2 text-2xl sm:text-3xl">{c.client}</h2>
                <p className="mt-2 text-sm uppercase tracking-wider text-paper/50">
                  Role: {c.role}
                </p>
                <p className="mt-5 text-base leading-relaxed text-paper/75">{c.summary}</p>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-paper/50">Deliverables</h3>
                    <ul className="mt-3 space-y-2 text-sm text-paper/75">
                      {c.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-paper/50">
                      Stakeholders Managed
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-paper/75">
                      {c.stakeholders.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-sm border border-gold/30 bg-gold/5 p-4">
                  <h3 className="text-xs uppercase tracking-wider text-gold">Outcome</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/80">{c.outcome}</p>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Highlights" title="More from the archive." />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <HoverChromaTile
                key={i}
                label="Campaign highlight"
                gradient={gradients[i % gradients.length]}
                aspect="aspect-square"
              />
            ))}
          </div>
          <p className="mt-6 text-xs text-paper/40">
            Highlight imagery placeholder — swap in campaign photography as it becomes available.
          </p>
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
