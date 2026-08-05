import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Anno, Container, Section, Sheet } from "@/components/ui";
import { brand } from "@/content/brand";

export const metadata: Metadata = {
  title: "Privacy and data handling",
  description:
    "What the Bowstack extension accesses, what it sends, where it goes, and how long it is kept.",
  robots: { index: true, follow: true },
};

/**
 * Chrome Web Store requires a reachable privacy policy disclosing what user
 * data is handled, why, and every party it is shared with.
 *
 * Ported from PRIVACY.md in the extension repo. Keep the two in sync and do
 * not soften the specifics — the accuracy is the point:
 *  - PDF bytes stay local; EXTRACTED TEXT does leave. Never blur that.
 *  - Name every recipient: Cloud Run, OpenAI, Firestore (Montréal).
 *  - Keep the 30-day OpenAI abuse-monitoring caveat.
 *  - Describe only what ships today. No future provider migrations.
 */

const EFFECTIVE = "5 August 2026";

type Block = { h: string; body: readonly (string | readonly string[])[] };

const sections: readonly Block[] = [
  {
    h: "What the extension accesses",
    body: [
      [
        "A PDF you explicitly select. The extension never scans your disk or opens a file on its own.",
        "The blank or active Mitchell Connect Create New Job form.",
        "Rendered Mitchell Estimating rows and reviewed draft controls, used to compare and stage parsed PDF lines.",
        "Only the repaircenterca.mymitchell.com/connect and /estimating pages declared in the manifest.",
        "Text extracted from the PDF after you select it for import.",
        "In an intake-enabled build, customer forms submitted from the shop tablet and the staff queue used to claim, review, release and complete them.",
      ],
    ],
  },
  {
    h: "What leaves your computer, and what does not",
    body: [
      "This is the distinction that matters most, so it is stated plainly.",
      [
        "The PDF file itself never leaves your computer. Text is extracted in the browser using PDF.js, and the PDF bytes stay in the content script.",
        "Before the PDF picker opens, Bowstack displays an in-product disclosure and requires you to choose whether to continue.",
        "After you acknowledge that disclosure and select a PDF, the extracted text does leave. Bowstack sends that text — not the file — through the Bowstack AI service running on Google Cloud Run, to OpenAI, for parsing into structured fields.",
      ],
      "The service processes the text transiently. It does not intentionally log request bodies or parsed results, does not persist claim content, and sets store: false on the API request. Infrastructure access logs may retain request metadata such as timestamp, status and latency. The OpenAI API key is held in Google Secret Manager and is never returned to the extension.",
      "OpenAI states that data sent to its API is not used to train its models unless the API organization opts in. Bowstack has not opted in. OpenAI's default abuse-monitoring logs may retain customer content for up to 30 days unless the project is approved and configured for Zero Data Retention.",
    ],
  },
  {
    h: "What the extension does not do",
    body: [
      [
        "No analytics or telemetry of any kind.",
        "No advertising, profiling, or remote OCR.",
        "No cookie access and no network interception.",
        "No access to your Mitchell credentials. The extension works only inside the session you are already signed in to.",
        "No persistent storage of selected PDFs or their parsed drafts.",
        "No automatic Save & Next, and no automatic job submission.",
        "No automatic estimate Commit or Mark as Final.",
      ],
    ],
  },
  {
    h: "Where parsed data is held",
    body: [
      "Parsed values sit in memory-backed chrome.storage.session, keyed to the current tab, so Contact data can carry through to Vehicle and Insurance across route changes and background-worker suspension.",
      "Closing the tab, restarting the browser, or reloading the extension clears that draft. It is never written to persistent local or sync storage.",
    ],
  },
  {
    h: "Optional customer-intake feature",
    body: [
      "Where a shop has configured the optional tablet intake, the tablet sends structured customer, contact, vehicle, payment, police-sticker and request information to a separate intake service. That service stores the submission so authorised staff can retrieve it from another device, prevents duplicates through idempotency keys, and records queue status changes. Printable PDFs are generated on demand from the saved record.",
      "The managed deployment stores intake records in a dedicated Firestore database in Montréal, Canada. Records become eligible for deletion 30 days after submission; completing a record resets that to 30 days after completion. Firestore performs TTL deletion typically within 24 hours of eligibility, but does not guarantee a deletion deadline.",
      "Kiosk credentials can create records only. Separately authorised staff credentials can list, print, claim, release and complete them. The extension stores the staff intake access code and workstation label in chrome.storage.local; it does not store queue records in the browser. System notifications contain only an aggregate count — never names, contact details, vehicle details, notes or claim information.",
    ],
  },
  {
    h: "Parties your data may be shared with",
    body: [
      "In full, and no others:",
      [
        "Google Cloud Run — hosts the Bowstack AI service that relays extracted text.",
        "OpenAI — performs the extraction from the text.",
        "Google Cloud Firestore (Montréal, Canada) — stores intake records, only where the optional intake feature is enabled.",
      ],
      "Data is not sold, not used for advertising or profiling, and not made available for human review by the developer.",
    ],
  },
  {
    h: "Chrome Web Store Limited Use disclosure",
    body: [
      "Bowstack's use of information received from Chrome APIs and from the Mitchell Connect page adheres to the Chrome Web Store User Data Policy, including the Limited Use requirements. Data is used only to provide the PDF review, customer-intake queue and form-filling features you invoke. Transfer to OpenAI occurs only to provide field extraction, after you acknowledge the disclosure and select a PDF.",
    ],
  },
  {
    h: "Your shop's own obligations",
    body: [
      "Collision documents contain personal and insurance information, and your shop — not Bowstack — is the organisation accountable for it under applicable privacy law. Use production documents only where authorised, follow your own retention and access policies, and confirm that use of browser automation is permitted under your Mitchell agreement.",
      "Because extracted text is processed outside Canada under the current configuration, Alberta shops should review their obligations under the Personal Information Protection Act, including the s.13.1 notification duty and the s.6(2) requirement that written policies name the countries involved. This is general information, not legal advice; obtain your own.",
    ],
  },
  {
    h: "Contact",
    body: [
      `Questions about this policy, or a request concerning data handled by the extension, can be sent to ${brand.contact.email}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        sheet={`Effective ${EFFECTIVE}`}
        eyebrow="Privacy and data handling"
        title="What we touch, what we send, and where it goes."
        lede="Written to be specific rather than reassuring. If a sentence here could be read two ways, treat that as a bug and tell us."
      />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <Sheet className="mb-12 p-6">
              <Anno className="text-oxide-600">Independent software</Anno>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Bowstack is not affiliated with, endorsed by, or sponsored by
                Mitchell International, Inc. or Enlyte. &ldquo;Mitchell
                Connect&rdquo; is referenced only to state what this extension is
                compatible with.
              </p>
            </Sheet>

            <div className="space-y-12">
              {sections.map((s) => (
                <section key={s.h}>
                  <h2 className="font-display text-xl font-semibold text-ink-900">
                    {s.h}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {s.body.map((part, i) =>
                      Array.isArray(part) ? (
                        <ul key={i} className="space-y-2">
                          {part.map((li) => (
                            <li
                              key={li}
                              className="flex gap-3 text-sm leading-relaxed text-ink-600"
                            >
                              <span
                                aria-hidden
                                className="mt-2 h-px w-3 shrink-0 bg-oxide-600"
                              />
                              {li}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p
                          key={i}
                          className="text-sm leading-relaxed text-ink-600"
                        >
                          {part as string}
                        </p>
                      ),
                    )}
                  </div>
                </section>
              ))}
            </div>

            <Sheet className="mt-14 p-6">
              <Anno>Revision</Anno>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Effective {EFFECTIVE}. This policy is reviewed whenever the data
                flow changes. If the inference provider or processing region
                changes, this page is updated before the change ships.
              </p>
            </Sheet>
          </div>
        </Container>
      </Section>
    </>
  );
}
