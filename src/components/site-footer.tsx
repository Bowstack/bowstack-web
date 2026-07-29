import Link from "next/link";
import { brand, nav } from "@/content/brand";
import { ArchMark } from "@/components/wordmark";
import { Container } from "@/components/ui";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-base-700/70 bg-base-900">
      <div
        aria-hidden
        className="chinook-arch pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-30"
      />
      <Container className="relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <ArchMark className="h-7 w-7 text-base-300" />
              <span className="text-[0.975rem] font-semibold tracking-tight text-base-50">
                {brand.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-base-400">
              {brand.blurb}
            </p>
            <p className="label mt-6">
              {brand.city}, {brand.regionCode} · {brand.country}
            </p>
          </div>

          <div>
            <h3 className="label">Site</h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-base-300 transition-colors hover:text-base-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label">Contact</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="font-mono text-sm text-base-300 transition-colors hover:text-chinook-300"
                >
                  {brand.contact.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-base-300 transition-colors hover:text-base-50"
                >
                  Book an assessment
                </Link>
              </li>
              <li>
                <a
                  href={brand.social.github}
                  className="text-sm text-base-300 transition-colors hover:text-base-50"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-x mt-14" />

        <div className="mt-6 flex flex-col gap-3 text-xs text-base-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legal}. Built in {brand.city}.
          </p>
          <p className="font-mono text-2xs tracking-widest uppercase">
            Your data stays yours
          </p>
        </div>
      </Container>
    </footer>
  );
}
