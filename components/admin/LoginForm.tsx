"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldLabel, FieldError, inputClass } from "@/components/form/Field";
import { getBrowserSupabase } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";

  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const supabase = getBrowserSupabase();
    if (!supabase) {
      setError("Supabase isn't configured yet. Add the environment variables and redeploy.");
      return;
    }

    setStatus("submitting");
    const form = new FormData(e.currentTarget);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email") ?? "").trim(),
      password: String(form.get("password") ?? ""),
    });

    if (signInError) {
      // Supabase returns a deliberately vague message; keep it that way so
      // the form can't be used to discover which emails have accounts.
      setError("Those details didn't match. Check your email and password and try again.");
      setStatus("idle");
      return;
    }

    router.replace(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {error && (
        <div
          role="alert"
          className="rounded-sm border border-red-600/40 bg-red-600/10 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}
      <div>
        <FieldLabel htmlFor="email" required>
          Email
        </FieldLabel>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
      </div>
      <div>
        <FieldLabel htmlFor="password" required>
          Password
        </FieldLabel>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
        <FieldError message={undefined} />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring w-full rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
