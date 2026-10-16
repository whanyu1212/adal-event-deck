import { event } from '../event';
import { QR } from '../components/QR';
import { label } from '../deck/time';

export function BuildClub() {
  const b = event.buildBlock;
  return (
    <div className="slide build-club">
      <div className="build-club-main">
        <h1 className="title">Build Club Singapore</h1>
        <p className="lead">{event.buildClub.about}</p>
        <h2>Submitting your project</h2>
        <ol className="steps">
          <li>Open the Build Club dashboard with the QR code.</li>
          <li>
            Add your project by {label(b.submit)}. A repo, a video, a landing page or a write-up all
            count.
          </li>
          <li>
            Want to demo it? Show-and-tell sign-ups open at {label(b.signupsOpen)}. There are{' '}
            {event.showAndTell.presenters.length} spots, so {b.signupHow}.
          </li>
        </ol>
      </div>
      <QR value={event.links.dashboard} size={320} caption="Build Club dashboard" />
    </div>
  );
}
