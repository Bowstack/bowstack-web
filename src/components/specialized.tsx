import {
  Anno,
  Button,
  Container,
  Dimension,
  Section,
  Sheet,
  TitleBlock,
} from "@/components/ui";

/* ------------------------------------------------------------------ *
 * Hardware — a specification table, drawn like one
 * ------------------------------------------------------------------ */

export type Tier = {
  id: string;
  name: string;
  tagline: string;
  priceFrom: string;
  users: string;
  runs: string;
  formFactor: string;
  power: string;
  highlights: readonly string[];
};

export function TierTable({ tiers }: { tiers: readonly Tier[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[54rem] border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-ink-800">
            <th scope="col" className="anno py-3 pr-6 font-normal">Unit</th>
            <th scope="col" className="anno py-3 pr-6 font-normal">Users</th>
            <th scope="col" className="anno py-3 pr-6 font-normal">Comfortably runs</th>
            <th scope="col" className="anno py-3 pr-6 font-normal">Form factor</th>
            <th scope="col" className="anno py-3 pr-6 font-normal">Draw</th>
            <th scope="col" className="anno py-3 text-right font-normal">From (CAD)</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr key={tier.id} className="border-b border-vellum-300 align-top">
              <th scope="row" className="py-5 pr-6 font-normal">
                <div className="font-display text-base font-semibold text-ink-900">
                  {tier.name}
                </div>
                <div className="mt-0.5 text-xs text-ink-500">{tier.tagline}</div>
              </th>
              <td className="py-5 pr-6 font-mono text-sm text-survey-600">{tier.users}</td>
              <td className="py-5 pr-6 text-sm text-ink-600">{tier.runs}</td>
              <td className="py-5 pr-6 text-sm text-ink-600">{tier.formFactor}</td>
              <td className="py-5 pr-6 font-mono text-sm text-ink-600">{tier.power}</td>
              <td className="py-5 text-right font-mono text-sm font-medium text-oxide-600">
                {tier.priceFrom}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HardwareSection({ tiers }: { tiers: readonly Tier[] }) {
  return (
    <Section id="hardware" className="border-t border-vellum-400 bg-vellum-100">
      <Container>
        <TitleBlock
          sheet="Sheet H-01"
          eyebrow="Equipment schedule"
          title="Four builds. Priced in the open."
          lede="We spec it, source it, build it, install it and maintain it. You own the machine outright — no lease, no lock-in, and you see the component invoices."
        />

        <Sheet inset className="mt-12 p-6 lg:p-8">
          <TierTable tiers={tiers} />
        </Sheet>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-ink-500">
            Indicative build cost in CAD, hardware only, before installation and
            GST. Component pricing moves constantly — every quote is re-priced at
            time of order against current Canadian channel pricing.
          </p>
          <Dimension label="Rev. A · 2026-07-29" className="w-56 shrink-0" />
        </div>

        <div className="mt-10">
          <Button href="/hardware" variant="line">
            Full specifications and running costs
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Confidentiality
 * ------------------------------------------------------------------ */

export type Control = { title: string; body: string };

export function ConfidentialitySection({
  controls,
}: {
  controls: readonly Control[];
}) {
  return (
    <Section id="confidentiality" className="border-t border-vellum-400">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <TitleBlock
              eyebrow="Containment"
              title="Nothing leaves the building unless you say so."
              lede="For a lot of firms this is not a preference, it is the reason they have not adopted AI at all. So we engineer for it rather than promise it."
            />
            <div className="mt-9">
              <Button href="/confidentiality" variant="line">
                How we handle regulated data
              </Button>
            </div>
          </div>

          <dl className="divide-y divide-vellum-300 border-y border-vellum-400">
            {controls.map((control) => (
              <div key={control.title} className="py-5">
                <dt className="font-display text-base font-semibold text-ink-900">
                  {control.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-600">
                  {control.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Engagements
 * ------------------------------------------------------------------ */

export type Package = {
  name: string;
  price: string;
  priceNote: string;
  summary: string;
  timeline: string;
  includes: readonly string[];
  featured?: boolean;
  cta: string;
};

export function PricingSection({ packages }: { packages: readonly Package[] }) {
  return (
    <Section id="pricing" className="border-t border-vellum-400 bg-vellum-100">
      <Container>
        <TitleBlock
          eyebrow="Engagements"
          title="Fixed scope. Fixed price. Start small."
          lede="Every relationship starts with a paid assessment, so you get a real answer and a costed plan before committing to a build."
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
                {pkg.featured && <Anno className="text-oxide-600">Most common</Anno>}
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

              <div className="mt-6">
                <Anno>Includes</Anno>
                <ul className="mt-3 flex-1 space-y-2">
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
              </div>

              <div className="mt-7 flex-1" />

              <div className="border-t border-vellum-300 pt-5">
                <Anno className="mb-4 block">Duration · {pkg.timeline}</Anno>
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
      </Container>
    </Section>
  );
}
