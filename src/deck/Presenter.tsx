import { slides } from '../slides';
import { Stage } from '../components/Stage';
import { event } from '../event';
import { useDeck } from './Deck';
import { ThemeButton } from '../components/ThemeButton';
import { clockLabel, isRehearsalClock, useNow } from './time';

/**
 * The presenter window: open it with P from the audience window, put it on your laptop screen,
 * and drive either window. Both stay in step.
 */
export function Presenter() {
  const { index, go, blackout, setBlackout, talk, theme, setTheme } = useDeck({ presenter: true });
  const t = useNow(1000);
  const slide = slides[index];
  const next = slides[index + 1];

  return (
    <main className="presenter">
      <section className="pr-current">
        <Stage className="pr-stage">{slide.render()}</Stage>
      </section>

      <aside className="pr-side">
        <div className="pr-status">
          <span className="pr-clock">{clockLabel(t)}</span>
          <span>
            {index + 1} of {slides.length}
            {isRehearsalClock && ', rehearsal clock'}
          </span>
        </div>

        <div className="pr-next">
          {next ? (
            <>
              <p>Next: {next.title}</p>
              <Stage className="pr-stage">{next.render()}</Stage>
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
          <button onClick={() => go(index - 1)} disabled={index === 0}>
            Previous
          </button>
          <button onClick={() => go(index + 1)} disabled={!next}>
            Next
          </button>
          <button onClick={() => setBlackout(!blackout)}>{blackout ? 'Show screen' : 'Blank screen'}</button>
          <ThemeButton theme={theme} setTheme={setTheme} />
          {slide.id === 'show-and-tell' && (
            <>
              <button onClick={talk.toggle}>{talk.running ? 'Pause timer' : 'Start timer'}</button>
              <button onClick={talk.reset}>Reset timer</button>
              <button onClick={() => talk.move(1)}>Next presenter</button>
            </>
          )}
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
