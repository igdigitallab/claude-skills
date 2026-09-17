---
name: scroll-particle-morph
description: A scroll-driven particle animation where a cloud of points assembles into a shape, explodes, and reassembles into the next one (e.g. brain → burst → light bulb → globe → wordmark). Use when someone wants an eye-catching WebGL hero for a landing page, "a particle effect like that one site," or a scroll-choreographed animation.
---

# Scroll-choreographed particle morph

A tested, shipped implementation of this mechanic. Live reference:
**https://styles.coscore.us** — scroll to see it in motion, or open with `?stage=N`
(`N` is a stage index, fractional values like `?stage=1.5` land mid-transition).

The full reference implementation is `morph.js` in this folder — copy it and edit the `STAGES`
list rather than rebuilding the mechanic from scratch.

## What a common paid-template version of this effect does

Effects like this are usually built on a fixed pipeline: three.js + GSAP ScrollTrigger for the
scroll wiring, particles instanced from a small 3D model, and the actual shapes **baked into
EXR position-map textures** produced by a 3D content tool (Blender/Houdini) — so every new shape
requires a new texture bake and export.

## The four building blocks of this version

The key difference from the baked-texture approach: here, **a shape is a function**, so a new
shape is a code change, not an export.

1. **A shape is a function that fills a `Float32Array(count * 3)`.**
   Draw the silhouette into an offscreen canvas, then rejection-sample points inside it. Depth
   (Z) comes from a "lens" profile (`sqrt(1 - r²)`) so the cloud reads as volumetric rather than
   flat. A sphere-based shape (e.g. a globe) instead mixes a Fibonacci-sphere distribution with
   points snapped onto meridian/parallel lines, so the silhouette reads as a wireframe globe
   rather than a fuzzy ball.

2. **A pair of shapes lives in two buffer attributes, `aFrom` / `aTo`.** On each transition they
   get overwritten in place (`attributes.aFrom.array.set(...)` + `needsUpdate = true`) rather
   than keeping one attribute per possible shape. ⚠️ A `position` attribute still has to exist
   on the geometry regardless — three.js needs it to compute a bounding sphere, and silently
   fails to render anything without it.

3. **The explosion is not a separate animation — it's a factor peaking mid-morph.**
   `uExplode = sin(π · mix)`; in the vertex shader, `pos += direction * burst * K`, where
   `direction` is a per-particle pseudo-random direction derived from a hash of that particle's
   seed. At both ends of the transition the factor is zero, so the shape assembles precisely.
   Add a small per-particle stagger so points don't all arrive in lockstep — without it, the
   effect reads as a slide, not a shatter-and-reassemble.

4. **Scroll position is the only clock.** A single `ScrollTrigger` (`start: 'top top', end:
   'bottom bottom', scrub: true`) exposes a 0→1 `progress` value; that value is then split into
   per-stage windows, each with a "hold" portion (text is readable, shape is still) and a
   "morph" portion. Layering a smooth-scroll library (e.g. Lenis) on top removes the jitter a
   raw mouse wheel otherwise produces.

## Gotchas found the hard way

- Clamp `gl_PointSize` explicitly — some GPUs cap it at 64–255px, and one nearby particle
  without a clamp becomes a screen-covering artifact.
- `gl_PointSize` is computed in framebuffer pixels, so multiply by `devicePixelRatio` — otherwise
  everything renders at half the intended size on high-DPI screens.
- Additive blending only reads correctly on a dark background; a light-theme version of the
  same scene needs normal blending plus real alpha, not just a color swap.
- White, under additive blending, blooms and washes out the rest of the palette — keep it to one
  slot out of a handful of colors, or the cloud turns into a cotton-candy blob.
- Flat shapes (text) must face the camera — damp rotation and idle jitter on those stages, or a
  word becomes unreadable.
- On mobile, cut the particle count roughly in half or more (e.g. 40k → 14k) — visually
  near-identical, and the phone doesn't throttle from heat.
- Respect `prefers-reduced-motion`: freeze the clock, but keep the shapes rendered — don't kill
  the whole scene, or the page goes blank.

## Adapting it for a new project

1. Copy `morph.js`, and edit only the `STAGES` list for the task at hand — two or three shapes
   is usually enough (e.g. logo → product → map).
2. Build a new shape from an SVG: replace a mask-painting function with
   `ctx.fill(new Path2D('<path data from the SVG>'))`, normalized into the same coordinate
   space as the other shapes.
3. Section layout: roughly 130–155vh of scroll per stage, copy in a column no wider than ~42
   characters, with a text-shadow so it stays legible over the moving field.
4. Budget: three.js (~170KB gzipped) + GSAP (~45KB) + a smooth-scroll library (~10KB) is a real
   cost for a one-page marketing site — load the module lazily after the first paint, or only
   above a minimum viewport width.
5. Test on an actual mid-range phone: tens of thousands of particles plus smooth-scroll on a
   weak Android device can drop well below 30fps even though it's smooth in a desktop devtools
   throttle.
