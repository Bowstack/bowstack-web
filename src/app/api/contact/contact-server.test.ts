import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { handleContactPost } from "./contact-server.ts";

const originalFetch = globalThis.fetch;
const originalApiKey = process.env.RESEND_API_KEY;
const originalFrom = process.env.CONTACT_FROM_EMAIL;
const submissionId = "123e4567-e89b-42d3-a456-426614174000";

function validSubmission(overrides: Record<string, unknown> = {}) {
  return {
    name: "Synthetic Website Test",
    company: "Bowstack",
    email: "test@example.com",
    interest: "Report a Bowstack problem",
    message: "Synthetic route validation only.",
    submissionId,
    startedAt: Date.now() - 5_000,
    website: "",
    diagnostics: {
      source: "bowstack-extension",
      extensionVersion: "0.1.44",
      browserFamily: "Chrome",
      browserMajor: 140,
      platform: "Windows",
    },
    ...overrides,
  };
}

function requestFor(
  body: unknown,
  headers: Record<string, string> = {},
): Request {
  return new Request("https://bowstack.ca/api/contact", {
    method: "POST",
    headers: {
      Origin: "https://bowstack.ca",
      "Content-Type": "application/json",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function responseJson(response: Response): Promise<Record<string, unknown>> {
  return (await response.json()) as Record<string, unknown>;
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalApiKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = originalApiKey;
  if (originalFrom === undefined) delete process.env.CONTACT_FROM_EMAIL;
  else process.env.CONTACT_FROM_EMAIL = originalFrom;
});

describe("contact delivery", () => {
  it("rejects cross-origin and non-JSON requests before delivery", async () => {
    const crossOrigin = await handleContactPost(
      requestFor(validSubmission(), { Origin: "https://example.com" }),
    );
    assert.equal(crossOrigin.status, 403);

    const invalidMediaType = await handleContactPost(
      requestFor(validSubmission(), { "Content-Type": "application/jsonp" }),
    );
    assert.equal(invalidMediaType.status, 415);
  });

  it("rejects bodies over the byte limit without trusting Content-Length", async () => {
    const response = await handleContactPost(
      requestFor(JSON.stringify(validSubmission({ message: "x".repeat(17_000) }))),
    );

    assert.equal(response.status, 413);
  });

  it("rejects honeypots, unknown keys, and CRLF email input", async () => {
    assert.equal(
      (await handleContactPost(requestFor(validSubmission({ website: "filled" })))).status,
      400,
    );
    assert.equal(
      (await handleContactPost(requestFor({ ...validSubmission(), unexpected: true }))).status,
      400,
    );
    assert.equal(
      (await handleContactPost(
        requestFor(validSubmission({ email: "test@example.com\r\nBcc: other@example.com" })),
      )).status,
      400,
    );
  });

  it("fails closed without server-only mail configuration", async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FROM_EMAIL;
    let fetchCalled = false;
    globalThis.fetch = async () => {
      fetchCalled = true;
      return Response.json({});
    };

    const response = await handleContactPost(requestFor(validSubmission()));

    assert.equal(response.status, 503);
    assert.equal(fetchCalled, false);
  });

  it("uses a fixed recipient and stable idempotency key", async () => {
    process.env.RESEND_API_KEY = "test-api-key";
    process.env.CONTACT_FROM_EMAIL = "Bowstack <support@send.bowstack.ca>";
    let outboundBody: Record<string, unknown> | null = null;
    let outboundHeaders: Headers | null = null;
    globalThis.fetch = async (input, init) => {
      assert.equal(String(input), "https://api.resend.com/emails");
      outboundHeaders = new Headers(init?.headers);
      outboundBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
      return Response.json({ id: "49a3999c-0ce1-4ea6-ab68-afcd6dc2e794" });
    };

    const response = await handleContactPost(requestFor(validSubmission()));

    assert.equal(response.status, 200);
    assert.deepEqual(await responseJson(response), { ok: true });
    assert.equal(outboundHeaders?.get("Idempotency-Key"), `contact/${submissionId}`);
    assert.deepEqual(outboundBody?.to, ["info@bowstack.ca"]);
    assert.equal(outboundBody?.reply_to, "test@example.com");
    assert.equal(
      outboundBody?.subject,
      "New website enquiry: Report a Bowstack problem",
    );
    assert.match(
      String(outboundBody?.text),
      /^NEW WEBSITE ENQUIRY\n\nReport a Bowstack problem\n\nCONTACT\nName: Synthetic Website Test\nCompany: Bowstack\nEmail: test@example\.com\n\nMESSAGE\nSynthetic route validation only\.\n\nDETAILS\nSubmitted: .+ (?:MST|MDT)\nSource: bowstack\.ca\/contact\n\nEXTENSION DIAGNOSTICS\nReviewed by sender\nVersion: 0\.1\.44\nBrowser: Chrome 140\nPlatform: Windows$/,
    );
    assert.equal("html" in (outboundBody ?? {}), false);

    const noDiagnosticsResponse = await handleContactPost(
      requestFor(
        validSubmission({
          diagnostics: null,
          submissionId: "a84f8967-12f4-49ac-bb2d-8ba5b4ad46a8",
        }),
      ),
    );

    assert.equal(noDiagnosticsResponse.status, 200);
    assert.equal(
      String(outboundBody?.text).includes("EXTENSION DIAGNOSTICS"),
      false,
    );
  });

  it("rejects a malformed successful provider response", async () => {
    process.env.RESEND_API_KEY = "test-api-key";
    process.env.CONTACT_FROM_EMAIL = "Bowstack <support@send.bowstack.ca>";
    globalThis.fetch = async () => Response.json({});
    const originalError = console.error;
    console.error = () => {};

    try {
      const response = await handleContactPost(requestFor(validSubmission()));
      assert.equal(response.status, 502);
      assert.deepEqual(await responseJson(response), {
        error: "Email delivery failed. Please try again.",
      });
    } finally {
      console.error = originalError;
    }
  });
});