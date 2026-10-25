import { slides } from '../slides';
import { Stage } from '../components/Stage';
import { event } from '../event';
import { useDeck } from './Deck';
import { ThemeButton } from '../components/ThemeButton';
import { clockLabel, useNow } from './time';

/**
 * The presenter window: open it with P from the audience window, put it on your laptop screen,
 * and drive either window. Both stay in step.
 */
export function Presenter() {
  const { index, step, go, next: advance, back, blackout, setBlackout, theme, setTheme } = useDeck({
    presenter: true,
  });
  const t = useNow(1000);
  const slide = slides[index];
  const next = slides[index + 1];
  const steps = slide.steps ?? 0;

  return (
    <main className="presenter">
      <section className="pr-current">
        <Stage className="pr-stage">{slide.render(step)}</Stage>
      </section>

      <aside className="pr-side">
        <div className="pr-status">
          <span className="pr-clock">{clockLabel(t)}</span>
          <span>
            {index + 1} of {slides.length}
            {steps > 0 && ` · step ${step + 1} of ${steps + 1}`}
          </span>
        </div>

        <div className="pr-next">
          {next ? (
            <>
              <p>Next: {next.title}</p>
              <Stage className="pr-stage">{next.render(0)}</Stage>
            </>
          ) : (
            <p>Last slide</p>
          )}
        </div>

        <div className="pr-notes">
          <h2>{slide.title}</h2>
          {slide.notes.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="pr-controls">
          <button onClick={back} disabled={index === 0 && step === 0}>
            Previous
          </button>
          <button onClick={advance} disabled={!next && step >= steps}>
            Next
          </button>
          <button onClick={() => setBlackout(!blackout)}>{blackout ? 'Show screen' : 'Blank screen'}</button>
          <ThemeButton theme={theme} setTheme={setTheme} />
        </div>

        <select
          className="pr-jump"
          value={index}
          onChange={(e) => go(Number(e.target.value))}
          aria-label="Jump to slide"
        >
          {slides.map((s, i) => (
            <option key={s.id} value={i}>
              {i + 1}. {s.title}
            </option>
          ))}
        </select>
        <p className="pr-help">
          Arrows, space or a clicker move slides. B blanks the screen. {event.name} deck.
        </p>
      </aside>
    </main>
  );
}
