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
  "w-full rounded-sm border border-vellum-400 bg-vellum-50 px-3 py-2.5 text-sm text-ink-900 " +
  "placeholder:text-ink-400 transition-colors focus:border-oxide-600 focus:outline-none";

/**
 * Composes a mailto: with the enquiry pre-filled. No backend, no
 * third-party form processor, and no visitor data touching anyone else's
 * server — the same promise the rest of the site makes.
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
          <label htmlFor="name" className="anno mb-2 block">Name</label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="company" className="anno mb-2 block">Company</label>
          <input id="company" name="company" autoComplete="organization" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="anno mb-2 block">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="interest" className="anno mb-2 block">What you&rsquo;re after</label>
        <select id="interest" name="interest" className={fieldClass} defaultValue={interests[0]}>
          {interests.map((i) => (
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
          placeholder="The work that eats your team's week, or the reason your data can't go to a public cloud model."
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button type="submit" className="btn btn-solid w-full sm:w-auto">
        Send enquiry
      </button>

      {sent && (
        <p className="text-sm text-survey-600" role="status">
          Your email client should have opened with the message ready. If it
          didn&rsquo;t, write to {brand.contact.email} directly.
        </p>
      )}

      <p className="text-xs leading-relaxed text-ink-500">
        This form opens your own email client — it does not post your details to
        a third-party form service. Nothing you type here is stored anywhere.
      </p>
    </form>
  );
}
