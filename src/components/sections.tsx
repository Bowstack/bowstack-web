import type { ReactNode } from "react";
import {
  Anno,
  Button,
  Callout,
  Container,
  Section,
  Sheet,
  TitleBlock,
} from "@/components/ui";

/* ------------------------------------------------------------------ *
 * Problem — four conditions, not a sequence. Marked as findings.
 * ------------------------------------------------------------------ */

export type ProblemItem = { title: string; body: string };

export function ProblemSection({ items }: { items: readonly ProblemItem[] }) {
  return (
    <Section id="problem">
      <Container>
        <TitleBlock
          eyebrow="Existing conditions"
          title={
            <>
              Everyone told you to adopt AI.
              <br />
              <span className="text-ink-500">
                Nobody told you where it&rsquo;s allowed to run.
              </span>
            </>
          }
          lede="Most firms we meet have already tried. They hit one of these four walls and stopped."
        />

        <div className="mt-12 grid gap-x-12 gap-y-9 md:grid-cols-2">
          {items.map((item, i) => (
            <div key={item.title} className="redline pl-5">
              <Anno>Finding {String.fromCharCode(65 + i)}</Anno>
              <h3 className="mt-2.5 font-display text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Approach — genuinely ordered, so genuinely numbered.
 * ------------------------------------------------------------------ */

export type Step = {
  title: string;
  duration: string;
  body: string;
  deliverables: readonly string[];
};

export function ApproachSection({ steps }: { steps: readonly Step[] }) {
  return (
    <Section id="approach" className="border-t border-vellum-400 bg-vellum-100">
      <Container>
        <TitleBlock
          eyebrow="Sequence of work"
          title="Four stages, and you own everything at the end."
          lede="No open-ended retainers and no dependency on us. Every engagement produces documentation your own team can operate from."
        />

        <ol className="mt-12 grid gap-px overflow-hidden border border-vellum-400 bg-vellum-400 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col bg-vellum-50 p-6">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-2xl font-medium text-oxide-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Anno>{step.duration}</Anno>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">
                {step.title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-600">
                {step.body}
              </p>
              <div className="mt-5 border-t border-vellum-300 pt-4">
                <Anno>Issued</Anno>
                <ul className="mt-2.5 space-y-1.5">
                  {step.deliverables.map((d) => (
                    <li key={d} className="text-xs leading-relaxed text-ink-500">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Services — a schedule of work, laid out as one
 * ------------------------------------------------------------------ */

export type Service = {
  title: string;
  body: string;
  examples: readonly string[];
};

export function ServicesSection({ services }: { services: readonly Service[] }) {
  return (
    <Section id="services" className="border-t border-vellum-400">
      <Container>
        <TitleBlock
          eyebrow="Schedule of work"
          title="Boring, high-volume work — done by a machine that stays in your office."
          lede="The wins are rarely glamorous. They're the twelve hours a week your senior people spend on things a well-built system should be doing."
        />

        <div className="mt-12 divide-y divide-vellum-300 border-y border-vellum-400">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="grid gap-4 py-7 md:grid-cols-[auto_1fr_1.1fr] md:gap-10"
            >
              <Anno className="pt-1 md:w-16">
                {String(i + 1).padStart(2, "0")}
              </Anno>
              <div>
                <h3 className="font-display text-lg font-semibold">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {service.body}
                </p>
              </div>
              <ul className="space-y-1.5 md:pt-1">
                {service.examples.map((ex) => (
                  <li
                    key={ex}
                    className="flex gap-2.5 text-sm leading-relaxed text-ink-500"
                  >
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-oxide-600" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function CtaSection({
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  body: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <Section className="border-t border-vellum-400 bg-vellum-100">
      <Container>
        <Sheet className="hatch relative overflow-hidden">
          <div className="bg-vellum-50/94 px-8 py-14 text-center lg:px-16">
            <Anno className="text-oxide-600">{eyebrow}</Anno>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-600">
              {body}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={primary.href}>{primary.label}</Button>
              {secondary && (
                <Button href={secondary.href} variant="line">
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </Sheet>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

export function FaqSection({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <Section id="faq" className="border-t border-vellum-400">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <TitleBlock eyebrow="Queries" title="The things people actually ask." />
          <div className="divide-y divide-vellum-300 border-y border-vellum-400">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start gap-4">
                  <span className="leader-dot mt-0.5">{i + 1}</span>
                  <span className="flex-1 font-display text-base font-semibold text-ink-900">
                    {faq.q}
                  </span>
                  <span
                    aria-hidden
                    className="anno mt-1 shrink-0 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="mt-3 pl-10">
                  <p className="max-w-2xl text-sm leading-relaxed text-ink-600">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function FounderSection({
  name,
  role,
  paragraphs,
}: {
  name: string;
  role: string;
  paragraphs: readonly string[];
}) {
  return (
    <Section className="border-t border-vellum-400">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3 border-b border-vellum-400 pb-2.5">
              <Anno className="text-oxide-600">Signed</Anno>
              <span aria-hidden className="h-px flex-1 bg-vellum-400" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-semibold lg:text-3xl">
              {name}
            </h2>
            <p className="anno mt-2">{role}</p>
          </div>
          <div className="space-y-4">
            {paragraphs.map((p) => (
              <p key={p} className="text-base leading-relaxed text-ink-600">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export { Callout };
