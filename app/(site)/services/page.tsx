import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MagneticButton } from "@/components/MagneticButton";
import { ServiceIcon } from "@/components/ServiceIcon";
import { services, siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: `Services — ${siteConfig.name}`,
  description: siteConfig.metaDescription,
};

export default function ServicesPage() {
  return (
    <>
      <section className="grain border-b border-line bg-ink py-20 sm:py-28">
        <Container className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">Services</p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">
            Production, talent, and direction — one point of contact.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-paper/75 sm:text-lg">
            Four ways to work with Summer Et Al, from full production coordination to a
            single talent booking, to strategic guidance for brands entering the
            Dubai market.
          </p>
        </Container>
      </section>

      {services.map((service, i) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`scroll-mt-24 border-b border-line py-20 sm:py-24 ${
            i % 2 === 0 ? "bg-ink-soft" : "bg-ink"
          }`}
        >
          <Container>
            <div className="grid grid-cols-1 gap-10 min-[700px]:grid-cols-[minmax(0,320px)_1fr]">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 text-accent">
                  <ServiceIcon name={service.icon as "clapperboard" | "users" | "sparkles" | "trending-up"} className="h-5 w-5" />
                </div>
                <h2 className="font-display mt-5 text-2xl sm:text-3xl">{service.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-paper/70">{service.short}</p>
                {service.note && (
                  <p className="mt-4 rounded-sm border border-accent/30 bg-accent/5 p-4 text-xs leading-relaxed text-paper/70">
                    {service.note}
                  </p>
                )}
                <div className="mt-6">
                  <MagneticButton
                    href={
                      service.slug === "strategic-growth-consulting"
                        ? "/book?type=Strategic+Consulting"
                        : `/book?type=${encodeURIComponent(service.title)}`
                    }
                  >
                    {service.slug === "strategic-growth-consulting"
                      ? "Start a Consulting Inquiry"
                      : "Book This Service"}
                  </MagneticButton>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {service.breakdown.map((block) => (
                  <div key={block.phase} className="rounded-sm border border-line p-6">
                    <h3 className="text-xs uppercase tracking-wider text-accent">{block.phase}</h3>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-paper/75">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-paper/40" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
