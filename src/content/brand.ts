/**
 * Single source of truth for brand identity.
 *
 * Positioning note (2026-07-31): Bowstack is one brand covering both the
 * company and its first product. The company thesis is workflow automation
 * for vertical software that has no usable API; collision repair is the
 * beachhead, not the definition. Keep company-level copy free of
 * collision-specific language so a second vertical does not require a rebrand.
 */

export const brand = {
  name: "Bowstack",
  short: "Bowstack",
  legal: "Bowstack Technologies Ltd.",
  domain: "bowstack.ca",
  url: "https://bowstack.ca",

  tagline: "Start the repair, not the re-keying.",

  blurb:
    "Bowstack turns the insurer PDF you already received into a review-ready Mitchell Connect draft — contact, vehicle, insurance and estimate line items. You review every field and click Save yourself.",

  /** Company-level line. Survives a second vertical. */
  companyLine:
    "Workflow automation for the software your industry actually runs on.",

  city: "Calgary",
  region: "Alberta",
  regionCode: "AB",
  country: "Canada",

  serviceArea: "Alberta",
  seoRegions: ["Calgary", "Alberta", "Canada"],

  founder: {
    name: "Yassin Soliman",
    role: "Founder",
    github: "https://github.com/yassinsolim",
  },

  contact: {
    email: "info@bowstack.ca",
    phone: "",
  },

  social: {
    github: "https://github.com/Bowstack",
    linkedin: "",
  },

  /** Required wherever Mitchell is named. Not optional. */
  nonAffiliation:
    "Bowstack is independent software. Not affiliated with, endorsed by, or sponsored by Mitchell International, Inc. or Enlyte. \u201cMitchell Connect\u201d is referenced only to state what Bowstack is compatible with.",

  legalReviewDate: "31 July 2026",
} as const;

export const nav = [
  { label: "How it works", href: "/#how" },
  { label: "What it fills", href: "/#fills" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Your data", href: "/security" },
] as const;
