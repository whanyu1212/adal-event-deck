// Ada Lovelace's Note G (1843): her table of operations for the Analytical Engine to compute
// Bernoulli numbers, run for real in the browser. The numbers on the slide come from here.
//
// - Variables V1..V24 are the Engine's columns. Undefined ones start at 0, as she assumed.
// - n = 4, so the program computes her B7 (her numbering starts at B0; today it is B8 = -1/30).
// - Op 4 as printed divides the wrong way round: 2V5 / 2V4, where her own "statement of
//   results" says (2n - 1) / (2n + 1), which is 2V4 / 2V5. `fixed` swaps it.
// - Ops 13-23 run once for B3 and again for B5. B7 is minus the sum in V13, from her equation
//   0 = A0 + A1 B1 + A3 B3 + A5 B5 + B7.
//
// Only op 4's wrong value is shown for the printed version. Transcriptions of the whole buggy
// run disagree on the final figure, so the slide never puts one on screen.

type Frac = { n: number; d: number };

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const frac = (n: number, d = 1): Frac => {
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
};
const add = (a: Frac, b: Frac) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a: Frac, b: Frac) => frac(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a: Frac, b: Frac) => frac(a.n * b.n, a.d * b.d);
const div = (a: Frac, b: Frac) => frac(a.n * b.d, a.d * b.n);

/** "−7/18", with a real minus sign. */
export const show = (f: Frac) => `${f.n < 0 ? '−' : ''}${Math.abs(f.n)}${f.d === 1 ? '' : `/${f.d}`}`;

/** Runs the whole table. Returns the result of ops 1-6 and the B7 it ends with. */
export function runNoteG(fixed: boolean) {
  const V: Frac[] = Array.from({ length: 25 }, () => frac(0));
  V[1] = frac(1);
  V[2] = frac(2);
  V[3] = frac(4); // n
  V[21] = frac(1, 6); // B1
  V[22] = frac(-1, 30); // B3
  V[23] = frac(1, 42); // B5
  const firstSix: Frac[] = [];

  V[4] = V[5] = V[6] = mul(V[2], V[3]); // 1: 2n
  firstSix.push(V[4]);
  V[4] = sub(V[4], V[1]); // 2: 2n - 1
  firstSix.push(V[4]);
  V[5] = add(V[5], V[1]); // 3: 2n + 1
  firstSix.push(V[5]);
  V[11] = fixed ? div(V[4], V[5]) : div(V[5], V[4]); // 4: the bug
  firstSix.push(V[11]);
  V[11] = div(V[11], V[2]); // 5
  firstSix.push(V[11]);
  V[13] = sub(V[13], V[11]); // 6: A0
  firstSix.push(V[13]);
  V[10] = sub(V[3], V[1]); // 7

  V[7] = add(V[2], V[7]); // 8
  V[11] = div(V[6], V[7]); // 9: A1
  V[12] = mul(V[21], V[11]); // 10: B1 A1
  V[13] = add(V[12], V[13]); // 11
  V[10] = sub(V[10], V[1]); // 12

  for (const b of [V[22], V[23]]) {
    // 13-23, once for B3 and once for B5
    V[6] = sub(V[6], V[1]);
    V[7] = add(V[1], V[7]);
    V[8] = div(V[6], V[7]);
    V[11] = mul(V[8], V[11]);
    V[6] = sub(V[6], V[1]);
    V[7] = add(V[1], V[7]);
    V[9] = div(V[6], V[7]);
    V[11] = mul(V[9], V[11]);
    V[12] = mul(b, V[11]);
    V[13] = add(V[12], V[13]);
    V[10] = sub(V[10], V[1]);
  }

  const b7 = sub(frac(0), V[13]); // 24
  return { firstSix: firstSix.map(show), b7: show(b7) };
}

/** Ops 1-6 as she printed them, then the rest folded into one row. */
export const NOTE_G_ROWS = [
  { op: '1', a: '¹V₂', sign: '×', b: '¹V₃', meant: '2n' },
  { op: '2', a: '¹V₄', sign: '−', b: '¹V₁', meant: '2n − 1' },
  { op: '3', a: '¹V₅', sign: '+', b: '¹V₁', meant: '2n + 1' },
  { op: '4', a: '²V₅', sign: '÷', b: '²V₄', meant: '(2n − 1) ÷ (2n + 1)', bug: true },
  { op: '5', a: '¹V₁₁', sign: '÷', b: '¹V₂', meant: '½ · (2n − 1) ÷ (2n + 1)' },
  { op: '6', a: '⁰V₁₃', sign: '−', b: '²V₁₁', meant: 'A₀' },
] as const;

/** The real value op 4 was meant to give, for the "expected" label. */
export const OP4_MEANT = runNoteG(true).firstSix[3];
