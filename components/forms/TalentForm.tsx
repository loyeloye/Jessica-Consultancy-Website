"use client";

import { useState } from "react";
import { FieldLabel, inputClass, FieldError } from "@/components/form/Field";

type Status = "idle" | "submitting" | "success" | "error";

export function TalentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [detailsOpen, setDetailsOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/talent", { method: "POST", body: formData });
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
        <h2 className="font-display text-2xl text-paper">You&apos;re on the roster.</h2>
        <p className="mt-3 text-sm leading-relaxed text-paper/70">
          Thanks for registering. Jessica reviews new talent submissions regularly and
          will reach out by email if there&apos;s a fit for an upcoming booking.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="focus-ring mt-6 text-sm text-accent underline underline-offset-4"
        >
          Register another talent
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
          <FieldLabel htmlFor="fullName" required>
            Full name
          </FieldLabel>
          <input id="fullName" name="fullName" type="text" required className={inputClass} />
          <FieldError message={errors.fullName} />
        </div>
        <div>
          <FieldLabel htmlFor="city" required>
            City / base
          </FieldLabel>
          <input id="city" name="city" type="text" required className={inputClass} />
          <FieldError message={errors.city} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="email" required>
            Email
          </FieldLabel>
          <input id="email" name="email" type="email" required className={inputClass} />
          <FieldError message={errors.email} />
        </div>
        <div>
          <FieldLabel htmlFor="phone" required>
            Phone / WhatsApp
          </FieldLabel>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
          <FieldError message={errors.phone} />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="portfolioUrl" required>
          Instagram or portfolio link
        </FieldLabel>
        <input
          id="portfolioUrl"
          name="portfolioUrl"
          type="text"
          placeholder="instagram.com/yourname or portfolio URL"
          required
          className={inputClass}
        />
        <FieldError message={errors.portfolioUrl} />
      </div>

      <div>
        <FieldLabel htmlFor="headshot" required>
          Headshot photo
        </FieldLabel>
        <input
          id="headshot"
          name="headshot"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-xs file:font-medium file:text-ink`}
        />
        <p className="mt-1.5 text-xs text-paper/40">
          Clear, recent, front-facing. JPG, PNG, or WEBP — up to 8MB.
        </p>
        <FieldError message={errors.headshot} />
      </div>

      <div>
        <FieldLabel htmlFor="additionalPhotos">Additional photos (optional)</FieldLabel>
        <input
          id="additionalPhotos"
          name="additionalPhotos"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-paper/10 file:px-4 file:py-2 file:text-xs file:font-medium file:text-paper`}
        />
        <p className="mt-1.5 text-xs text-paper/40">Up to 4 additional photos.</p>
      </div>

      <div className="rounded-sm border border-line">
        <button
          type="button"
          onClick={() => setDetailsOpen((v) => !v)}
          aria-expanded={detailsOpen}
          aria-controls="optional-details"
          className="focus-ring flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-paper/85"
        >
          Measurements & stats (optional)
          <span aria-hidden className={`transition-transform ${detailsOpen ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>
        {detailsOpen && (
          <div id="optional-details" className="grid grid-cols-2 gap-4 border-t border-line p-5 sm:grid-cols-3">
            <div>
              <FieldLabel htmlFor="height">Height</FieldLabel>
              <input id="height" name="height" type="text" placeholder="e.g. 5'9&quot;" className={inputClass} />
            </div>
            <div>
              <FieldLabel htmlFor="bust">Bust / chest</FieldLabel>
              <input id="bust" name="bust" type="text" className={inputClass} />
            </div>
            <div>
              <FieldLabel htmlFor="waist">Waist</FieldLabel>
              <input id="waist" name="waist" type="text" className={inputClass} />
            </div>
            <div>
              <FieldLabel htmlFor="hips">Hips</FieldLabel>
              <input id="hips" name="hips" type="text" className={inputClass} />
            </div>
            <div>
              <FieldLabel htmlFor="shoeSize">Shoe size</FieldLabel>
              <input id="shoeSize" name="shoeSize" type="text" className={inputClass} />
            </div>
          </div>
        )}
      </div>

      <div>
        <FieldLabel htmlFor="notes">Anything else Jessica should know? (optional)</FieldLabel>
        <textarea id="notes" name="notes" rows={4} className={inputClass} />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="focus-ring mt-1 h-4 w-4 shrink-0 rounded border-line bg-ink-soft accent-[var(--color-accent)]"
        />
        <label htmlFor="consent" className="text-sm leading-relaxed text-paper/70">
          I consent to Jessica storing my details and photos for the purpose of talent
          casting and booking consideration.
          <span className="ml-1 text-accent">*</span>
        </label>
      </div>
      <FieldError message={errors.consent} />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring w-full rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Submitting..." : "Register as Talent"}
      </button>
    </form>
  );
}
