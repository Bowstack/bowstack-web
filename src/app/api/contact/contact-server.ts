import {
  isContactInterest,
  parseSupportDiagnostics,
  type ContactInterest,
  type SupportDiagnostics,
} from "../../contact/contact-contract.ts";

const MAX_BODY_BYTES = 16_384;
const MIN_COMPLETION_MS = 2_500;
const MAX_COMPLETION_MS = 24 * 60 * 60 * 1_000;
const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CONTACT_RECIPIENT = "info@bowstack.ca";

type ContactSubmission = {
  name: string;
  company: string;
  email: string;
  interest: ContactInterest;
  message: string;
  submissionId: string;
  startedAt: number;
  website: string;
  diagnostics: SupportDiagnostics | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(
  value: unknown,
  minimumLength: number,
  maximumLength: number,
): string | null {
  if (typeof value !== "string") return null;

  const text = value.trim();
  if (
    text.length < minimumLength ||
    text.length > maximumLength ||
    CONTROL_CHARACTERS.test(text)
  ) {
    return null;
  }

  return text;
}

function parseSubmission(value: unknown): ContactSubmission | null {
  if (!isRecord(value)) return null;

  const allowedKeys = new Set([
    "name",
    "company",
    "email",
    "interest",
    "message",
    "submissionId",
    "startedAt",
    "website",
    "diagnostics",
  ]);
  if (Object.keys(value).some((key) => !allowedKeys.has(key))) return null;

  const name = readText(value.name, 1, 100);
  const company = readText(value.company, 0, 120);
  const email = readText(value.email, 3, 254);
  const message = readText(value.message, 10, 4_000);
  const website = readText(value.website, 0, 200);
  const diagnostics =
    value.diagnostics === undefined || value.diagnostics === null
      ? null
      : parseSupportDiagnostics(value.diagnostics);

  if (
    name === null ||
    company === null ||
    email === null ||
    message === null ||
    website === null ||
    !isContactInterest(value.interest) ||
    typeof value.submissionId !== "string" ||
    !UUID.test(value.submissionId) ||
    typeof value.startedAt !== "number" ||
    !Number.isFinite(value.startedAt) ||
    (value.diagnostics !== undefined && value.diagnostics !== null && diagnostics === null)
  ) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  return {
    name,
    company,
    email,
    interest: value.interest,
    message,
    submissionId: value.submissionId,
    startedAt: value.startedAt,
    website,
    diagnostics,
  };
}

async function readLimitedBody(request: Request): Promise<string | null> {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let byteLength = 0;
  let body = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      byteLength += value.byteLength;
      if (byteLength > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      body += decoder.decode(value, { stream: true });
    }

    return body + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

// Behind a reverse proxy, `next start` builds request.url from its own listen
// address, so compare the Origin with the public host instead (as Next's Server
// Actions CSRF check does).
function publicHost(request: Request): string | null {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",", 1)[0]?.trim();
  const host = forwardedHost || request.headers.get("host")?.trim();
  return host ? host.toLowerCase() : null;
}

function hasSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = publicHost(request);
  if (!origin || !host) return false;

  let originUrl: URL;
  try {
    originUrl = new URL(origin);
  } catch {
    return false;
  }

  const isLocal = originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1";
  if (originUrl.protocol !== "https:" && !(isLocal && originUrl.protocol === "http:")) {
    return false;
  }

  return originUrl.host === host;
}

function formatMessage(submission: ContactSubmission): string {
  const submittedAt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Edmonton",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date());
  const diagnostics = submission.diagnostics;
  const diagnosticLines = diagnostics
    ? [
        "",
        "EXTENSION DIAGNOSTICS",
        "Reviewed by sender",
        `Version: ${diagnostics.extensionVersion}`,
        `Browser: ${diagnostics.browserFamily} ${diagnostics.browserMajor || "Unknown"}`,
        `Platform: ${diagnostics.platform}`,
      ]
    : [];

  return [
    "NEW WEBSITE ENQUIRY",
    "",
    submission.interest,
    "",
    "CONTACT",
    `Name: ${submission.name}`,
    `Company: ${submission.company || "Not provided"}`,
    `Email: ${submission.email}`,
    "",
    "MESSAGE",
    submission.message,
    "",
    "DETAILS",
    `Submitted: ${submittedAt}`,
    "Source: bowstack.ca/contact",
    ...diagnosticLines,
  ].join("\n");
}

export async function handleContactPost(request: Request): Promise<Response> {
  if (!hasSameOrigin(request)) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  const mediaType = contentType.split(";", 1)[0]?.trim().toLowerCase();
  if (mediaType !== "application/json") {
    return Response.json({ error: "Expected a JSON request." }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  let rawBody: string;
  try {
    const body = await readLimitedBody(request);
    if (body === null) {
      return Response.json({ error: "Request is too large." }, { status: 413 });
    }
    rawBody = body;
  } catch {
    return Response.json({ error: "Could not read request." }, { status: 400 });
  }

  let submission: ContactSubmission | null;
  try {
    submission = parseSubmission(JSON.parse(rawBody));
  } catch {
    submission = null;
  }

  if (!submission || submission.website) {
    return Response.json({ error: "Check the form and try again." }, { status: 400 });
  }

  const completionTime = Date.now() - submission.startedAt;
  if (completionTime < MIN_COMPLETION_MS || completionTime > MAX_COMPLETION_MS) {
    return Response.json({ error: "Please reload the form and try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !from) {
    return Response.json(
      { error: "Email delivery is temporarily unavailable." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact/${submission.submissionId}`,
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_RECIPIENT],
        reply_to: submission.email,
        subject: `New website enquiry: ${submission.interest}`,
        text: formatMessage(submission),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    const delivery = (await response.json().catch(() => null)) as unknown;
    if (
      !response.ok ||
      !isRecord(delivery) ||
      typeof delivery.id !== "string" ||
      !UUID.test(delivery.id)
    ) {
      console.error("Contact email delivery failed with status", response.status);
      return Response.json(
        { error: "Email delivery failed. Please try again." },
        { status: 502 },
      );
    }
  } catch {
    console.error("Contact email delivery request failed.");
    return Response.json(
      { error: "Email delivery failed. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}