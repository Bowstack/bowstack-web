import { brand } from "@/content/brand";
import { Anno, Button, Container } from "@/components/ui";

/**
 * Signature element. Every industrial machine in Alberta carries a
 * stamped nameplate: model, serial, rating, origin. This company sells
 * AI as owned capital equipment, so the hero *is* that plate — and the
 * last row is the whole pitch.
 */
const plateRows = [
  { k: "Model", v: "Workgroup / 64 GB" },
  { k: "Serial", v: "BSK-0000-YYC" },
  { k: "Rated", v: "1,070 W @ 120 V" },
  { k: "Installed", v: "Your premises" },
  { k: "Owner", v: "You" },
  { k: "Egress", v: "None", accent: true },
] as const;

function Nameplate() {
  return (
    <figure className="relative w-full max-w-sm">
      <div className="nameplate relative px-7 py-6">
        <span className="rivet top-2.5 left-2.5" />
        <span className="rivet top-2.5 right-2.5" />
        <span className="rivet bottom-2.5 left-2.5" />
        <span className="rivet bottom-2.5 right-2.5" />

        <div className="flex items-baseline justify-between gap-4 border-b border-white/12 pb-3">
          <span className="engraved font-display text-base font-semibold tracking-wide">
            {brand.name.toUpperCase()}
          </span>
          <span className="engraved-dim font-mono text-[0.5625rem] tracking-[0.18em]">
            PRIVATE INFERENCE UNIT
          </span>
        </div>

        <dl className="mt-4 space-y-2.5">
          {plateRows.map((row, i) => (
            <div
              key={row.k}
              className="etch-row flex items-baseline gap-3"
              style={{ animationDelay: `${180 + i * 85}ms` }}
            >
              <dt className="engraved-dim w-20 shrink-0 font-mono text-[0.625rem] tracking-[0.14em] uppercase">
                {row.k}
              </dt>
              <span
                aria-hidden
                className="h-px flex-1 bg-white/10"
              />
              <dd
                className={`font-mono text-xs ${
                  "accent" in row && row.accent
                    ? "font-medium text-oxide-500"
                    : "engraved"
                }`}
              >
                {row.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <figcaption className="anno mt-3 text-center">
        Fig. 1 — Representative unit
      </figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-vellum-400">
      <div
        aria-hidden
        className="drafting-grid-lg mask-fade-b pointer-events-none absolute inset-0"
      />

      <Container className="relative py-16 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <Anno className="text-oxide-600">
                {brand.city}, {brand.regionCode}
              </Anno>
              <span aria-hidden className="h-px w-8 bg-vellum-400" />
              <Anno>Taking new clients</Anno>
            </div>

            <h1 className="mt-7 font-display text-[2.75rem] leading-[0.98] font-semibold sm:text-6xl lg:text-[4.5rem]">
              The AI your business
              <br />
              needs, on hardware
              <br />
              <span className="text-oxide-600">you own.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-600">
              We find the work your team shouldn&rsquo;t be doing by hand, build
              the AI that does it, and install it in your building — so nothing
              confidential ever leaves your network.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">Book an assessment</Button>
              <Button href="/#approach" variant="line">
                See how it works
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Nameplate />
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Ruled strip naming the trades this is built for. */
export function AudienceBar({ items }: { items: readonly string[] }) {
  return (
    <div className="border-b border-vellum-400 bg-vellum-100">
      <Container className="py-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
          <Anno className="shrink-0 text-oxide-600">Built for</Anno>
          <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
            {items.map((item) => (
              <li key={item} className="text-sm text-ink-600">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
