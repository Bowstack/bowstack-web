"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brand, nav } from "@/content/brand";
import { Wordmark } from "@/components/wordmark";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-vellum-400 bg-vellum-200/92 backdrop-blur-sm">
      <div className="container-x flex h-14 items-center justify-between gap-6">
        <Wordmark />

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-600 transition-colors hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="btn btn-solid hidden lg:inline-flex"
        >
          Book a demo
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-ink-700 lg:hidden"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" fill="none" />
            ) : (
              <path d="M3 6h14M3 13h14" stroke="currentColor" strokeWidth="1.5" fill="none" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-vellum-400 bg-vellum-100 lg:hidden">
          <div className="container-x flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-vellum-300 py-3 text-base text-ink-700"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-solid mt-5"
            >
              Book a demo
            </Link>
            <a
              href={`mailto:${brand.contact.email}`}
              className="anno mt-4 py-2"
            >
              {brand.contact.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
