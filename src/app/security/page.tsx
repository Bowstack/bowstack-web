import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { CtaSection, NonAffiliation } from "@/components/sections";
import { Anno, Container, Section, Sheet } from "@/components/ui";
import { brand } from "@/content/brand";
import { controls } from "@/content/site";

export const metadata: Metadata = {
  title: "Your data",
  description:
    "Exactly what Bowstack reads, what leaves your computer, where it goes, and what we will not claim.",
};

const flow = [
  {
    n: "01",
    where: "Your computer",
    what: "You select a PDF. Text is extracted in the browser with PDF.js. The PDF file itself never leaves the machine.",
  },
  {
    n: "02",
    where: "Bowstack service — Google Cloud Run",
    what: "The extracted text is sent to our access-controlled service. It is processed in transit and not intentionally persisted. Access logs may retain metadata such as timestamp, status and latency.",
  },
  {
    n: "03",
    where: "Hosted language model",
    what: "The text is sent to the model to be turned into structured fields, with store: false set on the request. We have not opted into any training programme. The provider's own abuse-monitoring logs may retain content for up to 30 days.",
  },
  {
    n: "04",
    where: "Back in your browser",
    what: "Parsed values are held in memory for the current tab only and shown to you for review. Closing the tab clears them. Nothing is written to your job until you approve it.",
  },
];

const wontClaim = [
  {
    claim: "\u201cYour data never leaves your computer\u201d",
    why: "The PDF does not. The text extracted from it does. Conflating those two is the most common misleading claim in this category, and we will not make it.",
  },
  {
    claim: "\u201cWe are compliant with Alberta PIPA\u201d",
    why: "Compliance is a status your shop holds, not one a vendor can hold for you. We can describe our data flow accurately so your own assessment is easy; we cannot confer a status.",
  },
  {
    claim: "\u201cCertified\u201d or \u201cbank-grade security\u201d",
    why: "We hold no certification for this product. Naming actual controls is more useful than a phrase that invites a questionnaire we would then have to survive.",
  },
  {
    claim: "\u201cGuaranteed accurate extraction\u201d",
    why: "No language model guarantees that, which is exactly why Bowstack is fill-only and shows you every value before it is written.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your data"
        title="What leaves, what doesn't, and what we won't claim."
        lede="Written to be checkable rather than reassuring. If any sentence here reads two ways, tell us and we will fix it."
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <Anno className="text-oxide-600">The flow, end to end</Anno>
            <ol className="mt-6 divide-y divide-vellum-300 border-y border-vellum-400">
              {flow.map((s) => (
                <li key={s.n} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-lg font-medium text-oxide-600">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink-900">
                      {s.where}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                      {s.what}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-vellum-400 bg-vellum-100">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Anno className="text-oxide-600">Controls</Anno>
            <dl className="mt-6 grid gap-x-12 gap-y-7 sm:grid-cols-2">
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
          </div>
        </Container>
      </Section>

      <Section className="border-t border-vellum-400">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Anno className="text-oxide-600">What we will not claim</Anno>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              Published deliberately. If another vendor tells you any of the
              following, ask them to put it in the contract.
            </p>
            <ul className="mt-6 divide-y divide-vellum-300 border-y border-vellum-400">
              {wontClaim.map((c) => (
                <li key={c.claim} className="py-5">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="mt-1 font-mono text-sm text-oxide-600"
                    >
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

            <Sheet className="mt-12 p-6">
              <Anno>Under review</Anno>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                We are auditing our own request logs, error traces and retention
                settings, and will update this page and the{" "}
                <Link href="/privacy" className="text-oxide-600 underline">
                  privacy policy
                </Link>{" "}
                with what that audit finds. We would rather publish a correction
                than leave a claim standing that we have not verified. Last
                reviewed {brand.legalReviewDate}.
              </p>
            </Sheet>
          </div>
        </Container>
      </Section>

      <CtaSection
        eyebrow="Ask the hard one"
        title="Bring your toughest data question."
        body="The specific ones are the good ones: this carrier, this document, this obligation. Those are the conversations worth having."
        primary={{ href: "/contact", label: "Get in touch" }}
        secondary={{ href: "/privacy", label: "Read the privacy policy" }}
      />
      <NonAffiliation />
    </>
  );
}
