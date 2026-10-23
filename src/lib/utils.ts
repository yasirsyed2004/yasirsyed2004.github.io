type ClassValue = string | false | null | undefined;

/** Minimal class joiner. No dependency for six characters of logic. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

/**
 * True when a data field is still a placeholder. Content marked TODO is hidden
 * from the public UI (a recruiter should never read the word "TODO") but is
 * surfaced loudly in development so it doesn't ship forgotten.
 */
export function isTodo(value: string | undefined | null): boolean {
  return typeof value === "string" && value.trimStart().startsWith("TODO");
}

export const isDev = process.env.NODE_ENV === "development";
