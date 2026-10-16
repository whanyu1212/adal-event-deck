import { event } from '../event';
import { useShared } from './shared';

// Show-and-tell state, shared with the presenter window.
// The talk timer uses the real clock, not the rehearsal clock.

type Talk = { current: number; startedAt: number | null; banked: number };
const INITIAL: Talk = { current: 0, startedAt: null, banked: 0 };
export const TALK_MS = event.showAndTell.minutesEach * 60_000;

export function useTalk() {
  const [talk, setTalk] = useShared<Talk>('deck:talk', INITIAL);
  const count = event.showAndTell.presenters.length;

  const elapsed = (at: number) => talk.banked + (talk.startedAt ? at - talk.startedAt : 0);

  return {
    talk,
    running: talk.startedAt !== null,
    elapsed,
    toggle: () =>
      setTalk((t) =>
        t.startedAt
          ? { ...t, startedAt: null, banked: t.banked + (Date.now() - t.startedAt) }
          : { ...t, startedAt: Date.now() },
      ),
    reset: () => setTalk((t) => ({ ...t, startedAt: null, banked: 0 })),
    move: (by: number) =>
      setTalk((t) => ({
        current: Math.min(count - 1, Math.max(0, t.current + by)),
        startedAt: null,
        banked: 0,
      })),
  };
}
