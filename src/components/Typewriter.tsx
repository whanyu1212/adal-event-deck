import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const TYPE_MS = 55; // average per character, with a little jitter so it reads as human
const DELETE_MS = 18;
const HOLD_MS = 2600;
const GAP_MS = 420;

/**
 * Types each line, holds it, deletes it and moves on, forever.
 * The cursor stays solid while typing and blinks while it waits, like a real terminal.
 * With reduced motion it just shows the first line.
 */
export function Typewriter({ lines, className = '' }: { lines: readonly string[]; className?: string }) {
  const calm = useReducedMotion();
  const [text, setText] = useState(calm ? lines[0] : '');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (calm) {
      setText(lines[0]);
      setBusy(false);
      return;
    }
    let line = 0;
    let n = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = lines[line];
      if (!deleting) {
        n += 1;
        setText(full.slice(0, n));
        setBusy(true);
        if (n >= full.length) {
          deleting = true;
          setBusy(false);
          timer = setTimeout(tick, HOLD_MS);
          return;
        }
        timer = setTimeout(tick, TYPE_MS * (0.6 + Math.random() * 0.8));
      } else {
        n -= 1;
        setText(full.slice(0, n));
        setBusy(true);
        if (n <= 0) {
          deleting = false;
          line = (line + 1) % lines.length;
          setBusy(false);
          timer = setTimeout(tick, GAP_MS);
          return;
        }
        timer = setTimeout(tick, DELETE_MS);
      }
    };

    timer = setTimeout(tick, 1400);
    return () => clearTimeout(timer);
  }, [calm, lines]);

  return (
    <span className={className}>
      {text}
      <span className={`prompt-cursor${busy ? ' is-busy' : ''}`} aria-hidden />
    </span>
  );
}
