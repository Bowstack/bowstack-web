/**
 * Site copy.
 *
 * CLAIM RULES — load-bearing, not stylistic:
 *  1. No unmeasured outcome claims. No hours saved, dollars saved, cycle-time
 *     or DRP-scorecard improvement until Cosmos has measured them. Time is the
 *     mechanism; do not promise the consequence.
 *  2. Data flow stated precisely: PDF bytes stay local, EXTRACTED TEXT leaves.
 *     Never blur those. Retention and logging are still under audit — do not
 *     assert what has not been verified.
 *  3. Pricing is a pilot price, not an established rate card.
 *  4. The import allowance is a plan term, NOT yet enforced in code. Never
 *     describe it as a technical guarantee.
 *  5. Mitchell appears only as a factual compatibility statement, and
 *     brand.nonAffiliation must be visible on every page that names it.
 */

export const audience = [
  "Independent collision shops",
  "Multi-shop operators",
  "Estimators and CSRs",
  "Shops running Mitchell Connect",
] as const;

/* ------------------------------------------------------------------ */

export type ProblemItem = { title: string; body: string };

export const problems: readonly ProblemItem[] = [
  {
    title: "The estimate arrives as a PDF",
    body: "Not a data file. A rendered document. Someone has to read it and type it back into Mitchell — line by line, on every job.",
  },
  {
    title: "The line items are the real work",
    body: "Contact and vehicle are a dozen fields. A LABOR/PART table is fifty to a hundred and fifty rows, each with an operation, a part, a quantity and a price.",
  },
  {
    title: "Typing introduces errors nobody catches until later",
    body: "A transposed VIN, a wrong paint code, a missed sublet. The cost shows up downstream as a wrong part, a repaint, or a supplement.",
  },
  {
    title: "Your estimator is the bottleneck",
    body: "The person you most need writing estimates and handling supplements is instead doing data entry.",
  },
];

/* ------------------------------------------------------------------ */

export type Step = { n: string; title: string; body: string };

export const steps: readonly Step[] = [
  {
    n: "01",
    title: "Open the job in Mitchell",
    body: "Bowstack adds an Import PDF button beside Mitchell's own controls. Nothing else about your workflow changes.",
  },
  {
    n: "02",
    title: "Pick the insurer PDF",
    body: "The one already sitting in your inbox. Text is extracted in your browser — the PDF file itself never leaves your computer.",
  },
  {
    n: "03",
    title: "Review what it found",
    body: "Detected values are shown before anything is written. Unresolved vehicle details are flagged for you rather than guessed at.",
  },
  {
    n: "04",
    title: "You click Save",
    body: "Bowstack fills the visible step and stops. It never clicks Save & Next, Done, Commit, or Mark as Final. Those stay yours.",
  },
];

/* ------------------------------------------------------------------ */

export type FillGroup = { title: string; note: string; items: readonly string[] };

export const fills: readonly FillGroup[] = [
  {
    title: "Contact",
    note: "Owner and claim parties",
    items: ["Name and address", "Phone and email", "Claim and policy numbers"],
  },
  {
    title: "Vehicle",
    note: "Handles the async controls",
    items: [
      "VIN with decode",
      "Redbook selection through delayed renders",
      "Paint code with autosuggest matching",
      "Province and production month",
    ],
  },
  {
    title: "Insurance",
    note: "Carrier entity matching, not free text",
    items: [
      "Carrier matched to the platform's own list",
      "Deductible and payer",
      "Inspection site and repair facility",
    ],
  },
  {
    title: "Estimate line items",
    note: "The part that actually takes the time",
    items: [
      "LABOR and PART rows staged as drafts",
      "Operation, quantity, price, tax flags",
      "Existing estimator edits preserved",
      "Duplicate rows skipped on resume",
    ],
  },
];

/* ------------------------------------------------------------------ */

export type Control = { title: string; body: string };

export const controls: readonly Control[] = [
  {
    title: "The PDF never leaves your computer",
    body: "Text is extracted in your browser with PDF.js. The file itself is never uploaded to us or to anyone else.",
  },
  {
    title: "The extracted text does leave — here is where it goes",
    body: "It is sent through our access-controlled service on Google Cloud Run to a hosted language model, which returns structured fields. We state this plainly, because a vendor who is vague about it is hiding something.",
  },
  {
    title: "We never train on your data",
    body: "Not a toggle. The API request sets store: false, and we have not opted into any training programme.",
  },
  {
    title: "No credentials, ever",
    body: "Bowstack works inside the session you are already signed in to. It never sees, stores or transmits your username or password.",
  },
  {
    title: "Nothing is submitted on your behalf",
    body: "Fill-only by design. Every Save, Commit and Mark as Final is a human decision — which is also what makes it defensible to your insurer partners.",
  },
  {
    title: "No analytics, no advertising, no resale",
    body: "There is no telemetry in the extension. Your claim data is not a product we sell, profile, or share beyond the processors named in our privacy policy.",
  },
];

/* ------------------------------------------------------------------ */

export type Package = {
  name: string;
  price: string;
  priceNote: string;
  summary: string;
  includes: readonly string[];
  featured?: boolean;
  cta: string;
};

export const packages: readonly Package[] = [
  {
    name: "Pilot",
    price: "$349",
    priceNote: "per location, for 30 days. Then month to month.",
    summary:
      "One shop, one month, real jobs. We watch it work on your documents and measure what it actually does before either of us commits.",
    featured: true,
    includes: [
      "Install and setup with your team",
      "Runs on your real insurer PDFs",
      "Direct line to the person who built it",
      "We measure minutes per import and correction rate",
      "Walk away at the end of the month",
    ],
    cta: "Start a pilot",
  },
  {
    name: "Per location",
    price: "$349",
    priceNote:
      "per location, per month. Plan allowance of 100 imports; further imports $3 each.",
    summary:
      "Unlimited staff at the location. Priced where the claims are keyed, not per seat, so nobody has to ration logins.",
    includes: [
      "Unlimited users at that location",
      "Claim and estimate import",
      "Updates as the platform's interface changes",
      "Support direct from the developer",
      "Month to month, no lock-in",
    ],
    cta: "Talk to us",
  },
  {
    name: "Multi-shop",
    price: "Let's talk",
    priceNote: "Five or more locations, invoiced centrally.",
    summary:
      "Pooled allowance across locations, one invoice, and a rollout that does not leave each shop to sort itself out.",
    includes: [
      "Pooled import allowance",
      "Central billing and reporting",
      "Coordinated rollout across sites",
      "Named point of contact",
    ],
    cta: "Get in touch",
  },
];

/** Shown under the pricing table. Honesty about what these numbers are. */
export const pricingNote =
  "Introductory pilot pricing while we build a measured case study, and it may change for later customers. The import allowance is a plan term we reconcile on your invoice, not a hard technical cut-off — if you go over, we talk to you before anything changes.";

/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

export const faqs: readonly Faq[] = [
  {
    q: "How much time does this actually save?",
    a: "We are not going to quote a number we have not measured. Re-keying a hundred-line estimate takes what it takes at your shop, and it varies by document and by estimator. That is what the pilot is for: we measure minutes per import and the correction rate on your real jobs, and you decide from your own numbers rather than ours.",
  },
  {
    q: "Does it just paste text into the fields?",
    a: "No, and that distinction is most of the work. The vehicle and carrier controls are searchable entities, not text boxes. Bowstack drives the actual controls — VIN decode, Redbook selection, paint-code autosuggest, carrier matching — and follows them through the delayed re-renders that make manual entry tedious in the first place.",
  },
  {
    q: "What happens when the platform changes its interface?",
    a: "It breaks, and we fix it. That is the honest answer for anything built on a system whose vendor does not publish an integration. We run an automated test suite against the real interface to catch breakage quickly, and maintenance is included in the monthly price rather than billed as a surprise.",
  },
  {
    q: "Is my customer data safe?",
    a: "The PDF file never leaves your computer. The text extracted from it is sent to our service and on to a hosted language model to be turned into structured fields — we say that plainly rather than implying nothing leaves. We do not train on it, we do not sell it, and we never touch your credentials. The full data flow, including which processors are involved, is on our privacy page.",
  },
  {
    q: "Are you affiliated with Mitchell?",
    a: "No. Bowstack is independent software, not affiliated with, endorsed by, or sponsored by Mitchell International, Inc. or Enlyte. We name Mitchell Connect only to say what Bowstack is compatible with. You should also confirm that third-party tooling is permitted under your own agreement with them — we would rather you check than assume.",
  },
  {
    q: "What if it gets something wrong?",
    a: "You will see it, because nothing is submitted without you. Values are shown for review before they are written, unresolved vehicle details are flagged rather than guessed, and Bowstack never clicks Save. It is a faster first draft, not an unattended robot.",
  },
];

/* ------------------------------------------------------------------ */

export const founderNote = [
  "I build this myself. When you email Bowstack you get the person who wrote the code, not a queue.",
  "It exists because a Calgary shop asked for it. They were retyping insurer estimates every day and wanted it to stop, so I built the thing that stops it, and it has been running on their real jobs since.",
  "That also means I will tell you when it is not a fit. If your carriers already send structured files, or your volume is low enough that the maths does not work, I would rather say so in week one than sell you a subscription you quietly resent.",
] as const;
