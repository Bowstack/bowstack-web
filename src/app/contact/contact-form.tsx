"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { brand } from "@/content/brand";
import {
  CONTACT_INTERESTS,
  REPORT_INTEREST,
  parseSupportReportFragment,
  type ContactInterest,
  type SupportDiagnostics,
} from "./contact-contract";

const fieldClass =
  "w-full rounded-sm border border-vellum-400 bg-vellum-50 px-3 py-2.5 text-sm text-ink-900 " +
  "placeholder:text-ink-400 transition-colors focus:border-oxide-600 focus:outline-none";

const subscribeToStaticLocation = () => () => {};
const getSupportFragment = () => window.location.hash;
const getServerSupportFragment = () => "";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [selectedInterest, setSelectedInterest] = useState<ContactInterest | null>(null);
  const [hideDiagnostics, setHideDiagnostics] = useState(false);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [submissionId, setSubmissionId] = useState(() => crypto.randomUUID());
  const supportFragment = useSyncExternalStore(
    subscribeToStaticLocation,
    getSupportFragment,
    getServerSupportFragment,
  );
  const reportDiagnostics = parseSupportReportFragment(supportFragment);
  const diagnostics: SupportDiagnostics | null = hideDiagnostics
    ? null
    : reportDiagnostics;
  const interest =
    selectedInterest ?? (diagnostics ? REPORT_INTEREST : CONTACT_INTERESTS[0]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          company: String(data.get("company") ?? ""),
          email: String(data.get("email") ?? ""),
          interest,
          message: String(data.get("message") ?? ""),
          submissionId,
          website: String(data.get("website") ?? ""),
          startedAt,
          diagnostics,
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || result?.ok !== true) {
        throw new Error(result?.error || "Message could not be sent.");
      }

      form.reset();
      setHideDiagnostics(true);
      setSelectedInterest(CONTACT_INTERESTS[0]);
      setStartedAt(Date.now());
      setSubmissionId(crypto.randomUUID());
      setStatus("sent");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Message could not be sent.",
      );
      setStatus("error");
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="anno mb-2 block">Name</label>
          <input id="name" name="name" required maxLength={100} autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="company" className="anno mb-2 block">Company</label>
          <input id="company" name="company" maxLength={120} autoComplete="organization" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="anno mb-2 block">Email</label>
        <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="interest" className="anno mb-2 block">What you&rsquo;re after</label>
        <select
          id="interest"
          name="interest"
          className={fieldClass}
          value={interest}
          onChange={(event) => setSelectedInterest(event.target.value as ContactInterest)}
        >
          {CONTACT_INTERESTS.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="anno mb-2 block">
          What are you trying to solve?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={4_000}
          placeholder="The work that eats your team's week, or the reason your data can't go to a public cloud model."
          className={`${fieldClass} resize-y`}
        />
      </div>

      {diagnostics && (
        <section className="border-y border-vellum-300 py-4" aria-label="Attached extension diagnostics">
          <p className="anno text-oxide-600">Extension diagnostics attached</p>
          <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm text-ink-700 sm:grid-cols-2">
            <div><dt className="inline font-semibold">Source: </dt><dd className="inline">Bowstack extension</dd></div>
            <div><dt className="inline font-semibold">Version: </dt><dd className="inline">{diagnostics.extensionVersion}</dd></div>
            <div><dt className="inline font-semibold">Browser: </dt><dd className="inline">{diagnostics.browserFamily} {diagnostics.browserMajor || "Unknown"}</dd></div>
            <div><dt className="inline font-semibold">Platform: </dt><dd className="inline">{diagnostics.platform}</dd></div>
          </dl>
          <p className="mt-3 text-xs leading-relaxed text-ink-500">
            Only the values shown above will be attached. No PDF, claim text,
            customer fields, URLs, screenshots, credentials, or console logs are included.
          </p>
        </section>
      )}

      <div className="absolute left-[-10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        className="btn btn-solid w-full sm:w-auto"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send enquiry"}
      </button>

      <div aria-live="polite">
        {status === "sent" && (
          <p className="text-sm text-survey-600" role="status">
            Message sent. We&rsquo;ll reply by email.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-oxide-700" role="alert">
            {error} Try again, or write to {brand.contact.email} directly.
          </p>
        )}
      </div>

      <p className="text-xs leading-relaxed text-ink-500">
        Your message is sent to Bowstack through Vercel and Resend. Do not include
        customer PDFs, claim text, credentials, access codes, or other personal information.
      </p>
    </form>
  );
}
