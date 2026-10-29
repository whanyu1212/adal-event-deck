import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { now } from '../deck/time';

/*
  The build session as a pixel-art space mission, playing itself.

  "Build it. Launch it.": the rocket leaves Earth at Start and reaches the AdaL planet at
  Submit, so where it is shows how far the session has gone. On the way, asteroids drift
  in and it lines up and blasts them into pixels, arcade style, with a score in the corner.
  Before the start it waits by Earth ("READY FOR LAUNCH"). In the last five minutes it
  boosts and the stars streak. At Submit it parks by the planet, plants a flag and fireworks
  go off. The panel is a night sky in both themes, like the deck's illustrated app windows.
  Reduced motion keeps everything still.

  The rocket's path runs from X0 to (width - X1_FROM_RIGHT); the timeline rail under the
  panel is inset by the same amounts (.bb-track), so the rocket sits over the marks.
*/

export const X0 = 80;
export const X1_FROM_RIGHT = 232; // stops just short of the planet

const PX = 4; // one sprite pixel, in stage pixels

const C = {
  sky: '#0f0b18',
  white: '#f6edf5',
  pink: '#ff5898',
  pinkSoft: '#ffb1cc',
  pinkDeep: '#cc1d62',
  amber: '#ffb800',
  flameCore: '#fff4c2',
  frame: '#524155',
  glass: '#9bd8ff',
  nozzle: '#3a2d44',
  rock: '#8f839c',
  rockDark: '#5b5068',
  rockLight: '#b7abc3',
  ocean: '#2f5fd0',
  land: '#3fa66a',
  air: '#8fc3ff',
  hud: '#c1b3c8',
  green: '#9be564',
};

// Faces right; each letter is a colour.
const ROCKET = [
  '...pp...................',
  '...ppp..................',
  '...pppwwwwwwwwwww.......',
  '..wwwppwwwwwwwwwwwwp....',
  '.wwwwppwwwwwwwbbwwwwpp..',
  'nwwwwppwwwwwwbggbwwwwppp',
  '.wwwwppwwwwwwwbbwwwwpp..',
  '..wwwppwwwwwwwwwwwwp....',
  '...pppwwwwwwwwwww.......',
  '...ppp..................',
  '...pp...................',
];
const ROCKET_COLORS: Record<string, string> = { w: C.white, p: C.pink, b: C.frame, g: C.glass, n: C.nozzle };
const RPX = 5; // the rocket and its flame are drawn a touch bigger than the rest
const ROCKET_W = ROCKET[0].length * RPX;
const ROCKET_H = ROCKET.length * RPX;

const FLAMES = [
  ['.....oo', '...ooyy', '.ooyyyc', '...ooyy', '.....oo'],
  ['....ooo', '..oooyy', 'oooyyyc', '..oooyy', '....ooo'],
];
const BOOST = ['...ooooo', '.oooooyy', 'ooooyyyc', '.oooooyy', '...ooooo'];
const FLAME_COLORS: Record<string, string> = { o: C.pink, y: C.amber, c: C.flameCore };

const ROCKS = [
  ['..LLL...', '.LrrrrL.', 'LrrdrrrL', 'Lrrrrdrr', 'rrdrrrrr', '.rrrrdr.', '..rrrr..'],
  ['...LL...', '.LLrrr..', 'Lrrrrrr.', 'rrdrrdrr', '.rrrrrrr', '.rrdrrr.', '...rr...'],
];
const ROCK_COLORS: Record<string, string> = { r: C.rock, d: C.rockDark, L: C.rockLight };

// A 5-row pixel font for the HUD; most glyphs are 3 wide, M and N need more.
const FONT: Record<string, string[]> = {
  A: ['.#.', '#.#', '###', '#.#', '#.#'],
  B: ['##.', '#.#', '##.', '#.#', '##.'],
  C: ['###', '#..', '#..', '#..', '###'],
  D: ['##.', '#.#', '#.#', '#.#', '##.'],
  E: ['###', '#..', '##.', '#..', '###'],
  F: ['###', '#..', '##.', '#..', '#..'],
  H: ['#.#', '#.#', '###', '#.#', '#.#'],
  I: ['###', '.#.', '.#.', '.#.', '###'],
  L: ['#..', '#..', '#..', '#..', '###'],
  M: ['#...#', '##.##', '#.#.#', '#...#', '#...#'],
  N: ['#..#', '##.#', '#.##', '#..#', '#..#'],
  O: ['###', '#.#', '#.#', '#.#', '###'],
  P: ['###', '#.#', '###', '#..', '#..'],
  R: ['##.', '#.#', '##.', '#.#', '#.#'],
  S: ['###', '#..', '###', '..#', '###'],
  T: ['###', '.#.', '.#.', '.#.', '.#.'],
  U: ['#.#', '#.#', '#.#', '#.#', '###'],
  Y: ['#.#', '#.#', '.#.', '.#.', '.#.'],
  '0': ['###', '#.#', '#.#', '#.#', '###'],
  '1': ['.#.', '##.', '.#.', '.#.', '###'],
  '2': ['###', '..#', '###', '#..', '###'],
  '3': ['###', '..#', '.##', '..#', '###'],
  '4': ['#.#', '#.#', '###', '..#', '..#'],
  '5': ['###', '#..', '###', '..#', '###'],
  '6': ['###', '#..', '###', '#.#', '###'],
  '7': ['###', '..#', '..#', '..#', '..#'],
  '8': ['###', '#.#', '###', '#.#', '###'],
  '9': ['###', '#.#', '###', '..#', '###'],
  '!': ['.#.', '.#.', '.#.', '...', '.#.'],
  ' ': ['...', '...', '...', '...', '...'],
};

type Ctx = CanvasRenderingContext2D;

/** Paints a sprite one horizontal run of the same colour at a time. */
function sprite(ctx: Ctx, rows: readonly string[], colors: Record<string, string>, x: number, y: number, px: number) {
  rows.forEach((row, r) => {
    let c = 0;
    while (c < row.length) {
      const ch = row[c];
      const fill = colors[ch];
      if (!fill) {
        c++;
        continue;
      }
      const from = c;
      while (row[c] === ch) c++;
      ctx.fillStyle = fill;
      ctx.fillRect(Math.round(x + from * px), Math.round(y + r * px), (c - from) * px, px);
    }
  });
}

function text(ctx: Ctx, s: string, x: number, y: number, px: number, color: string, align: 'left' | 'center' | 'right' = 'left') {
  const glyphs = [...s].map((ch) => FONT[ch] ?? FONT[' ']);
  const w = glyphs.reduce((sum, g) => sum + (g[0].length + 1) * px, 0) - px;
  let at = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  for (const g of glyphs) {
    sprite(ctx, g, { '#': color }, at, y, px);
    at += (g[0].length + 1) * px;
  }
}

type Cell = { x: number; y: number; color: string };

/** A pixel disc, lit from the upper left. */
function disc(r: number, cell: number, pick: (dx: number, dy: number, light: number) => string | null): Cell[] {
  const out: Cell[] = [];
  for (let y = -r; y <= r; y += cell) {
    for (let x = -r; x <= r; x += cell) {
      if (x * x + y * y > r * r) continue;
      const color = pick(x, y, (-0.6 * x - 0.8 * y) / r);
      if (color) out.push({ x, y, color });
    }
  }
  return out;
}

const hash = (x: number, y: number) => {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

const PLANET_R = 56;
const PLANET = disc(PLANET_R, PX, (_dx, _dy, light) => (light > 0.45 ? C.pinkSoft : light < -0.35 ? C.pinkDeep : C.pink));
// The ring: an ellipse two cells thick, traced by angle and snapped to the pixel grid.
// Cells in front of the planet (lower half) are drawn after it, the rest before.
const RING: { x: number; y: number; front: boolean }[] = [];
{
  const seen = new Set<string>();
  for (const [rx, ry] of [
    [98, 18],
    [94, 15],
  ]) {
    for (let a = 0; a < Math.PI * 2; a += 0.01) {
      const x = Math.round((Math.cos(a) * rx) / PX) * PX;
      const y = Math.round((Math.sin(a) * ry) / PX) * PX;
      const key = `${x},${y}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const front = y >= 0;
      if (!front && x * x + y * y < PLANET_R * PLANET_R) continue; // hidden behind the planet
      RING.push({ x, y, front });
    }
  }
}
// The AdaL mark, in pixels
const MARK = ['...#...', '..###..', '..#.#..', '.##.##.', '.#####.', '##...##', '#.....#'];
const EARTH_R = 132;
const EARTH = disc(EARTH_R, PX, (dx, dy, light) => {
  const land = hash(Math.round(dx / 16), Math.round(dy / 16)) > 0.62;
  if (light < -0.5) return land ? '#2c7a4d' : '#22468f';
  return land ? C.land : C.ocean;
});
const ATMOSPHERE = disc(EARTH_R + PX * 2, PX, () => C.air).filter((c) => Math.hypot(c.x, c.y) > EARTH_R - 2);
const EARTH_DROP = 78; // Earth's centre sits this far below the panel, so only its top shows

type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number; gravity: number };

export function RocketRun({ start, end, warning }: { start: number; end: number; warning: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const times = useRef({ start, end, warning });
  times.current = { start, end, warning };
  const calm = !!useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let W = 0;
    let H = 0;
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * 2;
      canvas.height = H * 2;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Three layers of stars, scattered on the first frame that has a size.
    let stars: { x: number; y: number; layer: number; phase: number }[] = [];
    const seed = () => {
      stars = Array.from({ length: 140 }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        layer: i % 3,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const earthVisible = EARTH.filter((c) => c.y < -EARTH_DROP);
    let rocks: { x: number; y: number; vx: number; px: number; shape: number }[] = [];
    let bolts: { x: number; y: number }[] = [];
    let sparks: Particle[] = [];
    let spawnIn = 0.6;
    let cooldown = 0;
    let fireworkIn = 0.3;
    let score = 0;
    let scoredFrom = NaN;
    let rocketY = 0;
    let clock = 0;

    const burst = (x: number, y: number, colors: string[], n: number, speed: number, gravity: number, life: number) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.4;
        const v = speed * (0.5 + Math.random() * 0.6);
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          life: life * (0.7 + Math.random() * 0.5),
          max: life,
          color: colors[i % colors.length],
          size: PX,
          gravity,
        });
      }
    };

    let raf = 0;
    let last = performance.now();
    const frame = (ms: number) => {
      // The first frame's timestamp can be a hair before `last`; never step backwards.
      const dt = Math.min(0.05, Math.max(0, (ms - last) / 1000));
      last = ms;
      raf = requestAnimationFrame(frame);
      if (W === 0 || H === 0) return;
      if (!stars.length) {
        seed();
        rocketY = H / 2;
      }
      // A window opened mid-session starts with the score it would have earned by now
      // (about one asteroid every 2.4s), then counts real hits on top. A restart resets it.
      if (times.current.start !== scoredFrom) {
        scoredFrom = times.current.start;
        const flown = Math.min(times.current.end, Math.max(scoredFrom, now())) - scoredFrom;
        score = Math.floor(flown / 2400) * 10;
      }
      clock += calm ? 0 : dt;

      const t = now();
      const { start, end, warning } = times.current;
      const mode = t < start ? 'idle' : t >= end ? 'done' : t >= warning ? 'boost' : 'run';
      const flying = !calm && (mode === 'run' || mode === 'boost');
      const p = Math.min(1, Math.max(0, (t - start) / (end - start)));
      const x0 = X0;
      const x1 = W - X1_FROM_RIGHT;
      const rx = x0 + p * (x1 - x0); // the rocket's centre
      const planet = { x: W - 92, y: H / 2 };
      const earth = { x: x0 - 90, y: H + EARTH_DROP };
      const warp = mode === 'boost' ? 5 : flying ? 1 : 0.2;

      // Stars drift left; faster layers are nearer.
      if (!calm) {
        for (const s of stars) {
          s.x -= [10, 26, 60][s.layer] * warp * dt;
          if (s.x < -20) {
            s.x += W + 20;
            s.y = Math.random() * H;
          }
        }
      }

      // Asteroids come in from the right while the rocket flies.
      if (flying) {
        spawnIn -= dt;
        if (spawnIn <= 0) {
          rocks.push({
            x: W + 30,
            y: 28 + Math.random() * (H - 56),
            vx: -(130 + Math.random() * 90) * (mode === 'boost' ? 1.7 : 1),
            px: Math.random() < 0.5 ? PX : 3,
            shape: Math.floor(Math.random() * ROCKS.length),
          });
          spawnIn = (1.1 + Math.random() * 1.8) * (mode === 'boost' ? 0.55 : 1);
        }
      } else {
        rocks = [];
        bolts = [];
      }
      for (const r of rocks) r.x += r.vx * dt;
      rocks = rocks.filter((r) => r.x > -60);

      // Line up on the nearest asteroid ahead and fire; otherwise drift gently.
      const ahead = rocks.filter((r) => r.x > rx + ROCKET_W / 2 + 10).sort((a, b) => a.x - b.x)[0];
      const cruise = H / 2 + Math.sin(clock * 0.8) * 22;
      const goal = flying && ahead ? ahead.y : cruise;
      rocketY += (goal - rocketY) * Math.min(1, dt * (flying ? 3.2 : 1.5));
      const bob = calm ? 0 : Math.sin(clock * 3) * 2.5;
      const ry = Math.min(H - ROCKET_H / 2 - 6, Math.max(ROCKET_H / 2 + 6, rocketY + bob));

      cooldown -= dt;
      if (flying && ahead && Math.abs(ahead.y - ry) < 10 && ahead.x - rx < 560 && cooldown <= 0) {
        bolts.push({ x: rx + ROCKET_W / 2, y: ry - 2 });
        cooldown = mode === 'boost' ? 0.25 : 0.42;
      }
      for (const b of bolts) b.x += 950 * dt;
      bolts = bolts.filter((b) => {
        const hit = rocks.find((r) => {
          const half = (8 * r.px) / 2;
          return Math.abs(b.y - r.y) < half + 4 && b.x + 18 >= r.x - half && b.x <= r.x + half;
        });
        if (hit) {
          rocks = rocks.filter((r) => r !== hit);
          burst(hit.x, hit.y, [C.rockLight, C.rock, C.pink, C.amber], 16, 150, 0, 0.6);
          score += 10;
          return false;
        }
        return b.x < W + 20;
      });

      // Exhaust while flying.
      if (flying) {
        const n = mode === 'boost' ? 3 : 1;
        for (let i = 0; i < n; i++) {
          sparks.push({
            x: rx - ROCKET_W / 2 - (mode === 'boost' ? 30 : 24),
            y: ry + (Math.random() - 0.5) * 10,
            vx: -(80 + Math.random() * 90) * (mode === 'boost' ? 1.8 : 1),
            vy: (Math.random() - 0.5) * 24,
            life: 0.5,
            max: 0.5,
            color: Math.random() < 0.5 ? C.pink : C.pinkSoft,
            size: Math.random() < 0.6 ? PX : 2,
            gravity: 0,
          });
        }
      }

      // Fireworks over the planet once time is up.
      if (!calm && mode === 'done') {
        fireworkIn -= dt;
        if (fireworkIn <= 0) {
          const palette = [
            [C.pink, C.pinkSoft, C.white],
            [C.amber, C.flameCore, C.white],
            [C.glass, C.white, C.green],
          ][Math.floor(Math.random() * 3)];
          burst(W - 140 - Math.random() * 560, 34 + Math.random() * (H * 0.4), palette, 36, 170, 80, 1.5);
          fireworkIn = 0.55 + Math.random() * 0.6;
        }
      }

      for (const s of sparks) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vy += s.gravity * dt;
        s.life -= dt;
      }
      sparks = sparks.filter((s) => s.life > 0);

      // ---- Paint
      ctx.setTransform(2, 0, 0, 2, 0, 0);
      ctx.clearRect(0, 0, W, H);

      for (const s of stars) {
        const size = [2, 2, 3][s.layer];
        const twinkle = calm ? 1 : 0.65 + 0.35 * Math.sin(clock * 2 + s.phase);
        ctx.globalAlpha = [0.35, 0.55, 0.85][s.layer] * twinkle;
        ctx.fillStyle = C.white;
        const streak = mode === 'boost' && !calm ? [6, 14, 30][s.layer] : size;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), streak, size);
      }
      ctx.globalAlpha = 1;

      // Earth, bottom left, with a thin atmosphere
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = C.air;
      for (const c of ATMOSPHERE) if (c.y < -EARTH_DROP) ctx.fillRect(earth.x + c.x, earth.y + c.y, PX, PX);
      ctx.globalAlpha = 1;
      for (const c of earthVisible) {
        ctx.fillStyle = c.color;
        ctx.fillRect(earth.x + c.x, earth.y + c.y, PX, PX);
      }

      // The AdaL planet: ring behind, disc, ring in front, the AdaL "A" on its face
      ctx.fillStyle = C.pinkSoft;
      ctx.globalAlpha = 0.55;
      for (const c of RING) if (!c.front) ctx.fillRect(planet.x + c.x, planet.y + c.y, PX, PX);
      ctx.globalAlpha = 1;
      for (const c of PLANET) {
        ctx.fillStyle = c.color;
        ctx.fillRect(planet.x + c.x, planet.y + c.y, PX, PX);
      }
      sprite(ctx, MARK, { '#': C.white }, planet.x - 3.5 * PX - 6, planet.y - 3.5 * PX - 6, PX);
      ctx.fillStyle = C.pinkSoft;
      ctx.globalAlpha = 0.9;
      for (const c of RING) if (c.front) ctx.fillRect(planet.x + c.x, planet.y + c.y, PX, PX);
      ctx.globalAlpha = 1;
      if (mode === 'done') {
        const fx = planet.x + 10;
        const fy = planet.y - PLANET_R - 30;
        ctx.fillStyle = C.white;
        ctx.fillRect(fx, fy, 3, 32);
        sprite(ctx, ['####', '####', '###.', '##..'], { '#': C.amber }, fx + 3, fy, PX);
      }

      for (const r of rocks) {
        const half = (8 * r.px) / 2;
        sprite(ctx, ROCKS[r.shape], ROCK_COLORS, r.x - half, r.y - (7 * r.px) / 2, r.px);
      }

      ctx.fillStyle = C.pinkSoft;
      for (const b of bolts) {
        ctx.fillRect(Math.round(b.x), Math.round(b.y) - 2, 18, 4);
        ctx.fillStyle = C.white;
        ctx.fillRect(Math.round(b.x) + 10, Math.round(b.y) - 1, 8, 2);
        ctx.fillStyle = C.pinkSoft;
      }

      for (const s of sparks) {
        ctx.globalAlpha = Math.max(0, s.life / s.max);
        ctx.fillStyle = s.color;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
      }
      ctx.globalAlpha = 1;

      const left = rx - ROCKET_W / 2;
      const top = ry - ROCKET_H / 2;
      if (flying) {
        const flame = mode === 'boost' ? BOOST : FLAMES[Math.floor(clock * 14) % 2];
        sprite(ctx, flame, FLAME_COLORS, left - flame[0].length * RPX + 2, top + 3 * RPX, RPX);
      }
      sprite(ctx, ROCKET, ROCKET_COLORS, left, top, RPX);
      // A beacon on the nose blinks while it waits
      if (mode === 'idle' && Math.floor(clock * 2) % 2 === 0) {
        ctx.fillStyle = C.green;
        ctx.fillRect(left + ROCKET_W - RPX, top + 5 * RPX, RPX, RPX);
      }

      // HUD
      const pad = 16;
      if (mode !== 'idle') text(ctx, `SCORE ${String(score).padStart(5, '0')}`, W - pad, pad, 3, C.hud, 'right');
      if (mode === 'idle' && (calm || Math.floor(clock * 1.6) % 2 === 0))
        text(ctx, 'READY FOR LAUNCH', W / 2, H / 2 - 9, 4, C.white, 'center');
      if (mode === 'boost' && (calm || Math.floor(clock * 3) % 2 === 0)) text(ctx, 'BOOST!', pad, pad, 3, C.amber);
      if (mode === 'done') text(ctx, 'MISSION COMPLETE', W / 2 - 60, H / 2 - 9, 4, C.white, 'center');
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [calm]);

  return <canvas ref={ref} className="bb-scene" aria-hidden />;
}
