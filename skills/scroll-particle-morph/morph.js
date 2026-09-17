/* ============================================================
   Scroll-choreographed particle morph.

   Same mechanics as dala.craftedbygc.com (three.js + ScrollTrigger,
   position mix + explode factor in the vertex shader), but the shapes
   are generated procedurally instead of baked into EXR position maps —
   so a new shape is a function, not a Blender export.

   Pipeline:
     1. every shape is a function that fills a Float32Array (x,y,z) * N
     2. two attributes hold the current pair: aFrom / aTo
     3. the vertex shader mixes them and pushes each point outward
        along its own direction while the mix is mid-flight (explode)
     4. ScrollTrigger scrubs one number, 0 → 1, across the whole page
   ============================================================ */

import * as THREE from 'three';

/* ---------- config ---------- */

const PALETTE = [
  new THREE.Color('#8052ff'), // Electric Iris
  new THREE.Color('#8052ff'),
  new THREE.Color('#ffb829'), // Saffron Spark
  new THREE.Color('#15846e'), // Deep Verdant
  new THREE.Color('#3d7bff'),
  new THREE.Color('#d654ff'),
  new THREE.Color('#ffffff')  // one slot only — white blooms under additive blending
];

const WORDMARK = 'IGDIGI';

const isMobile = window.innerWidth < 720;
const COUNT = isMobile ? 14000 : 40000;          // Dala runs 200×200 = 40 000
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- deterministic random ---------- */

function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

/* ---------- 2D mask sampling ----------
   Paint a silhouette into an offscreen canvas, then rejection-sample
   points inside it. This is what lets any SVG-ish shape become a cloud. */

function maskSampler(paint, size = 512) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#fff';
  paint(ctx, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  return (rand) => {
    for (let i = 0; i < 400; i++) {
      const x = rand() * size;
      const y = rand() * size;
      if (data[(((y | 0) * size + (x | 0)) << 2) + 3] > 40) {
        // normalise to -1..1, y flipped (canvas y grows down)
        const nx = (x / size) * 2 - 1;
        const ny = -((y / size) * 2 - 1);
        const dist = Math.min(1, Math.hypot(nx, ny));
        return [nx, ny, dist];
      }
    }
    return [0, 0, 0];
  };
}

/* Brain: lobes + cerebellum + stem, with gyri strokes thickening the mask. */
function paintBrain(ctx, w, h) {
  const cx = w * 0.5, cy = h * 0.5, s = Math.min(w, h) / 100;
  const ell = (dx, dy, rx, ry, rot = 0) => {
    ctx.beginPath();
    ctx.ellipse(cx + dx * s, cy + dy * s, rx * s, ry * s, rot, 0, Math.PI * 2);
    ctx.fill();
  };
  ell(0, -4, 38, 29);
  ell(-19, -12, 21, 17, -0.3);
  ell(17, -13, 19, 15, 0.25);
  ell(-29, 6, 15, 13, -0.2);
  ell(23, 12, 14, 11, 0.4);
  ell(2, 19, 9, 11);
  ctx.lineCap = 'round';
  ctx.lineWidth = 4.5 * s;
  const folds = [
    [[-34, -6], [-21, -19], [-4, -11], [8, -23], [25, -13]],
    [[-32, 6], [-17, -2], [-2, 6], [13, -2], [28, 4]],
    [[-25, 17], [-9, 11], [4, 19], [19, 13]],
    [[-13, -25], [0, -29], [15, -25]]
  ];
  for (const pts of folds) {
    ctx.beginPath();
    ctx.moveTo(cx + pts[0][0] * s, cy + pts[0][1] * s);
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i], q = pts[i - 1];
      ctx.quadraticCurveTo(cx + q[0] * s, cy + q[1] * s,
        cx + ((q[0] + p[0]) / 2) * s, cy + ((q[1] + p[1]) / 2) * s);
    }
    ctx.stroke();
  }
}

/* Light bulb: glass envelope, neck, screw base with thread ridges. */
function paintBulb(ctx, w, h) {
  const cx = w * 0.5, s = Math.min(w, h) / 100, cy = h * 0.5;
  ctx.beginPath();
  ctx.arc(cx, cy - 14 * s, 26 * s, 0, Math.PI * 2);
  ctx.fill();
  // neck
  ctx.beginPath();
  ctx.moveTo(cx - 15 * s, cy + 6 * s);
  ctx.quadraticCurveTo(cx - 9 * s, cy + 16 * s, cx - 9 * s, cy + 21 * s);
  ctx.lineTo(cx + 9 * s, cy + 21 * s);
  ctx.quadraticCurveTo(cx + 9 * s, cy + 16 * s, cx + 15 * s, cy + 6 * s);
  ctx.closePath();
  ctx.fill();
  // base + thread
  ctx.fillRect(cx - 9 * s, cy + 21 * s, 18 * s, 14 * s);
  ctx.beginPath();
  ctx.moveTo(cx - 7 * s, cy + 35 * s);
  ctx.lineTo(cx + 7 * s, cy + 35 * s);
  ctx.lineTo(cx + 4 * s, cy + 41 * s);
  ctx.lineTo(cx - 4 * s, cy + 41 * s);
  ctx.closePath();
  ctx.fill();
  // filament, so the inside of the glass is not empty
  ctx.lineWidth = 2.4 * s;
  ctx.beginPath();
  ctx.moveTo(cx - 6 * s, cy + 12 * s);
  ctx.lineTo(cx - 5 * s, cy - 6 * s);
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(cx - 5 * s + (i % 2 ? 10 : 0) * s, cy - 8 * s - i * 3 * s);
  }
  ctx.lineTo(cx + 5 * s, cy - 6 * s);
  ctx.lineTo(cx + 6 * s, cy + 12 * s);
  ctx.stroke();
}

/* Text mask — the wordmark shape. */
function paintText(text) {
  return (ctx, w, h) => {
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let size = Math.round(w * 0.30);
    ctx.font = `600 ${size}px Inter, system-ui, sans-serif`;
    // shrink until it fits with margin
    while (ctx.measureText(text).width > w * 0.92 && size > 12) {
      size -= 4;
      ctx.font = `600 ${size}px Inter, system-ui, sans-serif`;
    }
    ctx.fillText(text, w / 2, h / 2);
  };
}

/* ---------- shape generators: fill a Float32Array of xyz ---------- */

const R = 24; // world radius of the composition

function shapeFromMask(paint, opts = {}) {
  const depth = opts.depth ?? 3.5;
  const lens = opts.lens ?? true;
  const jitter = opts.jitter ?? 0.5;
  return (arr, count, seed) => {
    const rand = rng(seed);
    const sample = maskSampler(paint);
    for (let i = 0; i < count; i++) {
      const [nx, ny, dist] = sample(rand);
      // lens profile: thicker in the middle of the silhouette, thin at the rim
      const thick = lens ? Math.sqrt(Math.max(0, 1 - dist * dist)) : 1;
      const z = (rand() * 2 - 1) * depth * thick + (rand() - 0.5) * jitter;
      arr[i * 3] = nx * R * 0.92;
      arr[i * 3 + 1] = ny * R * 0.92;
      arr[i * 3 + 2] = z;
    }
  };
}

/* Globe: most points on the sphere shell, some on the lat/long grid so the
   silhouette reads as a wireframe planet rather than a fuzzy ball. */
function shapeGlobe(arr, count, seed) {
  const rand = rng(seed);
  const radius = R * 0.78;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const onGrid = rand() < 0.42;
    let x, y, z;
    if (onGrid) {
      // 12 meridians + 7 parallels
      if (rand() < 0.55) {
        const lon = (Math.floor(rand() * 12) / 12) * Math.PI * 2;
        const lat = (rand() - 0.5) * Math.PI;
        x = Math.cos(lat) * Math.cos(lon);
        y = Math.sin(lat);
        z = Math.cos(lat) * Math.sin(lon);
      } else {
        const lat = ((Math.floor(rand() * 7) + 0.5) / 7 - 0.5) * Math.PI * 0.92;
        const lon = rand() * Math.PI * 2;
        x = Math.cos(lat) * Math.cos(lon);
        y = Math.sin(lat);
        z = Math.cos(lat) * Math.sin(lon);
      }
    } else {
      // fibonacci sphere — even shell coverage
      const t = i / count;
      const yy = 1 - t * 2;
      const r = Math.sqrt(Math.max(0, 1 - yy * yy));
      const th = golden * i;
      x = Math.cos(th) * r; y = yy; z = Math.sin(th) * r;
    }
    const jitter = 1 + (rand() - 0.5) * 0.035;
    arr[i * 3] = x * radius * jitter;
    arr[i * 3 + 1] = y * radius * jitter;
    arr[i * 3 + 2] = z * radius * jitter;
  }
}

/* Scattered cloud — the "exploded" resting state between shapes. */
function shapeScatter(arr, count, seed) {
  const rand = rng(seed);
  for (let i = 0; i < count; i++) {
    const th = rand() * Math.PI * 2;
    const ph = Math.acos(rand() * 2 - 1);
    const rr = R * (0.55 + Math.pow(rand(), 0.6) * 1.15);
    arr[i * 3] = Math.sin(ph) * Math.cos(th) * rr * 1.5;
    arr[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * rr * 0.85;
    arr[i * 3 + 2] = Math.cos(ph) * rr;
  }
}

/* Ordered list of stages. Swap a line here and the choreography changes. */
const STAGES = [
  { name: 'brain',    build: shapeFromMask(paintBrain, { depth: 4.5 }) },
  { name: 'scatter',  build: shapeScatter },
  { name: 'bulb',     build: shapeFromMask(paintBulb, { depth: 4 }) },
  { name: 'globe',    build: shapeGlobe },
  { name: 'wordmark', flat: true, build: shapeFromMask(paintText(WORDMARK), { depth: 1.2, lens: false, jitter: 0.45 }) }
];

/* ---------- particle sprite: an outlined triangle ---------- */

function triangleTexture() {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, s, s);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(s * 0.5, s * 0.14);
  ctx.lineTo(s * 0.88, s * 0.82);
  ctx.lineTo(s * 0.12, s * 0.82);
  ctx.closePath();
  ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ---------- scene ---------- */

const canvas = document.getElementById('morph');
if (!canvas) throw new Error('#morph canvas missing');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight, false);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(0, 0, 74);

const geometry = new THREE.BufferGeometry();

const from = new Float32Array(COUNT * 3);
const to = new Float32Array(COUNT * 3);
STAGES[0].build(from, COUNT, 1013);
STAGES[1].build(to, COUNT, 1013);

const colors = new Float32Array(COUNT * 3);
const seeds = new Float32Array(COUNT);
const sizes = new Float32Array(COUNT);
const rand = rng(99173);
for (let i = 0; i < COUNT; i++) {
  const c = PALETTE[(rand() * PALETTE.length) | 0];
  colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  seeds[i] = rand();
  sizes[i] = 0.34 + rand() * 0.5;
}

geometry.setAttribute('aFrom', new THREE.BufferAttribute(from, 3));
geometry.setAttribute('aTo', new THREE.BufferAttribute(to, 3));
geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(from), 3)); // required by three
geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

const uniforms = {
  uMix: { value: 0 },        // 0 = aFrom, 1 = aTo
  uExplode: { value: 0 },    // outward push, peaks mid-transition
  uTime: { value: 0 },
  uScale: { value: (window.innerHeight / 900) * Math.min(window.devicePixelRatio || 1, 2) },
  uSprite: { value: triangleTexture() },
  uOpacity: { value: 0.62 },
  uCalm: { value: 0 }        // 1 = flat stage: no idle jitter, text stays legible
};

const material = new THREE.ShaderMaterial({
  uniforms,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexShader: /* glsl */`
    attribute vec3 aFrom;
    attribute vec3 aTo;
    attribute vec3 aColor;
    attribute float aSeed;
    attribute float aSize;

    uniform float uMix;
    uniform float uExplode;
    uniform float uTime;
    uniform float uScale;
    uniform float uCalm;

    varying vec3 vColor;
    varying float vFade;
    varying float vRot;

    // cheap hash noise — enough for turbulence, no texture needed
    vec3 hash3(float n) {
      return fract(sin(vec3(n, n + 1.37, n + 3.71)) * vec3(43758.5453, 22578.1459, 19642.3490)) * 2.0 - 1.0;
    }

    void main() {
      // per-particle stagger: points do not arrive all at once
      float stagger = 0.55 + aSeed * 0.45;
      float t = clamp((uMix - (1.0 - stagger) * 0.35) / stagger, 0.0, 1.0);
      t = t * t * (3.0 - 2.0 * t);                    // smoothstep easing

      vec3 pos = mix(aFrom, aTo, t);

      // explode: push along an individual direction, strongest mid-flight
      vec3 dir = normalize(mix(aFrom, aTo, 0.5) + hash3(aSeed * 91.7) * 6.0 + vec3(0.001));
      float burst = uExplode * (0.45 + aSeed * 0.55);
      pos += dir * burst * 26.0;

      // idle turbulence so a settled shape still breathes
      vec3 drift = hash3(aSeed * 13.3);
      pos += drift * (0.9 + burst * 5.0) * (1.0 - uCalm * 0.88) * sin(uTime * 0.35 + aSeed * 12.0);

      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mv;

      float dist = -mv.z;
      gl_PointSize = clamp(aSize * 470.0 * uScale / max(dist, 1.0), 1.0, 48.0);

      vColor = aColor;
      // depth fade doubles as a fake depth-of-field
      vFade = clamp(1.0 - (dist - 40.0) / 90.0, 0.15, 1.0) * (1.0 - burst * 0.25);
      vRot = aSeed * 6.28318 + uTime * 0.12 + burst * 2.5;
    }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D uSprite;
    uniform float uOpacity;
    varying vec3 vColor;
    varying float vFade;
    varying float vRot;

    void main() {
      // rotate the sprite around its centre
      vec2 uv = gl_PointCoord - 0.5;
      float s = sin(vRot), c = cos(vRot);
      uv = vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c) + 0.5;
      if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;

      float a = texture2D(uSprite, uv).a;
      if (a < 0.04) discard;
      gl_FragColor = vec4(vColor, a * vFade * uOpacity);
    }
  `
});

const points = new THREE.Points(geometry, material);
scene.add(points);

/* Keep the cloud out of the copy column on wide screens. */
function layout() {
  const wide = window.innerWidth >= 900;
  points.position.x = wide ? R * 0.52 : 0;
  points.position.y = wide ? 0 : R * 0.12;
}
layout();

/* ---------- stage pair swapping ---------- */

const cache = new Map();
function shapeData(index) {
  if (!cache.has(index)) {
    const arr = new Float32Array(COUNT * 3);
    STAGES[index].build(arr, COUNT, 1013 + index * 77);
    cache.set(index, arr);
  }
  return cache.get(index);
}

let pairFrom = -1;
function setPair(i) {
  if (pairFrom === i) return;
  pairFrom = i;
  geometry.attributes.aFrom.array.set(shapeData(i));
  geometry.attributes.aTo.array.set(shapeData(Math.min(i + 1, STAGES.length - 1)));
  geometry.attributes.aFrom.needsUpdate = true;
  geometry.attributes.aTo.needsUpdate = true;
}
setPair(0);

/* ---------- scroll → choreography ----------
   One scalar drives everything. Each stage gets a hold window (text is
   readable, shape is still) and a morph window (shape flies apart and
   reassembles). Values are in stage units: 0..STAGES.length-1 */

const HOLD = 0.32;   // share of each stage spent holding the shape

function applyProgress(p) {
  const span = STAGES.length - 1;
  const f = Math.min(Math.max(p, 0), 1) * span;
  const i = Math.min(Math.floor(f), span - 1);
  const local = f - i;

  setPair(i);

  let m;
  if (local < HOLD) m = 0;
  else if (local > 1 - HOLD) m = 1;
  else m = (local - HOLD) / (1 - HOLD * 2);

  uniforms.uMix.value = m;
  uniforms.uExplode.value = Math.sin(Math.PI * m) * 0.85;

  // flat stages (text) face the camera: damp spin and jitter as we arrive
  const flatFrom = STAGES[i].flat ? 1 : 0;
  const flatTo = STAGES[Math.min(i + 1, span)].flat ? 1 : 0;
  const flat = flatFrom + (flatTo - flatFrom) * m;
  uniforms.uCalm.value = flat;

  // the whole cloud rotates as you scroll, and tilts with the stage
  const spin = 1 - flat;
  points.rotation.y = p * Math.PI * 1.6 * spin;
  points.rotation.x = Math.sin(p * Math.PI * 2) * 0.22 * spin;
  camera.position.z = 74 - Math.sin(p * Math.PI) * 12;
}

/* ---------- loop ---------- */

const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
window.addEventListener('pointermove', (e) => {
  pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
  pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
}, { passive: true });

const clock = new THREE.Clock();
function tick() {
  const t = clock.getElapsedTime();
  uniforms.uTime.value = reduced ? 0 : t;
  pointer.x += (pointer.tx - pointer.x) * 0.045;
  pointer.y += (pointer.ty - pointer.y) * 0.045;
  camera.position.x = pointer.x * 6;
  camera.position.y = -pointer.y * 4;
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  layout();
  uniforms.uScale.value = (window.innerHeight / 900) * Math.min(window.devicePixelRatio || 1, 2);
});

/* ---------- wiring: Lenis (smooth scroll) + ScrollTrigger (scrub) ---------- */

function wireScroll() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const Lenis = window.Lenis;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    if (Lenis && !reduced) {
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    ScrollTrigger.create({
      trigger: '#stages',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => applyProgress(self.progress)
    });

    // stage copy fades in and out with its own section
    document.querySelectorAll('.stage__copy').forEach((el) => {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1, y: 0, ease: 'none',
          scrollTrigger: { trigger: el.closest('.stage'), start: 'top 78%', end: 'top 30%', scrub: true }
        });
      gsap.to(el, {
        autoAlpha: 0, y: -28, ease: 'none',
        scrollTrigger: { trigger: el.closest('.stage'), start: 'bottom 62%', end: 'bottom 18%', scrub: true }
      });
    });
  } else {
    // no GSAP (CDN blocked) — plain scroll listener, same choreography
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      applyProgress(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    document.querySelectorAll('.stage__copy').forEach((el) => { el.style.opacity = 1; });
  }
}

const stageParam = new URLSearchParams(location.search).get('stage');
applyProgress(stageParam !== null
  ? Math.min(Math.max(parseFloat(stageParam), 0), STAGES.length - 1) / (STAGES.length - 1)
  : 0);
tick();
wireScroll();

/* expose for console tinkering: window.morph.stage(2) jumps to a stage */
window.morph = {
  stage: (i) => applyProgress(i / (STAGES.length - 1)),
  stages: STAGES.map((s) => s.name),
  count: COUNT
};
