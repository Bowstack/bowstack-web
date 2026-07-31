import { brand } from "@/content/brand";
import { Anno, Button, Container } from "@/components/ui";

/**
 * Signature element: the transformation itself.
 *
 * Left is what arrives — a dense, rendered insurer document. Right is what
 * Bowstack produces — reviewable structured fields. The demo is the sale, so
 * the hero shows the demo rather than describing it.
 *
 * Content is synthetic. Never put a real claim fragment here.
 */

const rawLines = [
  "CLAIM# 4471-889021   POLICY 88-C-40182",
  "INSURED  A. NGUYEN   403-555-0148",
  "2199 EDMONTON TR NE, CALGARY AB T2E 3M2",
  "2021 TOYOTA RAV4 XLE AWD  VIN 2T3P1RFV1MW......",
  "PAINT 1F7 CLASSIC SILVER MET.",
  "",
  "LN OP    DESCRIPTION            QTY   PRICE",
  "01 REPL  BUMPER COVER FRT       1.0   412.55",
  "02 R&I   GRILLE ASSY            1.0    88.00",
  "03 REFN  BUMPER COVER FRT       2.4   ......",
  "04 REPL  ABSORBER FRT BUMPER    1.0    96.20",
];

const filled = [
  { k: "Owner", v: "A. Nguyen", ok: true },
  { k: "Phone", v: "403-555-0148", ok: true },
  { k: "Claim", v: "4471-889021", ok: true },
  { k: "Vehicle", v: "2021 Toyota RAV4 XLE", ok: true },
  { k: "Paint", v: "1F7 — Classic Silver Met.", ok: true },
  { k: "Line items", v: "47 rows staged", ok: true },
  { k: "Trim", v: "needs review", ok: false },
];

function Transformation() {
  return (
    <figure className="w-full">
      <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr]">
        {/* what arrives */}
        <div className="sheet overflow-hidden p-4">
          <Anno className="mb-3 block">Insurer PDF</Anno>
          <pre className="overflow-hidden font-mono text-[0.5rem] leading-[1.5] whitespace-pre text-ink-500 sm:text-[0.5625rem]">
            {rawLines.join("\n")}
          </pre>
        </div>

        {/* the arrow */}
        <div
          aria-hidden
          className="flex items-center justify-center sm:flex-col"
        >
          <span className="h-px w-10 bg-oxide-600 sm:h-12 sm:w-px" />
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 shrink-0 rotate-0 text-oxide-600 sm:rotate-90"
          >
            <path
              d="M3 8h9M8.5 4.5L12 8l-3.5 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="h-px w-10 bg-oxide-600 sm:h-12 sm:w-px" />
        </div>

        {/* what you review */}
        <div className="sheet bg-vellum-50 p-4">
          <Anno className="mb-3 block text-oxide-600">
            Staged for your review
          </Anno>
          <dl className="space-y-1.5">
            {filled.map((row, i) => (
              <div
                key={row.k}
                className="etch-row flex items-baseline gap-2"
                style={{ animationDelay: `${160 + i * 90}ms` }}
              >
                <dt className="anno w-[4.5rem] shrink-0">{row.k}</dt>
                <span aria-hidden className="h-px flex-1 bg-vellum-300" />
                <dd
                  className={`font-mono text-[0.6875rem] ${
                    row.ok ? "text-ink-800" : "text-oxide-600"
                  }`}
                >
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <figcaption className="anno mt-4 text-center">
        Fig. 1 — Synthetic example. Nothing is written until you approve it.
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

      <Container className="relative py-14 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <Anno className="text-oxide-600">
              {brand.city}, {brand.regionCode}
            </Anno>
            <span aria-hidden className="h-px w-8 bg-vellum-400" />
            <Anno>Private beta</Anno>
          </div>

          <h1 className="mt-6 font-display text-[2.5rem] leading-[1] font-semibold sm:text-6xl lg:text-[4.25rem]">
            Start the repair,
            <br />
            <span className="text-oxide-600">not the re-keying.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
            {brand.blurb}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/contact">Book a 15-minute demo</Button>
            <Button href="/#how" variant="line">
              See how it works
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <Transformation />
        </div>
      </Container>
    </section>
  );
}

/** Ruled strip naming who this is for. */
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
