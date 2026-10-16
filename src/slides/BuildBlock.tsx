import { event } from '../event';
import { Digits } from '../components/Digits';
import { QR } from '../components/QR';
import { at, duration, label, useNow } from '../deck/time';

const b = event.buildBlock;
const start = at(b.start);
const signups = at(b.signupsOpen);
const warning = at(b.warning);
const submit = at(b.submit);

const marks = [
  { at: start, time: b.start, text: 'Start', side: 'below' },
  { at: signups, time: b.signupsOpen, text: 'Show-and-tell sign-ups open', side: 'below' },
  { at: warning, time: b.warning, text: 'Five minutes left', side: 'above' },
  { at: submit, time: b.submit, text: 'Submit', side: 'below' },
] as const;

const pos = (t: number) => Math.min(1, Math.max(0, (t - start) / (submit - start)));

function status(t: number) {
  if (t < start) return { big: duration(start - t), caption: `until the build session starts at ${label(b.start)}` };
  if (t >= submit) return { big: null, caption: 'Submissions are closed. Show-and-tell is next.' };
  const big = duration(submit - t);
  if (t >= warning) return { big, caption: 'Five minutes left. Submit to the dashboard now.', urgent: true };
  if (t >= signups)
    return { big, caption: `left to build. Show-and-tell sign-ups are open: ${b.signupHow}.` };
  return { big, caption: `left to build. Submit by ${label(b.submit)}.` };
}

export function BuildBlock() {
  const t = useNow(250);
  const s = status(t);
  const p = pos(t);
  const live = t >= start && t < submit;

  return (
    <div className={`slide build-block${s.urgent ? ' is-urgent' : ''}`}>
      <div className="bb-head">
        <div>
          <h1 className="bb-title">
            Build session <span>{label(b.start)} to {label(b.submit)}</span>
          </h1>
          {s.big ? <Digits text={s.big} className="bb-digits" /> : <p className="bb-closed">Time's up.</p>}
          <p className="bb-caption">{s.caption}</p>
        </div>
        <QR value={event.links.dashboard} size={230} caption="Submit your project" />
      </div>

      <div className="bb-line" aria-hidden>
        <div className="bb-rail" />
        <div className="bb-fill" style={{ width: `${p * 100}%` }} />
        {marks.map((m, i) => (
          <div
            key={m.time}
            className={`bb-mark is-${m.side}${t >= m.at ? ' is-passed' : ''}${i === 0 ? ' is-first' : ''}${i === marks.length - 1 ? ' is-last' : ''}`}
            style={{ left: `${pos(m.at) * 100}%` }}
          >
            <span className="bb-mark-label">
              <time>{label(m.time)}</time> {m.text}
            </span>
          </div>
        ))}
        {live && <div className="bb-now" style={{ left: `${p * 100}%` }} />}
      </div>

      <div className="tracks bb-tracks">
        {(['build', 'launch'] as const).map((k) => (
          <section key={k} className={`track track-${k}`}>
            <h2>
              {event.tracks[k].title} <span>{event.tracks[k].blurb}</span>
            </h2>
            <ul>
              {event.tracks[k].prompts.map((prompt) => (
                <li key={prompt}>{prompt}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
