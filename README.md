# Bowstack Website

Public Next.js site for Bowstack product, security, privacy, and contact information.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact Delivery

`POST /api/contact` sends plain-text messages to a fixed Bowstack address through Resend. It rejects cross-origin, oversized, malformed, and implausibly fast requests and fails closed when delivery is not configured. The endpoint does not log form payloads.

Configure these server-only variables in Vercel; never prefix them with `NEXT_PUBLIC_`:

```dotenv
RESEND_API_KEY=
CONTACT_FROM_EMAIL=Bowstack <support@bowstack.ca>
```

The recipient is fixed in server code as `info@bowstack.ca`; requests cannot choose or redirect it. The sending domain must be verified in Resend before production use. Extension problem reports arrive through a URL fragment containing only the displayed source marker, extension version, browser family and major version, and platform family. Never add PDF, claim, customer, credential, screenshot, URL, DOM, or console content to that bundle.

Production also uses a Vercel WAF fixed-window rule on `/api/contact`: five requests per source IP per ten minutes. Keep that rule enabled to protect the Resend quota.

## Validation

```bash
npm test
npm run lint
npm run build
```
