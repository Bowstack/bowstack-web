import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections";
import { TierTable } from "@/components/specialized";
import {
  Anno,
  Button,
  Callout,
  Container,
  Dimension,
  Figure,
  Section,
  Sheet,
  TitleBlock,
} from "@/components/ui";
import { tiers } from "@/content/site";

export const metadata: Metadata = {
  title: "Hardware",
  description:
    "Four build tiers for on-premises AI, priced in the open against Canadian retail. What each one runs, what it draws, and where buying loses to renting.",
};

/** research/04-hardware.md §2.2 — tok/s bandwidth-derived, not benchmarked. */
const vramRows = [
  { vram: "24 GB", model: "14B dense, 20–30B MoE", quant: "Q4 / MXFP4", ctx: "32K", users: "2–4" },
  { vram: "32 GB", model: "32B dense", quant: "Q4_K_M", ctx: "32–64K", users: "5–10" },
  { vram: "48 GB", model: "32B at Q8, or 70B at Q4", quant: "Q8 / Q4", ctx: "64K", users: "8–15" },
  { vram: "64 GB", model: "70B dense", quant: "Q4 / Q5", ctx: "64–128K", users: "15–25" },
  { vram: "96 GB", model: "70B at FP8, 120B-class MoE", quant: "FP8 / MXFP4", ctx: "128K+", users: "25–40" },
  { vram: "128 GB", model: "235B MoE, or 70B FP8 + large KV", quant: "FP8 / MXFP4", ctx: "256K", users: "60–100" },
];

const constraints = [
  { mark: "E", title: "Electrical", body: "The Canadian Electrical Code limits a continuous load to 80% of the circuit rating. A standard 15 A / 120 V office outlet gives about 1,440 W usable, which the Department tier exceeds. That means a dedicated circuit — and above it, 208/240 V and an electrician." },
  { mark: "H", title: "Heat", body: "Every watt in becomes a watt of heat: BTU/h = W × 3.412. The Department tier puts roughly 4,800 BTU/h into the room, continuously. A closet with no return air will cook it and throttle your throughput." },
  { mark: "A", title: "Altitude", body: "Calgary sits at 1,045 m, so air is about 11% less dense and air cooling is correspondingly less effective — a detail most integrators miss. The upside is roughly seven months a year of viable free cooling." },
  { mark: "N", title: "Noise", body: "A dual-GPU tower under a reception desk is a mistake you make once. Sound-dampened chassis and power limiting keep the smaller tiers office-liveable; the larger ones need a room with a door." },
  { mark: "S", title: "Security", body: "You are claiming data never leaves the building. An unencrypted drive in an unlocked tower makes that claim false, and a privacy auditor will say so. Full-disk encryption and a locked space are part of the build." },
  { mark: "U", title: "Power protection", body: "Size the UPS on watts, not VA, at roughly 1.25× steady-state load. The goal is a clean shutdown, not riding out an outage — a half-written model file is its own kind of downtime." },
];

export default function HardwarePage() {
  return (
    <>
      <PageHeader
        sheet="Sheet H-01"
        eyebrow="Equipment schedule"
        title="Four builds, priced in the open."
        lede="Nobody in this market publishes what a private AI machine costs. So here it is — the tiers, what they run, what they draw, and the case where buying one is the wrong decision."
      />

      <Section>
        <Container>
          <Sheet inset className="p-6 lg:p-8">
            <TierTable tiers={tiers} />
          </Sheet>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-xs leading-relaxed text-ink-500">
              Indicative build cost in CAD, hardware only, before installation
              and GST, priced against Canadian retail on 29 July 2026. GPU and
              memory pricing moved sharply through 2026 — quotes are re-priced at
              time of order and held firm for seven days.
            </p>
            <Dimension label="Rev. A · 2026-07-29" className="w-56 shrink-0" />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-vellum-400 bg-vellum-100">
        <Container>
          <TitleBlock
            sheet="Sheet H-02"
            eyebrow="Sizing"
            title="What fits in how much memory."
            lede="Three numbers pick the tier: the largest model you need, how many people hit it at once, and whether they're chatting or running agents."
          />
          <Sheet inset className="mt-12 overflow-x-auto p-6 lg:p-8">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-ink-800">
                  <th scope="col" className="anno py-3 pr-6 font-normal">Memory</th>
                  <th scope="col" className="anno py-3 pr-6 font-normal">Largest sensible model</th>
                  <th scope="col" className="anno py-3 pr-6 font-normal">Precision</th>
                  <th scope="col" className="anno py-3 pr-6 font-normal">Context</th>
                  <th scope="col" className="anno py-3 font-normal">Concurrent chat</th>
                </tr>
              </thead>
              <tbody>
                {vramRows.map((row) => (
                  <tr key={row.vram} className="border-b border-vellum-300">
                    <th scope="row" className="py-4 pr-6 font-mono text-sm font-medium text-oxide-600">
                      {row.vram}
                    </th>
                    <td className="py-4 pr-6 text-sm text-ink-700">{row.model}</td>
                    <td className="py-4 pr-6 font-mono text-xs text-ink-500">{row.quant}</td>
                    <td className="py-4 pr-6 font-mono text-sm text-ink-600">{row.ctx}</td>
                    <td className="py-4 font-mono text-sm text-survey-600">{row.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Sheet>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ink-500">
            Concurrency assumes bursty chat, not agents in a loop — agentic
            workloads consume 10–50× the tokens. We size against what the
            assessment measured, not headcount. Throughput is benchmarked on your
            build before any number goes into a contract.
          </p>
        </Container>
      </Section>

      {/* The honest economics — the trust section */}
      <Section className="border-t border-vellum-400">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <TitleBlock
                eyebrow="Load calculation"
                title="When buying one is the wrong call."
                lede="A 30-person firm doing ordinary document Q&A generates about 63 million tokens a month. On a commercial API that is roughly $300. Against the Department tier, the payback period runs to decades."
              />
              <div className="mt-10 grid grid-cols-2 gap-8">
                <Figure value="~$300" label="Monthly API cost" note="30-person firm, chat-style use" tone="survey" />
                <Figure value="~42%" label="Utilisation break-even" note="vs dedicated cloud GPU rental" tone="survey" />
              </div>
              <p className="mt-9 text-sm leading-relaxed text-ink-600">
                We would rather lose the hardware sale than sell you a machine
                that sits idle. If your usage stays at chat volumes and your data
                can lawfully leave, an API subscription is the better buy — and
                the assessment will say so in writing.
              </p>
            </div>

            <Sheet className="p-8 lg:p-10">
              <Anno className="text-oxide-600">Buy the box when</Anno>
              <div className="mt-7 space-y-6">
                <Callout mark="1">
                  <strong className="font-semibold text-ink-900">Your data genuinely cannot leave.</strong>{" "}
                  A statutory trigger, a professional obligation, a residency
                  covenant you already signed, or a file where residual
                  foreign-law exposure isn&rsquo;t defensible.
                </Callout>
                <Callout mark="2">
                  <strong className="font-semibold text-ink-900">You&rsquo;re running agents, not chat.</strong>{" "}
                  Sustained agentic workloads consume 10–50× the tokens. At 30×
                  the same firm&rsquo;s API bill becomes the dominant cost and the
                  arithmetic inverts.
                </Callout>
                <Callout mark="3">
                  <strong className="font-semibold text-ink-900">You need a number you can budget.</strong>{" "}
                  Capex plus a known monthly is approvable. An unbounded
                  per-token bill that scales with staff enthusiasm is not.
                </Callout>
                <Callout mark="4">
                  <strong className="font-semibold text-ink-900">Utilisation is genuinely high.</strong>{" "}
                  Above roughly 42% sustained utilisation, owning beats renting
                  dedicated cloud GPU. Below it, rent — and we&rsquo;ll help you
                  rent.
                </Callout>
              </div>
            </Sheet>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-vellum-400 bg-vellum-100">
        <Container>
          <TitleBlock
            sheet="Sheet H-03"
            eyebrow="Installation notes"
            title="The part that sinks self-built deployments."
            lede="The machine is the easy bit. Where these projects fail is the room it goes in."
          />
          <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {constraints.map((c) => (
              <div key={c.title}>
                <Callout mark={c.mark}>
                  <strong className="block font-display text-base font-semibold text-ink-900">
                    {c.title}
                  </strong>
                  <span className="mt-1.5 block">{c.body}</span>
                </Callout>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        eyebrow="Next step"
        title="Get a specification with real prices."
        body="The assessment produces an itemised bill of materials at supplier cost, with current quoted prices and honest lead times — plus the cloud comparison, so you can see both."
        primary={{ href: "/contact", label: "Book an assessment" }}
        secondary={{ href: "/confidentiality", label: "How we handle regulated data" }}
      />
    </>
  );
}
