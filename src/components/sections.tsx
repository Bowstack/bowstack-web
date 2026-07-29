import type { ReactNode } from "react";
import {
  Button,
  Container,
  Label,
  Panel,
  Rule,
  Section,
  SectionHeading,
} from "@/components/ui";

/* ------------------------------------------------------------------ *
 * Problem — name the pain before pitching
 * ------------------------------------------------------------------ */

export type ProblemItem = { title: string; body: string };

export function ProblemSection({ items }: { items: readonly ProblemItem[] }) {
  return (
    <Section id="problem">
      <Container>
        <SectionHeading
          index={1}
          eyebrow="The situation"
          title={
            <>
              Everyone told you to adopt AI.
              <br />
              <span className="text-base-400">
                Nobody told you where it&rsquo;s allowed to run.
              </span>
            </>
          }
          lede="Most firms we meet have already tried. They hit one of these four walls and stopped."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-base-600/60 bg-base-600/40 sm:grid-cols-2">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="bg-base-900 p-8 transition-colors duration-300 hover:bg-base-850"
            >
              <span className="font-mono text-2xs tracking-widest text-chinook-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-base-300">
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
 * Approach — the engagement, as a numbered process
 * ------------------------------------------------------------------ */

export type Step = {
  title: string;
  duration: string;
  body: string;
  deliverables: readonly string[];
};

export function ApproachSection({ steps }: { steps: readonly Step[] }) {
  return (
    <Section id="approach" className="border-t border-base-700/60">
      <Container>
        <SectionHeading
          index={2}
          eyebrow="How we work"
          title="Four steps, and you own everything at the end."
          lede="No open-ended retainers, no dependency on us. Every engagement produces documentation your own team can operate from."
        />

        <ol className="mt-16 grid gap-6 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Panel hover className="flex h-full flex-col p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-3xl font-medium text-chinook-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label">{step.duration}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-base-300">
                  {step.body}
                </p>
                <Rule className="my-5" />
                <ul className="space-y-1.5">
                  {step.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex gap-2 text-xs leading-relaxed text-base-400"
                    >
                      <span aria-hidden className="text-chinook-500">
                        &rsaquo;
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </Panel>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Services — what actually gets built
 * ------------------------------------------------------------------ */

export type Service = {
  title: string;
  body: string;
  examples: readonly string[];
};

export function ServicesSection({
  services,
}: {
  services: readonly Service[];
}) {
  return (
    <Section id="services" className="border-t border-base-700/60">
      <Container>
        <SectionHeading
          index={3}
          eyebrow="What we build"
          title="Boring, high-volume work — done by a machine that stays in your office."
          lede="The wins are rarely glamorous. They're the twelve hours a week your senior people spend on things a well-built system should be doing."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Panel hover key={service.title} className="flex flex-col p-7">
              <h3 className="text-base font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-base-300">
                {service.body}
              </p>
              <Rule className="my-5" />
              <ul className="space-y-2">
                {service.examples.map((ex) => (
                  <li
                    key={ex}
                    className="flex gap-2.5 text-xs leading-relaxed text-base-400"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 h-px w-2.5 shrink-0 bg-chinook-500/70"
                    />
                    {ex}
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Generic CTA
 * ------------------------------------------------------------------ */

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
    <Section className="relative overflow-hidden border-t border-base-700/60">
      <div
        aria-hidden
        className="chinook-arch pointer-events-none absolute inset-x-0 -bottom-1/3 h-[80%] opacity-70"
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Label className="justify-center">{eyebrow}</Label>
          <h2 className="mt-5 text-3xl font-semibold sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-base-300 lg:text-lg">
            {body}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={primary.href}>{primary.label}</Button>
            {secondary && (
              <Button href={secondary.href} variant="secondary">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * FAQ
 * ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

export function FaqSection({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <Section id="faq" className="border-t border-base-700/60">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            index={6}
            eyebrow="Questions"
            title="The things people actually ask."
          />
          <div className="divide-y divide-base-700/60 border-y border-base-700/60">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-medium text-base-100 transition-colors hover:text-base-50">
                  {faq.q}
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden
                    className="mt-1 h-4 w-4 shrink-0 text-base-400 transition-transform duration-300 group-open:rotate-45"
                  >
                    <path
                      d="M8 3v10M3 8h10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-base-300">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
