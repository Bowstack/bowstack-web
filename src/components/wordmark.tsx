import Link from "next/link";
import { brand } from "@/content/brand";

/**
 * Mark: a Chinook arch reduced to geometry — a dark horizon line with a
 * warm band of light breaking over it. Drawn rather than imported so it
 * inherits colour and scales cleanly at any size.
 */
export function ArchMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="arch-warm" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-chinook-200)" />
          <stop offset="55%" stopColor="var(--color-chinook-400)" />
          <stop offset="100%" stopColor="var(--color-chinook-600)" />
        </linearGradient>
      </defs>
      {/* the arch */}
      <path
        d="M3 20.5C3 13.6 8.8 8 16 8s13 5.6 13 12.5"
        fill="none"
        stroke="url(#arch-warm)"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      {/* horizon */}
      <path
        d="M2 25.5h28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.42"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}
      aria-label={`${brand.name} home`}
    >
      <ArchMark className="h-7 w-7 text-base-200" />
      <span className="text-[0.975rem] font-semibold tracking-tight text-base-50">
        {brand.short}
        <span className="font-normal text-base-400">
          {brand.name.slice(brand.short.length)}
        </span>
      </span>
    </Link>
  );
}
