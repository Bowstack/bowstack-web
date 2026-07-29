import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections";
import {
  Anno,
  Container,
  Section,
  Sheet,
  TitleBlock,
} from "@/components/ui";
import { brand } from "@/content/brand";
import { controls } from "@/content/site";

export const metadata: Metadata = {
  title: "Confidentiality",
  description:
    "What on-premises AI actually does for your obligations under Alberta PIPA, the Health Information Act and professional conduct rules — and, just as importantly, what it does not do.",
};

/** Sourced from research/02-compliance.md. Every row verified 2026-07-29. */
const regimes = [
  {
    regime: "Alberta PIPA",
    applies: "Most Alberta private-sector organisations",
    effect:
      "s.13.1 requires notifying individuals when personal information goes to a service provider outside Canada; s.6(2) requires your written policies to name those countries. Keeping the workload on-premises removes both obligations.",
  },
  {
    regime: "Health Information Act",
    applies:
      "Physicians, dentists, pharmacies, physiotherapists, chiropractors, optometrists and other custodians",
    effect:
      "s.66 requires an Information Manager Agreement with the content set by AR 70/2001 s.7.2 before a vendor may handle health information. s.64 requires a privacy impact assessment submitted to the Commissioner before the system goes live.",
  },
  {
    regime: "Law Society of Alberta",
    applies: "Alberta lawyers and their firms",
    effect:
      "Confidentiality under the Code of Conduct is the binding duty, and it survives the retainer indefinitely. The Law Society's February 2026 generative AI guidance addresses internal and proprietary AI platforms as a way to meet it.",
  },
  {
    regime: "OSFI B-10 / B-13 / E-23",
    applies: "Federally regulated financial institutions and their vendors",
    effect:
      "Third-party risk, technology risk, and — from 1 May 2027 — model risk management that expressly covers AI/ML. A version-pinned self-hosted stack is materially easier to inventory, explain and validate than a hosted model that changes underneath you.",
  },
  {
    regime: "Protection of Privacy Act",
    applies: "Alberta public bodies and their suppliers",
    effect:
      "Replaced the private-sector-facing half of FOIP. Contains express automated-system provisions, and s.60(4)–(5) makes it an offence to disclose in response to a foreign order from a body with no jurisdiction in Alberta.",
  },
  {
    regime: "PIPEDA",
    applies: "Federal works, and interprovincial or international transactions",
    effect:
      "Permits transfers to a service provider for processing, including outside Canada, given comparable protection and transparency. This is why we do not claim offshore processing is unlawful.",
  },
];

const cannotClaim = [
  { claim: "\u201cWe are HIA-compliant\u201d", why: "Compliance under the Health Information Act is the custodian's status. A vendor cannot hold it on your behalf." },
  { claim: "\u201cCertified\u201d or \u201capproved by the Commissioner\u201d", why: "The Office of the Information and Privacy Commissioner reviews and comments. It does not certify, approve or accredit AI systems." },
  { claim: "\u201cCompliant with Canada's AI law\u201d", why: "There is no Canadian AI statute. The Artificial Intelligence and Data Act died on the Order Paper at prorogation on 6 January 2025 and has not been replaced." },
  { claim: "\u201cIt's illegal to store Canadian data in the US\u201d", why: "False. PIPEDA expressly permits transfers for processing. We will not sell against a premise your own counsel can dismantle in one meeting." },
  { claim: "\u201cNo hallucinations\u201d or \u201cguaranteed accurate\u201d", why: "Unprovable, and it would convert a known limitation of every language model into a contractual warranty." },
];

export default function ConfidentialityPage() {
  return (
    <>
      <PageHeader
        sheet="Sheet C-01"
        eyebrow="Containment"
        title="What on-premises actually does — and what it doesn't."
        lede="This page is deliberately conservative. The whole proposition only works if every claim on it survives being read by your lawyer."
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="redline pl-6">
              <Anno className="text-oxide-600">General note</Anno>
              <blockquote className="mt-4 font-display text-2xl leading-snug font-medium text-ink-900 lg:text-[1.75rem]">
                On-premises AI is not the only lawful option. It is the option
                that removes the largest number of compliance obligations,
                disclosures, third-party dependencies and residual foreign-law
                exposures at once — and for some regulated workloads it is the
                only one a professional can comfortably defend.
              </blockquote>
            </div>
            <p className="mt-8 text-base leading-relaxed text-ink-600">
              A great deal of AI marketing implies that sending data across the
              border is unlawful. It is not, and a buyer who acts on that advice
              is being badly served. What is true is narrower, and stronger: for
              specific obligations, specific professional duties, and specific
              files, keeping the work in your building removes exposure that no
              contract can remove.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-vellum-400 bg-vellum-100">
        <Container>
          <TitleBlock
            eyebrow="Controls"
            title="How the architecture backs the claim."
          />
          <dl className="mt-12 grid gap-x-14 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {controls.map((c) => (
              <div key={c.title} className="redline pl-5">
                <dt className="font-display text-base font-semibold text-ink-900">
                  {c.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-600">
                  {c.body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section className="border-t border-vellum-400">
        <Container>
          <TitleBlock
            sheet="Sheet C-02"
            eyebrow="Applicable standards"
            title="Which rules apply to you."
            lede="Current as of 29 July 2026 and reviewed quarterly. This is general information, not legal advice."
          />
          <Sheet inset className="mt-12 overflow-x-auto p-6 lg:p-8">
            <table className="w-full min-w-[52rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink-800">
                  <th scope="col" className="anno py-3 pr-6 font-normal">Regime</th>
                  <th scope="col" className="anno py-3 pr-6 font-normal">Who it binds</th>
                  <th scope="col" className="anno py-3 font-normal">What it means here</th>
                </tr>
              </thead>
              <tbody>
                {regimes.map((r) => (
                  <tr key={r.regime} className="border-b border-vellum-300 align-top">
                    <th scope="row" className="py-5 pr-6 font-display text-sm font-semibold whitespace-nowrap text-ink-900">
                      {r.regime}
                    </th>
                    <td className="py-5 pr-6 text-sm text-ink-600">{r.applies}</td>
                    <td className="py-5 text-sm leading-relaxed text-ink-600">{r.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Sheet>
        </Container>
      </Section>

      {/* The differentiator: publishing what we refuse to claim */}
      <Section className="border-t border-vellum-400 bg-vellum-100">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <TitleBlock
              eyebrow="Deviations"
              title="Claims we refuse to make."
              lede="Published deliberately. If a vendor tells you any of the following, ask them to put it in the contract and watch what happens."
            />
            <ul className="divide-y divide-vellum-300 border-y border-vellum-400">
              {cannotClaim.map((c) => (
                <li key={c.claim} className="py-5">
                  <div className="flex items-start gap-4">
                    <span aria-hidden className="mt-1 font-mono text-sm text-oxide-600">
                      ✕
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink-900">
                        {c.claim}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                        {c.why}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-vellum-400">
        <Container>
          <Sheet className="mx-auto max-w-3xl p-7">
            <Anno>Standing disclaimer</Anno>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              Everything on this page is general information, not legal advice.
              Compliance obligations rest with your organisation, and you should
              obtain your own advice. Statutory references were verified on{" "}
              {brand.legalReviewDate} and are reviewed quarterly; this area of law
              moved substantially between 2024 and 2026. Nothing here implies
              endorsement by the Office of the Information and Privacy
              Commissioner, the Law Society of Alberta, OSFI, or any court.
            </p>
          </Sheet>
        </Container>
      </Section>

      <CtaSection
        eyebrow="Talk it through"
        title="Bring your hardest question."
        body="The ones worth asking are usually specific: this file, this obligation, this regulator. Those are the conversations we want."
        primary={{ href: "/contact", label: "Get in touch" }}
        secondary={{ href: "/hardware", label: "See the hardware" }}
      />
    </>
  );
}
