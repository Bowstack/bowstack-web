export const CONTACT_INTERESTS = [
  "Book a 15-minute demo",
  "Start a 30-day pilot",
  "Multi-shop rollout",
  "Question about data handling",
  "Report a Bowstack problem",
  "Something else",
] as const;

export const REPORT_INTEREST = "Report a Bowstack problem";

export type ContactInterest = (typeof CONTACT_INTERESTS)[number];

const browserFamilies = ["Chrome", "Edge", "Chromium", "Other"] as const;
const platformFamilies = ["Windows", "macOS", "Linux", "ChromeOS", "Other"] as const;

export type SupportDiagnostics = {
  source: "bowstack-extension";
  extensionVersion: string;
  browserFamily: (typeof browserFamilies)[number];
  browserMajor: number;
  platform: (typeof platformFamilies)[number];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function includes<const Values extends readonly string[]>(
  values: Values,
  value: unknown,
): value is Values[number] {
  return typeof value === "string" && values.includes(value as Values[number]);
}

export function isContactInterest(value: unknown): value is ContactInterest {
  return includes(CONTACT_INTERESTS, value);
}

export function parseSupportDiagnostics(value: unknown): SupportDiagnostics | null {
  if (!isRecord(value)) return null;

  const allowedKeys = new Set([
    "source",
    "extensionVersion",
    "browserFamily",
    "browserMajor",
    "platform",
  ]);

  if (Object.keys(value).some((key) => !allowedKeys.has(key))) return null;
  if (value.source !== "bowstack-extension") return null;
  if (
    typeof value.extensionVersion !== "string" ||
    !/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(value.extensionVersion)
  ) {
    return null;
  }
  if (!includes(browserFamilies, value.browserFamily)) return null;
  if (
    typeof value.browserMajor !== "number" ||
    !Number.isInteger(value.browserMajor) ||
    value.browserMajor < 0 ||
    value.browserMajor > 999
  ) {
    return null;
  }
  if (!includes(platformFamilies, value.platform)) return null;

  return {
    source: value.source,
    extensionVersion: value.extensionVersion,
    browserFamily: value.browserFamily,
    browserMajor: value.browserMajor,
    platform: value.platform,
  };
}

export function parseSupportReportFragment(fragment: string): SupportDiagnostics | null {
  const prefix = "#report=";
  if (!fragment.startsWith(prefix) || fragment.length > 1_200) return null;

  try {
    return parseSupportDiagnostics(
      JSON.parse(decodeURIComponent(fragment.slice(prefix.length))),
    );
  } catch {
    return null;
  }
}