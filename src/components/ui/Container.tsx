import type { ReactNode } from "react";

import type { PolymorphicTag } from "@/lib/polymorphic";
import { cn } from "@/lib/utils";

type ContainerProps = {
  as?: PolymorphicTag;
  children: ReactNode;
  className?: string;
  /** Narrow measure for long-form prose (~44rem). */
  narrow?: boolean;
};

export function Container({
  as: Tag = "div",
  children,
  className,
  narrow = false,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-3 md:px-gutter",
        narrow ? "max-w-measure" : "max-w-shell",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
