import { event } from '../event';
import { Digits } from '../components/Digits';
import { RocketRun, X0, X1_FROM_RIGHT } from '../components/RocketRun';
import { QR } from '../components/QR';
import { BUILD_MS, buildTimes, useBuildStart, type BuildTimes } from '../deck/buildClock';
import { clockLabel, duration, useNow } from '../deck/time';

const b = event.buildBlock;

function status(t: number, s: BuildTimes) {
  if (t < s.start) return { big: duration(BUILD_MS), caption: `Starts at ${clockLabel(s.start)}` };
  if (t >= s.end) return { big: null, caption: 'Show-and-tell is next.' };
  const big = duration(s.end - t);
  if (t >= s.warning) return { big, caption: 'Five minutes left. Submit now.', urgent: true };
  if (t >= s.signups) return { big, caption: `left to build · show-and-tell sign-ups are open, ${b.signupHow}` };
  return { big, caption: 'left to build' };
}

export function BuildBlock() {
  const t = useNow(250);
  const [manual] = useBuildStart();
  const times = buildTimes(manual, t);
  const s = status(t, times);
  const pos = (at: number) => Math.min(1, Math.max(0, (at - times.start) / (times.end - times.start)));

  const marks = [
    { at: times.start, text: 'Start' },
    { at: times.signups, text: 'Show-and-tell sign-ups' },
    { at: times.end, text: 'Submit' },
  ];

  return (
    <div className={`slide build-block${s.urgent ? ' is-urgent' : ''}`}>
      <div className="bb-head">
        <div>
          <h1 className="bb-title">
            Build session <span>{clockLabel(times.start)} to {clockLabel(times.end)}</span>
          </h1>
          {s.big ? <Digits text={s.big} className="bb-digits" /> : <p className="bb-closed">Time's up.</p>}
          <p className="bb-caption">{s.caption}</p>
        </div>
        <div className="bb-side">
          {/* Hidden until the submission link is set in event.ts (links.dashboard) */}
          {event.links.dashboard && (
            <QR value={event.links.dashboard} size={196} caption={`Submit by ${clockLabel(times.end)}`} />
          )}
          {/* The promo code stays up for latecomers */}
          <aside className="bb-promo" aria-label="Promo code">
            <QR value={event.promo.signUp} size={128} caption="Sign up" />
            <div className="bb-promo-copy">
              <p className="label">{event.promo.offer}, free</p>
              <code>{event.promo.code}</code>
              <span>
                Sign up, add the code · valid until {event.promo.validUntil}
              </span>
            </div>
          </aside>
        </div>
      </div>

      <div className="bb-line" aria-hidden>
        <RocketRun start={times.start} end={times.end} warning={times.warning} />
        {/* Inset to the rocket's path, so the rocket flies over the marks */}
        <div className="bb-track" style={{ marginLeft: X0, marginRight: X1_FROM_RIGHT }}>
          <div className="bb-rail" />
          <div className="bb-fill" style={{ width: `${pos(t) * 100}%` }} />
          {marks.map((m, i) => (
            <div
              key={m.text}
              className={`bb-mark is-below${t >= m.at ? ' is-passed' : ''}${i === 0 ? ' is-first' : ''}${i === marks.length - 1 ? ' is-last' : ''}`}
              style={{ left: `${pos(m.at) * 100}%` }}
            >
              <span className="bb-mark-label">
                <time>{clockLabel(m.at)}</time> {m.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bb-paths">
        {(['build', 'launch'] as const).map((k) => (
          <p key={k} className={`bb-path is-${k}`}>
            <strong>{event.tracks[k].title}</strong> {event.tracks[k].direction}
          </p>
        ))}
      </div>
    </div>
  );
}
