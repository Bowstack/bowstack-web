import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Anno, Container, Section, Sheet } from "@/components/ui";
import { brand } from "@/content/brand";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 15-minute demo with one of your own insurer PDFs, or ask how Bowstack handles your data.",
};

const expect = [
  {
    t: "A demo, not a pitch deck",
    d: "We run it on a PDF you supply, live. You will see exactly what it gets right and what it flags for review.",
  },
  {
    t: "A straight answer on fit",
    d: "If your carriers already send structured files, or your volume is too low for the maths to work, we will say so.",
  },
  {
    t: "No pressure to commit",
    d: "The pilot is month to month. If it is not earning its keep after thirty days, walk away.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Request for information"
        title="Bring one of your own PDFs."
        lede="Fifteen minutes on your document and your Mitchell. If it does not handle your carriers well, that is worth finding out early."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <Sheet className="p-7 lg:p-9">
              <ContactForm />
            </Sheet>

            <div>
              <Anno className="text-oxide-600">What to expect</Anno>
              <dl className="mt-5 divide-y divide-vellum-300 border-y border-vellum-400">
                {expect.map((item) => (
                  <div key={item.t} className="py-4">
                    <dt className="font-display text-base font-semibold text-ink-900">
                      {item.t}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink-600">
                      {item.d}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9">
                <Anno className="text-oxide-600">Direct</Anno>
                <div className="mt-4 space-y-2">
                  <a
                    href={`mailto:${brand.contact.email}`}
                    className="block font-mono text-sm text-ink-800 transition-colors hover:text-oxide-600"
                  >
                    {brand.contact.email}
                  </a>
                  <p className="text-sm text-ink-500">
                    {brand.city}, {brand.regionCode} — on-site across{" "}
                    {brand.serviceArea}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
