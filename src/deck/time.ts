import { useEffect, useState } from 'react';
import { event } from '../event';

const OFFSET = '+08:00';

/** A time on the event day, e.g. at('19:30'), in Singapore time. */
export function at(hhmm: string): number {
  return Date.parse(`${event.date}T${hhmm}:00${OFFSET}`);
}

/** "7:30" style label for a "19:30" schedule time. */
export function label(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')}`;
}

/** Wall-clock time in Singapore, e.g. "7:42". */
export function clockLabel(ms: number): string {
  return new Intl.DateTimeFormat('en-SG', {
    timeZone: 'Asia/Singapore',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
    .format(ms)
    .replace(/\s?[ap]m$/i, '');
}

/** "57:04" or "1:02:09" for a positive duration. */
export function duration(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = h ? String(m).padStart(2, '0') : String(m);
  return `${h ? `${h}:` : ''}${mm}:${String(s).padStart(2, '0')}`;
}

// Rehearsal overrides, read once from the URL:
//   ?now=19:45      pretend it's 7:45pm on the event day
//   ?speed=30       run the clock 30x faster
const params = new URLSearchParams(typeof location === 'undefined' ? '' : location.search);
const startedAt = Date.now();
const nowParam = params.get('now');
const base = nowParam
  ? /^\d{1,2}:\d{2}$/.test(nowParam)
    ? at(nowParam.padStart(5, '0'))
    : Date.parse(nowParam)
  : startedAt;
const speed = Number(params.get('speed')) || 1;

export const isRehearsalClock = Boolean(nowParam) || speed !== 1;

export function now(): number {
  return base + (Date.now() - startedAt) * speed;
}

/** Re-renders every `everyMs` and returns the (possibly rehearsal) current time. */
export function useNow(everyMs = 250): number {
  const [t, setT] = useState(now);
  useEffect(() => {
    const id = setInterval(() => setT(now()), everyMs);
    return () => clearInterval(id);
  }, [everyMs]);
  return t;
}

/** "in 12 min" or "in 1 hr 5 min". */
export function relative(ms: number): string {
  const mins = Math.max(1, Math.ceil(ms / 60_000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `in ${h ? `${h} hr ` : ''}${h && !m ? '' : `${m} min`}`.trim();
}
