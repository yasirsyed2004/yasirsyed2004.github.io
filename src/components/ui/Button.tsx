import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Trailing glyph — an arrow, a caret. Decorative only. */
  trailing?: ReactNode;
};

type ButtonAsLink = BaseProps & {
  href: string;
  download?: boolean;
  external?: boolean;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = BaseProps & {
  href?: never;
  download?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "group/btn inline-flex items-center justify-center gap-1 rounded-pill font-medium " +
  "transition-colors duration-200 ease-out-soft " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-strong active:bg-accent-strong",
  secondary:
    "border border-line-strong text-ink hover:border-accent/60 hover:text-accent",
  ghost: "text-ink-muted hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "px-3 py-2 text-body",
  sm: "px-2 py-1 text-meta",
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    trailing,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      <span>{children}</span>
      {trailing ? (
        <span aria-hidden="true" className="translate-y-px">
          {trailing}
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, download, external } = props;

    // Hash links, file downloads and external URLs are plain anchors; internal
    // routes go through next/link so the client router handles them.
    const isPlainAnchor =
      external || download || href.startsWith("#") || href.startsWith("mailto:");

    if (isPlainAnchor) {
      return (
        <a
          className={classes}
          href={href}
          {...(download ? { download: "" } : {})}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={props.onClick}
      type={props.type ?? "button"}
    >
      {content}
    </button>
  );
}
