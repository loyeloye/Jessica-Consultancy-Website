"use client";

import { useState } from "react";
import { btnGhost } from "@/components/admin/ui";

export function CopyButton({ value, label = "Copy URL" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions). Select the
      // text instead so it can still be copied by hand.
      window.prompt("Copy this URL:", value);
    }
  }

  return (
    <button type="button" onClick={copy} className={btnGhost} aria-live="polite">
      {copied ? "Copied" : label}
    </button>
  );
}
