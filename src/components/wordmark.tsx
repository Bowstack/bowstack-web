import Link from "next/link";
import { brand } from "@/content/brand";

/**
 * Mark: a rack elevation reduced to three stacked units — the literal
 * shape of the thing we install, and of the word. The top unit is
 * redlined because that is the one being commissioned.
 */
export function StackMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect
        x="3.5" y="4.5" width="17" height="4.2" rx="0.5"
        fill="none" stroke="var(--color-oxide-600)" strokeWidth="1.5"
      />
      <rect
        x="3.5" y="10.4" width="17" height="4.2" rx="0.5"
        fill="none" stroke="currentColor" strokeWidth="1.5"
      />
      <rect
        x="3.5" y="16.3" width="17" height="4.2" rx="0.5"
        fill="none" stroke="currentColor" strokeWidth="1.5"
      />
      {/* mounting holes */}
      <circle cx="6.1" cy="6.6" r="0.7" fill="var(--color-oxide-600)" />
      <circle cx="6.1" cy="12.5" r="0.7" fill="currentColor" />
      <circle cx="6.1" cy="18.4" r="0.7" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${className ?? ""}`}
      aria-label={`${brand.name} home`}
    >
      <StackMark className="h-6 w-6 text-ink-700" />
      <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
        {brand.name}
      </span>
    </Link>
  );
}
