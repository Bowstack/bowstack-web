import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Anno, Container, Section, Sheet } from "@/components/ui";
import { brand } from "@/content/brand";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a Private AI Assessment, or bring a specific question about keeping AI work inside your building.",
};

const expect = [
  {
    t: "A conversation, not a pitch deck",
    d: "Thirty minutes on what your team actually spends its week doing. If there's nothing worth automating, that is a fine outcome and we'll say so.",
  },
  {
    t: "A straight answer on cost",
    d: "Including when a cloud subscription is the better buy. We publish hardware prices and we don't mark hardware up, so there's no incentive to oversize you.",
  },
  {
    t: "No obligation to buy hardware",
    d: "Plenty of good outcomes involve no machine at all. The assessment is written to be useful even if you never engage us again.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Request for information"
        title="Start with a conversation."
        lede="Tell us what your team spends its week on, or bring the specific obligation that's keeping AI out of your business."
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
