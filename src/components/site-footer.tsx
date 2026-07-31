import Link from "next/link";
import { brand, nav } from "@/content/brand";
import { StackMark } from "@/components/wordmark";
import { Anno, Container } from "@/components/ui";

/**
 * The footer is the drawing's title block: who drew it, where, what
 * revision, and the sheet's standing note.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-ink-800 bg-vellum-100">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <StackMark className="h-6 w-6 text-ink-700" />
              <span className="font-display text-lg font-semibold text-ink-900">
                {brand.name}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-600">
              {brand.blurb}
            </p>
          </div>

          <div>
            <Anno className="text-oxide-600">Sheets</Anno>
            <ul className="mt-3.5 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-600 transition-colors hover:text-ink-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Anno className="text-oxide-600">Contact</Anno>
            <ul className="mt-3.5 space-y-2">
              <li>
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="font-mono text-sm text-ink-600 transition-colors hover:text-oxide-600"
                >
                  {brand.contact.email}
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-ink-600 hover:text-ink-900">
                  Book a demo
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-ink-600 hover:text-ink-900">
                  Privacy
                </Link>
              </li>
              <li>
                <a href={brand.social.github} className="text-sm text-ink-600 hover:text-ink-900">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <Anno className="text-oxide-600">Drawn in</Anno>
            <p className="mt-3.5 text-sm text-ink-600">
              {brand.city}, {brand.regionCode}
              <br />
              {brand.country}
            </p>
          </div>
        </div>

        <div className="mt-11 grid gap-3 border-t border-vellum-400 pt-5 sm:grid-cols-3 sm:items-center">
          <Anno>© {new Date().getFullYear()} {brand.legal}</Anno>
          <Anno className="sm:text-center">Rev. A · {brand.legalReviewDate}</Anno>
          <Anno className="text-oxide-600 sm:text-right">Your data stays yours</Anno>
        </div>
      </Container>
    </footer>
  );
}
