"use client";

import { useState } from "react";
import { brand } from "@/content/brand";

const interests = [
  "Private AI Assessment",
  "First Workflow build",
  "Hardware specification only",
  "Confidential AI Briefing",
  "Not sure yet",
] as const;

const fieldClass =
  "w-full rounded-md border border-base-600 bg-base-950/60 px-3.5 py-2.5 text-sm text-base-50 " +
  "placeholder:text-base-500 transition-colors focus:border-chinook-500 focus:outline-none";

/**
 * Composes a mailto: with the enquiry pre-filled. No backend, no third-party
 * form processor, and no visitor data touching anyone else's server — which is
 * the same promise the rest of the site makes, so it should hold here too.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const body = [
          `Name: ${data.get("name")}`,
          `Company: ${data.get("company")}`,
          `Email: ${data.get("email")}`,
          `Interested in: ${data.get("interest")}`,
          "",
          "What they're trying to solve:",
          `${data.get("message")}`,
        ].join("\n");

        window.location.href = `mailto:${brand.contact.email}?subject=${encodeURIComponent(
          `Enquiry — ${data.get("company") || data.get("name")}`,
        )}&body=${encodeURIComponent(body)}`;
        setSent(true);
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label mb-2.5 block">
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="company" className="label mb-2.5 block">
            Company
          </label>
          <input id="company" name="company" autoComplete="organization" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="label mb-2.5 block">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="interest" className="label mb-2.5 block">
          What you&rsquo;re after
        </label>
        <select id="interest" name="interest" className={fieldClass} defaultValue={interests[0]}>
          {interests.map((i) => (
            <option key={i} value={i} className="bg-base-900">
              {i}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="label mb-2.5 block">
          What are you trying to solve?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="The work that eats your team's week, or the reason your data can't go to a public cloud model."
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-chinook-500 px-5 py-3 text-sm font-medium text-base-950 transition-colors hover:bg-chinook-400 sm:w-auto"
      >
        Send enquiry
      </button>

      {sent && (
        <p className="text-sm text-signal-400" role="status">
          Your email client should have opened with the message ready. If it
          didn&rsquo;t, write to {brand.contact.email} directly.
        </p>
      )}

      <p className="text-xs leading-relaxed text-base-500">
        This form opens your own email client — it does not post your details to
        a third-party form service. Nothing you type here is stored anywhere.
      </p>
    </form>
  );
}
