import { event } from '../event';

const bc = event.buildClub;

export function BuildClubIntro() {
  const [hero, ...rest] = bc.past;

  return (
    <div className="slide bc-intro">
      <div className="bc-intro-main">
        <p className="label">Who we are</p>
        <h1 className="title">Build Club Singapore</h1>
        <p className="lead">{bc.about}</p>

        <dl className="bc-stats">
          {bc.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="bc-activities">
          <h2 className="label">What we run</h2>
          <ul>
            {bc.activities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bc-gallery">
        <figure className="bc-photo is-hero">
          <img src={hero.photo} alt={hero.alt} />
          <figcaption>
            <span className="bc-photo-date">{hero.date}</span>
            <strong>{hero.title}</strong>
            <span>{hero.detail}</span>
          </figcaption>
        </figure>
        {rest.map((p) => (
          <figure key={p.photo} className="bc-photo">
            <img src={p.photo} alt={p.alt} />
            <figcaption>
              <span className="bc-photo-date">{p.date}</span>
              <strong>{p.title}</strong>
              <span>{p.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
