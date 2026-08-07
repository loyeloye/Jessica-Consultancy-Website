import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/Container";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="bg-ink py-24">
      <Container className="max-w-md">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-accent">Admin</p>
        <h1 className="font-display text-3xl">Sign in</h1>
        <p className="mt-3 text-sm text-paper/60">
          Manage the blog, campaign imagery, site copy, and incoming inquiries.
        </p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
