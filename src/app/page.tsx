import { Hero, AudienceBar } from "@/components/hero";
import {
  ProblemSection,
  ApproachSection,
  ServicesSection,
  FaqSection,
  FounderSection,
  CtaSection,
} from "@/components/sections";
import {
  HardwareSection,
  ConfidentialitySection,
  PricingSection,
} from "@/components/specialized";
import { brand } from "@/content/brand";
import {
  audience,
  problems,
  steps,
  services,
  controls,
  tiers,
  packages,
  faqs,
  founderNote,
} from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <AudienceBar items={audience} />
      <ProblemSection items={problems} />
      <ApproachSection steps={steps} />
      <ServicesSection services={services} />
      <HardwareSection tiers={tiers} />
      <ConfidentialitySection controls={controls} />
      <PricingSection packages={packages} />
      <FaqSection faqs={faqs} />
      <FounderSection
        name={brand.founder.name}
        role={brand.founder.role}
        paragraphs={founderNote}
      />
      <CtaSection
        eyebrow="Start here"
        title="Find out what you could automate."
        body="Three weeks, a fixed fee, and a costed plan at the end of it. If the honest answer is that you shouldn't do this, that's what the report will say."
        primary={{ href: "/contact", label: "Book an assessment" }}
        secondary={{ href: "/hardware", label: "See the hardware first" }}
      />
    </>
  );
}
