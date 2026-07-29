/**
 * Site copy. Sourced from the research corpus in ../../research/.
 *
 * COPY RULES (research/02-compliance.md §11.4) — do not violate:
 *  1. Never claim a status only the client can hold. No "HIA-compliant",
 *     "PIPA-compliant", "certified", "AIDA-compliant". Use "supports",
 *     "is designed for", "removes the obligation to", "we contractually commit to".
 *  2. Cite the statutory section. Specificity is the differentiator here.
 *  3. Date every legal statement; review quarterly.
 *  4. Carry the not-legal-advice disclaimer.
 *  5. Never disparage a competitor's legality. Compare architectures.
 *  6. Never imply endorsement by the OIPC, Law Society, OSFI or any court.
 *
 * Never say "it's illegal to store Canadian data in the US" — it is false
 * (PIPEDA §7.1 permits transfers for processing) and it is the single most
 * damaging thing this business could put in writing.
 */

import type { ProblemItem, Step, Service, Faq } from "@/components/sections";
import type { Tier, Control, Package } from "@/components/specialized";

export const audience = [
  "Engineering & EPC consultancies",
  "Energy operators and oilfield services",
  "Accounting and tax firms",
  "Law firms",
  "Manufacturers",
  "Health clinics",
] as const;

/* ------------------------------------------------------------------ */

export const problems: readonly ProblemItem[] = [
  {
    title: "The tool you'd use is the one you're not allowed to use",
    body: "Your best candidate workflows are the confidential ones — the client file, the reserves data, the patient chart, the draft agreement. Those are exactly the documents that can't be pasted into a public chatbot, so the pilot quietly dies.",
  },
  {
    title: "Your on-prem software is being moved to the cloud without you",
    body: "Document systems that ran in your building are shipping AI features cloud-only, and sunsetting the on-prem version. Firms that deliberately chose local storage for confidentiality reasons are being migrated off it by their own vendors.",
  },
  {
    title: "Nobody can tell you what it would actually cost",
    body: "Cloud AI pricing is per-token and unbounded, so it can't be budgeted. Nobody in this market publishes what a private AI machine costs to buy or to run. You cannot approve a number you've never been shown.",
  },
  {
    title: "The advice you're getting is from people selling seats",
    body: "Most of the local channel is compensated on cloud subscriptions. That is a fine business, but it means the recommendation is decided before the assessment starts, and on-premises is never on the list.",
  },
];

/* ------------------------------------------------------------------ */

export const steps: readonly Step[] = [
  {
    title: "Assess",
    duration: "3 weeks",
    body: "We come in and find the repetitive work, score it on volume, handling time and error cost, and price the top candidates against your own loaded labour rates. You get a straight answer — including if the answer is no.",
    deliverables: [
      "Process inventory, 12–25 candidates",
      "Automation scorecard, ranked",
      "Hours-and-dollars model, yours to keep",
      "Data-egress map per workflow",
    ],
  },
  {
    title: "Specify",
    duration: "In the assessment",
    body: "A reference architecture and an itemised hardware specification at supplier cost, with current quoted prices and real lead times. Costed against doing nothing and against doing it in the cloud.",
    deliverables: [
      "Models, retrieval design, integrations",
      "Itemised BOM at documented cost",
      "Phased plan, fixed prices and dates",
      "Cloud and do-nothing comparison",
    ],
  },
  {
    title: "Build",
    duration: "4–6 weeks",
    body: "We assemble the machine, burn it in, install it, deploy the stack, wire the integration, and run an acceptance test your people signed off on before we started.",
    deliverables: [
      "Hardware built and commissioned",
      "Private model, retrieval, one integration",
      "Signed acceptance test",
      "Runbook and architecture docs",
    ],
  },
  {
    title: "Operate",
    duration: "Ongoing",
    body: "Monitoring, patching, model and runtime updates, backup verification, and output-quality tuning. Systems like this don't fail loudly — they quietly stop being trusted. Care is what prevents that.",
    deliverables: [
      "Monitoring and security patching",
      "Model and runtime updates",
      "Output-quality tuning",
      "Hours-saved reporting",
    ],
  },
];

/* ------------------------------------------------------------------ */

export const services: readonly Service[] = [
  {
    title: "Document intelligence",
    body: "Ask questions across your entire document history and get answers with a citation to the source page. Built over the messy formats you actually have.",
    examples: [
      "Scanned PDFs, faxes and photographed pages",
      "Twenty years of project files and precedents",
      "Every answer cites its source document",
    ],
  },
  {
    title: "Intake and triage",
    body: "New matters, tickets, RFQs and enquiries read, classified, checked for conflicts, and routed with a draft response already attached.",
    examples: [
      "Conflict and duplicate checking",
      "Auto-classification and routing",
      "Draft acknowledgement prepared",
    ],
  },
  {
    title: "Report and proposal drafting",
    body: "First drafts assembled from your own prior work and house templates, so the voice is yours and the precedent is real rather than invented.",
    examples: [
      "Proposals from your winning back-catalogue",
      "Recurring compliance and status reports",
      "Field notes into formatted deliverables",
    ],
  },
  {
    title: "Data extraction",
    body: "Structured fields pulled out of unstructured documents and written into the system that needs them, with a confidence score and a human check on anything marginal.",
    examples: [
      "Invoices, POs and field tickets",
      "Well and equipment records",
      "Contract terms into a register",
    ],
  },
  {
    title: "Regulatory and deadline tracking",
    body: "Recurring filing calendars and obligation registers monitored, with the supporting pack assembled ahead of each deadline instead of the night before.",
    examples: [
      "Monthly reporting calendars",
      "Obligation registers with owners",
      "Evidence packs assembled in advance",
    ],
  },
  {
    title: "The machine to run it on",
    body: "We spec, source, assemble, burn in, install and maintain the hardware. You own it outright. No lease, no lock-in, and we show you the component invoices.",
    examples: [
      "Quiet desk units to redundant rack pairs",
      "Electrical, cooling, UPS and noise planned",
      "Warranty and RMA handled for you",
    ],
  },
];

/* ------------------------------------------------------------------ */

export const controls: readonly Control[] = [
  {
    title: "It physically runs in your building",
    body: "The model weights, the documents and the conversations sit on a machine you own, on your network. There is no inference API call leaving the premises. We give you the network diagram and the egress rules, and you can verify it.",
  },
  {
    title: "On-premises removes a real Alberta obligation",
    body: "Alberta PIPA s.13.1 requires you to notify individuals when personal information is transferred to a service provider outside Canada, and s.6(2) requires your written policies to name those countries. Keeping the workload here removes that obligation rather than merely feeling safer.",
  },
  {
    title: "We never train on your data — as a contract term",
    body: "Not a policy that can change, and not a setting someone can toggle. It is a covenant in the agreement, alongside confidentiality terms that survive the end of the engagement.",
  },
  {
    title: "For Alberta health custodians",
    body: "We sign an Information Manager Agreement meeting HIA s.66 and the content requirements of AR 70/2001 s.7.2, and we prepare the documentation you need for the privacy impact assessment s.64 requires before the system goes live.",
  },
  {
    title: "Version-pinned models that don't shift underneath you",
    body: "Self-hosted open-weight models don't get silently updated by a vendor. The system that passed your acceptance test in March behaves the same way in November — which matters if anyone ever has to validate it.",
  },
  {
    title: "Per-user audit trails",
    body: "Who asked what, which documents were retrieved, what came back, and when. Retention that you set. The evidence you need if a regulator or a client ever asks how the system was used.",
  },
];

/* ------------------------------------------------------------------ */

/**
 * Prices are indicative build cost, hardware only, ex-GST.
 * Source: research/04-hardware.md, priced 2026-07-29 against Canadian
 * retail. Re-price at time of order — GPU and DRAM moved sharply in 2026.
 */
export const tiers: readonly Tier[] = [
  {
    id: "desk",
    name: "Desk",
    tagline: "A quiet box for a small firm",
    users: "2–4",
    runs: "14B dense at Q8, 20–30B MoE, 32K context",
    formFactor: "Sound-dampened mid-tower",
    power: "~300 W",
    priceFrom: "$6,300",
    highlights: [],
  },
  {
    id: "workgroup",
    name: "Workgroup",
    tagline: "A team's daily driver",
    users: "10–30",
    runs: "70B dense at Q4/Q5, 64–128K context",
    formFactor: "Full tower, sound-dampened",
    power: "~1,070 W",
    priceFrom: "$17,900",
    highlights: [],
  },
  {
    id: "department",
    name: "Department",
    tagline: "Serious throughput and long context",
    users: "25–40",
    runs: "70B at FP8, or 120B-class MoE, 128K+",
    formFactor: "Tower or 4U rack",
    power: "~1,400 W · dedicated 20 A circuit",
    priceFrom: "$44,900",
    highlights: [],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Survives a node failure",
    users: "60–100",
    runs: "235B MoE, or 70B FP8 with a large KV cache",
    formFactor: "Two rack nodes, load balanced",
    power: "~2,100 W · 208/240 V",
    priceFrom: "$123,800",
    highlights: [],
  },
];

/* ------------------------------------------------------------------ */

export const packages: readonly Package[] = [
  {
    name: "Private AI Assessment",
    price: "$4,900",
    priceNote:
      "Fixed. Credited in full against any implementation contracted within 90 days.",
    summary:
      "Three weeks inside your business finding the work a private AI system can take off your people — and the work it can't.",
    timeline: "3 weeks",
    includes: [
      "Process inventory of every candidate workflow",
      "Automation scorecard with a ranked shortlist",
      "Hours-and-dollars model at your labour rates",
      "Confidentiality and data-egress map",
      "Reference architecture",
      "Itemised hardware spec at supplier cost",
      "Phased plan with fixed prices and dates",
    ],
    cta: "Book an assessment",
  },
  {
    name: "First Workflow",
    price: "From $22,900",
    priceNote:
      "Plus hardware at documented cost. No markup on hardware — ever.",
    summary:
      "One real workflow, in production, on a machine you own. Not a demo, and not a proof of concept that dies in a sandbox.",
    timeline: "4–6 weeks",
    featured: true,
    includes: [
      "Private model deployed on your hardware",
      "Retrieval with a citation on every answer",
      "One line-of-business integration",
      "Acceptance test signed off by your people",
      "Runbook and architecture documentation",
      "Half-day workshop for up to 15 staff",
      "Two weeks of hypercare after go-live",
    ],
    cta: "Discuss a build",
  },
  {
    name: "Private AI Care",
    price: "From $950",
    priceNote:
      "Per month. Three tiers. 12-month initial term, then month-to-month on 60 days' notice.",
    summary:
      "The difference between a system still earning its keep in year three and one that quietly stopped being trusted in month five.",
    timeline: "Ongoing",
    includes: [
      "Stack and host monitoring",
      "Security patching of the AI layer",
      "Model and runtime updates",
      "Backup verification and DR testing",
      "Output-quality tuning",
      "Hardware warranty and RMA administration",
      "Business review with hours-saved reporting",
    ],
    cta: "See the tiers",
  },
];

/* ------------------------------------------------------------------ */

export const faqs: readonly Faq[] = [
  {
    q: "Is it actually cheaper than paying for ChatGPT or Claude?",
    a: "For ordinary chat-style use across a 30-person firm, no — and we will tell you that in writing. At that volume an API subscription is a few hundred dollars a month and the hardware would take decades to pay back. On-premises wins when your data genuinely cannot leave, when you run sustained agent workloads that consume 10–50× the tokens of chat, or when you need a fixed, budgetable cost instead of an unbounded per-token bill. If none of those are true for you, we would rather say so during the assessment than sell you a machine you don't need.",
  },
  {
    q: "Does this make us compliant?",
    a: "No, and be sceptical of anyone who says it does. Compliance is a status your organisation holds, not something a vendor can hold on your behalf — no one certifies AI systems against Alberta PIPA or the Health Information Act. What on-premises does is remove several obligations outright, such as the PIPA s.13.1 offshore-notification duty, and make the ones that remain straightforward to evidence.",
  },
  {
    q: "Isn't it illegal to put Canadian data in a US cloud?",
    a: "No. PIPEDA expressly permits transfers to a service provider for processing, provided you have a comparable-protection contract and are transparent about it. Anyone telling you otherwise is selling with a false premise. The real arguments for keeping work on-premises are narrower and stronger: specific statutory triggers, professional obligations, contractual residency covenants you already signed, and the fact that no contract can override foreign compulsory process over a foreign-controlled provider.",
  },
  {
    q: "Which AI models do you run?",
    a: "Open-weight models you can hold on your own disk — the current Qwen, Llama, Mistral, Gemma and GPT-OSS families, chosen per workload. We check the licence of every model before it goes near a client system, because several carry commercial restrictions, revenue thresholds or naming obligations that are easy to breach by accident. You get the licence position in writing with the architecture.",
  },
  {
    q: "What happens if you get hit by a bus?",
    a: "Fair question for a small firm, and you should ask it. Everything is documented as we go: a plain-language runbook, the architecture, the credentials in your own vault, and the whole stack built from standard open-source components rather than anything proprietary to us. Your hardware is yours and the system keeps running. Any competent Linux administrator can pick it up, and we will name one in the handover pack.",
  },
  {
    q: "Can we buy the hardware ourselves?",
    a: "Yes. We will give you the itemised specification and you can order it against that spec — then you only pay the Build & Commissioning fee. We don't mark hardware up, so we have no reason to talk you out of it. When we do procure, you see the supplier invoice and a disclosed 5% procurement and currency buffer.",
  },
  {
    q: "Where does the machine physically go?",
    a: "Somewhere it can be locked, ventilated and powered properly. That is a real design question, not an afterthought: the Department tier draws around 1,400 W continuously, which needs its own 20 A circuit and puts out about as much heat as a space heater. We plan the electrical, cooling, noise and physical security before anything is ordered — this is where most self-built deployments come undone.",
  },
  {
    q: "How long until it's doing something useful?",
    a: "Three weeks for the assessment, then four to six weeks for the first workflow plus hardware lead time, which we quote firm at signature rather than estimate. So realistically about two to three months from first conversation to a system your staff are trained on and using.",
  },
];

/* ------------------------------------------------------------------ */

export const founderNote = [
  "I build the machines and I write the software. When you hire Bowstack you are not getting a salesperson who hands you to a delivery team — you are getting the person who will be on your floor with a screwdriver and on your network with a terminal.",
  "That is deliberate. This work sits at a seam that most firms don't staff: it needs someone who can size a power supply and quantise a model and read the Health Information Act. Splitting that across three people is how projects end up as a demo nobody uses.",
  "It also means I say no. If the assessment shows your usage doesn't justify the hardware, or the workflow you had in mind isn't a good candidate, I would rather tell you in week three than sell you a box and lose the referral.",
] as const;
