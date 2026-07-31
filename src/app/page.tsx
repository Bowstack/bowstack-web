import { Hero, AudienceBar } from "@/components/hero";
import {
  ProblemSection,
  HowSection,
  FillsSection,
  DataSection,
  PricingSection,
  FaqSection,
  FounderSection,
  CtaSection,
  NonAffiliation,
} from "@/components/sections";
import { brand } from "@/content/brand";
import {
  audience,
  problems,
  steps,
  fills,
  controls,
  packages,
  pricingNote,
  faqs,
  founderNote,
} from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <AudienceBar items={audience} />
      <ProblemSection items={problems} />
      <HowSection steps={steps} />
      <FillsSection groups={fills} />
      <DataSection controls={controls} />
      <PricingSection packages={packages} note={pricingNote} />
      <FaqSection faqs={faqs} />
      <FounderSection
        name={brand.founder.name}
        role={brand.founder.role}
        paragraphs={founderNote}
      />
      <CtaSection
        eyebrow="Next step"
        title="Bring one of your own PDFs."
        body="Fifteen minutes, your document, your Mitchell. If it does not handle your carriers well, that is a useful thing for both of us to find out early."
        primary={{ href: "/contact", label: "Book a demo" }}
        secondary={{ href: "/security", label: "How your data is handled" }}
      />
      <NonAffiliation />
    </>
  );
}
