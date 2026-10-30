import { event } from '../event';
import { QR } from '../components/QR';

const s = event.showAndTell;

// What people can type off the screen: no scheme, no ?pwd= (the passcode sits beside it).
const shortLink = s.zoom.link.replace(/^https?:\/\//, '').replace(/\?.*$/, '');

export function ShowAndTell() {
  return (
    <div className="slide show-and-tell">
      <div className="st-main">
        <h1 className="st-heading">Show-and-tell</h1>
        <p className="st-title">Share what you built.</p>
        <p className="st-each">{s.minutesEach} minutes each</p>
        <ol className="st-how">
          <li>Join the Zoom.</li>
          <li>Share your screen when it’s your turn.</li>
          <li>Rough edges welcome.</li>
        </ol>
      </div>

      <aside className="st-join" aria-label="Join the Zoom">
        <p className="st-join-label">Scan to join</p>
        <QR value={s.zoom.link} size={300} caption="Zoom" />
        <p className="st-join-link">{shortLink || '[Zoom link]'}</p>
        <dl className="st-join-meta">
          <div><dt>Meeting ID</dt><dd>{s.zoom.meetingId}</dd></div>
          <div><dt>Passcode</dt><dd>{s.zoom.passcode}</dd></div>
        </dl>
      </aside>
    </div>
  );
}
