/**
 * Single source of truth for brand identity.
 * Every name/domain/contact string on the site resolves from here,
 * so a rename is a one-file edit.
 *
 * Name selected 2026-07-29 against research/08-name-availability.md:
 * zero CIPO trademark records, zero federal corporations, .ca/.ai/.io
 * unregistered (verified via CIRA and IdentityDigital RDAP), GitHub org free.
 */

export const brand = {
  name: "Bowstack",
  short: "Bow",
  legal: "Bowstack Technologies Ltd.",
  domain: "bowstack.ca",
  url: "https://bowstack.ca",

  tagline: "AI that never leaves the building.",

  blurb:
    "We find the work your business can automate, build the AI that does it, and run it on hardware you own — so nothing confidential ever leaves your network.",

  /**
   * Home market. The brand name is deliberately NOT geographic, so opening a
   * second market is a change to these four fields plus `serviceArea` and
   * `seoRegions` below — not a rebrand. Statutory content on /confidentiality
   * is Alberta-specific by nature and should be ADDED to, not replaced, when
   * a new province comes online.
   */
  city: "Calgary",
  region: "Alberta",
  regionCode: "AB",
  country: "Canada",

  /** Phrase used wherever coverage is described in prose. */
  serviceArea: "the Calgary region",

  /** Feeds metadata keywords. Extend per market rather than rewriting copy. */
  seoRegions: ["Calgary", "Alberta"],

  founder: {
    name: "Yassin Soliman",
    role: "Founder & Principal Engineer",
    github: "https://github.com/yassinsolim",
  },

  contact: {
    email: "info@bowstack.ca",
    /** Placeholder — replace before launch. */
    phone: "",
  },

  social: {
    github: "https://github.com/yassinsolim",
    linkedin: "",
  },

  /** Displayed with legal statements. Every regulatory fact is dated. */
  legalReviewDate: "29 July 2026",
} as const;

export const nav = [
  { label: "Approach", href: "/#approach" },
  { label: "What we build", href: "/#services" },
  { label: "Hardware", href: "/hardware" },
  { label: "Confidentiality", href: "/confidentiality" },
  { label: "Engagements", href: "/#pricing" },
] as const;
