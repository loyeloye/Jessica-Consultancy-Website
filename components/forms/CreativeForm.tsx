"use client";

import { useState } from "react";
import { FieldLabel, inputClass, FieldError } from "@/components/form/Field";

type Status = "idle" | "submitting" | "success" | "error";

const ROLES = [
  "Photographer",
  "Editor",
  "Videographer",
  "Producer",
  "Director",
  "Content Creator",
];

export function CreativeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/creative", { method: "POST", body: formData });
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
      <div className="rounded-sm border border-accent/30 bg-accent/5 p-8 text-center">
        <h2 className="font-display text-2xl text-paper">You&apos;re on the network.</h2>
        <p className="mt-3 text-sm leading-relaxed text-paper/70">
          Thanks for registering. Jessica reviews new creative submissions regularly and
          will reach out by email if there&apos;s a fit for an upcoming production.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="focus-ring mt-6 text-sm text-accent underline underline-offset-4"
        >
          Register another creative
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6" aria-busy={status === "submitting"}>
      {errors.form && (
        <div role="alert" className="rounded-sm border border-red-600/40 bg-red-600/10 p-4 text-sm text-red-700">
          {errors.form}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="cr-fullName" required>
            Full name
          </FieldLabel>
          <input id="cr-fullName" name="fullName" type="text" required className={inputClass} />
          <FieldError message={errors.fullName} />
        </div>
        <div>
          <FieldLabel htmlFor="cr-city" required>
            City / base
          </FieldLabel>
          <input id="cr-city" name="city" type="text" required className={inputClass} />
          <FieldError message={errors.city} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="cr-email" required>
            Email
          </FieldLabel>
          <input id="cr-email" name="email" type="email" required className={inputClass} />
          <FieldError message={errors.email} />
        </div>
        <div>
          <FieldLabel htmlFor="cr-phone" required>
            Phone / WhatsApp
          </FieldLabel>
          <input id="cr-phone" name="phone" type="tel" required className={inputClass} />
          <FieldError message={errors.phone} />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="cr-portfolioUrl" required>
          Portfolio or website link (your proof of work)
        </FieldLabel>
        <input
          id="cr-portfolioUrl"
          name="portfolioUrl"
          type="text"
          placeholder="yourname.com, instagram.com/yourname, or a Vimeo/YouTube reel"
          required
          className={inputClass}
        />
        <FieldError message={errors.portfolioUrl} />
      </div>

      <div>
        <FieldLabel htmlFor="cr-role-Photographer" required>
          Role(s)
        </FieldLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ROLES.map((role) => (
            <label
              key={role}
              htmlFor={`cr-role-${role}`}
              className="flex items-center gap-2 rounded-sm border border-line bg-ink-soft px-3 py-2.5 text-sm text-paper/85"
            >
              <input
                id={`cr-role-${role}`}
                name="roles"
                type="checkbox"
                value={role}
                className="focus-ring h-4 w-4 shrink-0 rounded border-line accent-[var(--color-accent)]"
              />
              {role}
            </label>
          ))}
        </div>
        <FieldError message={errors.roles} />
      </div>

      <div>
        <FieldLabel htmlFor="cr-notes">Anything else Jessica should know? (optional)</FieldLabel>
        <textarea id="cr-notes" name="notes" rows={4} className={inputClass} />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="cr-consent"
          name="consent"
          type="checkbox"
          required
          className="focus-ring mt-1 h-4 w-4 shrink-0 rounded border-line bg-ink-soft accent-[var(--color-accent)]"
        />
        <label htmlFor="cr-consent" className="text-sm leading-relaxed text-paper/70">
          I consent to Jessica storing my details for the purpose of production casting
          and booking consideration.
          <span className="ml-1 text-accent">*</span>
        </label>
      </div>
      <FieldError message={errors.consent} />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring w-full rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting..." : "Register as Creative"}
      </button>
    </form>
  );
}
