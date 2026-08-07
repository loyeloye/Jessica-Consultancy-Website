"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FieldLabel, inputClass, FieldError } from "@/components/form/Field";
import { projectTypes, budgetRanges } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

export function BookForm() {
  const searchParams = useSearchParams();
  const presetType = searchParams.get("type") || "";

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/book", { method: "POST", body: formData });
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
        <h2 className="font-display text-2xl text-paper">Thank you — inquiry received.</h2>
        <p className="mt-3 text-sm leading-relaxed text-paper/70">
          Jessica will follow up by email shortly to discuss your project. If it&apos;s
          time-sensitive, feel free to call or WhatsApp directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="focus-ring mt-6 text-sm text-accent underline underline-offset-4"
        >
          Submit another inquiry
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
          <FieldLabel htmlFor="name" required>
            Full name
          </FieldLabel>
          <input id="name" name="name" type="text" required className={inputClass} />
          <FieldError message={errors.name} />
        </div>
        <div>
          <FieldLabel htmlFor="company">Company / brand</FieldLabel>
          <input id="company" name="company" type="text" className={inputClass} />
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
          <FieldLabel htmlFor="phone">Phone / WhatsApp</FieldLabel>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="projectType" required>
            Project type
          </FieldLabel>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue={presetType}
            className={inputClass}
          >
            <option value="" disabled>
              Select one
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <FieldError message={errors.projectType} />
        </div>
        <div>
          <FieldLabel htmlFor="projectDate">Project date(s)</FieldLabel>
          <input
            id="projectDate"
            name="projectDate"
            type="text"
            placeholder="e.g. 12–14 Oct, or TBD"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="budgetRange">Budget range (optional)</FieldLabel>
        <select id="budgetRange" name="budgetRange" defaultValue="" className={inputClass}>
          <option value="">Prefer not to say</option>
          {budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      <div>
        <FieldLabel htmlFor="message" required>
          Project brief
        </FieldLabel>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell Jessica about the shoot, campaign, or consulting need..."
          className={inputClass}
        />
        <FieldError message={errors.message} />
      </div>

      <div>
        <FieldLabel htmlFor="brief">Moodboard / brief upload (optional)</FieldLabel>
        <input
          id="brief"
          name="brief"
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-xs file:font-medium file:text-ink`}
        />
        <p className="mt-1.5 text-xs text-paper/40">JPG, PNG, WEBP, or PDF — up to 8MB.</p>
        <FieldError message={errors.brief} />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring w-full rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending inquiry..." : "Send Inquiry"}
      </button>
    </form>
  );
}
