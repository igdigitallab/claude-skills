# Legal pages: privacy and terms

**Mandatory on every site, not "if the client asks."** If the lead form collects a name, phone
number, or email, that's personal data, and disclosure is expected — in California specifically
this falls under CCPA/CPRA, but the same shape of disclosure is good practice anywhere.

This is not legal advice — it's a minimum, honest disclosure template. For a client with real
legal exposure (healthcare, finance, anything involving minors), say plainly that their own
attorney should review the page, and don't imply the agency has signed off on it.

## Privacy policy — minimum content

A `/privacy` route (and a translated version for each additional locale), linked from the
footer on every page.

1. **Who collects the data** — the client's legal business name, address, a contact for
   requests.
2. **What is collected** — the form fields by name, plus IP/user-agent if you log them for
   anti-spam.
3. **Why** — to respond to the inquiry. No vague "to improve our services" unless it's actually
   used that way.
4. **Where it goes** — name the actual recipients: the messaging platform used for lead
   delivery, the hosting provider, any analytics tool. No "our partners" hand-waving.
5. **How long it's kept** — a concrete duration, or "until the request is resolved."
6. **User rights** (CCPA/CPRA-style, adapt to your jurisdiction): to know, to get a copy, to
   delete, to correct, and to not be discriminated against for exercising these rights. Name a
   real channel — the same email or phone already on the site.
7. **Data sales** — a direct line: not sold or shared for advertising (if that's true; if an ad
   pixel is installed, that already counts as "sharing" under CPRA-style law, and the wording
   needs to say so honestly).
8. **Children** — no data collected from under-13s through the form. For anything aimed at
   children, make clear a parent submits the form, and that should be visible in the form's own
   fields.
9. **Last-updated date.**

⚠️ If the site runs a Meta Pixel or Google Ads tag (common after migrating an old site), "we
don't share your data" becomes false. Either disclose the sharing honestly, or don't install
the pixel.

## Terms of service — minimum content

A `/terms` route, linked from the footer.

1. Who operates the site.
2. **Site content is not an offer and doesn't guarantee an outcome** — especially important for
   any practice where the client expects a result (legal, medical, financial, construction).
3. Prices on the site are indicative; final pricing is confirmed on contact, unless the client
   has confirmed fixed prices in writing.
4. The lead form doesn't create a contract or a booking.
5. IP in photos/text/materials belongs to the client.
6. External links are outside the agency's responsibility.
7. Right to change terms, with a last-updated date.
8. Governing jurisdiction, stated explicitly.

## Practice-specific lines worth adding

- **Legal services:** "information on this site is not legal advice; an attorney-client
  relationship is formed only by a signed engagement."
- **Therapy / healthcare:** not a medical consultation; a crisis line/number for anyone in
  crisis. The form is not HIPAA-secured — don't invite diagnostic information into it.
- **Accounting / tax:** not tax advice; verify whether the client is actually licensed to use
  terms like "CPA" or "accounting firm" before that language goes on the site — one real
  project's copy had to be adjusted specifically because the practitioner didn't hold that
  designation.
