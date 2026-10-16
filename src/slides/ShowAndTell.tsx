import { event } from '../event';
import { Digits } from '../components/Digits';
import { TALK_MS, useTalk } from '../deck/talk';
import { duration, useNow } from '../deck/time';

export function ShowAndTell() {
  useNow(250);
  const { talk, elapsed } = useTalk();
  const people = event.showAndTell.presenters;
  const who = people[talk.current];
  const left = TALK_MS - elapsed(Date.now());
  const over = left <= 0;

  return (
    <div className={`slide show-and-tell${over ? ' is-over' : ''}`}>
      <div className="st-main">
        <h1 className="st-heading">Show-and-tell</h1>
        <p className="st-name">{who.name}</p>
        <p className="st-project">{who.project}</p>
        <div className="st-timer">
          {over ? <p className="st-over">Time's up</p> : <Digits text={duration(left)} className="st-digits" />}
          <div className="st-bar" aria-hidden>
            <div style={{ width: `${Math.min(1, Math.max(0, 1 - left / TALK_MS)) * 100}%` }} />
          </div>
        </div>
      </div>
      <ol className="st-queue">
        {people.map((p, i) => (
          <li
            key={i}
            className={i === talk.current ? 'is-now' : i < talk.current ? 'is-done' : undefined}
            aria-current={i === talk.current ? 'step' : undefined}
          >
            <span className="st-q-name">{p.name}</span>
            <span className="st-q-project">{p.project}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
