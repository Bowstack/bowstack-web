import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cx("container-x", className)}>{children}</div>;
}

/* ------------------------------------------------------------------ */

/** Monospace all-caps eyebrow. The spec-sheet voice. */
export function Label({
  children,
  className,
  index,
}: {
  children: ReactNode;
  className?: string;
  /** Optional zero-padded section number, e.g. 2 renders "02". */
  index?: number;
}) {
  return (
    <span className={cx("label inline-flex items-center gap-2.5", className)}>
      {index !== undefined && (
        <>
          <span className="text-chinook-400">
            {String(index).padStart(2, "0")}
          </span>
          <span aria-hidden className="h-px w-6 bg-base-600" />
        </>
      )}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium " +
    "transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 " +
    "focus-visible:outline-chinook-400";

  const variants = {
    primary:
      "bg-chinook-500 text-base-950 hover:bg-chinook-400 shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset]",
    secondary:
      "border border-base-600 bg-base-800/50 text-base-100 hover:border-base-500 hover:bg-base-800",
    ghost: "text-base-200 hover:text-base-50",
  } as const;

  const external = href.startsWith("http") || href.startsWith("mailto:");

  const content = (
    <>
      {children}
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
      >
        <path
          d="M6 3.5L10.5 8L6 12.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  if (external) {
    return (
      <a href={href} className={cx(base, variants[variant], className)}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cx(base, variants[variant], className)}>
      {content}
    </Link>
  );
}

/* ------------------------------------------------------------------ */

export function Panel({
  className,
  hover = false,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div"> & { hover?: boolean }) {
  return (
    <div
      className={cx("panel", hover && "panel-hover", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cx("relative scroll-mt-24 py-24 lg:py-32", className)}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  index?: number;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Label index={index}>{eyebrow}</Label>
      <h2 className="mt-5 text-3xl leading-[1.12] font-semibold sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {lede && (
        <p className="mt-5 text-base leading-relaxed text-base-300 lg:text-lg">
          {lede}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Thin horizontal rule that fades at both ends. */
export function Rule({ className }: { className?: string }) {
  return <div aria-hidden className={cx("rule-x", className)} />;
}

/* ------------------------------------------------------------------ */

export function Stat({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div>
      <div className="font-mono text-3xl font-medium text-base-50 lg:text-4xl">
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-base-200">{label}</div>
      {note && <div className="mt-1 text-xs text-base-400">{note}</div>}
    </div>
  );
}
