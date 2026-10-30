import { event } from '../event';
import { QR } from '../components/QR';
import { Tight } from '../components/Tight';

const asset = (path: string) => `${import.meta.env.BASE_URL}/${path}`.replace(/\/+/g, '/');

export function Close() {
  const a = event.ambassador;
  return (
    <div className="slide close">
      <div className="close-main">
        <h1 className="title">
          <Tight text="Thanks for building with us." />
        </h1>
        <p className="lead">Group photo at the front in a few minutes. Stay close.</p>
        <div className="close-codes">
          <QR value={event.links.survey} size={260} caption="Tell us how tonight went" />
          <QR value={event.links.discord} size={260} caption="Keep building in the AdaL Discord" />
          <QR value={event.links.volunteers} size={260} caption="Join the Build Club SG Volunteer Group" />
        </div>
      </div>

      {/* Poster-style card: the AdaL Global Ambassador Program */}
      <aside className="ambassador" aria-label="AdaL Global Ambassador Program">
        <img className="ambassador-mascot" src={asset('mascot/adal.webp')} alt="" draggable={false} />
        <img className="ambassador-logo" src={asset('logos/adal.svg')} alt="AdaL" draggable={false} />
        <h2 className="ambassador-title">
          {a.title.map((line, i) => (
            <span key={line} className={i === 1 ? 'is-accent' : undefined}>
              {line}
            </span>
          ))}
        </h2>
        <p className="ambassador-pitch">{a.pitch}</p>
        <p className="ambassador-perks">{a.perks}</p>
        <div className="ambassador-apply">
          <QR value={event.links.ambassadorForm} size={160} caption={a.apply} />
          <div className="ambassador-cta">
            <span className="ambassador-now">Apply now.</span>
            <span className="ambassador-scan">{a.apply}</span>
          </div>
        </div>
        <p className="ambassador-more">
          or visit <span className="ambassador-url">{a.url}</span>
        </p>
      </aside>
    </div>
  );
}
