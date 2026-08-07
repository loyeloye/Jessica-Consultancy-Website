export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isNonEmpty(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim().length > 0;
}

export function asString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}
