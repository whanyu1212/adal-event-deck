import { event } from '../event';
import { QR } from '../components/QR';

const asset = (path: string) => `${import.meta.env.BASE_URL}/${path}`.replace(/\/+/g, '/');

export function Hosts() {
  return (
    <div className="slide hosts">
      <h1 className="title">Meet tonight's speakers</h1>
      <ul className="hosts-grid">
        {event.team.map((h) => {
          const logo = event.logos.find((l) => l.className === h.logo);
          return (
            <li key={h.name} className="host">
              {logo && (
                <div className="host-logo">
                  <img
                    src={asset(logo.src)}
                    alt={h.org}
                    className={`${logo.className}${'srcOnDark' in logo ? ' on-light' : ''}`}
                  />
                  {'srcOnDark' in logo && (
                    <img src={asset(logo.srcOnDark)} alt={h.org} className={`${logo.className} on-dark`} />
                  )}
                </div>
              )}
              <img className="host-photo" src={asset(h.photo)} alt={h.name} />
              <h2 className="host-name">{h.name}</h2>
              <p className="host-role">
                {h.role.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
              <QR value={h.linkedin} size={150} />
            </li>
          );
        })}
      </ul>
      <p className="hosts-thanks">{event.teamThanks}</p>
    </div>
  );
}
