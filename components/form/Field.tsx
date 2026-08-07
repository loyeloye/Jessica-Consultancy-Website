export function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-paper/85">
      {children}
      {required && <span className="ml-1 text-accent">*</span>}
    </label>
  );
}

export const inputClass =
  "focus-ring w-full rounded-sm border border-line bg-ink-soft px-4 py-3 text-sm text-paper placeholder:text-paper/35 transition-colors focus:border-accent";

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-600">
      {message}
    </p>
  );
}
