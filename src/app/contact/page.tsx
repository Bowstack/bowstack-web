import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Container, Label, Panel, Rule, Section } from "@/components/ui";
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
        eyebrow="Contact"
        title="Start with a conversation."
        lede="Tell us what your team spends its week on, or bring the specific obligation that's keeping AI out of your business."
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <Panel className="p-8 lg:p-10">
              <ContactForm />
            </Panel>

            <div>
              <Label>What to expect</Label>
              <ul className="mt-7 space-y-7">
                {expect.map((item, i) => (
                  <li key={item.t}>
                    <h3 className="text-sm font-semibold text-base-50">{item.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-base-300">{item.d}</p>
                    {i < expect.length - 1 && <Rule className="mt-7" />}
                  </li>
                ))}
              </ul>

              <Rule className="my-9" />

              <Label>Direct</Label>
              <div className="mt-5 space-y-2">
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="block font-mono text-sm text-chinook-300 transition-colors hover:text-chinook-200"
                >
                  {brand.contact.email}
                </a>
                <p className="text-sm text-base-400">
                  {brand.city}, {brand.regionCode} — on-site across{" "}
                  {brand.serviceArea}.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
