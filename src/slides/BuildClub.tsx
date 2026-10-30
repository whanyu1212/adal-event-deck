import { event } from '../event';
import { QR } from '../components/QR';
import { label } from '../deck/time';

export function BuildClub() {
  const b = event.buildBlock;
  const p = event.prizes;
  return (
    <div className="slide build-club">
      <div className="build-club-main">
        <h1 className="title">Tonight's challenge</h1>
        <p className="lead">Build something tonight, submit it on Build Club Campus, and you could win AdaL Pro.</p>
        <div className="build-club-submit">
          <h2>Submitting your project</h2>
          <div className="build-club-submit-row">
            <ol className="steps">
              <li>Scan the QR code to open tonight's Build Club challenge and enrol.</li>
              <li>
                Add your project by {label(b.submit)}. A repo, a video, a landing page or a write-up all
                count.
              </li>
              <li>
                Want to demo it? Show-and-tell sign-ups open at {label(b.signupsOpen)}. There are{' '}
                {event.showAndTell.slots} spots, so {b.signupHow}.
              </li>
            </ol>
            <QR value={event.links.dashboard} size={260} caption="Build Club challenge" />
          </div>
        </div>
      </div>

      <section className="prizes" aria-labelledby="prizes-title">
        <h2 id="prizes-title">Prizes</h2>
        <ol className="prize-places">
          {p.places.map((place) => (
            <li key={place.rank}>
              <span className="prize-rank">{place.rank}</span>
              <span>
                <strong>{place.prize}</strong>
                {'extra' in place && <small>{place.extra}</small>}
              </span>
            </li>
          ))}
        </ol>
        <div className="prize-bonus">
          <span className="prize-rank">Everyone</span>
          <span>
            <strong>{p.bonus.prize}</strong>
            <small>{p.bonus.how}</small>
          </span>
        </div>
        <p className="prize-claim">{p.claim}</p>
      </section>
    </div>
  );
}
