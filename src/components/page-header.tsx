import type { ReactNode } from "react";
import { Anno, Container } from "@/components/ui";

export function PageHeader({
  sheet,
  eyebrow,
  title,
  lede,
}: {
  sheet?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-vellum-400 bg-vellum-100">
      <div
        aria-hidden
        className="drafting-grid mask-fade-b pointer-events-none absolute inset-0 opacity-70"
      />
      <Container className="relative py-14 lg:py-20">
        <div className="flex items-center gap-3 border-b border-vellum-400 pb-2.5">
          <Anno className="text-oxide-600">{eyebrow}</Anno>
          <span aria-hidden className="h-px flex-1 bg-vellum-400" />
          {sheet && <Anno>{sheet}</Anno>}
        </div>
        <h1 className="mt-7 max-w-3xl font-display text-4xl leading-[1.02] font-semibold sm:text-5xl lg:text-[3.75rem]">
          {title}
        </h1>
        {lede && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            {lede}
          </p>
        )}
      </Container>
    </section>
  );
}
