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

/**
 * Drawing annotation. Deliberately has no numbering prop — a marker is
 * only honest where the content is genuinely ordered, and that is the
 * Approach sequence alone, which numbers itself.
 */
export function Anno({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cx("anno", className)}>{children}</span>;
}

/* ------------------------------------------------------------------ */

export function Button({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "line";
  className?: string;
}) {
  const cls = cx("btn", variant === "solid" ? "btn-solid" : "btn-line", className);
  const external = href.startsWith("http") || href.startsWith("mailto:");

  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */

export function Sheet({
  className,
  inset = false,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div"> & { inset?: boolean }) {
  return (
    <div className={cx("sheet", inset && "sheet-inset", className)} {...rest}>
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
    <section id={id} className={cx("relative scroll-mt-20 py-20 lg:py-28", className)}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Section head styled as a drawing title block: the label sits in a
 * ruled strip above the title, the way a sheet identifies itself.
 */
export function TitleBlock({
  sheet,
  eyebrow,
  title,
  lede,
  className,
}: {
  /** Sheet reference, e.g. "H-02". Only pass where a real reference exists. */
  sheet?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("max-w-3xl", className)}>
      <div className="flex items-center gap-3 border-b border-vellum-400 pb-2.5">
        <Anno className="text-oxide-600">{eyebrow}</Anno>
        <span aria-hidden className="h-px flex-1 bg-vellum-400" />
        {sheet && <Anno>{sheet}</Anno>}
      </div>
      <h2 className="mt-6 text-3xl leading-[1.08] font-semibold sm:text-4xl lg:text-[2.9rem]">
        {title}
      </h2>
      {lede && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600 lg:text-[1.0625rem]">
          {lede}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** A dimension line with a measurement centred beneath it. */
export function Dimension({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={cx("select-none", className)} aria-hidden>
      <div className="dim-line" />
      <div className="anno mt-1.5 text-center">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Circled reference marker with an annotation, as on a drawing. */
export function Callout({
  mark,
  children,
}: {
  mark: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="leader-dot mt-0.5">{mark}</span>
      <div className="text-sm leading-relaxed text-ink-600">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function Figure({
  value,
  label,
  note,
  tone = "ink",
}: {
  value: string;
  label: string;
  note?: string;
  tone?: "ink" | "survey" | "oxide";
}) {
  const toneClass =
    tone === "survey"
      ? "text-survey-600"
      : tone === "oxide"
        ? "text-oxide-600"
        : "text-ink-900";
  return (
    <div>
      <div className={cx("font-mono text-3xl font-medium lg:text-[2.25rem]", toneClass)}>
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-ink-800">{label}</div>
      {note && <div className="mt-1 text-xs text-ink-500">{note}</div>}
    </div>
  );
}
