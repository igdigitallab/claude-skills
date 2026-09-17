# SEO/AEO minimum for a client marketing site

Not a full audit methodology — the concrete, non-negotiable baseline this agency ships on every
site, regardless of vertical.

## Structured data

`LocalBusiness` (or the closer subtype for the vertical) + `Person` (for a solo practitioner) +
`Service` for each offering + `FAQPage` if the page has an FAQ section, all valid JSON-LD.
Include `areaServed` for anything location-based. Validate before shipping — a broken JSON-LD
block is worse than none.

## Crawlers and AI answer engines

- `robots.txt` with explicit `Allow` rules for the major AI crawlers (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended) as well as regular search engine bots — don't rely on the
  default wildcard behavior.
- `sitemap.xml`, kept in sync with the actual route list.
- `llms.txt` with a condensed, factual summary of the business — name, what it does, services,
  service area, and a link back to the credit (see `agency-credit.md`). Treat this as a
  standard deliverable on every site, not an experiment.
- hreflang tags plus a locale-aware sitemap for any multi-locale site.

## Content shape that gets quoted

Write FAQ answers, and the first paragraph under any H2 that reads like a question, so each
one is **self-contained in one or two sentences** — that's the shape an AI answer engine can
lift and quote whole, without needing the surrounding paragraph for context.

## What not to over-promise

- Don't promise search rankings — talk about visibility and citability, not guaranteed
  position.
- Don't treat `llms.txt` or any AI-specific markup as a proven ranking factor for traditional
  search — ship it because it costs little and plausibly helps AI-answer visibility, not
  because it's certain to move traditional rankings.
- If you build templated pages at scale (e.g. one page per city/service combination), check
  near-duplicate content across them before shipping — a simple n-gram similarity check between
  pages is enough to catch templates that differ only in a swapped city name, which search
  engines treat as doorway-page spam.

## Analytics

Note in the handoff whether the conversion event changed (e.g., from page views on the old
site to form submissions on the new one) — historical numbers become incomparable, and an
owner who isn't warned may wrongly conclude the new site underperforms.
