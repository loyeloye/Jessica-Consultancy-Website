import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { MagneticButton } from "@/components/MagneticButton";
import { aboutHighlights, aboutConsultingNote, sectors, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: siteConfig.metaDescription,
};

export default function AboutPage() {
  return (
    <>
      <section className="grain border-b border-line bg-ink py-20 sm:py-28">
        <Container className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gold">About</p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">
            A calm, organized hand behind ambitious shoots.
          </h1>
          <p className="mt-8 text-base leading-relaxed text-paper/75 sm:text-lg">
            Jessica is a Dubai-based production coordinator, shoot coordinator, and
            commercial and fashion talent booker, with additional experience in
            creative direction. She works across commercial, fashion, branded content,
            and editorial productions — planning the logistics, booking the talent,
            and steering the on-set details that turn a brief into a finished
            campaign.
          </p>
          <p className="mt-4 text-base leading-relaxed text-paper/75 sm:text-lg">
            Her work spans {sectors.join(", ").toLowerCase()}, for clients ranging
            from international banks to fashion houses and lifestyle brands.
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-ink-soft py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Career Highlights" title="Where Jessica adds the most value." />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {aboutHighlights.map((group) => (
              <div key={group.title} className="rounded-sm border border-line bg-ink p-6">
                <h3 className="font-display text-lg text-gold">{group.title}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-paper/75">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink py-20 sm:py-28">
        <Container className="max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-gold">Beyond Production</p>
          <h2 className="font-display text-2xl sm:text-3xl">Strategic & Growth Consulting</h2>
          <p className="mt-5 text-base leading-relaxed text-paper/75">{aboutConsultingNote}</p>
          <p className="mt-4 text-base leading-relaxed text-paper/75">
            It&apos;s a natural extension of her Dubai fashion, retail, and production
            network — and a service line she&apos;s opening up for other brands
            considering the same move.
          </p>
        </Container>
      </section>

      <section className="bg-ink-soft py-16">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl">Ready to work together?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton href="/book">Book a Production</MagneticButton>
            <MagneticButton href="/services" variant="outline">
              See Services
            </MagneticButton>
          </div>
        </Container>
      </section>
    </>
  );
}
