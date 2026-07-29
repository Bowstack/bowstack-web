"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brand, nav } from "@/content/brand";
import { Wordmark } from "@/components/wordmark";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-base-700/70 bg-base-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Wordmark />

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-base-300 transition-colors hover:text-base-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="rounded-md bg-chinook-500 px-4 py-2 text-sm font-medium text-base-950 transition-colors hover:bg-chinook-400"
          >
            Book an assessment
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-base-200 lg:hidden"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
            {open ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d="M3 6h14M3 13h14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-base-700/70 bg-base-950/98 backdrop-blur-xl lg:hidden">
          <div className="container-x flex flex-col gap-1 py-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base text-base-200 transition-colors hover:bg-base-800 hover:text-base-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-md bg-chinook-500 px-4 py-3 text-center text-sm font-medium text-base-950"
            >
              Book an assessment
            </Link>
            <a
              href={`mailto:${brand.contact.email}`}
              className="mt-1 px-2 py-3 font-mono text-xs text-base-400"
            >
              {brand.contact.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
