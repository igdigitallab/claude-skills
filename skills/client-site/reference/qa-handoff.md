# QA and handoff

Three parts. Skipping any one of them turns into an unpaid rebuild or a project that stalls
after "done."

## 1. QA — phone first

Write the results down somewhere the client (or your future self) can see them.

- [ ] **390px first, before desktop.** The phone screenshot goes into the report first.
- [ ] Screenshots at 390 / 768 / 1440, each repeated with the OS in dark mode.
- [ ] The mobile menu opens *and* closes, and never locks page scroll (a real, repeated bug).
- [ ] A sticky mobile CTA exists and hides once the visitor reaches the form itself.
- [ ] A live POST to `/api/lead` on the production domain — the message actually arrived.
- [ ] Zero console errors, exactly one `<h1>`, every `<img>` has `alt`, no elements stuck at
      `opacity: 0`.
- [ ] Landing directly on an anchor (e.g. `/#pricing` from a search result) doesn't leave
      everything above it invisible.
- [ ] `prefers-reduced-motion: reduce` actually freezes animation and video.
- [ ] Zero em dashes in visible copy.
- [ ] Zero stock photography.
- [ ] `robots.txt`, `sitemap.xml`, and `llms.txt` all resolve; JSON-LD validates.
- [ ] **Agency credit present, all layers** (see `agency-credit.md`): a visible footer line on
      every page, a plain crawlable link, and a `creator` entry in JSON-LD. Anchor text has no
      city name and no `nofollow`/UTM params, unless the client explicitly waived it in writing.
- [ ] The indexability flag is off on any preview/staging copy and on for production.
- [ ] Run a Core Web Vitals check (Lighthouse or equivalent) before calling it done.

## 2. The client confirms facts — before publishing, not after

Walk `OPEN-QUESTIONS.md` line by line with the client and get a written "yes" on each item. The
absence of this step is what caused this agency's single most expensive rebuild.

- [ ] Prices confirmed in person, including any "call for a quote" policy.
- [ ] Certifications and licenses worded exactly as printed on the official document; expired
      dates are not published.
- [ ] Testimonials are verbatim, with written consent to publish the names attached to them.
- [ ] Consent obtained for any photo of a third party or a child.
- [ ] Hours, address, and phone cross-checked against a public registry; discrepancies
      discussed with the owner, not silently resolved.
- [ ] A named, real person is confirmed as the one who reads form submissions.
- [ ] The fate of the old site and domain is decided: replaced, or kept running in parallel.
- [ ] A second-language version has been proofread by an actual native speaker, not just
      machine-translated.

**Not confirmed = not published.** An empty footer block is more honest than invented hours.

## 3. Handoff

- [ ] **Who owns the domain.** If it was registered under the agency's name pre-signoff,
      transfer ownership now, or write down explicitly that the agency keeps it and why.
- [ ] **Access:** hosting/DNS provider, the GitHub repo, analytics and ads accounts, any old
      site's admin panel. What the client gets, what stays with the agency — as an explicit
      list, not a verbal understanding.
- [ ] **Pixels and analytics from the old site have been carried over** so the client doesn't
      lose the history of their paid advertising.
- [ ] **Flag any change in the tracked conversion event** — historical numbers become
      incomparable, and the client may wrongly conclude the new site performs worse.
- [ ] **Who fixes bugs, who renews the domain, who pays for hosting** — said out loud and
      written down. For a client running paid ads, downtime costs real money today, not
      abstractly.
- [ ] **What happens if the agency becomes unreachable.** "Nothing, you're on your own" is a
      valid answer — but it has to be said before delivery, not discovered during an outage.
- [ ] **The agency credit is confirmed as a term of the service agreement**, not the agency's
      personal preference — removable only by written consent. The moment access is handed
      over is the one point the client can physically remove it, and the last natural moment to
      mention that it's contractual.
- [ ] **Log the client** in your own client/portfolio registry: contact, domain, repo path,
      host, delivery date, status, payment terms. Without this line the site isn't under
      monitoring and can die silently.
