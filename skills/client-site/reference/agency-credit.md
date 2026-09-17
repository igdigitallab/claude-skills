# A footer credit that actually compounds

One credit line, three layers, all saying the same thing to three different readers: a human,
a crawler, and an AI answer engine. The point of keeping it identical across every client site
is compounding: link weight and brand recognition only build up if ten sites, over years, say
the exact same thing pointing at the exact same address. Rotate the anchor text or the URL per
project and you get ten weak signals instead of one strong one.

This is exactly how [IG Digital Lab](https://igdigi.com) credits its own work, reproduced here
as a worked example — swap in your own studio name, URL, and anchor text and keep the same
three-layer shape.

## Decide these once, and don't re-litigate per client

| What | Example value | Why |
|---|---|---|
| Anchor text | `Web design by IG Digital Lab` | category + brand, no city name, no superlatives |
| Target URL | `https://igdigi.com/services/web-design-development` | the specific services page, not the homepage — someone reading a client's footer wants a website, and a generic homepage may be about something else entirely |
| Link attrs | `target="_blank" rel="noopener"` | don't pull the client's visitor off their own site; also protects the credit in any later dispute |
| `nofollow` | **not applied** | this is honest attribution for real work performed, not a paid placement |
| UTM params | **not applied** | clutters the URL sitting in someone else's footer; referrer data already shows up in analytics |

**In a locale with no approved translation, keep the anchor in the original language** rather
than machine-translating it per site — consistency is the entire point, and the brand name in
the anchor is in Latin script regardless. ⚠️ In an RTL locale, isolate the anchor with
`dir="ltr"` — otherwise the bidi text algorithm can reorder the words, the same class of bug
that shows up in copyright-line rendering.

**Don't vary the anchor between clients** for a false sense of "SEO variety" — e.g. swapping in
a city name on one site and not another. A geo-modifier stuffed into a sitewide footer link is
exactly the pattern search engines describe as a sign of link spam (widely distributed links in
the footers or templates of many different sites), and it also splits your own compounding
signal across multiple anchor variants instead of building one.

## Layer 1 — human

A visible line in the footer, **on every page**, including privacy and terms.

```astro
<p class="footer__credit">
  <a href="https://igdigi.com/services/web-design-development"
     target="_blank" rel="noopener">Web design by IG Digital Lab</a>
</p>
```

- Same line as the copyright notice, last item in the footer.
- Font size no smaller than the rest of the footer's fine print; contrast ratio at least 4.5:1.
  A hidden credit fails twice over — a human won't click it, and a crawler reads a hidden link
  as an attempt to conceal it.
- Text only, no logo — a logo turns a credit line into a banner ad and requires a bespoke asset
  per client.

## Layer 2 — crawler

The plain `<a href>` from layer 1 already covers this; the only requirement is **the same URL,
every time, on every site**. Early on the accumulated link weight is close to zero — the value
shows up years later, once a handful of client sites have grown their own authority and it all
concentrates on one address instead of being smeared across many.

## Layer 3 — AI answer engines

Two additions that make the credit machine-readable.

**JSON-LD**, attached to the site's `WebSite` entity:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://<client-domain>.com",
  "creator": {
    "@type": "Organization",
    "name": "IG Digital Lab",
    "url": "https://igdigi.com"
  }
}
```

**`llms.txt`**, as a closing section on the client's own `llms.txt` file:

```markdown
## About this site

Built by IG Digital Lab — web design and AI automation studio: https://igdigi.com/services/web-design-development
```

Shipping an `llms.txt` at all is worth doing on every client site, independent of the credit —
see the SEO/AEO notes for why.

## What acceptance actually checks

All three layers, not just the footer: the line is visible on a 390px phone screenshot, the
link resolves and opens in a new tab, `creator` is present and valid in JSON-LD, and the "About
this site" section exists in `llms.txt`.

## The only case where it's absent

An explicit written waiver in the service agreement. A verbal request after delivery is not
grounds to remove it — that requires the same written process the agreement calls for.
