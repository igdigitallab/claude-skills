# Intake: the 10 questions, and where the raw material comes from

## The form

Exactly 10 questions. An eleventh kills the return rate. Don't ask anything you can extract
yourself from Instagram, the old site, a flyer, a business card, or a Google Business Profile.

1. Business name and what you do, in one sentence.
2. Every link you have (Instagram, Facebook, old site, Google Business, Yelp, anything else).
3. Services and prices.
4. Who comes to you, and with what problem?
5. Why you, and not the business down the street?
6. What's the one thing you want a visitor to do?
7. Best contact method and the number/address to show.
8. City and neighborhoods you serve, and whether to publish a street address.
9. Do you have testimonials, and permission to publish names alongside them?
10. Photos, video, a logo file, and who owns the domain if you already have one.

Send it as an actual email or form, not a verbal ask — a written form is also the written scope
for the project (see below). Keep a Russian/English (or whatever your market needs) version
ready to send without re-typing it each time.

## What the form buys you, beyond raw facts

- **A lead filter.** Someone who fills in 10 questions invested real effort and, in practice,
  almost always becomes a paying client. "I'll send it over later" almost never converts —
  don't spend a free week chasing it.
- **A written scope.** "I thought there'd also be a catalog and a blog" breaks against the
  client's own answers to question 6.
- **The one target action**, locked by question 6 for the whole project.

## Where each answer goes

| # | Question | Destination |
|---|---|---|
| 1 | name + what they do | hero `<h1>`, `<title>`, JSON-LD `name` |
| 2 | every link | source material, footer, `sameAs` in JSON-LD |
| 3 | services + prices | services section, JSON-LD `Service`, pricing section |
| 4 | who comes, what problem | objection-handling section in their own words, FAQ |
| 5 | why them | proof strip, differentiators, offer |
| 6 | target action | CTA type, sticky mobile button, form fields |
| 7 | contact + channel | header, footer, NAP, lead API, JSON-LD `telephone` |
| 8 | service area, address | `areaServed`, local SEO, whether to publish an address |
| 9 | testimonials + consent | testimonials section, verbatim |
| 10 | media, logo, domain | media pipeline, branding, DNS and deploy |

## What's deliberately *not* on the form

Brand tone, color palette, page structure, keywords, competitors, company history,
certifications, hours, an "about me" writeup. These either live in open sources already, or the
agency decides them. Asking the client for any of this is a reliable way to get no answer at
all.

## What almost always stays open after the form comes back

This is normal, not a failed intake. Track it in an `OPEN-QUESTIONS.md` opened at the spec step,
and close every line before publishing:

- exact prices (clients round to "about" and contradict their own two sources);
- the exact wording of a certification or license — matching the official document, not the
  marketing copy;
- hours (on one project they existed nowhere: not the site, not Instagram, not the business
  card — the footer block stayed empty rather than invented);
- consent to publish reviews, names, and photos of third parties or children;
- a vector logo file — missing on roughly half of real projects;
- who actually reads submissions from the lead form;
- what happens to the old domain — kept in parallel, or replaced;
- for a second language: a live native speaker to proofread. A glossary assembled by the
  agency's own research is an indexing blocker, not a translation.

---

# Extracting the raw material: source by source

All raw material lives in one place per client, one file per source (intake answers, Instagram,
old site, flyer, public-registry research). The exact folder layout is up to you — keep it
consistent across every project so nothing gets lost between clients.

## Instagram

Standard scraping tools generally can't reach Instagram's actual content — it sits behind a
login wall. You need either a real logged-in session or a dedicated Instagram scraping tool
(e.g. [Instaloader](https://instaloader.github.io/)). Pulling ~40 posts of history takes real
time (tens of minutes) — kick it off first, in the background, and keep working while it runs.

**The gold is in the highlights, not the feed.** Expertise, methodology, testimonials, "about
me," pricing, and certifications live in pinned story highlights — images and video with text
burned into the frame that a human (or an agent with vision) has to actually read. Split the
work: one pass for biography/credentials, one for testimonials (verbatim, with the author),
one for methodology/FAQ material. Read what each pass actually wrote down, not just its summary.

## The old site

Scrape it, but do two things almost everyone forgets:

- **Pull ad pixels and analytics IDs out of the raw HTML.** Meta Pixel, Google Ads, GA4 — the
  client will not name these themselves. On one real migration, two separate Google Ads
  accounts and a pixel were found only by grepping the old site's source. Losing a pixel on
  migration means losing the history behind the client's paid ad optimization.
- **Check `sitemap.xml` and `robots.txt`, not the nav menu.** The menu shows what the owner
  chose to show; auditing by menu alone reliably produces a wrong "thin content" diagnosis.

Warn the client if the conversion event changes (e.g., from page view to form submission) —
historical numbers become incomparable, and they may conclude the new site performs worse when
it's actually measuring something different.

## Flyers, business cards, PDFs, screenshots

Read every single file yourself, not a sample, and write down where each fact came from. A
client's flyer is very often a more accurate source for services than their own current site —
on one real project, four outdated service categories were replaced with four new ones straight
off the flyer.

## Public registries and Google Business

Name, address, phone, hours, reviews, and any license that can be verified against a public
registry. Cross-check what the client told you against the registry — don't silently prefer
one source over the other. On one real project, the address and phone on a client's business
card didn't match the official professional-license registry, and the license's marketing name
didn't match the name printed on the license itself. Pick the verifiable wording and put the
discrepancy in front of the owner as an open question.

Separately, check **what the client is already paying for** — on one nonprofit project, the
client was paying monthly for a platform that already had the exact feature being pitched as
new work.

## Nothing available at all

Work from the intake form and one call. Photos are either a real shoot or the section doesn't
ship — **stock photography is a hard no** (an explicit rejection from more than one real
client). No testimonials yet — build the section so it activates automatically once they exist,
rather than leaving a fake placeholder.
