import type { ReactNode } from "react";
import {
  Anno,
  Button,
  Container,
  Section,
  Sheet,
  TitleBlock,
} from "@/components/ui";
import { brand } from "@/content/brand";
import type { ProblemItem, Step, FillGroup, Control, Package, Faq } from "@/content/site";

/* ------------------------------------------------------------------ */

export function ProblemSection({ items }: { items: readonly ProblemItem[] }) {
  return (
    <Section id="problem">
      <Container>
        <TitleBlock
          eyebrow="The job nobody wants"
          title="Somebody at your shop retypes the estimate."
          lede="Every claim, every day. It is the least skilled thing your most skilled people do."
        />
        <div className="mt-12 grid gap-x-12 gap-y-9 md:grid-cols-2">
          {items.map((item, i) => (
            <div key={item.title} className="redline pl-5">
              <Anno>{String.fromCharCode(65 + i)}</Anno>
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

/* ------------------------------------------------------------------ */

export function HowSection({ steps }: { steps: readonly Step[] }) {
  return (
    <Section id="how" className="border-t border-vellum-400 bg-vellum-100">
      <Container>
        <TitleBlock
          eyebrow="How it works"
          title="Four steps, and the last one is yours."
          lede="Bowstack stops at the point of decision, every time. It fills; you approve."
        />
        <ol className="mt-12 grid gap-px overflow-hidden border border-vellum-400 bg-vellum-400 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.n} className="flex flex-col bg-vellum-50 p-6">
              <span className="font-mono text-2xl font-medium text-oxide-600">
                {step.n}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function FillsSection({ groups }: { groups: readonly FillGroup[] }) {
  return (
    <Section id="fills" className="border-t border-vellum-400">
      <Container>
        <TitleBlock
          eyebrow="What it fills"
          title="Including the part that actually takes the time."
          lede="Contact and vehicle are a dozen fields. The line-item table is where the hour goes, and it is the reason this exists."
        />
        <div className="mt-12 divide-y divide-vellum-300 border-y border-vellum-400">
          {groups.map((g) => (
            <div
              key={g.title}
              className="grid gap-4 py-7 md:grid-cols-[14rem_1fr] md:gap-10"
            >
              <div>
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                <Anno className="mt-1.5 block">{g.note}</Anno>
              </div>
              <ul className="space-y-1.5 md:pt-1">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-ink-600"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-px w-3 shrink-0 bg-oxide-600"
                    />
                    {item}
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

export function DataSection({ controls }: { controls: readonly Control[] }) {
  return (
    <Section id="data" className="border-t border-vellum-400 bg-vellum-100">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <TitleBlock
              eyebrow="Your data"
              title="Stated plainly, including the awkward part."
              lede="Most vendors imply nothing leaves. Something does, and you should know exactly what."
            />
            <div className="mt-9">
              <Button href="/security" variant="line">
                Full data handling
              </Button>
            </div>
          </div>
          <dl className="divide-y divide-vellum-300 border-y border-vellum-400">
            {controls.map((c) => (
              <div key={c.title} className="py-5">
                <dt className="font-display text-base font-semibold text-ink-900">
                  {c.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-600">
                  {c.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function PricingSection({
  packages,
  note,
}: {
  packages: readonly Package[];
  note: string;
}) {
  return (
    <Section id="pricing" className="border-t border-vellum-400">
      <Container>
        <TitleBlock
          eyebrow="Pricing"
          title="Per location. Month to month."
          lede="Priced where the claims are keyed. No per-seat counting, no annual lock-in, no setup fee."
        />
        <div className="mt-12 grid gap-px border border-vellum-400 bg-vellum-400 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col p-7 lg:p-8 ${
                pkg.featured ? "bg-vellum-50" : "bg-vellum-100"
              }`}
            >
              {pkg.featured && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 bg-oxide-600"
                />
              )}
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold">{pkg.name}</h3>
                {pkg.featured && <Anno className="text-oxide-600">Start here</Anno>}
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                {pkg.summary}
              </p>
              <div className="mt-7 border-t border-vellum-300 pt-5">
                <div className="font-mono text-[1.75rem] leading-none font-medium text-ink-900">
                  {pkg.price}
                </div>
                <div className="mt-2 text-xs leading-relaxed text-ink-500">
                  {pkg.priceNote}
                </div>
              </div>
              <ul className="mt-6 flex-1 space-y-2">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-ink-700">
                    <span
                      aria-hidden
                      className="mt-2 h-px w-2.5 shrink-0 bg-ink-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-vellum-300 pt-5">
                <Button
                  href="/contact"
                  variant={pkg.featured ? "solid" : "line"}
                  className="w-full"
                >
                  {pkg.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ink-500">
          {note}
        </p>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function FaqSection({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <Section id="faq" className="border-t border-vellum-400 bg-vellum-100">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <TitleBlock eyebrow="Questions" title="The ones shops actually ask." />
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
              <Anno className="text-oxide-600">Who builds it</Anno>
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

/** Required on every page that names Mitchell. */
export function NonAffiliation() {
  return (
    <div className="border-t border-vellum-400 bg-vellum-200">
      <Container className="py-6">
        <p className="mx-auto max-w-4xl text-center text-xs leading-relaxed text-ink-500">
          {brand.nonAffiliation}
        </p>
      </Container>
    </div>
  );
}
