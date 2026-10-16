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

/** Slide index, blackout and talk controls, shared by the audience and presenter windows. */
export function useDeck({ presenter = false } = {}) {
  const [index, setIndex] = useShared('deck:index', 0);
  const [blackout, setBlackout] = useShared('deck:blackout', false);
  const talk = useTalk();
  const [theme, setTheme] = useTheme();
  const go = useCallback((i: number) => setIndex(clamp(i)), [setIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (target.closest('video, input, textarea, select, button')) return;
      const k = e.key;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) go(index + 1);
      else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) go(index - 1);
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
  }, [index, blackout, go, setBlackout, talk, presenter, theme, setTheme]);

  return { index, go, blackout, setBlackout, talk, theme, setTheme };
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
  const { index, go, blackout, setBlackout, theme, setTheme } = useDeck();
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
            {slide.render()}
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
