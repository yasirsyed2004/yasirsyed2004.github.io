import type { ReactNode } from "react";

import type { PolymorphicTag } from "@/lib/polymorphic";
import { cn } from "@/lib/utils";

type CardProps = {
  as?: PolymorphicTag;
  children: ReactNode;
  className?: string;
  /** Adds the hover/focus-within affordance. Only for cards you can act on. */
  interactive?: boolean;
};

export function Card({
  as: Tag = "div",
  children,
  className,
  interactive = false,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-card border border-line bg-surface",
        interactive &&
          "transition-colors duration-300 ease-out-soft hover:border-line-strong focus-within:border-accent/50",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
