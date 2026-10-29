import { event } from '../event';
import { at } from './time';
import { useShared } from './shared';

/*
  When the build session starts.

  By default it follows the schedule in event.ts (buildBlock.start), so it runs on its own.
  Pressing "Start 1:15" in the presenter window or in the audience window's corner stores the
  real moment you pressed it, and the full session runs from there. Every window and every
  reload counts down from that same moment, so nobody has to keep it going.
  Sign-ups, the five-minute warning and submit keep their place relative to the start.
*/

const b = event.buildBlock;
const scheduled = at(b.start);

export const BUILD_MS = at(b.submit) - scheduled; // 1:15
export const SIGNUPS_AFTER = at(b.signupsOpen) - scheduled; // 45 min in
export const WARNING_BEFORE_END = at(b.submit) - at(b.warning); // 5 min left
const STALE_AFTER = BUILD_MS + 2 * 60 * 60_000; // a rehearsal start is forgotten 2 hours after it ends

export type BuildTimes = {
  start: number;
  signups: number;
  warning: number;
  end: number;
  /** "manual" after someone pressed Start; "schedule" while it follows event.ts. */
  source: 'manual' | 'schedule';
};

/** The session's times right now, from a manual start if there is a current one. */
export function buildTimes(manual: number | null, t: number): BuildTimes {
  const fresh = manual !== null && t - manual < STALE_AFTER && manual - t < 60_000;
  const start = fresh ? (manual as number) : scheduled;
  return {
    start,
    signups: start + SIGNUPS_AFTER,
    warning: start + BUILD_MS - WARNING_BEFORE_END,
    end: start + BUILD_MS,
    source: fresh ? 'manual' : 'schedule',
  };
}

/** The manual start, shared by the audience and presenter windows (null = follow the schedule). */
export function useBuildStart() {
  return useShared<number | null>('build:start', null);
}
