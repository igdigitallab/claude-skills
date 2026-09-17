# Deploy: static-first on the edge

## Why this shape, and not a container on a server you manage

- **A CDN-hosted static build is usually enough for a marketing site**, deployed straight from
  a GitHub push, with no server to patch and no load balancer to configure. Cloudflare Workers
  Static Assets (the modern successor to Cloudflare Pages, which Cloudflare itself now steers
  new projects away from) is one solid option; any comparable static host with an edge function
  for the lead form works the same way.
- **Your own server** is the right call only if the site needs your own backend, your own
  database, or genuinely cannot live outside your infrastructure. A one-pager for a solo
  business almost never needs this.

## Minimal config (Cloudflare Workers example)

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare(),
});
```

```jsonc
// wrangler.jsonc
{
  "name": "<client>-site",
  "main": "@astrojs/cloudflare/entrypoints/server",
  "compatibility_date": "2025-05-21",
  "assets": { "directory": "./dist", "binding": "ASSETS" }
}
```

## Secrets in the lead-form route

Read secrets the way your edge runtime actually exposes them at request time — not through
`process.env` (that assumes a traditional Node server) and not through an old
locals-based API that a newer runtime has since deprecated. For Cloudflare Workers specifically:

```javascript
// src/pages/api/lead.ts
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST = async ({ request }) => {
  const token = env.TELEGRAM_BOT_TOKEN;   // read INSIDE the handler, not at import time
  const chatId = env.TELEGRAM_CHAT_ID;
  // ... honeypot check, minimum fill-time, per-IP limit, then send the message
};
```

Set secrets through your host's CLI (e.g. `wrangler secret put TELEGRAM_BOT_TOKEN`), and use a
local, gitignored dev-secrets file for local development. Non-secret config can live in the
deploy config file itself.

⚠️ Traditional SMTP (`nodemailer` and friends) cannot work on an edge runtime with no raw TCP —
only an HTTP-based delivery mechanism will work.

## Verifying a deploy

**From outside, past any cache — never from the build log alone.** An application can accept a
deploy, restart its container, and log clean, while the public URL keeps serving the previous
version because traffic never actually reached the new instance. This has bitten real production
sites more than once, including a repeat of the exact same failure mode a few days after the
first fix.

```bash
curl -sI -H 'Cache-Control: no-cache' https://<domain>/ | grep -iE 'http/|cache-status|last-modified'
```

An old `last-modified` timestamp means the deploy landed somewhere other than production.

Three more checks, each of which has caught a real bug in production:

1. **A live POST to `/api/lead` on the production domain** — confirm the message actually
   arrived wherever it's supposed to (Telegram, email, whatever you wired), not just that the
   form submitted without a client-side error.
2. Load the page in a headless browser: zero console errors, zero elements stuck at
   `opacity: 0`, exactly one `<h1>`, every `<img>` has `alt` text, zero stray em dashes.
3. Screenshots at 390px and 1440px, **including with the OS in dark mode** — this reveals
   whether the browser silently swaps in an unstyled dark theme for the owner.

## Domain cutover

Before flipping a production domain's DNS, list every subdomain currently living on it.
Decommissioning an old service has taken down an unrelated subdomain riding on the same
catch-all rule, and it kept looking "alive" externally for hours because of edge caching.

⚠️ One-click domain-connect wizards from some registrars can rewrite an entire DNS zone in one
action. Touch individual records through the registrar's API instead, and **never touch MX
records** if the client's live email runs through that domain.
