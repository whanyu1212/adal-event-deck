import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { slides } from '../slides';
import { Stage } from '../components/Stage';
import { event } from '../event';
import { clockLabel, useNow } from './time';
import { useShared } from './shared';
import { useTalk } from './talk';
import { themeFromUrl, useTheme } from './theme';
import { Presenter } from './Presenter';
import { ThemeButton } from '../components/ThemeButton';

const last = slides.length - 1;
const clamp = (i: number) => Math.min(last, Math.max(0, i));

function indexFromHash(): number | null {
  const m = location.hash.match(/^#\/(\d+)$/);
  return m ? clamp(Number(m[1]) - 1) : null;
}

/** The presenter window keeps any rehearsal clock (?now, ?speed) from this window. */
function presenterUrl() {
  const params = new URLSearchParams(location.search);
  params.set('presenter', '');
  return `${location.pathname}?${params.toString().replace('presenter=', 'presenter')}`;
}

/** How many extra key presses a slide holds before the deck moves on (0 for most slides). */
const stepsOf = (i: number) => slides[i]?.steps ?? 0;

/**
 * Slide, step, blackout and talk controls, shared by the audience and presenter windows.
 * A slide with `steps` reveals itself one key press at a time: next and back move through
 * its steps first, and only then change slide. The slide and step are stored together, so
 * a change of slide never shows the old slide for a frame at the new step.
 */
export function useDeck({ presenter = false } = {}) {
  const [pos, setPos] = useShared('deck:pos', { i: 0, s: 0 });
  const [blackout, setBlackout] = useShared('deck:blackout', false);
  const talk = useTalk();
  const [theme, setTheme] = useTheme();
  const index = clamp(pos.i);
  const step = Math.min(stepsOf(index), pos.s);
  /** Jump to a slide, at its first step (or at `at`). */
  const go = useCallback((i: number, at = 0) => setPos({ i: clamp(i), s: at }), [setPos]);
  /** Next key press: the next step if there is one, otherwise the next slide. */
  const next = useCallback(() => {
    if (step < stepsOf(index)) setPos({ i: index, s: step + 1 });
    else if (index < last) setPos({ i: index + 1, s: 0 });
  }, [index, step, setPos]);
  /** Back key press: the previous step, otherwise the end of the previous slide. */
  const back = useCallback(() => {
    if (step > 0) setPos({ i: index, s: step - 1 });
    else if (index > 0) setPos({ i: index - 1, s: stepsOf(index - 1) });
  }, [index, step, setPos]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (target.closest('video, input, textarea, select, button')) return;
      const k = e.key;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) next();
      else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) back();
      else if (k === 'Home') go(0);
      else if (k === 'End') go(last);
      else if (k === 'b' || k === 'B' || k === '.') setBlackout(!blackout);
      else if (k === 'Escape') setBlackout(false);
      else if (k === 't' || k === 'T') setTheme(theme === 'light' ? 'dark' : 'light');
      else if ((k === 'p' || k === 'P') && !presenter)
        window.open(presenterUrl(), 'adal-deck-presenter', 'width=1440,height=900');
      else if ((k === 'f' || k === 'F') && !presenter)
        document.fullscreenElement
          ? document.exitFullscreen().catch(() => {})
          : document.documentElement.requestFullscreen?.().catch(() => {});
      else if (slides[index].id === 'show-and-tell' && /^[srn]$/i.test(k)) {
        if (k.toLowerCase() === 's') talk.toggle();
        else if (k.toLowerCase() === 'r') talk.reset();
        else talk.move(e.shiftKey ? -1 : 1);
      } else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, blackout, go, next, back, setBlackout, talk, presenter, theme, setTheme]);

  return { index, step, go, next, back, blackout, setBlackout, talk, theme, setTheme };
}

const pad = (n: number) => String(n).padStart(2, '0');

/** A magazine-style folio: hosts on the left, clock and page number on the right. */
function Footer({ index }: { index: number }) {
  const t = useNow(5000);
  return (
    <footer className="deck-footer">
      <span>{event.hosts}</span>
      <span className="deck-folio">
        <span>{clockLabel(t)}</span>
        <span className="deck-page">
          {pad(index + 1)}
          <span> / {pad(slides.length)}</span>
        </span>
      </span>
    </footer>
  );
}

function Audience() {
  const { index, step, go, blackout, setBlackout, theme, setTheme } = useDeck();
  const calm = useReducedMotion();
  const slide = slides[index];

  // Keep the URL hash and the slide in step, so a reload or a shared link lands on the same slide.
  useEffect(() => {
    // A bare URL always opens on the first slide, and a blank screen left over from rehearsal is cleared.
    go(indexFromHash() ?? 0);
    setBlackout(false);
    // Opening the deck always starts in the URL's theme (light unless ?theme=dark),
    // so a dark rehearsal doesn't carry over into the night.
    setTheme(themeFromUrl());
    const onHash = () => {
      const i = indexFromHash();
      if (i !== null) go(i);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    history.replaceState(null, '', `#/${index + 1}`);
    document.title = `${slide.title}: ${event.name}`;
  }, [index, slide.title]);

  // Hide the cursor when it's idle, so it doesn't sit on the projector.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const wake = () => {
      document.body.classList.remove('is-idle');
      clearTimeout(timer);
      timer = setTimeout(() => document.body.classList.add('is-idle'), 2000);
    };
    wake();
    window.addEventListener('mousemove', wake);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', wake);
    };
  }, []);

  return (
    <main className="deck" onDoubleClick={() => document.documentElement.requestFullscreen?.().catch(() => {})}>
      <Stage>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            className="slide-frame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: calm ? 0 : 0.25 }}
          >
            {slide.render(step)}
          </motion.div>
        </AnimatePresence>
        {!slide.bare && <Footer index={index} />}
      </Stage>
      {/* Outside the stage, so it never lands on a slide; it hides with the idle cursor */}
      <ThemeButton theme={theme} setTheme={setTheme} className="deck-theme-button" />
      {blackout && <div className="blackout" aria-label="Screen blanked. Press B to show." />}
    </main>
  );
}

export default function Deck() {
  const presenter = new URLSearchParams(location.search).has('presenter');
  return presenter ? <Presenter /> : <Audience />;
}
