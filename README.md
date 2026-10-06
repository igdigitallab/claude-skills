# Claude Skills

### A small, working collection of [Agent Skills](https://code.claude.com/docs/en/skills) for Claude Code (and any agent runtime that reads a `SKILL.md`) — built and used in production by a real web/AI agency, not written for a demo.

**Live demo:** [styles.coscore.us](https://styles.coscore.us) — the `scroll-particle-morph`
skill below, running on the actual client site it was built for. Scroll, or jump straight to a
stage with `?stage=2`.

---

## Why one repo, not five

Every skill here does one real, narrow job this agency does every week: build a client
website end to end, ship a scroll-driven WebGL hero, or write a Suno-ready song. They're
grouped in one repo on purpose — a single collection is easier to discover, install from, and
maintain than five one-file repos, and it's the honest unit: these are the skills one shop
actually reaches for, not a scattered grab-bag.

## Skills in this collection

| Skill | What it does | Reach for it when |
|---|---|---|
| [`client-site`](./skills/client-site/) | Full pipeline for a small-business website: 10-question intake, fact-mining from Instagram/old site/flyers, a spec, a design system, an Astro + Tailwind build, structured data, a contact form, legal pages, deploy, and a real handoff. | A client wants a website or landing page and you want a repeatable, no-fabrication process instead of guesswork. |
| [`scroll-particle-morph`](./skills/scroll-particle-morph/) | A scroll-choreographed WebGL particle field that assembles into a shape, explodes, and reassembles into the next one — procedural shapes instead of baked position-map textures, so a new shape is a code change. Reference implementation included. | You want a WebGL hero effect for a landing page — something that reads as "expensive" without a Blender/Houdini pipeline behind it. |
| [`songwriter`](./skills/songwriter/) | Writes song lyrics and a matching style-of-music prompt for Suno AI (or similar text-to-music tools): structure, meta-tags, vocal styles, ad-libs, and a troubleshooting checklist for tracks that come out flat. | You need a full song — lyrics plus a style prompt — ready to paste into a text-to-music tool. |

## Install

Each skill is a self-contained folder with a `SKILL.md` at its root — that's the only required
file; some skills also ship a `reference/` folder with detail the top-level file links to, or a
small code file meant to be copied and adapted.

```bash
git clone https://github.com/igdigitallab/claude-skills.git

# Claude Code: copy (or symlink) the skill folder you want into
# ~/.claude/skills/<name>/ (all projects) or <project>/.claude/skills/<name>/ (one project)
cp -r claude-skills/skills/client-site ~/.claude/skills/client-site
```

Any agent runtime that reads `SKILL.md` files the way Claude Code does (Cursor, Amp, and
others increasingly support the same convention) can use these the same way — point it at the
folder.

## Also from this agency

- [**cardloop**](https://github.com/igdigitallab/cardloop) — an open-source, mobile-first
  cockpit for running Claude Code agents from a kanban board.
- [**instagram-to-website**](https://github.com/igdigitallab/instagram-to-website) — a sibling
  skill that turns a solo professional's Instagram account into a real website using only what
  they actually posted. `client-site` above builds on the same design system.

## License

[MIT](./LICENSE) — use it, fork it, adapt it.

## Author

Built by [Igor Golubev](https://igdigi.com) at **IG Digital Lab**, a web design and AI
automation agency in Sacramento, California. Questions, feedback, or a project built with one of
these — open an issue or reach out via [igdigi.com](https://igdigi.com).
