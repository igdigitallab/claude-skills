---
name: client-site
description: "Build a client a real small-business marketing site end to end: 10-question intake, fact mining from their Instagram / old site / flyer, a spec, a design system, mobile-first build on Astro + Tailwind, SEO/AEO, a lead form, legal pages, deploy, QA, and handoff. Use when a client wants a business site, a landing page, or a one-pager, or has sent back a filled-in intake form."
---

# Client Site

Role: **full-cycle delivery lead** for a small web agency. Input: a client with a real
business and scattered raw material (social posts, an old site, a flyer, nothing). Output: a
deployed marketing site that generates leads, and a client who holds the keys to it.

This file is the source of truth for the *method*. The source of truth for any one client is
that client's own project folder.

---

## Five hard rules

These override taste arguments, design whims, and "the client asked for one more section."

1. **Never invent a fact.** Every number, price, testimonial, credential, and hour of work
   comes verbatim from the client's own material. No fact → it doesn't go on the site, it goes
   into `OPEN-QUESTIONS.md`. The single most expensive rebuild in this agency's history came
   from breaking this rule: prices were guessed from market research on one project, they
   propagated onto the page, into JSON-LD, and into `llms.txt`, and had to be scrubbed out of
   three places by hand.
2. **Mobile-first, literally.** Design and build at 390px; desktop is the second pass.
   Acceptance starts with a phone screenshot. Clients arrive from Instagram — i.e., from a phone.
3. **One target action** for the entire page: call / message on WhatsApp / submit a lead form /
   book. Chosen in step 1 from the client's own answer, and never changed after. There is no
   second goal — "and also a newsletter signup" doesn't happen.
4. **Material before code.** Gates 0 and 1 are not passed → no layout work starts.
5. **We extract as much as possible ourselves.** The client gets 10 questions, not 40.
   Everything else comes from their social accounts, old site, flyer, business card, and public
   registries. The client doesn't write copy or pick a design — that's stated up front, in the
   first lines of the intake form.

---

## Gate 0 — who is this, and what do they already have (before any proposal)

**The most-skipped, most-expensive step.** Two projects out of a recent six burned exactly here:
one spent two weeks building a landing page for a solo practitioner before discovering the
client actually needed a different product entirely; another started as "site from scratch"
when a site already existed — on a locked-down page builder the owner never handed access to —
and the project stalled permanently.

Before naming a stack, a timeline, or a price, answer in writing:

- **What does the client already have?** Search them. Check the old site's `sitemap.xml` and
  `robots.txt`, not its nav menu — the menu shows only what the owner chose to show. Is there a
  Google Business Profile, a Yelp page, a site on someone else's builder?
- **Do they actually want a marketing site?** Or do they need a directory, a booking system, a
  portal, an automation. A marketing site is one page about one person or one small business
  with one action. Don't bend the request to fit what's fast for you to build.
- **What are they already paying for?** One nonprofit client was paying a recurring fee for a
  church-management SaaS that already had the exact feature being requested. The agency nearly
  sold the same feature to them a second time.
- **Who owns the domain, and is there real access?** Run WHOIS. On one project the domain's
  WHOIS owner turned out to be someone other than the person we were talking to. **Access is
  obtained before work starts, not after.** Domains, hosting, and analytics registered before
  client sign-off get registered under the agency's own name, with ownership transferred later.

The output of this gate is three lines in the client project's own docs: who the client is →
who they sell to → the one target action. Gate not passed → do not scaffold.

---

## Gate 1 — intake

Send the client 10 questions (see `reference/intake-questions.md` for the exact set and a
ready-to-send email in two languages). Store the answers verbatim, unedited, in the client's
project files.

Standing still while waiting for the form back is wasted time — step 2 (extraction from open
sources) runs in parallel. But **layout work does not start** until the form comes back.

A filled-in intake form does three jobs beyond supplying raw facts:

- **Lead filter.** Whoever fills it in invested effort and almost always pays. "I'll send it
  later" never converts, and it's not worth a week of unpaid work.
- **Written scope.** "I thought there'd also be a catalog and a blog" breaks against the
  client's own answers.
- **The one target action.** One specific question locks in the single goal for the whole
  project.

---

## Step 2 — extracting the raw material

See `reference/intake-questions.md` for the source-by-source playbook (Instagram highlights,
old-site scraping, flyers/business cards, public registries). The short version: read every
source file yourself, end to end, not a sample; cross-check public registries against what the
client told you rather than silently trusting either one; and check what the client is
*already paying for* before proposing to build it again.

---

## Step 3 — the spec

A one-page spec: who → sells to whom → target action → the client's own barriers in their own
words → sections as a table → offer and pricing → qualifications → testimonials → form fields →
SEO → open questions.

The spec isn't paperwork — it catches contradictions in the source material before they land on
the live site. "Bio says 12 months of experience, story highlight says 6" is supposed to
surface here.

**An `OPEN-QUESTIONS.md` file is opened now, not grepped for later from scattered TODOs.**
Anything not confirmed by the client lives there and does not go into the build. The items that
are almost always open: prices, the exact wording of certifications/licenses (as printed on the
official document, not as marketed), hours, consent to publish reviews and names, consent to
photograph third parties and children, a vector logo (missing in roughly half of real projects),
where leads land and who reads them, and the fate of the old domain.

---

## Step 4 — design system for this client

See the sibling
[instagram-to-website](https://github.com/igdigitallab/instagram-to-website/blob/main/reference/design.md)
skill's design reference for the full rule set — read it in full before the first line of
markup. In short:

- Pick a font that actually supports every script the site needs (many trendy display
  typefaces silently drop non-Latin character sets).
- **One accent color.** Ban the default LLM palette moves: the purple AI gradient, the "water"
  aqua gradient, the beige-and-brass "premium" look.
- **Dark mode only if the owner asked for it.** For anything aimed at trust-sensitive
  audiences (families, children, healthcare), force `color-scheme: light only` — otherwise an
  owner with a system dark theme sees something different from what was delivered.
- No em dashes in visible copy.
- One icon family for the whole site, used consistently.

---

## Step 5 — build

Stack and exact versions: `reference/stack.md`. Scaffold immediately with placeholder routes
for the lead API and a health check.

Section order follows how the client thinks, not convention: hero with the outcome promised and
a CTA → a proof strip (3-4 real, large numbers) → "if you've tried this before and it didn't
work" (their own words for the objection) → services → what the first meeting looks like → what
makes them different → proof (their own photos/video, not stock) → testimonials → about the
practitioner → pricing → FAQ → lead form → footer with name/address/phone.

Build section by section in scroll order, one commit per section.

**The wow factor is the client's own material, not visual effects.** Any real practitioner has
process footage no competitor has. Pull real stills, don't hand an agent "re-encode everything" —
that produces a pile of oversized junk media, tested the hard way.

---

## Step 6 — SEO/AEO and legal pages

Don't reinvent SEO/AEO methodology from scratch — see `reference/seo-notes.md` for the concrete,
non-negotiable minimum this agency ships on every site: JSON-LD (`LocalBusiness` + `Person` +
`Service` + `FAQPage`) with `areaServed`, hreflang for multi-locale sites, a sitemap,
`robots.txt` with explicit allow rules for the major AI crawlers, and an `llms.txt` with
condensed facts — treated as a standard deliverable, not an extra. Write FAQ answers so each one
is self-contained in one or two sentences — that's the form AI answer engines quote whole.

**Legal pages are mandatory, not "if the client asks":** a privacy policy and terms of service
disclosing what a lead form collects. See `reference/legal-pages.md`.

**A visible agency credit in the footer is part of the standard deliverable, not an option.**
See `reference/agency-credit.md` for the exact pattern (visible line + crawlable link +
structured-data `creator` field) this agency uses on every site it ships, with the reasoning
for why it's one fixed anchor text and URL across every client rather than something
customized per project.

---

## Step 7 — deploy

See `reference/deploy.md`. Short version: static-first hosting on the provider's edge network
(this agency uses Cloudflare Workers Static Assets), with a small serverless function for the
lead form.

**Verify a deploy from outside, past any cache — never from the build log alone.** An
application can accept a deploy, update its container, and log clean, while nothing changes
from the outside because traffic never reached it. Check the live URL with a cache-busting
header, not just the CI output.

---

## Gate 8 — QA and handoff

See `reference/qa-handoff.md`. Three parts, none skippable: QA (phone screenshot first, at
390px), the client's written confirmation of every line in `OPEN-QUESTIONS.md`, and a real
handoff of access plus an explicit agreement on who fixes bugs and renews the domain after
delivery.

Finish by logging the client in your own portfolio/monitoring registry so the live site doesn't
silently die months later without anyone noticing.

---

## What not to do

- Don't publish a phone number, address, or price found in some third-party place without the
  owner confirming it.
- Don't publish expired certification dates — names only, and flag the question to the owner.
- Don't publish screenshots of private conversations, reviewers' full names, or children's
  faces without consent.
- Don't "polish" testimonials or paraphrase them — verbatim or not at all.
- Don't use stock photography in place of the client's own material. Clients notice, and it's
  been a direct, explicit rejection from more than one real client.
- Don't clone a competitor's site "to show the difference" — it's unconvincing and invites the
  question "why does your mockup look like our site."
- Don't resurrect a design the owner already rejected on a later redesign — keep a record of
  what was rejected and why.
- Don't extend the intake form. More than 10 questions and it doesn't come back.

See `reference/gotchas.md` for a running list of real failures this pipeline has hit, each one
worth reading before you build and before you deploy.
