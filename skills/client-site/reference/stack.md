# The stack canon

Not theoretical — distilled from several shipped client sites. Default to the newest line below
unless a project is inheriting existing code on the older one.

## Astro (default)

```
astro ^5.18
@astrojs/cloudflare          deploy adapter (see deploy.md)
@astrojs/sitemap ^3.7
tailwindcss ^4.3 + @tailwindcss/vite ^4.3     (the Vite plugin, NOT the PostCSS plugin)
astro-icon + one @iconify-json icon set        pick one icon family and stay on it
sharp                                           image processing at build time
@fontsource-variable/<font>                     self-hosted, check script coverage first
```

`output: 'static'`, with the lead-form route opted out via `export const prerender = false`.

## Fonts and non-Latin scripts

Check a font's character-set page before committing to it — many trendy display faces
(Geist, Satoshi, Cabinet Grotesk) ship Latin glyphs only and silently fall back to a system font
for Cyrillic, Greek, Arabic, or Vietnamese text. Always self-host via `@fontsource-variable/*`,
never load fonts from a third-party CDN for a client site.

## The domain is baked in at build time, not read at runtime

A `SITE_URL`-style build-time variable feeds canonical URLs, hreflang, the sitemap, and JSON-LD.
Changing the domain means a **rebuild**, not a restart. Keep a sane default in the framework
config itself — build-time variables aren't always reachable through your host's API after the
fact.

Keep a second flag, e.g. `INDEXABLE`, so a preview/staging copy never gets indexed by accident.

## Multi-locale sites

Use your framework's built-in i18n rather than a hand-rolled router: a default locale at the
root, no locale prefix on the default, hreflang tags, and a sitemap that lists every locale.
Two real multi-locale builds (one Cyrillic + English, one English + Farsi) turned out to need
almost identical config — copy the working one rather than re-deriving it.

⚠️ Framework i18n middleware commonly leaves API routes and health checks alone, but will
404 on any path segment that happens to be spelled like a locale code — check this before
naming a route.

⚠️ An RTL locale breaks phone numbers, addresses, and copyright years through the bidi
algorithm, not through CSS. Every name/address/phone field needs an explicit `dir="ltr"` or
`unicode-bidi: isolate`.

## The lead form

`POST /api/lead` → a messaging API (Telegram's Bot API `sendMessage` is a good, fast, free
choice) rather than email or a CRM: a lead should land somewhere it gets read within a minute,
not somewhere it sits in a spam folder. Add basic anti-spam: a honeypot field, a minimum
fill-time, and a per-IP rate limit. Give the submit button explicit idle/sending/ok/error
states.

⚠️ Traditional SMTP libraries (e.g. `nodemailer`) do not work on edge/serverless runtimes that
have no raw TCP access — only outbound HTTP. Plan the lead-delivery mechanism around an HTTP
API from the start.

## A health-check route

A separate route that always returns 200. Needed for uptime monitoring and, if the site ever
runs in a container, for its `HEALTHCHECK`.

## If the site does end up containerized

Build on a glibc-based Node image, not an Alpine one — native image-processing libraries like
`sharp` ship precompiled binaries for glibc and have to be compiled from source on musl/Alpine.

For a Next.js standalone build in a container, explicitly bind the server to `0.0.0.0` — some
runtimes otherwise bind to the container's hostname, which makes a `127.0.0.1` health check
report unhealthy forever even while the site is reachable from outside.
