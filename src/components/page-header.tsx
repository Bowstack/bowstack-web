import type { ReactNode } from "react";
import { Container, Label } from "@/components/ui";

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-base-700/60">
      <div
        aria-hidden
        className="grid-rule mask-fade-b pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden
        className="chinook-arch pointer-events-none absolute inset-x-0 -bottom-1/2 h-full opacity-60"
      />
      <Container className="relative py-20 lg:py-28">
        <div className="max-w-3xl">
          <Label>{eyebrow}</Label>
          <h1 className="mt-5 text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          {lede && (
            <p className="mt-6 text-lg leading-relaxed text-base-300">{lede}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
