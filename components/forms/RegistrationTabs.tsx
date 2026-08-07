"use client";

import { useState } from "react";
import { TalentForm } from "@/components/forms/TalentForm";
import { CreativeForm } from "@/components/forms/CreativeForm";

type Tab = "talent" | "creative";

const COPY: Record<Tab, string> = {
  talent:
    "Models, actors, presenters, and lifestyle talent — register below for consideration on upcoming commercial, fashion, and editorial bookings across the Middle East, Asia, and internationally.",
  creative:
    "Photographers, editors, videographers, producers, directors, and content creators — register below with proof of work for consideration on upcoming productions.",
};

export function RegistrationTabs() {
  const [tab, setTab] = useState<Tab>("talent");

  return (
    <div>
      <div role="tablist" aria-label="Registration type" className="mb-8 flex gap-2">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "talent"}
          onClick={() => setTab("talent")}
          className={`focus-ring rounded-full px-5 py-2.5 text-sm transition-colors ${
            tab === "talent"
              ? "bg-accent text-ink"
              : "border border-line text-paper/70 hover:border-accent hover:text-accent"
          }`}
        >
          Talent
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "creative"}
          onClick={() => setTab("creative")}
          className={`focus-ring rounded-full px-5 py-2.5 text-sm transition-colors ${
            tab === "creative"
              ? "bg-accent text-ink"
              : "border border-line text-paper/70 hover:border-accent hover:text-accent"
          }`}
        >
          Creative
        </button>
      </div>

      <p className="mb-10 text-base leading-relaxed text-paper/70">{COPY[tab]}</p>

      {tab === "talent" ? <TalentForm /> : <CreativeForm />}
    </div>
  );
}
