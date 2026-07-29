import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections";
import {
  Container,
  Label,
  Panel,
  Rule,
  Section,
  SectionHeading,
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
  {
    claim: "\u201cWe are HIA-compliant\u201d",
    why: "Compliance under the Health Information Act is the custodian's status. A vendor cannot hold it on your behalf.",
  },
  {
    claim: "\u201cCertified\u201d or \u201capproved by the Commissioner\u201d",
    why: "The Office of the Information and Privacy Commissioner reviews and comments. It does not certify, approve or accredit AI systems.",
  },
  {
    claim: "\u201cCompliant with Canada's AI law\u201d",
    why: "There is no Canadian AI statute. The Artificial Intelligence and Data Act died on the Order Paper at prorogation on 6 January 2025 and has not been replaced.",
  },
  {
    claim: "\u201cIt's illegal to store Canadian data in the US\u201d",
    why: "False. PIPEDA expressly permits transfers for processing. We will not sell against a premise your own counsel can dismantle in one meeting.",
  },
  {
    claim: "\u201cNo hallucinations\u201d or \u201cguaranteed accurate\u201d",
    why: "Unprovable, and it would convert a known limitation of every language model into a contractual warranty.",
  },
];

export default function ConfidentialityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Confidentiality"
        title="What on-premises actually does for you — and what it doesn't."
        lede="This page is deliberately conservative. The whole proposition only works if every claim on it survives being read by your lawyer."
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <Panel className="border-chinook-500/35 p-8 lg:p-10">
              <Label>The honest framing</Label>
              <blockquote className="mt-6 text-lg leading-relaxed text-base-100 lg:text-xl">
                On-premises AI is not the only lawful option. It is the option
                that removes the largest number of compliance obligations,
                disclosures, third-party dependencies and residual foreign-law
                exposures at once — and for some regulated workloads it is the
                only one a professional can comfortably defend.
              </blockquote>
            </Panel>
            <p className="mt-8 text-base leading-relaxed text-base-300">
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

      <Section className="border-t border-base-700/60">
        <Container>
          <SectionHeading
            eyebrow="The controls"
            title="How the architecture backs the claim."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-base-600/60 bg-base-600/40 md:grid-cols-2 lg:grid-cols-3">
            {controls.map((c) => (
              <div key={c.title} className="bg-base-900 p-7">
                <h3 className="text-sm font-semibold text-base-50">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-base-300">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-base-700/60">
        <Container>
          <SectionHeading
            eyebrow="The register"
            title="Which rules apply to you."
            lede="Current as of 29 July 2026 and reviewed quarterly. This is general information, not legal advice."
          />
          <Panel className="mt-14 overflow-x-auto p-6 lg:p-8">
            <table className="w-full min-w-[52rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-base-600/70">
                  <th scope="col" className="label py-4 pr-6 font-normal">Regime</th>
                  <th scope="col" className="label py-4 pr-6 font-normal">Who it binds</th>
                  <th scope="col" className="label py-4 font-normal">What it means here</th>
                </tr>
              </thead>
              <tbody>
                {regimes.map((r) => (
                  <tr key={r.regime} className="border-b border-base-700/60">
                    <th scope="row" className="py-5 pr-6 align-top text-sm font-semibold whitespace-nowrap text-base-50">
                      {r.regime}
                    </th>
                    <td className="py-5 pr-6 align-top text-sm text-base-300">{r.applies}</td>
                    <td className="py-5 align-top text-sm leading-relaxed text-base-300">{r.effect}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </Container>
      </Section>

      {/* The differentiator: publishing what we refuse to claim */}
      <Section className="border-t border-base-700/60">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading
              eyebrow="What we won't say"
              title="Claims we refuse to make."
              lede="Published deliberately. If a vendor tells you any of the following, ask them to put it in the contract and watch what happens."
            />
            <ul className="space-y-px overflow-hidden rounded-lg border border-base-600/60 bg-base-600/40">
              {cannotClaim.map((c) => (
                <li key={c.claim} className="bg-base-900 p-6">
                  <div className="flex items-start gap-4">
                    <svg viewBox="0 0 20 20" aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-chinook-500">
                      <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M6.8 13.2l6.4-6.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-semibold text-base-50">{c.claim}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-base-300">{c.why}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-base-700/60">
        <Container>
          <Panel className="mx-auto max-w-3xl p-8">
            <Label>Standing disclaimer</Label>
            <Rule className="my-5" />
            <p className="text-sm leading-relaxed text-base-300">
              Everything on this page is general information, not legal advice.
              Compliance obligations rest with your organisation, and you should
              obtain your own advice. Statutory references were verified on{" "}
              {brand.legalReviewDate} and are reviewed quarterly; this area of
              law moved substantially between 2024 and 2026. Nothing here implies
              endorsement by the Office of the Information and Privacy
              Commissioner, the Law Society of Alberta, OSFI, or any court.
            </p>
          </Panel>
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
