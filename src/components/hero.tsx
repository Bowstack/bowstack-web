import { brand } from "@/content/brand";
import { Button, Container, Label } from "@/components/ui";

const proofPoints = [
  "Runs on hardware you own",
  "No data leaves your network",
  "Fixed cost, not per-token",
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* engineering grid, fading downward */}
      <div
        aria-hidden
        className="grid-rule mask-fade-b pointer-events-none absolute inset-0 opacity-[0.55]"
      />
      {/* the chinook arch on the horizon */}
      <div
        aria-hidden
        className="chinook-arch pointer-events-none absolute inset-x-0 -bottom-1/4 h-[70%]"
      />
      {/* horizon line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-chinook-500/45 to-transparent"
      />

      <Container className="relative pt-20 pb-28 lg:pt-28 lg:pb-36">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-base-600/70 bg-base-900/60 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-500" />
            </span>
            <span className="label text-base-300">
              {brand.city}, {brand.regionCode} · Taking new clients
            </span>
          </div>

          <h1 className="mt-8 text-[2.6rem] leading-[1.04] font-semibold sm:text-6xl lg:text-[4.25rem]">
            The AI your business needs,
            <br />
            <span className="chinook-text">on hardware you own.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-base-300 lg:text-xl">
            We find the work your team shouldn&rsquo;t be doing by hand, build
            the AI that does it, and run the whole thing inside your building
            &mdash; so nothing confidential ever leaves your network.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/contact">Book an automation assessment</Button>
            <Button href="/#approach" variant="secondary">
              See how it works
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {proofPoints.map((point) => (
              <li key={point} className="flex items-center gap-2.5">
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 shrink-0 text-signal-400"
                  aria-hidden
                >
                  <path
                    d="M3.5 8.5l3 3 6-6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm text-base-200">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/** Narrow band under the hero that frames who this is for. */
export function AudienceBar({ items }: { items: readonly string[] }) {
  return (
    <div className="border-y border-base-700/60 bg-base-900/40">
      <Container className="py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
          <Label className="shrink-0">Built for</Label>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {items.map((item) => (
              <li
                key={item}
                className="text-sm whitespace-nowrap text-base-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
