import { Container } from "@/components/Container";

export default function Loading() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-ink py-28">
      <Container className="flex flex-col items-center gap-4">
        <span
          aria-hidden
          className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent motion-reduce:animate-none"
        />
        <span className="sr-only">Loading…</span>
      </Container>
    </section>
  );
}
