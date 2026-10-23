import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagProps = {
  children: ReactNode;
  className?: string;
  /** Accent treatment for the one tag that matters most in a set. */
  emphasis?: boolean;
};

export function Tag({ children, className, emphasis = false }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-2 py-1 text-meta whitespace-nowrap",
        emphasis
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-line text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

type TagListProps = {
  items: readonly string[];
  className?: string;
  /** Screen-reader label for the group, e.g. "Stack". */
  label: string;
};

export function TagList({ items, className, label }: TagListProps) {
  if (items.length === 0) return null;

  return (
    <ul
      aria-label={label}
      className={cn("flex flex-wrap gap-1", className)}
    >
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
