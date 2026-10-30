import { event } from '../event';
import { Tight } from '../components/Tight';
import { Schedule } from './Schedule';

function FactIcon({ kind }: { kind: 'wifi' | 'help' | 'photos' }) {
  return (
    <span className="fact-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {kind === 'wifi' ? (
          <><path d="M3 8a15 15 0 0 1 18 0M6 12a10 10 0 0 1 12 0M9 16a5 5 0 0 1 6 0" /><circle cx="12" cy="20" r=".8" fill="currentColor" /></>
        ) : kind === 'help' ? (
          <><path d="M20 11a8 8 0 0 1-8 8H4l1.5-4A8 8 0 1 1 20 11Z" /><path d="M9.5 8a2.5 2.5 0 1 1 4 2c-1 .7-1.5 1-1.5 2M12 15h.01" /></>
        ) : (
          <><path d="M3 7h4l2-3h6l2 3h4v13H3Z" /><circle cx="12" cy="13" r="4" /></>
        )}
      </svg>
    </span>
  );
}

export function Welcome() {
  const words = event.name.split(' ');
  const lastWord = words.pop();

  return (
    <div className="slide welcome">
      <header className="welcome-header">
        <h1 className="title welcome-title">
          <span className="welcome-kicker">Welcome to</span>
          <span className="welcome-name">
            {words.join(' ')}{' '}
            <span className="welcome-title-accent"><Tight text={`${lastWord}.`} /></span>
          </span>
        </h1>
        <div className="welcome-signature" aria-hidden="true">
          <svg className="welcome-spark" viewBox="0 0 48 48" fill="none">
            <path d="M24 3C24 17 17 24 3 24C17 24 24 31 24 45C24 31 31 24 45 24C31 24 24 17 24 3Z" fill="currentColor" />
          </svg>
          <div><span>{event.theme.build}</span><span>{event.theme.launch}</span></div>
        </div>
      </header>
      <div className="welcome-columns">
        <section className="welcome-essentials" aria-labelledby="welcome-essentials">
          <h2 className="label welcome-section-title" id="welcome-essentials">Before we build</h2>
          <dl className="facts">
            <div className="fact-row">
              <dt><FactIcon kind="wifi" />Wi-Fi</dt>
              <dd>
                <span className="facts-aside">Join</span> <span className="mono">{event.wifi.network}</span>
                {event.wifi.password && (
                  <span className="facts-password"><span className="facts-aside">Password</span> <span className="mono">{event.wifi.password}</span></span>
                )}
                {event.wifi.note && <span className="facts-note">{event.wifi.note}</span>}
              </dd>
            </div>
            <div className="fact-row">
              <dt><FactIcon kind="help" />Help</dt>
              <dd>{event.help}</dd>
            </div>
            <div className="fact-row">
              <dt><FactIcon kind="photos" />Photos</dt>
              <dd>{event.photography}</dd>
            </div>
          </dl>
        </section>
        <Schedule />
      </div>
    </div>
  );
}
