# Gotchas

Every one of these cost real time on a real project. The vertical is noted in place of the
client's name.

## Process

- Scaffolding before Gate 0 means building the wrong product. Two weeks went into a solo
  practitioner's landing page before a live call revealed the client needed an entirely
  different product (professional-services vertical).
- Auditing an unfamiliar site by its nav menu gives a false "thin content" diagnosis — check
  `sitemap.xml` and `robots.txt` first (nonprofit vertical).
- No access to someone else's admin panel means the project stalls permanently. Get access
  before work starts (nonprofit vertical; professional-services vertical).
- Cloning a competitor's site to show the owner "the difference" has zero persuasive power and
  invites "why does this look like our site" — show one improved page next to the current one
  on the same screen instead (nonprofit vertical).
- Register domains/hosting/analytics under the agency's own name only pre-signoff, and transfer
  ownership afterward (nonprofit vertical).
- Invented prices don't stay on one page — they propagate into JSON-LD and `llms.txt` too, and
  have to be cleaned out of all three places by hand (professional-services vertical).
- A project deadline can be someone else's billing cycle, not your own choice — e.g. the date a
  client's old host cuts off access and takes the admin panel with it (contractor vertical).
- A client may already be paying for the exact feature you're about to sell them
  (nonprofit vertical).

## Instagram and media

- Highlights almost always have text burned over the image — look in the regular feed for a
  clean original (fitness-instruction vertical).
- Reels commonly cap out at a low resolution that doesn't upscale cleanly for a hero image —
  pull stills from feed posts instead (fitness-instruction vertical).
- Auto-selecting a poster frame by a fixed percentage of video duration reliably lands on a
  blank or low-information frame — pull several candidate frames and pick by eye
  (fitness-instruction vertical).
- Not every post is on-topic for the site — don't pull media into the library just because it's
  there (fitness-instruction vertical).
- Re-encoding video without stripping audio and with a loose quality setting can bloat file size
  by an order of magnitude — a batch of seven clips came out at roughly ten times the size it
  needed to be (fitness-instruction vertical).
- An agent left waiting on a long background encode job can time out silently — do the encode
  yourself and let the agent handle selection only.
- Not every browser respects `<source media="...">` fallback ordering inside `<video>` the same
  way — put the larger file first so degradation lands on quality, not on a broken player.

## Front-end build

- `perspective` on any ancestor element forces some browsers to rasterize a layer at a lower
  effective resolution — a sharp vector renders jagged on high-DPI screens. Fix by moving the
  vector out from under the `perspective` ancestor (professional-services vertical).
- Inside a `transform-style: preserve-3d` scene, a shadow drawn "slightly below" an element can
  render on top of it due to plane intersection, not z-index — keep every shadow on one plane
  below the whole scene's lowest point (professional-services vertical).
- Some animation libraries strip inline styles once an animation completes — the "visible" state
  needs to win in your actual CSS, or sections drift back to invisible.
- Landing directly on an anchor leaves everything above the scroll position outside any
  scroll-triggered observer — show those elements by default instead of animating them in.
- If an animation module fails to load, the whole page can be left blank — add a timed fallback
  that removes the "hidden until animated" class regardless.
- A mobile menu can lock page scroll open — test both opening and closing it
  (professional-services vertical).
- Killing a dev server by matching its command-line string can accidentally kill your own
  current shell session if the pattern is too broad — match on the actual process arguments,
  not a loose grep.

## Multi-locale

- Framework i18n middleware often skips API routes and health checks, but will still 404 any
  path segment that happens to be spelled like a locale code (professional-services vertical).
- RTL breaks phone numbers, addresses, and copyright years through the bidi algorithm, not
  through CSS — isolate direction on every NAP field (professional-services vertical).
- A glossary of restricted terms assembled by the agency's own research, instead of by a native
  speaker, is an indexing blocker for that locale, not a translation
  (professional-services vertical).

## Deploy

- An application outside the live traffic path accepts a deploy, updates its container, and
  logs clean, while nothing changes from the outside. Verify externally, past cache, every time
  (professional-services vertical; own agency site, twice).
- Before decommissioning a service copy, list every domain riding on it — a subdomain routed
  through a shared catch-all rule can die along with it and keep appearing "alive" externally
  for hours due to edge caching.
- Traditional SMTP libraries cannot work on an edge/serverless runtime with no raw TCP access —
  only an HTTP-based send will work (contractor vertical).
- Some frameworks' `process.env` doesn't behave as expected inside an edge runtime; read secrets
  through the runtime's own binding mechanism instead.
- A containerized Next.js standalone build that isn't explicitly bound to `0.0.0.0` can report
  unhealthy forever on a `127.0.0.1` health check while the public site works fine
  (contractor vertical; nonprofit vertical).
- A static-export mode in some frameworks silently breaks dynamically generated
  `robots`/`sitemap` files unless explicitly forced back to static output
  (contractor vertical).
- Native image-processing libraries need a glibc base image — an Alpine base forces a
  from-source build.
- One-click DNS wizards from some registrars can rewrite an entire zone in one action — touch
  individual records via API, and never touch MX if the client's email lives on that domain
  (nonprofit vertical).
- A registrar's newer API format may require bearer-token auth while an older key format
  silently returns 401 (contractor vertical).
- Some headless-browser setups fail to load sites built on certain no-code platforms with a
  protocol-level error — disabling HTTP/2 and using a normal user agent fixes it; a plain `curl`
  works fine regardless (nonprofit vertical).

## Analytics

- Changing the tracked conversion event (e.g., page view → form submission) makes historical
  numbers incomparable — warn the client, or they'll conclude the new site underperforms
  (contractor vertical).
- Ad pixels and ad-account IDs on an old site are rarely something the client can name from
  memory — pull them from the old site's raw HTML before migrating away from it
  (contractor vertical).
