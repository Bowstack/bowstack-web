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
 * Hardware tiers — the spec-sheet centrepiece
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
      <table className="w-full min-w-[52rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-base-600/70">
            <th scope="col" className="label py-4 pr-6 font-normal">
              Tier
            </th>
            <th scope="col" className="label py-4 pr-6 font-normal">
              Concurrent users
            </th>
            <th scope="col" className="label py-4 pr-6 font-normal">
              Comfortably runs
            </th>
            <th scope="col" className="label py-4 pr-6 font-normal">
              Form factor
            </th>
            <th scope="col" className="label py-4 pr-6 font-normal">
              Draw
            </th>
            <th scope="col" className="label py-4 text-right font-normal">
              From (CAD)
            </th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr
              key={tier.id}
              className="border-b border-base-700/60 transition-colors hover:bg-base-900/70"
            >
              <th scope="row" className="py-5 pr-6 align-top font-normal">
                <div className="text-sm font-semibold text-base-50">
                  {tier.name}
                </div>
                <div className="mt-1 text-xs text-base-400">{tier.tagline}</div>
              </th>
              <td className="py-5 pr-6 align-top font-mono text-sm text-base-200">
                {tier.users}
              </td>
              <td className="py-5 pr-6 align-top text-sm text-base-300">
                {tier.runs}
              </td>
              <td className="py-5 pr-6 align-top text-sm text-base-300">
                {tier.formFactor}
              </td>
              <td className="py-5 pr-6 align-top font-mono text-sm text-base-300">
                {tier.power}
              </td>
              <td className="py-5 text-right align-top font-mono text-sm font-medium text-chinook-300">
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
    <Section id="hardware" className="border-t border-base-700/60">
      <Container>
        <SectionHeading
          index={4}
          eyebrow="The hardware"
          title="Four builds. Priced in the open."
          lede="We spec it, source it, build it, install it, and maintain it. You own the box outright — there is no lease and no lock-in."
        />
        <Panel className="mt-14 p-6 lg:p-8">
          <TierTable tiers={tiers} />
        </Panel>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-base-500">
          Indicative build cost in CAD, hardware only, before installation and
          GST. Component pricing moves constantly — every quote is re-priced at
          time of order against current Canadian channel pricing, and we show
          you the component invoices.
        </p>
        <div className="mt-10">
          <Button href="/hardware" variant="secondary">
            Full specifications and running costs
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Confidentiality — the wedge, stated honestly
 * ------------------------------------------------------------------ */

export type Control = { title: string; body: string };

export function ConfidentialitySection({
  controls,
}: {
  controls: readonly Control[];
}) {
  return (
    <Section
      id="confidentiality"
      className="relative border-t border-base-700/60"
    >
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              index={5}
              eyebrow="Confidentiality"
              title="Nothing leaves the building unless you say so."
              lede="For a lot of firms this is not a preference, it is the reason they have not adopted AI at all. So we engineer for it rather than promise it."
            />
            <div className="mt-10">
              <Button href="/confidentiality" variant="secondary">
                How we handle regulated data
              </Button>
            </div>
          </div>

          <ul className="space-y-px overflow-hidden rounded-lg border border-base-600/60 bg-base-600/40">
            {controls.map((control) => (
              <li key={control.title} className="bg-base-900 p-6">
                <div className="flex items-start gap-4">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden
                    className="mt-0.5 h-5 w-5 shrink-0 text-signal-400"
                  >
                    <path
                      d="M10 2.5l6 2.5v4.6c0 3.6-2.4 6.8-6 7.9-3.6-1.1-6-4.3-6-7.9V5l6-2.5z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.4 10.1l1.9 1.9 3.4-3.7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-base-50">
                      {control.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-base-300">
                      {control.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Packages — productised offers
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

export function PricingSection({
  packages,
}: {
  packages: readonly Package[];
}) {
  return (
    <Section id="pricing" className="border-t border-base-700/60">
      <Container>
        <SectionHeading
          index={7}
          eyebrow="Engagements"
          title="Fixed scope. Fixed price. Start small."
          lede="Every relationship starts with a paid assessment, so you get a real answer and a costed plan before committing to a build."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Panel
              key={pkg.name}
              className={`relative flex flex-col p-8 ${
                pkg.featured
                  ? "border-chinook-500/55 bg-base-850 shadow-[0_0_0_1px_rgba(217,95,24,0.12),0_24px_60px_-30px_rgba(217,95,24,0.4)]"
                  : ""
              }`}
            >
              {pkg.featured && (
                <span className="label absolute -top-2.5 left-8 rounded-full bg-chinook-500 px-2.5 py-1 text-base-950">
                  Most common
                </span>
              )}
              <h3 className="text-lg font-semibold">{pkg.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-base-300">
                {pkg.summary}
              </p>

              <div className="mt-7">
                <div className="font-mono text-3xl font-medium text-base-50">
                  {pkg.price}
                </div>
                <div className="mt-1.5 text-xs text-base-400">
                  {pkg.priceNote}
                </div>
              </div>

              <Rule className="my-7" />

              <div className="label">Includes</div>
              <ul className="mt-4 flex-1 space-y-2.5">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-base-200">
                    <svg
                      viewBox="0 0 16 16"
                      aria-hidden
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-chinook-400"
                    >
                      <path
                        d="M3.5 8.5l3 3 6-6.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <div className="label mb-4">Timeline · {pkg.timeline}</div>
                <Button
                  href="/contact"
                  variant={pkg.featured ? "primary" : "secondary"}
                  className="w-full"
                >
                  {pkg.cta}
                </Button>
              </div>
            </Panel>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Founder note — a solo founder's credibility is personal
 * ------------------------------------------------------------------ */

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
    <Section className="border-t border-base-700/60">
      <Container>
        <Panel className="overflow-hidden">
          <div className="grid gap-10 p-9 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:p-14">
            <div>
              <Label index={8}>Who you work with</Label>
              <h2 className="mt-5 text-2xl font-semibold lg:text-3xl">
                {name}
              </h2>
              <p className="mt-2 text-sm text-chinook-300">{role}</p>
            </div>
            <div className="space-y-4">
              {paragraphs.map((p) => (
                <p key={p} className="text-base leading-relaxed text-base-300">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Panel>
      </Container>
    </Section>
  );
}
