import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections";
import { TierTable } from "@/components/specialized";
import {
  Container,
  Label,
  Panel,
  Rule,
  Section,
  SectionHeading,
  Stat,
} from "@/components/ui";
import { tiers } from "@/content/site";

export const metadata: Metadata = {
  title: "Hardware",
  description:
    "Four build tiers for on-premises AI, priced in the open against Canadian retail. What each one runs, what it draws, and where buying loses to renting.",
};

/** research/04-hardware.md §2.2 — tok/s are bandwidth-derived, not benchmarked. */
const vramRows = [
  { vram: "24 GB", model: "14B dense, 20–30B MoE", quant: "Q4 / MXFP4", ctx: "32K", users: "2–4" },
  { vram: "32 GB", model: "32B dense", quant: "Q4_K_M", ctx: "32–64K", users: "5–10" },
  { vram: "48 GB", model: "32B at Q8, or 70B at Q4", quant: "Q8 / Q4", ctx: "64K", users: "8–15" },
  { vram: "64 GB", model: "70B dense", quant: "Q4 / Q5", ctx: "64–128K", users: "15–25" },
  { vram: "96 GB", model: "70B at FP8, 120B-class MoE", quant: "FP8 / MXFP4", ctx: "128K+", users: "25–40" },
  { vram: "128 GB", model: "235B MoE, or 70B FP8 with large KV", quant: "FP8 / MXFP4", ctx: "256K", users: "60–100" },
];

const constraints = [
  {
    title: "Electrical",
    body: "The Canadian Electrical Code limits a continuous load to 80% of the circuit rating. A standard 15 A / 120 V office outlet gives you about 1,440 W usable, which the Department tier will exceed. That means a dedicated circuit, and above it, 208/240 V — an electrician, not an extension cord.",
  },
  {
    title: "Heat",
    body: "Every watt in becomes a watt of heat: BTU/h = W × 3.412. The Department tier puts roughly 4,800 BTU/h into the room, continuously. A closet without return air will cook it and throttle your throughput.",
  },
  {
    title: "Altitude",
    body: "Calgary sits at 1,045 m, so air is about 11% less dense and air cooling is correspondingly less effective — a detail most integrators miss. The upside is roughly seven months a year of viable free cooling.",
  },
  {
    title: "Noise",
    body: "A dual-GPU tower under a reception desk is a mistake you make once. Sound-dampened chassis and power limiting keep the smaller tiers office-liveable; the larger ones need a room with a door.",
  },
  {
    title: "Physical security",
    body: "You are claiming data never leaves the building. An unencrypted NVMe drive in an unlocked tower makes that claim false, and a privacy auditor will say so. Full-disk encryption and a locked space are part of the build, not extras.",
  },
  {
    title: "Power protection",
    body: "Size the UPS on watts, not VA, at roughly 1.25× steady-state load. The goal is a clean shutdown, not riding out an outage — a half-written model file is its own kind of downtime.",
  },
];

export default function HardwarePage() {
  return (
    <>
      <PageHeader
        eyebrow="Hardware"
        title="Four builds, priced in the open."
        lede="Nobody in this market publishes what a private AI machine costs. So here it is — the tiers, what they run, what they draw, and the case where buying one is the wrong decision."
      />

      <Section>
        <Container>
          <Panel className="p-6 lg:p-8">
            <TierTable tiers={tiers} />
          </Panel>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-base-500">
            Indicative build cost in CAD, hardware only, before installation and
            GST, priced against Canadian retail on 29 July 2026. GPU and memory
            pricing moved sharply through 2026 — quotes are re-priced at time of
            order and held firm for seven days.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-base-700/60">
        <Container>
          <SectionHeading
            eyebrow="Sizing"
            title="What fits in how much memory."
            lede="Three numbers decide the tier: the largest model you need, how many people hit it at once, and whether they're chatting or running agents."
          />
          <Panel className="mt-12 overflow-x-auto p-6 lg:p-8">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-base-600/70">
                  <th scope="col" className="label py-4 pr-6 font-normal">Memory</th>
                  <th scope="col" className="label py-4 pr-6 font-normal">Largest sensible model</th>
                  <th scope="col" className="label py-4 pr-6 font-normal">Precision</th>
                  <th scope="col" className="label py-4 pr-6 font-normal">Context</th>
                  <th scope="col" className="label py-4 font-normal">Concurrent chat users</th>
                </tr>
              </thead>
              <tbody>
                {vramRows.map((row) => (
                  <tr key={row.vram} className="border-b border-base-700/60">
                    <th scope="row" className="py-4 pr-6 font-mono text-sm font-medium text-chinook-300">
                      {row.vram}
                    </th>
                    <td className="py-4 pr-6 text-sm text-base-200">{row.model}</td>
                    <td className="py-4 pr-6 font-mono text-xs text-base-400">{row.quant}</td>
                    <td className="py-4 pr-6 font-mono text-sm text-base-300">{row.ctx}</td>
                    <td className="py-4 font-mono text-sm text-base-300">{row.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-base-500">
            Concurrency figures assume bursty chat use, not agents running in a
            loop — agentic workloads consume 10–50× the tokens. We size against
            what the assessment actually measured, not headcount. Throughput is
            benchmarked on your build before any number goes into a contract.
          </p>
        </Container>
      </Section>

      {/* The honest economics — this section is the trust builder */}
      <Section className="border-t border-base-700/60">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="The honest part"
                title="When buying one is the wrong call."
                lede="A 30-person firm doing ordinary document Q&A generates around 63 million tokens a month. On a commercial API that is roughly $300 a month. Against the Department tier, the payback period is measured in decades."
              />
              <div className="mt-10 grid grid-cols-2 gap-8">
                <Stat value="~$300" label="Monthly API cost" note="30-person firm, chat-style use" />
                <Stat value="~42%" label="Utilisation break-even" note="vs dedicated cloud GPU rental" />
              </div>
              <p className="mt-10 text-sm leading-relaxed text-base-300">
                We would rather lose the hardware sale than sell you a machine
                that sits idle. If your usage stays at chat volumes and your data
                can lawfully leave, an API subscription is the better buy, and
                the assessment will say so in writing.
              </p>
            </div>

            <Panel className="p-8 lg:p-10">
              <Label>Buy the box when</Label>
              <ul className="mt-7 space-y-7">
                {[
                  {
                    t: "Your data genuinely cannot leave",
                    d: "A statutory trigger, a professional obligation, a residency covenant you already signed, or a file where residual foreign-law exposure isn't defensible.",
                  },
                  {
                    t: "You're running agents, not chat",
                    d: "Sustained agentic workloads consume 10–50× the tokens. At 30× the same firm's API bill becomes the dominant cost and the arithmetic inverts.",
                  },
                  {
                    t: "You need a number you can budget",
                    d: "Capex plus a known monthly is approvable. An unbounded per-token bill that scales with staff enthusiasm is not.",
                  },
                  {
                    t: "Utilisation is genuinely high",
                    d: "Above roughly 42% sustained utilisation, owning beats renting dedicated cloud GPU. Below it, rent — and we'll help you rent.",
                  },
                ].map((item, i) => (
                  <li key={item.t}>
                    <div className="flex gap-4">
                      <span className="font-mono text-xs text-chinook-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-base-50">{item.t}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-base-300">{item.d}</p>
                      </div>
                    </div>
                    {i < 3 && <Rule className="mt-7" />}
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-base-700/60">
        <Container>
          <SectionHeading
            eyebrow="Installation"
            title="The part that sinks self-built deployments."
            lede="The machine is the easy bit. Where these projects fail is the room it goes in."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-base-600/60 bg-base-600/40 md:grid-cols-2 lg:grid-cols-3">
            {constraints.map((c) => (
              <div key={c.title} className="bg-base-900 p-7">
                <h3 className="text-sm font-semibold text-base-50">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-base-300">{c.body}</p>
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
