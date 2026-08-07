"use client";

import { useState } from "react";
import { FieldLabel, inputClass, FieldError } from "@/components/form/Field";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrors(data.errors || { form: "Something went wrong. Please try again." });
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrors({ form: "Network error. Please check your connection and try again." });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-gold/30 bg-gold/5 p-6 text-center">
        <p className="font-display text-xl text-paper">Message sent.</p>
        <p className="mt-2 text-sm text-paper/70">Jessica will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-busy={status === "submitting"}>
      {errors.form && (
        <div role="alert" className="rounded-sm border border-red-400/40 bg-red-400/10 p-4 text-sm text-red-300">
          {errors.form}
        </div>
      )}
      <div>
        <FieldLabel htmlFor="c-name" required>
          Name
        </FieldLabel>
        <input id="c-name" name="name" type="text" required className={inputClass} />
        <FieldError message={errors.name} />
      </div>
      <div>
        <FieldLabel htmlFor="c-email" required>
          Email
        </FieldLabel>
        <input id="c-email" name="email" type="email" required className={inputClass} />
        <FieldError message={errors.email} />
      </div>
      <div>
        <FieldLabel htmlFor="c-message" required>
          Message
        </FieldLabel>
        <textarea id="c-message" name="message" rows={4} required className={inputClass} />
        <FieldError message={errors.message} />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring w-full rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
